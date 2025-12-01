import 'dotenv/config';
import { z } from 'zod';
import { envConfigSchema } from '@/common/validations/env-config';

export type EnvConfig = z.infer<typeof envConfigSchema>;

export const envConfig: EnvConfig = envConfigSchema.parse({
  // Environment (development, production, test)
  NODE_ENV: process.env.NODE_ENV || 'development',

  API_BASE_URL: process.env.API_BASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,

  // SMTP
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,

  // Port
  PORT: process.env.PORT,

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN,

  // TEMPORARY JWT
  TEMP_REFRESH_TOKEN_SECRET: process.env.TEMP_REFRESH_TOKEN_SECRET,
  TEMP_TOKEN_SECRET: process.env.TEMP_TOKEN_SECRET,
  TEMP_TOKEN_EXPIRES_IN: process.env.TEMP_TOKEN_EXPIRES_IN,
  // Public key for creation JWT
  PUBLIC_KEY_TYPE: process.env.PUBLIC_KEY_TYPE,

  // CSRF
  CSRF_SECRET: process.env.CSRF_SECRET,

  // Encyption default
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  ENCRYPTION_IV_LENGTH: process.env.ENCRYPTION_IV_LENGTH,

  // Database provider (PostgreSQL)
  SYSTEM_DATABASE_PROVIDER_POSTGRES:
    process.env.SYSTEM_DATABASE_PROVIDER_POSTGRES,
  // Database provider (Redis)
  SYSTEM_DATABASE_PROVIDER_REDIS: process.env.SYSTEM_DATABASE_PROVIDER_REDIS,

  // Database (PostgreSQL)
  DATABASE_URL: process.env.DATABASE_URL,
  // Direct URL for Neon database (non-pooling)
  DIRECT_URL: process.env.DIRECT_URL,

  // Database (Redis)
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME || '',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  REDIS_DB: process.env.REDIS_DB,
});

console.log(`[${envConfig.NODE_ENV}] envConfig`, envConfig);
