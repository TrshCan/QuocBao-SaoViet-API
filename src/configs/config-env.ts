import 'dotenv/config';
import { z } from 'zod';
import { envConfigSchema } from '@/common/validations/env-config';

export type EnvConfig = z.infer<typeof envConfigSchema>;

export const envConfig: EnvConfig = envConfigSchema.parse({
  // Environment (development, production, test)
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Port
  PORT: process.env.PORT,

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN,

  // TEMPORARY JWT
  TEMP_TOKEN_SECRET: process.env.TEMP_TOKEN_SECRET,
  TEMP_TOKEN_EXPIRES_IN: process.env.TEMP_TOKEN_EXPIRES_IN,

  // Default secret OTP
  DEFAULT_SECRET_OTP: process.env.DEFAULT_SECRET_OTP,

  // CSRF
  CSRF_SECRET: process.env.CSRF_SECRET,

  // Encyption default
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  ENCRYPTION_IV_LENGTH: process.env.ENCRYPTION_IV_LENGTH,

  // Database (PostgreSQL)
  DATABASE_URL: process.env.DATABASE_URL,

  // Database (Redis - for future use)
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: process.env.REDIS_DB,
});

console.log(`[${envConfig.NODE_ENV}] envConfig`, envConfig);
