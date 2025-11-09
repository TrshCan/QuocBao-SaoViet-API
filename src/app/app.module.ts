import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { envConfig } from '../configs/config-env';
import { PrismaModule } from '@/modules/shared/prisma/prisma.module';
import { HealthModule } from '../modules/shared/health/health.module';
import { IoredisModule } from '../modules/shared/ioredis/ioredis.module';

import { envConfigSchema } from '../common/validations/env-config';

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
    PrismaModule,
    IoredisModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
