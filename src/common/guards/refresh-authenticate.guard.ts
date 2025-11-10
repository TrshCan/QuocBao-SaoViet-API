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
import { CLIENT_ID, REFRESH_TOKEN } from '../constants';
import { requireHeader, setRefreshUser, validateUserId } from '@/utils';
import { RefreshTokenPayload } from '@/types/jwt';

@Injectable()
export class JwtRefreshAuthenticateGuard implements CanActivate {
  private readonly logger = new Logger(JwtRefreshAuthenticateGuard.name);

  constructor(private readonly keyTokenService: KeyTokenService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    try {
      const userId = requireHeader(request, CLIENT_ID.toString());
      const refreshToken = requireHeader(request, REFRESH_TOKEN.toString());

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token is required!');
      }

      if (!userId) {
        throw new UnauthorizedException('User ID is required!');
      }

      const keyStore = await this.keyTokenService.requireKeyStore(userId);
      const decodedUser = this.keyTokenService.verifyJWT(
        refreshToken,
        keyStore.privateKey,
      ) as RefreshTokenPayload;
      validateUserId(userId, decodedUser.id);

      setRefreshUser(request, keyStore, decodedUser, refreshToken);
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
