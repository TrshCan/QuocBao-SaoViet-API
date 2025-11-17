import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import type { Request } from 'express';

import { KeyTokenService } from '@/modules/identity/key-token';
import { IoredisService } from '@/modules/shared/ioredis';

import {
  handleBearerToken,
  requireHeader,
  setAccessUser,
  validateUserId,
} from '@/utils';
import { KeyStoreForJWT } from '@/types/jwt';

import { AUTHORIZATION, CLIENT_ID, KEY_CACHE } from '@/common/constants';

import type { AccessTokenPayload } from '@/types/jwt';

@Injectable()
export class JwtAuthenticateGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthenticateGuard.name);

  constructor(
    private readonly keyTokenService: KeyTokenService,
    private readonly redisService: IoredisService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const userId = requireHeader(request, CLIENT_ID);
      const authHeader = requireHeader(request, AUTHORIZATION.toString());
      const accessToken = handleBearerToken(authHeader);
      // Check token in blacklist
      const blacklist = await this.redisService.existsOne(
        `${KEY_CACHE.BLACKLIST}:${accessToken}`,
      );
      if (blacklist)
        throw new UnauthorizedException(
          'Token is blacklisted. Please login again.',
        );

      // Get key store for user
      const keyStore: KeyStoreForJWT =
        await this.keyTokenService.requireKeyStore(userId);

      const decodedUser = this.keyTokenService.verifyJWT(
        accessToken,
        keyStore.publicKey,
      ) as AccessTokenPayload;

      validateUserId(userId, decodedUser.id);

      setAccessUser(request, keyStore, decodedUser);

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error('Error authenticate:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
