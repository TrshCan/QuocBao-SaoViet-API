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
  password,
  node_env,
}: Pick<RedisOptions, 'host' | 'port' | 'password'> & {
  node_env: EnvConfig['NODE_ENV'];
}): RedisOptions => {
  let totalRetryDuration = 0;

  return {
    host,
    port,
    password,
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
};

export const ioredisProvider: Provider = {
  useFactory: (configService: ConfigService<EnvConfig>): RedisClient => {
    const host = configService.get<string>('REDIS_HOST');
    const port = configService.get<number>('REDIS_PORT');
    const password = configService.get<string>('REDIS_PASSWORD');
    const node_env =
      configService.get<EnvConfig['NODE_ENV']>('NODE_ENV') || 'development';

    const options = redisOptions({ host, port, password, node_env });
    const redis = new Redis(options);

    // Handle connection errors - stop retrying on auth errors
    redis.on('error', (error) => {
      const errorMessage = error.message.toLowerCase();
      console.log('[ioredis] Redis error:', errorMessage);
      // Stop retrying on authentication errors
      if (
        errorMessage.includes('wrongpass') ||
        errorMessage.includes('noauth') ||
        errorMessage.includes('invalid username-password')
      ) {
        console.error('[ioredis] Error:', error.message);
        // Disable retry strategy for auth errors
        redis.disconnect();
        return;
      }

      // Only log other errors (not connection errors that will be retried)
      if (
        !errorMessage.includes('econnrefused') &&
        !errorMessage.includes('etimedout')
      ) {
        console.error('[ioredis] Connection error:', error.message);
      }
    });

    redis.on('connect', () => {
      console.log('[ioredis] Redis client connected');
    });

    redis.on('ready', () => {
      console.log('[ioredis] Redis client ready and authenticated');
    });

    redis.on('close', () => {
      console.log('[ioredis] Redis client connection closed');
    });

    redis.on('reconnecting', (delay: number) => {
      console.log(`[ioredis] Redis client reconnecting in ${delay}ms`);
    });

    return redis;
  },
  inject: [ConfigService],
  provide: REDIS_CLIENT,
};
