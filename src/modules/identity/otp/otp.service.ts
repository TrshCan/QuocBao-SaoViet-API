import { Injectable } from '@nestjs/common';
import { totp } from 'otplib';

@Injectable()
export class OtpService {
  generateOtp(secret: string) {
    totp.options = {
      step: 5 * 60, // 5 minutes
      window: 1, // allow 1 step (5 minutes before/after)
      epoch: Math.floor(Date.now() / 1000), // current time (seconds)
    };
    return totp.generate(secret);
  }
}
