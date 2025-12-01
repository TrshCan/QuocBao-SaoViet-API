import { PrismaNeon } from '@prisma/adapter-neon';
import { envConfig } from '@/configs';

export const prismaNeonStrategy = {
  adapter: new PrismaNeon({
    connectionString: envConfig.DATABASE_URL,
  }),
};
