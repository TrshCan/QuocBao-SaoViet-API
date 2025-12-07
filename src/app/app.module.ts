import { Module } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from '@/infrastructures/events';
import { MulterModule } from '@/infrastructures/storages';
import { ThrottlerModule } from '@/infrastructures/throttler';
import { ConfigModule } from '@/infrastructures/config';

// VERSION_NEUTRAL Module
import { PrismaModule, HealthModule, IoredisModule } from '@/modules/shared';

// V1 Modules
import { appModuleMetadataV1 } from './app-module-metadata.v1';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule,
    MulterModule,
    EventsModule,
    PrismaModule,
    IoredisModule,
    HealthModule,
    // V1 Modules
    ...(appModuleMetadataV1.imports || []),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
