import { z } from 'zod';

export const envConfigSchema = z.object({
  // Environment (development, production, test)
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // API Base URL
  API_BASE_URL: z.string(),
  // Port
  PORT: z.coerce.number().int().positive().default(3000),
  // CORS
  CORS_ORIGIN: z.string(),
  // TEMPORARY JWT
  TEMP_REFRESH_TOKEN_SECRET: z.string(),
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
  REDIS_USERNAME: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().int().positive().default(0),
});
