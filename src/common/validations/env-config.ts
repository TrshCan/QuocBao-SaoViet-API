import { z } from 'zod';

export const envConfigSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.url(),
  CORS_ORIGIN: z.string(),
  // JWT - (Remove in future)
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
  // TEMP_TOKEN_SECRET
  TEMP_TOKEN_SECRET: z.string(),
  TEMP_TOKEN_EXPIRES_IN: z.coerce
    .number()
    .int()
    .positive()
    .default(5 * 60),
  // DEFAULT_SECRET_OTP
  DEFAULT_SECRET_OTP: z.string(),
  // Nodemailer
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().int(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().optional().default(''),
  REDIS_DB: z.coerce.number().int().positive().default(0),
});
