import type { Request } from 'express';
import { KeyStoreForJWT } from '@/types/jwt';
import { AccessTokenPayload, RefreshTokenPayload } from '@/types/jwt';

export const setAccessUser = (
  req: Request,
  keyStore: KeyStoreForJWT,
  user: AccessTokenPayload,
  refreshToken?: string,
): void => {
  req.keyStore = keyStore;
  req.user = user;
  if (refreshToken) {
    req.refreshToken = refreshToken;
  }
};

export const setRefreshUser = (
  req: Request,
  keyStore: KeyStoreForJWT,
  user: RefreshTokenPayload,
  refreshToken: string,
): void => {
  req.keyStore = keyStore;
  req.refresh = user;
  req.refreshToken = refreshToken;
};
