import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis, { type RedisOptions } from 'ioredis';

import { EnvConfig } from '@/configs';
import { REDIS_CLIENT } from './ioredis.constants';
import { redisRetryStrategy } from './strategies/ioredis.strategy';

export type RedisClient = Redis;

export const redisOptions = ({
  host,
  port,
  node_env,
}: Pick<
  RedisOptions,
  | 'host'
  | 'port'
  | 'showFriendlyErrorStack'
  | 'lazyConnect'
  | 'commandTimeout'
  | 'retryStrategy'
> & {
  node_env: EnvConfig['NODE_ENV'];
}): RedisOptions => {
  let totalRetryDuration = 0;

  const options: RedisOptions = {
    host,
    port,
    showFriendlyErrorStack: node_env === 'production' ? false : true,
    lazyConnect: true,
    commandTimeout: 1000,
    retryStrategy: (times) => {
      const { delay, retryDuration } = redisRetryStrategy(
        times,
        totalRetryDuration,
      );
      totalRetryDuration = retryDuration;
      return delay;
    },
  };

  return options;
};

export const ioredisProvider: Provider = {
  inject: [ConfigService],
  provide: REDIS_CLIENT,
  useFactory: async (
    configService: ConfigService<EnvConfig>,
  ): Promise<RedisClient> => {
    const host = configService.get<string>('REDIS_HOST') || '127.0.0.1';
    const port = configService.get<number>('REDIS_PORT') || 6379;
    const node_env =
      configService.get<EnvConfig['NODE_ENV']>('NODE_ENV') || 'development';

    const options = redisOptions({ host, port, node_env });
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
