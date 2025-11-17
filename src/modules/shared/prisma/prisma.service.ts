import { envConfig } from '@/configs/config-env';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
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
    console.log(
      `[${envConfig.NODE_ENV}] - PrismaService - Connected to database`,
    );
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(
      `[${envConfig.NODE_ENV}] - PrismaService - Disconnected from database`,
    );
  }
}
