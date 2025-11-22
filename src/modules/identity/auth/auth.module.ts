import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { KeyTokenModule } from '@/modules/identity/key-token';
import { OtpModule } from '@/modules/identity/otp';
import { IoredisModule } from '@/modules/shared/ioredis';
import { UserModule } from '@/modules/identity/user';
import { httpModuleConfig } from '@/configs';
import { MailModule } from '@/modules/mail';
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
