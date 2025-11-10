import {
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';

import type { Request } from 'express';

import { handleBearerToken, requireHeader } from '@/utils';

import { KeyTokenService } from '@/modules/identity/key-token';

import { AUTHORIZATION, CLIENT_ID } from '@/common/constants';

@Injectable()
export class JwtAuthenticateTemporaryGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthenticateTemporaryGuard.name);

  constructor(private readonly keyTokenService: KeyTokenService) {}
  canActivate(context: ExecutionContext) {
    // Extract Authorization header
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const userId = requireHeader(request, CLIENT_ID.toString());
      const authHeader = requireHeader(request, AUTHORIZATION.toString());
      const tempToken = handleBearerToken(authHeader);
      // Verify and decode temp token
      const decoded = this.keyTokenService.verifyTempToken(tempToken);

      // Validate that userId in body matches token
      if (userId && userId !== decoded.userId) {
        throw new UnauthorizedException('Token does not match user ID');
      }

      // Attach temp token payload to request for use in controller
      request.tempTokenPayload = decoded;
      request.userId = decoded.userId;
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
