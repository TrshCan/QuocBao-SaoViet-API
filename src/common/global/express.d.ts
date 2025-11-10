import 'express';

import {
  AccessTokenPayload,
  KeyStoreForJWT,
  RefreshTokenPayload,
  TempTokenPayload,
} from '@/types/jwt';

declare global {
  namespace Express {
    interface Request {
      keyStore: KeyStoreForJWT;

      user: AccessTokenPayload;
      refresh: RefreshTokenPayload;
      refreshToken?: string;

      tempTokenPayload?: TempTokenPayload;
      userId?: string;

      resource?: any; // For resource ownership validation
      changeReason?: string; // For audit trail
      auditAction?: string; // For audit logging

      apiKey: {
        keyId: string;
        owner: string;
        scopes: string[];
      };

      // For rate limit
      rateLimitKey?: string;

      // For file
      file?: Express.Multer.File;
    }
  }
}
