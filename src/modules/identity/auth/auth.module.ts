import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { KeyTokenModule } from '@/modules/identity/key-token';
import { MailModule } from '@/modules/identity/mail';
import { PrismaModule } from '@/modules/shared/prisma';
import { OtpModule } from '@/modules/identity/otp';
import { IoredisModule } from '@/modules/shared/ioredis';
@Module({
  imports: [KeyTokenModule, MailModule, PrismaModule, OtpModule, IoredisModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
