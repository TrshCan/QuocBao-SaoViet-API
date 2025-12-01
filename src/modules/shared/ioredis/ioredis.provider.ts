import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

import { EnvConfig } from '@/configs';
import { REDIS_CLIENT } from './ioredis.constants';
import { getSimpleIoredisProvider } from './factories/ioredis-provider.factory';
import { SystemDatabaseProvider as SystemDatabaseProviderEnum } from '@/common/enums';

export type RedisClient = Redis;

export const ioredisProvider: Provider = {
  inject: [ConfigService],
  provide: REDIS_CLIENT,
  useFactory: async (
    configService: ConfigService<EnvConfig>,
  ): Promise<RedisClient> => {
    const node_env =
      configService.get<EnvConfig['NODE_ENV']>('NODE_ENV') || 'development';
    const type =
      configService.get<EnvConfig['SYSTEM_DATABASE_PROVIDER_REDIS']>(
        'SYSTEM_DATABASE_PROVIDER_REDIS',
      ) || SystemDatabaseProviderEnum.LOCAL;

    const host = configService.get<string>('REDIS_HOST') || '127.0.0.1';
    const port = configService.get<number>('REDIS_PORT') || 6379;
    const password = configService.get<string>('REDIS_PASSWORD') || '';
    const username = configService.get<string>('REDIS_USERNAME') || '';

    const options = getSimpleIoredisProvider({
      type,
      host,
      port,
      node_env,
      password,
      username,
    });
    const client = new Redis(options);

    // Handling when redis server is down and the application starts
    client.on('error', function (e) {
      console.error(`REDIS: Error connecting: "${e}"`);
    });

    try {
      await client?.connect?.();
    } catch (error) {
      console.error(`REDIS: Failed to connect: ${error}`);
    }

    return client;
  },
};
