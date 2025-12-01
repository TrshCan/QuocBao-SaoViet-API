import 'dotenv/config';
import { type PrismaConfig, env } from 'prisma/config';
import path from 'node:path';

type Env = {
  DATABASE_URL: string;
  DIRECT_URL: string;
};

export default {
  schema: path.join('prisma'),
  migrations: {
    path: path.join('prisma', 'migrations'),
    seed: 'tsx src/generated/seed/seed.ts',
  },
  views: {
    path: path.join('prisma', 'views'),
  },
  typedSql: {
    path: path.join('prisma', 'queries'),
  },
  datasource: {
    // If DIRECT_URL is set in the environment staging, use it, otherwise use DATABASE_URL in production
    url: env<Env>('DIRECT_URL') ?? env<Env>('DATABASE_URL'),
  },
} satisfies PrismaConfig;
