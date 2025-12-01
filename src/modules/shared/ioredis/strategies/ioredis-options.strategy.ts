import { RedisOptions } from 'ioredis';

import { EnvConfig } from '@/configs/config-env';

import { redisRetryStrategy } from './ioredis.strategy';

export const redisOptionsLocal = ({
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

export const redisOptionsCloud = ({
  host,
  port,
  password,
  username,
  node_env,
}: Pick<
  RedisOptions,
  | 'host'
  | 'port'
  | 'password'
  | 'username'
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
    password,
    username,
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
