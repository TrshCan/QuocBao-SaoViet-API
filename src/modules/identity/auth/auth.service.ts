import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

import { KeyTokenRepository, KeyTokenService } from '../key-token';
import { MailService } from '../mail';
import { OtpService } from '../otp';
import { UserRepository } from '../user';
import { IoredisService } from '../../shared/ioredis';

import { KEY_CACHE } from '@/common/constants';
import { decrypt, encrypt, getInfoData, toErrorMessage } from '@/utils';

import { Prisma } from '@generated/prisma';
import type { AuthLoginDto } from './dto/auth-login.dto';
import type { EnvConfig } from '@/configs';
import type { AccessTokenPayload } from '@/types/jwt';
import type { AuthVerifyOtpDto } from './dto/auth-verify-otp.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService<EnvConfig>,
    private readonly keyTokenService: KeyTokenService,
    private readonly keyTokenRepository: KeyTokenRepository,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    private readonly otpService: OtpService,
    private readonly redisService: IoredisService,
  ) {}

  async login(body: AuthLoginDto) {
    const foundUser: FoundUserLogin | null =
      await this.userRepository.findOneByUsername(body.username, {
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          secretOtp: true,
          status: true,
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

    const defaultSecretOtp =
      this.configService.get<string>('DEFAULT_SECRET_OTP');
    if (!defaultSecretOtp) {
      throw new BadRequestException('Default secret OTP is not set');
    }
    const otpCode = this.otpService.generateOtp(
      foundUser.secretOtp ?? defaultSecretOtp,
    );

    const { id: userId } = foundUser;
    const isUserId = userId !== undefined ? userId : '';
    const otpKey = `${KEY_CACHE.OTP}:${isUserId}`;
    const deleteKey = `${KEY_CACHE.OTP}:delete:${isUserId}`;
    const tempUserDataKey = `${KEY_CACHE.TEMP_USER_DATA}:${isUserId}`;

    // Encrypt sensitive OTP data
    const encryptedOtp = encrypt(otpCode);
    const encryptedUserData = encrypt(
      JSON.stringify({
        userId: isUserId,
        email: foundUser.email,
        username: foundUser.username,
      }),
    );

    await Promise.all([
      this.redisService.set(otpKey, encryptedOtp, 60 * 5),
      this.redisService.set(deleteKey, isUserId, 60 * 5),
      this.redisService.set(tempUserDataKey, encryptedUserData, 60 * 5),
    ]);

    const emailStart = Date.now();
    this.mailService
      .sendOtpToEmail(foundUser.username, otpCode, foundUser.email)
      .then(() => {
        const emailDuration = Date.now() - emailStart;
        console.log(
          `[ASYNC] - Login OTP email sent successfully in ${emailDuration}ms`,
        );
      })
      .catch((emailErr) => {
        console.error('[ASYNC] - Email send failed:', emailErr);
      });

    // Create temporary JWT token for OTP verification
    const { tempToken, expiresIn } = this.keyTokenService.createTempToken({
      userId: isUserId,
      email: foundUser.email,
      type: 'login',
    });

    const user = getInfoData<FoundUserLogin, 'id' | 'username' | 'email'>({
      fields: ['id', 'username', 'email'],
      object: foundUser,
    });

    return {
      user,
      tempToken,
      expiresIn,
    };
  }

  async verifyOtp(
    body: AuthVerifyOtpDto & { userId: string; refreshToken?: string },
  ) {
    const { code, userId, refreshToken = '' } = body;
    try {
      if (!userId) {
        throw new UnauthorizedException('User ID is required');
      }
      const otpKey = `${KEY_CACHE.OTP}:${userId}`;
      const encryptedOtp = await this.redisService.get(otpKey);
      if (!encryptedOtp) {
        throw new NotFoundException('OTP not found');
      }
      const otp = decrypt(encryptedOtp);
      if (otp !== code) {
        throw new BadRequestException('OTP is invalid');
      }

      const foundUser = await this.userRepository.findOneById(userId, {
        select: {
          id: true,
          username: true,
          fullName: true,
          email: true,
          role: true,
          permissions: true,
          status: true,
        },
      });
      if (!foundUser) {
        throw new NotFoundException('User not found!');
      }

      // Update user status to 'active'
      // await this.userRepository.updateOneById(userId, { status: 'active' });

      // Generate RSA key pair and create key token in parallel with Redis cleanup
      const parallelStart = Date.now();
      const deleteKey = `${KEY_CACHE.OTP}:delete:${userId}`;
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
        // Clean up Redis keys early (can happen in parallel)
        Promise.all([
          this.redisService.delete(otpKey),
          this.redisService.delete(deleteKey),
        ]).then(() => {
          const cleanupDuration = Date.now() - parallelStart;
          console.log(`[PERF] VerifyOTP.Clean up Redis: ${cleanupDuration}ms`);
        }),
      ]);

      // Create key token (now with generated keys)
      const { publicKey: publicKeyString, keyStoreId } =
        await this.keyTokenService.createKeyToken({
          userId: foundUser.id,
          publicKey: keyPair.publicKey,
          privateKey: keyPair.privateKey,
          refreshToken: refreshToken,
        });

      if (!publicKeyString || !keyStoreId) {
        throw new BadRequestException('Failed to create key token');
      }

      // Generate JWT tokens with proper structure
      const publicKeyObject = crypto.createPublicKey(publicKeyString);
      const publicKeyToString = publicKeyObject.export({
        type: 'spki',
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

      // Clean up temporary Redis data
      const tempUserDataKey = `${KEY_CACHE.TEMP_USER_DATA}:${userId}`;
      await Promise.all([this.redisService.delete(tempUserDataKey)]);

      const userData = getInfoData<
        FoundUserVerifyOtp,
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
    } catch (error) {
      this.logger.error('Error verify OTP:', toErrorMessage(error));
      throw new InternalServerErrorException('Error verify OTP!');
    }
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
    const keyStoreData = await this.keyTokenRepository.findOneById(keyStoreId, {
      select: {
        id: true,
        refreshToken: true,
        refreshTokenUsed: true,
        publicKey: true,
        privateKey: true,
      },
    });

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

    const getKeyStore = await this.keyTokenRepository.findOneById(
      currentKeyStoreId,
      {
        select: {
          id: true,
        },
      },
    );
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

type FoundUserLogin = Pick<
  Prisma.UserGetPayload<{
    select: {
      id: true;
      username: true;
      email: true;
      password: true;
      secretOtp: true;
      status: true;
    };
  }>,
  'id' | 'username' | 'email' | 'password' | 'secretOtp' | 'status'
>;

type FoundUserVerifyOtp = Pick<
  Prisma.UserGetPayload<{
    select: {
      id: true;
      username: true;
      email: true;
      fullName: true;
      role: true;
      permissions: true;
      secretOtp: true;
      status: true;
    };
  }>,
  | 'id'
  | 'username'
  | 'email'
  | 'fullName'
  | 'role'
  | 'permissions'
  | 'secretOtp'
  | 'status'
>;
