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

import {
  AUTHORIZATION,
  CLIENT_ID,
  KEY_CACHE,
  VALUE_TOKEN,
} from '@/common/constants';

import type { AccessTokenPayload, KeyStoreForJWT } from '@/types/jwt';
import { PUBLIC_KEY } from '../decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthenticateGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthenticateGuard.name);

  constructor(
    private readonly keyTokenService: KeyTokenService,
    private readonly redisService: IoredisService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    try {
      const request = context.switchToHttp().getRequest<Request>();
      const userId = requireHeader(request, CLIENT_ID);
      const authHeader = requireHeader(request, AUTHORIZATION);
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

      console.log('[JwtAuthenticateGuard] decodedUser:', decodedUser);

      this.keyTokenService.validateToken<AccessTokenPayload>(
        { ...decodedUser, iat: decodedUser.iat ?? 0 },
        VALUE_TOKEN.MAX_AGE_ACCESS_TOKEN,
      );

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
