import { ConsoleLogger, NestApplicationOptions } from '@nestjs/common';
import { envConfig } from './config-env';

export const applicationConfig: NestApplicationOptions = {
  logger:
    envConfig.NODE_ENV === 'production'
      ? false
      : new ConsoleLogger({
          prefix: 'SaovietAPI',
          logLevels: ['error', 'warn', 'log', 'verbose', 'debug'],
        }),
};
