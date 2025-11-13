import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthController } from './health.controller';
import { IoredisModule } from '../ioredis/ioredis.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [TerminusModule, HttpModule, IoredisModule, PrismaModule],
  controllers: [HealthController],
})
export class HealthModule {}
