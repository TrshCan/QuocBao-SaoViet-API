import 'dotenv/config';
import { z } from 'zod';

export const envConfigSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.url(),
  CORS_ORIGIN: z.string(),
});

export type EnvConfig = z.infer<typeof envConfigSchema>;
export const envConfig: EnvConfig = envConfigSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
});

console.log(`[${envConfig.NODE_ENV}] envConfig`, envConfig);
