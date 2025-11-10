import { envConfig } from '@/configs/config-env';
import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaClient } from '@/generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap
{
  constructor() {
    super({
      log: [
        {
          level: 'warn',
          emit: 'event',
        },
        {
          level: 'info',
          emit: 'event',
        },
        {
          level: 'error',
          emit: 'event',
        },
      ],
      errorFormat: envConfig.NODE_ENV === 'production' ? 'minimal' : 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  onApplicationBootstrap() {
    this.$connect()
      .then(() => {
        console.log(
          `[${envConfig.NODE_ENV}] - PrismaService - Connected to database`,
        );
      })
      .catch((error) => {
        console.error(
          `[${envConfig.NODE_ENV}] - PrismaService - Error connecting to database`,
          error,
        );
      });
  }
}
