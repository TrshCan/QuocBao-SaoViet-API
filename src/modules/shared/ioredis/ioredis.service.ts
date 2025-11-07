import { Inject, Injectable } from '@nestjs/common';

import { REDIS_CLIENT } from './ioredis.constants';
import type { RedisClient } from './ioredis.provider';

@Injectable()
export class IoredisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly client: RedisClient,
  ) {}

  async set(key: string, value: string, expirationSeconds: number) {
    await this.client.set(key, value, 'EX', expirationSeconds);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
