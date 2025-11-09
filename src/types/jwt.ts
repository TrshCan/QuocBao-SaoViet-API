/**
 * @description Registered Claim Names
 * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
 */
import { JwtPayload } from 'jsonwebtoken';

export interface RefreshTokenPayload
  extends Pick<JwtPayload, 'aud' | 'exp' | 'iat'> {
  keyStoreId: string;
  userId: string;
  email: string;
  sessionId?: string; // optional to tracking multiple devices
}
