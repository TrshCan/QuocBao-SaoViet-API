import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import JWT from 'jsonwebtoken';

import { EnvConfig } from '@/configs/config-env';
import { KEY_CACHE } from '@/common/constants';
import { toErrorMessage } from '@/utils';
import { IoredisService } from '@/modules/shared/ioredis';
import { KeyStoreForJWT, TempTokenPayload } from '@/types/jwt';
import { KeyTokenRepository } from './key-token.repository';
import { KeyToken } from 'generated/prisma';

@Injectable()
export class KeyTokenService {
  private readonly logger = new Logger(KeyTokenService.name);

  constructor(
    private readonly configService: ConfigService<EnvConfig>,
    private readonly redisService: IoredisService,
    private readonly keyTokenRepository: KeyTokenRepository,
  ) {}

  async createKeyToken() {}

  createTokenPair() {}

  verifyJWT(token: string, keySecret: string): string | JWT.JwtPayload {
    try {
      return JWT.verify(token, keySecret, {
        algorithms: ['RS256'],
      });
    } catch (error) {
      this.logger.error('Error verify JWT:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async requireKeyStore(userId: string) {
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
      const message = toErrorMessage(error);
      this.logger.error('Redis cache error, falling back to database', {
        error: message,
      });
      throw new InternalServerErrorException('Failed to get key store');
    }
  }

  async removeKeyById(keyTokenId: string) {
    try {
      const result = await this.keyTokenRepository.deleteOneById(keyTokenId);
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
  async findByUserId(userId: string) {
    return await this.keyTokenRepository.findOneByUserId(userId, {
      select: {
        id: true,
        privateKey: true,
        publicKey: true,
        refreshToken: true,
        refreshTokenUsed: true,
      },
    });
  }
  async findByRefreshTokenUsed() {}
  async findByRefreshToken() {}
  async deleteKeyByUserId() {}

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
      const cacheKey = `keyStore:${keyStore.userId}`;
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

  createTempToken(payload: TempTokenPayload): {
    tempToken: string;
    expiresIn: number;
  } {
    const TEMP_TOKEN_SECRET =
      this.configService.get<string>('TEMP_TOKEN_SECRET') || '';
    const TEMP_TOKEN_EXPIRY =
      this.configService.get<number>('TEMP_TOKEN_EXPIRES_IN') || 5 * 60;
    try {
      const tempToken = JWT.sign(payload, TEMP_TOKEN_SECRET, {
        expiresIn: TEMP_TOKEN_EXPIRY,
        algorithm: 'HS256',
      });

      return {
        tempToken,
        expiresIn: TEMP_TOKEN_EXPIRY,
      };
    } catch (error) {
      console.error('Failed to create temp token:', error);
      throw new InternalServerErrorException('Failed to create temp token');
    }
  }

  /**
   * Verifies and decodes a temporary JWT token
   * Throws error if token is invalid, expired, or tampered with
   */
  verifyTempToken(token: string): TempTokenPayload {
    const TEMP_TOKEN_SECRET =
      this.configService.get<string>('TEMP_TOKEN_SECRET') || '';
    try {
      const decoded = JWT.verify(token, TEMP_TOKEN_SECRET, {
        algorithms: ['HS256'],
      }) as TempTokenPayload;

      // Ensure it has the required fields
      if (!decoded.userId || !decoded.email || !decoded.type) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return decoded;
    } catch (error) {
      if (error instanceof JWT.TokenExpiredError) {
        throw new UnauthorizedException(
          'Temporary token has expired. Please login again.',
        );
      }

      if (error instanceof JWT.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid temporary token');
      }

      throw error;
    }
  }
}
