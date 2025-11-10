import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import ms from 'ms';

import { EnvConfig } from '@/configs/config-env';

import { KeyTokenService } from './key-token.service';
import { KeyTokenRepository } from './key-token.repository';

import { PrismaModule } from '@/modules/shared/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvConfig>) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<ms.StringValue>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [KeyTokenService, KeyTokenRepository],
  exports: [KeyTokenService, KeyTokenRepository],
})
export class KeyTokenModule {}
