import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthController } from './health.controller';
// import { IoredisModule } from '../ioredis/ioredis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheManagerModule } from '../cache-manager';
import { IoredisModule } from '../ioredis';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    PrismaModule,
    CacheManagerModule,
    HealthModule,
    IoredisModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
