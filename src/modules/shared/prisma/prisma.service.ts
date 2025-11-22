import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvConfig, envConfig } from '@/configs/config-env'
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService<EnvConfig>) {
    super({
      adapter: new PrismaPg({
        connectionString:
          configService.get<EnvConfig['DATABASE_URL']>('DATABASE_URL'),
      }),
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
    })
  }

  async onModuleInit() {
    await this.$connect()
    console.log(
      `[${envConfig.NODE_ENV}] - PrismaService - Connected to database`,
    )
  }

  async onModuleDestroy() {
    await this.$disconnect()
    console.log(
      `[${envConfig.NODE_ENV}] - PrismaService - Disconnected from database`,
    )
  }
}
