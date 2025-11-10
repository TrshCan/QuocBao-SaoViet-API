import { z } from 'zod';
import { authVerifyOtpSchema } from '../validations/auth-verify-otp-schema';

export type AuthVerifyOtpDto = z.infer<typeof authVerifyOtpSchema>;
