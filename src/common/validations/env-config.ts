import { z } from 'zod';

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
  // SMTP
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
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
  // Database (PostgreSQL)
  DATABASE_URL: z.url(),
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  // REDIS_USERNAME: z.string().optional(),
  // REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().int().positive().default(0),
});
