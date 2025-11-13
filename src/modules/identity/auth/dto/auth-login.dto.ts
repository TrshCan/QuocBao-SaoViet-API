import { z } from 'zod';
import { authLoginSchema } from '../validations/auth-login-schema';

export type AuthLoginDto = z.infer<typeof authLoginSchema>;
