import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

import { KeyTokenRepository, KeyTokenService } from '../key-token';
import { UserRepository } from '../user';
import { IoredisService } from '../../shared/ioredis';

import { getInfoData } from '@/utils';

import { Prisma } from '@generated/prisma';

import type { AuthLoginDto } from './dto/auth-login.dto';
import type { LoginResponse } from './interfaces/login';
import type { EnvConfig } from '@/configs';
import type { AccessTokenPayload } from '@/types/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService<EnvConfig>,
    private readonly keyTokenService: KeyTokenService,
    private readonly keyTokenRepository: KeyTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly redisService: IoredisService,
  ) {}

  async login(body: AuthLoginDto): Promise<LoginResponse> {
    const tempRefreshTokenSecret =
      this.configService.get<string>('TEMP_REFRESH_TOKEN_SECRET') ??
      crypto.randomBytes(32).toString('hex');
    const publicKeyType =
      this.configService.get<EnvConfig['PUBLIC_KEY_TYPE']>('PUBLIC_KEY_TYPE') ??
      'spki';

    const foundUser: FoundUserLogin | null =
      await this.userRepository.findOneByUsername(body.username, {
        select: {
          id: true,
          username: true,
          fullName: true,
          email: true,
          password: true,
          secretOtp: true,
          status: true,
          permissions: true,
          role: true,
        },
      });

    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    if (!foundUser.email) {
      throw new BadRequestException('Mail`s user not found');
    }

    const isMatch = await bcrypt.compare(body.password, foundUser.password);
    if (!isMatch) throw new UnauthorizedException('Authentication error!');

    const { id: userId } = foundUser;

    // Generate RSA key pair and create key token in parallel with Redis cleanup
    const [keyPair] = await Promise.all([
      // RSA key generation (CPU-bound, run in parallel)
      Promise.resolve().then(() => {
        const keys = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
          privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
        });
        return keys;
      }),
    ]);

    // Create key token (now with generated keys)
    const { publicKey: publicKeyString, keyStoreId } =
      await this.keyTokenService.createKeyToken({
        userId: userId,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        refreshToken: tempRefreshTokenSecret,
      });

    if (!publicKeyString || !keyStoreId) {
      throw new BadRequestException('Failed to create key token');
    }

    // Generate JWT tokens with proper structure
    const publicKeyObject = crypto.createPublicKey(publicKeyString);
    const publicKeyToString = publicKeyObject.export({
      type: publicKeyType,
      format: 'pem',
    });

    const tokens = this.keyTokenService.createTokenPair(
      {
        id: foundUser.id,
        email: foundUser.email ?? '',
        username: foundUser.username,
        fullName: foundUser.fullName,
        role: 'super_admin',
        roleScope: 'SYSTEM',
        permissions: [],
        aud: 'access:common',
      },
      {
        id: foundUser.id,
        email: foundUser.email ?? '',
        keyStoreId: keyStoreId,
        sessionId: '',
        aud: 'refresh:common',
      },
      publicKeyToString,
      keyPair.privateKey,
    );

    // Update field refreshToken of KeyToken
    await this.keyTokenRepository.updateRefreshTokenById(
      keyStoreId,
      tokens.refreshToken,
    );

    const userData = getInfoData<
      Omit<FoundUserLogin, 'password' | 'secretOtp' | 'status'>,
      'id' | 'username' | 'email' | 'fullName' | 'role' | 'permissions'
    >({
      fields: ['id', 'username', 'email', 'fullName', 'role', 'permissions'],
      object: foundUser,
    });

    return {
      user: userData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresInAccessToken: tokens.exp_accessToken,
      expiresInRefreshToken: tokens.exp_refreshToken,
      iatAccessToken: tokens.iat_accessToken,
      iatRefreshToken: tokens.iat_refreshToken,
    };
  }

  async logout({
    userId,
    keyStoreId,
    accessToken,
  }: {
    userId: string;
    keyStoreId: string;
    accessToken: string;
  }) {
    if (!keyStoreId || !userId || !accessToken) {
      throw new UnauthorizedException('Authentication required!');
    }

    const delKey = await this.keyTokenService.removeKeyById(keyStoreId);

    // Clear cache (if applicable)
    await this.keyTokenService.deleteKeyStoreCache(userId);

    const { exp } =
      this.keyTokenService.decodeJWT<AccessTokenPayload>(accessToken);
    if (!exp) {
      throw new UnauthorizedException('Invalid token');
    }
    const ttl = exp - Math.floor(Date.now() / 1000);
    if (ttl <= 0) {
      throw new UnauthorizedException('Token has expired');
    }
    await this.keyTokenService.addTokenToBlacklist(accessToken, ttl);

    return delKey;
  }

  async handleRefreshToken({
    keyStoreId,
    userId,
    email,
    refreshToken,
  }: {
    keyStoreId: string;
    userId: string;
    email: string;
    refreshToken: string;
  }) {
    const keyStoreData = (await this.keyTokenRepository.findOneById(
      keyStoreId,
      {
        select: {
          id: true,
          refreshToken: true,
          refreshTokenUsed: true,
          publicKey: true,
          privateKey: true,
        },
      },
    )) as {
      id: string;
      refreshToken: string;
      refreshTokenUsed: string[];
      publicKey: string;
      privateKey: string;
    } | null;

    if (!keyStoreData) {
      throw new NotFoundException('Key store not found');
    }

    const {
      id: currentKeyStoreId,
      refreshToken: keyStoreRefreshToken,
      refreshTokenUsed: keyStoreRefreshTokenUsed,
      publicKey: keyStorePublicKey,
      privateKey: keyStorePrivateKey,
    } = keyStoreData;

    const isRefreshTokenReused =
      keyStoreRefreshTokenUsed.includes(refreshToken);

    if (isRefreshTokenReused) {
      await this.keyTokenService.deleteKeyByUserId(userId);
      throw new ForbiddenException('Something wrong happened, please relogin!');
    }

    if (keyStoreRefreshToken !== refreshToken) {
      throw new UnauthorizedException('You are not registered!');
    }

    const isFoundUser = await this.userRepository.findOneByEmail(email, {
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        permissions: true,
        status: true,
      },
    });

    if (!isFoundUser) {
      throw new NotFoundException('User not found!');
    }

    const tokens = this.keyTokenService.createTokenPair(
      {
        id: isFoundUser.id,
        email: isFoundUser.email ?? '',
        username: isFoundUser.username,
        fullName: isFoundUser.fullName,
        role: 'super_admin',
        roleScope: 'SYSTEM',
        permissions: [],
        aud: 'access:common',
      },
      {
        id: isFoundUser.id,
        email: isFoundUser.email ?? '',
        keyStoreId: currentKeyStoreId,
        sessionId: '',
        aud: 'refresh:common',
      },
      keyStorePublicKey,
      keyStorePrivateKey,
    );

    const getKeyStore = (await this.keyTokenRepository.findOneById(
      currentKeyStoreId,
      {
        select: {
          id: true,
        },
      },
    )) as { id: string } | null;
    if (!getKeyStore) {
      throw new NotFoundException('Key store not found');
    }

    await this.keyTokenRepository.updateOneById(getKeyStore.id, {
      refreshToken: tokens.refreshToken,
      refreshTokenUsed: [...keyStoreRefreshTokenUsed, refreshToken],
    });

    return {
      user: isFoundUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresInAccessToken: tokens.exp_accessToken,
      expiresInRefreshToken: tokens.exp_refreshToken,
      iatAccessToken: tokens.iat_accessToken,
      iatRefreshToken: tokens.iat_refreshToken,
    };
  }
}

export type FoundUserLogin = Pick<
  Prisma.UserGetPayload<{
    select: {
      id: true;
      username: true;
      fullName: true;
      email: true;
      password: true;
      role: true;
      permissions: true;
      secretOtp: true;
      status: true;
    };
  }>,
  | 'id'
  | 'username'
  | 'fullName'
  | 'email'
  | 'password'
  | 'role'
  | 'permissions'
  | 'secretOtp'
  | 'status'
>;
