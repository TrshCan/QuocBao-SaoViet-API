import { SystemDatabaseProvider as SystemDatabaseProviderEnum } from '@/common/enums';
import { SystemDatabaseProviderTypes } from '../../prisma/factories/prisma.factory';
import {
  redisOptionsCloud,
  redisOptionsLocal,
} from '../strategies/ioredis-options.strategy';
import { EnvConfig } from '@/configs/config-env';

export const getSimpleIoredisProvider = ({
  type,
  host,
  port,
  password,
  username,
  node_env,
}: {
  type: SystemDatabaseProviderTypes;
  host: string;
  port: number;
  password: string;
  username: string;
  node_env: EnvConfig['NODE_ENV'];
}) => {
  switch (type) {
    case SystemDatabaseProviderEnum.REDIS_CLOUD:
      return redisOptionsCloud({ host, port, password, username, node_env });
    case SystemDatabaseProviderEnum.LOCAL:
      return redisOptionsLocal({ host, port, node_env });
    default:
      return redisOptionsLocal({ host, port, node_env });
  }
};
