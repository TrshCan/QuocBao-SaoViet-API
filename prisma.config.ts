import 'dotenv/config';
import { type PrismaConfig, env } from 'prisma/config';
import path from 'node:path';

type Env = {
  DATABASE_URL: string;
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
    url: env<Env>('DATABASE_URL'),
  },
} satisfies PrismaConfig;
