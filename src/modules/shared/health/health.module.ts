import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthController } from './health.controller';
import { IoredisModule } from '../ioredis';
import { MailModule } from '@/modules/v1/mail';

@Module({
  imports: [TerminusModule, HttpModule, IoredisModule, MailModule],
  controllers: [HealthController],
})
export class HealthModule {}
