import 'dotenv/config';
import { z } from 'zod';
import { envConfigSchema } from '@/common/validations/env-config';

export type EnvConfig = z.infer<typeof envConfigSchema>;

export const envConfig: EnvConfig = envConfigSchema.parse({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  // JWT - (Remove in future)
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  // TEMP_TOKEN_SECRET
  TEMP_TOKEN_SECRET: process.env.TEMP_TOKEN_SECRET,
  TEMP_TOKEN_EXPIRES_IN: process.env.TEMP_TOKEN_EXPIRES_IN,
  // DEFAULT_SECRET_OTP
  DEFAULT_SECRET_OTP: process.env.DEFAULT_SECRET_OTP,
  // Nodemailer
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
  // Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: process.env.REDIS_DB,
});

console.log(`[${envConfig.NODE_ENV}] envConfig`, envConfig);
