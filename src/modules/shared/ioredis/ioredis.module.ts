import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { IoredisService } from './ioredis.service';
import { ioredisProvider } from './ioredis.provider';
import { REDIS_CLIENT } from './ioredis.constants';
import { IoredisHealthIndicator } from './ioredis.health';

@Module({
  imports: [ConfigModule, TerminusModule],
  providers: [ioredisProvider, IoredisService, IoredisHealthIndicator],
  exports: [REDIS_CLIENT, IoredisService, IoredisHealthIndicator],
})
export class IoredisModule {}
