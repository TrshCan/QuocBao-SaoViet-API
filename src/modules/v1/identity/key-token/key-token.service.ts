import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import crypto from 'crypto';
import JWT, { VerifyErrors } from 'jsonwebtoken';

import { KEY_CACHE } from '@/common/constants';
import { toErrorMessage } from '@/utils';
import { IoredisService } from '@/modules/shared/ioredis';
import { KeyTokenRepository } from './key-token.repository';
import { extractInfoDevice } from '@/utils/extract-info-device';

import type {
  AccessTokenPayload,
  KeyStoreForJWT,
  PairToken,
  RefreshTokenPayload,
  TempTokenPayload,
} from '@/types/jwt';
import type { Session } from '@/types/session';
import type { EnvConfig } from '@/configs';
import type { KeyToken } from '@/generated/prisma/client';

@Injectable()
export class KeyTokenService {
  private readonly logger = new Logger(KeyTokenService.name);

  constructor(
    private readonly redisService: IoredisService,
    private readonly keyTokenRepository: KeyTokenRepository,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async createKeyToken({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }: Pick<KeyToken, 'userId' | 'publicKey' | 'privateKey' | 'refreshToken'>) {
    try {
      const filter = { userId };
      const update = {
        refreshToken,
        publicKey,
        privateKey,
        refreshTokenUsed: [refreshToken],
      };

      // Add refresh token used to update
      console.log('refreshToken', refreshToken);
      // update.refreshTokenUsed.push(refreshToken);

      // Single-session policy: Delete all existing sessions for this user
      const existingRecords = await this.keyTokenRepository.findManyByFilter(
        filter,
        {
          select: {
            id: true,
          },
        },
      );

      if (existingRecords && existingRecords.length > 0) {
        this.logger.log(
          'Single-session policy: Invalidating existing sessions',
          {
            userId,
            sessionCount: existingRecords.length,
          },
        );

        // Delete all existing key tokens (sessions) for this user
        await this.keyTokenRepository.deleteManyByFilter(filter);

        // Invalidate cache for the user
        await this.invalidateKeyStoreCache(userId);
      }

      // Create new key token (new session)
      const tokens = await this.keyTokenRepository.createOne({
        ...filter,
        ...update,
      });

      // Update cache asynchronously (fire and forget)
      const cacheStart = Date.now();
      this.updateKeyStoreCache(tokens)
        .then(() => {
          const cacheDuration = Date.now() - cacheStart;
          console.log(`[ASYNC] KeyToken cache updated in ${cacheDuration}ms`);
        })
        .catch((err) => {
          console.error('Background cache update error:', err);
        });
      // Extract publicKey value and keyStoreId
      const publicKeyValue = tokens.publicKey;
      const keyStoreId = tokens.id;

      this.logger.log('New session created', {
        userId,
        keyStoreId,
      });

      return {
        publicKey: publicKeyValue,
        keyStoreId: keyStoreId,
      };
    } catch (error) {
      this.logger.error('Error create key token:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to create key token');
    }
  }

  async createTokenPair(
    payloadAT: string | Buffer | AccessTokenPayload,
    payloadRT: string | Buffer | RefreshTokenPayload,
    publicKey: string | Buffer<ArrayBufferLike>,
    privateKey: string,
    userAgent: string,
    ipAddress: string,
  ): Promise<PairToken> {
    try {
      const accessToken = JWT.sign(payloadAT, privateKey, {
        algorithm: 'RS256',
        expiresIn: '10H',
      });

      const refreshToken = JWT.sign(payloadRT, privateKey, {
        algorithm: 'RS256',
        expiresIn: '3D',
      });

      // Decode the access token to extract iat and exp
      const decodedAccessToken = JWT.decode(accessToken) as AccessTokenPayload;
      const decodedRefreshToken = JWT.decode(
        refreshToken,
      ) as RefreshTokenPayload;
      const iat_accessToken = decodedAccessToken.iat;
      const exp_accessToken = decodedAccessToken.exp;
      const iat_refreshToken = decodedRefreshToken.iat;
      const exp_refreshToken = decodedRefreshToken.exp;

      // Verify access token asynchronously without blocking the response
      setImmediate(() => {
        JWT.verify(accessToken, publicKey, (err: JWT.VerifyErrors) =>
          this.verifyCallbackOption(err, decodedAccessToken),
        );
      });

      // Save user agent and ip address to session
      const deviceInfo = extractInfoDevice(userAgent, ipAddress);
      const sessionData: Session = {
        refreshToken: refreshToken,
        userAgent: userAgent,
        ipAddress: ipAddress,
        deviceInfo: {
          deviceName: deviceInfo.deviceName || 'Unknown',
          deviceType: deviceInfo.deviceType || 'desktop',
          os: deviceInfo.os || 'Unknown',
          browser: deviceInfo.browser || 'Unknown',
          ipAddress: deviceInfo.ipAddress || '0.0.0.0',
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
        revoked: false,
      };

      await this.keyTokenRepository.saveSessionToRedis(
        decodedAccessToken.id,
        sessionData,
      );

      return {
        accessToken,
        refreshToken,
        iat_accessToken,
        exp_accessToken,
        iat_refreshToken,
        exp_refreshToken,
      } as PairToken;
    } catch (error) {
      this.logger.error('error createTokenPair:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to create token pair');
    }
  }

  createTempToken(payload: TempTokenPayload): {
    tempToken: string;
    expiresIn: number;
  } {
    try {
      const tempTokenSecret =
        this.configService.get<EnvConfig['TEMP_TOKEN_SECRET']>(
          'TEMP_TOKEN_SECRET',
        ) ?? crypto.randomBytes(32).toString('hex');
      const tempTokenExpiresIn =
        this.configService.get<EnvConfig['TEMP_TOKEN_EXPIRES_IN']>(
          'TEMP_TOKEN_EXPIRES_IN',
        ) ?? 5 * 60;
      const tempToken = JWT.sign(payload, tempTokenSecret, {
        expiresIn: tempTokenExpiresIn,
        algorithm: 'HS256',
      });

      return {
        tempToken,
        expiresIn: tempTokenExpiresIn,
      };
    } catch (error) {
      this.logger.error('error createTempToken:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to create temp token');
    }
  }

  verifyJWT(token: string, keySecret: string): string | JWT.JwtPayload {
    try {
      const decoded = JWT.verify(token, keySecret, {
        algorithms: ['RS256'],
      });
      return decoded;
    } catch (error) {
      this.logger.error('Error verify JWT:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async requireKeyStore(userId: string): Promise<KeyStoreForJWT> {
    const cacheKey = `${KEY_CACHE.KEY_STORE}:${userId}`;
    try {
      // Try to get from Redis cache first
      const cachedData = await this.redisService.get(cacheKey);
      if (cachedData) {
        const keyStore = JSON.parse(cachedData) as KeyStoreForJWT;
        return keyStore;
      }

      // Cache miss - get from database
      const keyStore = await this.findByUserId(userId);
      if (!keyStore) {
        throw new NotFoundException('Key store not found');
      }

      // Store in Redis cache with 1 hour TTL
      await this.redisService.set(cacheKey, JSON.stringify(keyStore), 60 * 60);

      return keyStore;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const message = toErrorMessage(error);
      this.logger.error('Redis cache error, falling back to database', {
        error: message,
      });
      throw new InternalServerErrorException('Failed to get key store');
    }
  }

  async removeKeyById(keyTokenId: string) {
    try {
      const result = await this.keyTokenRepository.deleteById(keyTokenId);
      return result;
    } catch (error) {
      const message = toErrorMessage(error);
      this.logger.error('Failed to remove key by id', {
        error: message,
      });
      throw new InternalServerErrorException('Failed to remove key by id');
    }
  }

  async findOneById() {}
  async findByUserId(userId: string): Promise<KeyStoreForJWT | null> {
    return (await this.keyTokenRepository.findOneByUserId(userId, {
      select: {
        id: true,
        privateKey: true,
        publicKey: true,
        refreshToken: true,
        refreshTokenUsed: true,
      },
    })) as KeyStoreForJWT | null;
  }
  async findByRefreshTokenUsed() {}
  async findByRefreshToken() {}
  async deleteKeyByUserId(userId: string) {
    const result = await this.keyTokenRepository.deleteByUserId(userId);
    // Invalidate cache after deletion
    await this.invalidateKeyStoreCache(userId);
    return result;
  }

  /**
   * Invalidate key store cache for a specific user
   */
  async invalidateKeyStoreCache(userId: string): Promise<void> {
    try {
      const cacheKey = `${KEY_CACHE.KEY_STORE}:${userId}`;
      await this.redisService.delete(cacheKey);
      this.logger.log('Key store cache invalidated', { userId });
    } catch (error) {
      this.logger.warn('Failed to invalidate key store cache:', {
        error: toErrorMessage(error),
      });
    }
  }

  /**
   * Update key store cache after modifications
   */
  async updateKeyStoreCache(keyStore: KeyToken): Promise<void> {
    try {
      const cacheKey = `keyStore:${(keyStore as { userId: string }).userId}`;
      await this.redisService.set(
        cacheKey,
        JSON.stringify(keyStore),
        60 * 60 * 1,
      ); // 1 hour
    } catch (error) {
      this.logger.warn('Failed to update key store cache:', {
        error: toErrorMessage(error),
      });
    }
  }

  async deleteKeyStoreCache(userId: string): Promise<void> {
    try {
      const cacheKey = `keyStore:${userId}`;
      await this.redisService.delete(cacheKey);
    } catch (error) {
      this.logger.warn('Failed to delete key store cache:', {
        error: toErrorMessage(error),
      });
    }
  }

  async addTokenToBlacklist(token: string, ttl: number): Promise<void> {
    try {
      // const { exp } = JWT.decode(token) as AccessTokenPayload;
      // const ttl = exp - Math.floor(Date.now() / 1000);
      await this.redisService.set(
        `${KEY_CACHE.BLACKLIST}:${token}`,
        'true',
        ttl,
      );
    } catch (error) {
      this.logger.warn('Failed to add token to blacklist:', {
        error: toErrorMessage(error),
      });
    }
  }

  decodeJWT<T>(token: string): T {
    return JWT.decode(token) as T;
  }

  verifyCallbackOption(
    err: VerifyErrors | null,
    decoded: JWT.JwtPayload | string | undefined,
  ) {
    if (err) {
      console.error(`error verify::`, err);
    } else {
      console.log(`decode verify::`, decoded);
      // TODO: Add logic to save to session
      // saveToSession(decoded);
    }
  }

  validateToken<TDecoded>(decoded: TDecoded & { iat: number }, maxAge: number) {
    const now = Math.floor(Date.now() / 1000);
    if (now - decoded.iat > maxAge) {
      throw new UnauthorizedException('Token expired');
    }
  }

  async saveTempTokenToRedis(
    tempTokenKey: string,
    tempToken: string,
    expiresIn: number,
  ): Promise<void> {
    try {
      await this.redisService.set(tempTokenKey, tempToken, expiresIn);
    } catch (error) {
      this.logger.error('error saveTempTokenToRedis:', toErrorMessage(error));
      throw new InternalServerErrorException(
        'Failed to save temp token to redis',
      );
    }
  }
}
