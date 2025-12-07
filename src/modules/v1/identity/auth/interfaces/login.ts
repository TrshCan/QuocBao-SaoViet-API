import type { FoundUserLogin } from '../auth.service';

export type LoginResponse = {
  user: Omit<FoundUserLogin, 'password' | 'secretOtp' | 'status'>;
  accessToken: string;
  refreshToken: string;
  expiresInAccessToken: number;
  expiresInRefreshToken: number;
  iatAccessToken: number;
  iatRefreshToken: number;
};
