import { z } from 'zod/v4';

export const requestAuthLoginSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  password: z.string().min(1, 'Password is required').trim(),
});

export const responseAuthLoginSchema = z.object({
  user: z.object({
    id: z.string().min(1, 'ID is required'),
    username: z.string().min(1, 'Username is required'),
    fullName: z.string().min(1, 'Full name is required'),
    email: z.email('Email is required'),
    role: z.string().min(1, 'Role is required'),
    permissions: z.array(z.string()).optional(),
  }),
  accessToken: z.string().min(1, 'Access token is required'),
  refreshToken: z.string().min(1, 'Refresh token is required'),
  expiresInAccessToken: z
    .number()
    .min(1, 'Expires in access token is required'),
  expiresInRefreshToken: z
    .number()
    .min(1, 'Expires in refresh token is required'),
});
