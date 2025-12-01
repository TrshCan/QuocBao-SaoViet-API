import { envConfig } from '@/configs/config-env';
import { PrismaPg } from '@prisma/adapter-pg';

export const prismaLocalStrategy = {
  adapter: new PrismaPg({
    connectionString: envConfig.DATABASE_URL,
  }),
};
