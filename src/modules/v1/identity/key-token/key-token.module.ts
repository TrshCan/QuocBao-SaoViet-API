import { Module } from '@nestjs/common';

import { KeyTokenService } from './key-token.service';
import { KeyTokenRepository } from './key-token.repository';

import { IoredisModule } from '@/modules/shared/ioredis';

@Module({
  imports: [IoredisModule],
  providers: [KeyTokenService, KeyTokenRepository],
  exports: [KeyTokenService, KeyTokenRepository],
})
export class KeyTokenModule {}
