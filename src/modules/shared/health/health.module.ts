import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthController } from './health.controller';
import { IoredisModule } from '../ioredis';

@Module({
  imports: [TerminusModule, HttpModule, IoredisModule],
  controllers: [HealthController],
})
export class HealthModule {}
