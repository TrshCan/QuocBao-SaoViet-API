import { z } from 'zod/v4';
import { SystemDatabaseProvider as SystemDatabaseProviderEnum } from '../enums';

export const envConfigSchema = z.object({
  // Environment (development, production, test)
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // Application
  APP_NAME: z.string().default('SAOVIET'),
  // API Base URL
  API_BASE_URL: z.string(),
  CLIENT_URL: z.string(),
  DEMO_USERNAME: z.string(),
  DEMO_PASSWORD: z.string(),
  // SMTP (optional - leave empty if not needed)
  SMTP_HOST: z.string().optional().default(''),
  SMTP_PORT: z.preprocess(
    (val) => (val === '' || val === undefined ? undefined : val),
    z.coerce.number().int().positive().optional().default(587),
  ),
  SMTP_USER: z.string().optional().default(''),
  SMTP_PASS: z.string().optional().default(''),
  SMTP_FROM: z.string().optional().default(''),
  // Port
  PORT: z.coerce.number().int().positive().default(3000),
  // CORS
  CORS_ORIGIN: z.string(),
  // TEMPORARY JWT
  TEMP_REFRESH_TOKEN_SECRET: z.string(),
  TEMP_TOKEN_SECRET: z.string(),
  TEMP_TOKEN_EXPIRES_IN: z.coerce
    .number()
    .int()
    .positive()
    .default(5 * 60),
  // Public key for creation JWT: "pkcs1" | "spki" | "pkcs8" | "sec1"
  PUBLIC_KEY_TYPE: z.enum(['pkcs1', 'spki', 'pkcs8', 'sec1']).default('spki'),
  // CSRF
  CSRF_SECRET: z.string().min(32),
  // Encyption default
  ENCRYPTION_KEY: z.string(),
  ENCRYPTION_IV_LENGTH: z.coerce.number().int().positive().default(16),
  // Database provider (neon, local)
  SYSTEM_DATABASE_PROVIDER_POSTGRES: z
    .enum([SystemDatabaseProviderEnum.NEON, SystemDatabaseProviderEnum.LOCAL])
    .default(SystemDatabaseProviderEnum.LOCAL),
  SYSTEM_DATABASE_PROVIDER_REDIS: z
    .enum([
      SystemDatabaseProviderEnum.REDIS_CLOUD,
      SystemDatabaseProviderEnum.LOCAL,
    ])
    .default(SystemDatabaseProviderEnum.LOCAL),
  // Database (PostgreSQL)
  DATABASE_URL: z.url(),
  // Direct URL for Neon database (non-pooling)
  // DIRECT_URL: z.url().optional().nullable(),
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_USERNAME: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().int().nonnegative().default(0),
});