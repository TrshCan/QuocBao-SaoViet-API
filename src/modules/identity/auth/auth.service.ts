import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import bcrypt from 'bcrypt';

import { KeyTokenService } from '../key-token';
import { MailService } from '../mail';
import { OtpService } from '../otp';
import { UserRepository } from '../user';
import { IoredisService } from '@/modules/shared/ioredis';

import { KEY_CACHE } from '@/common/constants';
import { encrypt, getInfoData } from '@/utils';

import type { AuthLoginDto } from './dto/auth-login.dto';
import type { EnvConfig } from '@/configs';
import { Prisma } from 'generated/prisma';
import { AccessTokenPayload } from '@/types/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvConfig>,
    private readonly keyTokenService: KeyTokenService,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    private readonly otpService: OtpService,
    private readonly redisService: IoredisService,
  ) {}

  async login(body: AuthLoginDto) {
    const foundUser: FoundUser | null =
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

    const user = getInfoData<FoundUser, 'id' | 'username' | 'email'>({
      fields: ['id', 'username', 'email'],
      object: foundUser,
    });

    return {
      user,
      tempToken,
      expiresIn,
    };
  }

  async verifyOtp() {}

  async handleRefreshToken() {}

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
}

type FoundUser = Pick<
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
