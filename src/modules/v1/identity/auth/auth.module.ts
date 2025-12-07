import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { KeyTokenModule } from '@/modules/v1/identity/key-token';
import { OtpModule } from '@/modules/v1/identity/otp';
import { IoredisModule } from '@/modules/shared/ioredis';
import { UserModule } from '@/modules/v1/identity/user';
import { httpModuleConfig } from '@/configs';
import { MailModule } from '@/modules/v1/mail';

@Module({
  imports: [
    HttpModule.register(httpModuleConfig),
    KeyTokenModule,
    UserModule,
    OtpModule,
    IoredisModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
