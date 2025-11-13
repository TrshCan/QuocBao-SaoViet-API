import { Module } from '@nestjs/common';

import { OtpService } from './otp.service';
import { IoredisModule } from '@/modules/shared/ioredis/ioredis.module';

@Module({
  imports: [IoredisModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
