import { z } from 'zod';

export const envConfigSchema = z.object({
  // Environment (development, production, test)
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // Port
  PORT: z.coerce.number().int().positive().default(3000),
  // CORS
  CORS_ORIGIN: z.string(),
  // TEMPORARY JWT
  TEMP_TOKEN_SECRET: z.string(),
  TEMP_TOKEN_EXPIRES_IN: z.coerce
    .number()
    .int()
    .positive()
    .default(5 * 60),
  // Default secret OTP
  DEFAULT_SECRET_OTP: z.string(),
  // CSRF
  CSRF_SECRET: z.string().min(32),
  // Encyption default
  ENCRYPTION_KEY: z.string(),
  ENCRYPTION_IV_LENGTH: z.coerce.number().int().positive().default(16),
  // Database (PostgreSQL)
  DATABASE_URL: z.url(),
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().optional().default(''),
  REDIS_DB: z.coerce.number().int().positive().default(0),
});
