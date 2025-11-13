import { Injectable } from '@nestjs/common';
import { totp } from 'otplib';

import { IoredisService } from '@/modules/shared/ioredis/ioredis.service';

@Injectable()
export class OtpService {
  constructor(private readonly ioredisService: IoredisService) {}

  generateOtp(secret: string) {
    totp.options = {
      step: 5 * 60, // 5 minutes
      window: 1, // allow 1 step (5 minutes before/after)
      epoch: Math.floor(Date.now() / 1000), // current time (seconds)
    };
    return totp.generate(secret);
  }
}
