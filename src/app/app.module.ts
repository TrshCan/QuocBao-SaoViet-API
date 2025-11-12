import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard, seconds } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { envConfig, uploadDir } from '@/configs';

import { envConfigSchema } from '@/common/validations/env-config';
import { KEY_THROTTLER } from '@/common/constants';

import { AuthModule } from '@/modules/identity';
import { PrismaModule, HealthModule, IoredisModule } from '@/modules/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => {
        const result = envConfigSchema.safeParse(config);
        if (!result.success) {
          throw new Error(result.error.message);
        }
        return result.data;
      },
      isGlobal: true,
      envFilePath: '.env',
      load: [() => envConfig],
      cache: envConfig.NODE_ENV === 'production' ? true : false,
    }),
    ThrottlerModule.forRoot([
      {
        name: KEY_THROTTLER.SHORT,
        ttl: seconds(1),
        limit: 3,
      },
      {
        name: KEY_THROTTLER.MEDIUM,
        ttl: seconds(10),
        limit: 20,
      },
      {
        name: KEY_THROTTLER.LONG,
        ttl: seconds(60),
        limit: 100,
      },
    ]),
    MulterModule.register({
      dest: `../../${uploadDir[0]}`,
    }),
    PrismaModule,
    IoredisModule,
    HealthModule,
    AuthModule,
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
