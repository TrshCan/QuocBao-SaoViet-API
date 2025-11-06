import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.url(),
  PORT: z.preprocess(
    (val) => Number(val),
    z.number().int().positive().default(3000),
  ),
});

export type Env = z.infer<typeof envSchema>;
