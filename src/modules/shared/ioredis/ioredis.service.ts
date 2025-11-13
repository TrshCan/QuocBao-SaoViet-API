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

  async findAllByPattern(pattern: string): Promise<string[] | null> {
    return await this.client.keys(pattern);
  }

  async delete(...keys: string[]): Promise<number> {
    return await this.client.del(...keys);
  }

  async existsOne(key: string): Promise<number> {
    return await this.client.exists(key);
  }

  async existsMany(...keys: string[]): Promise<number> {
    return await this.client.exists(...keys);
  }

  async getTTL(key: string): Promise<number> {
    return await this.client.ttl(key);
  }

  async incrementOne(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  async setExpire(key: string, expirationSeconds: number): Promise<number> {
    return await this.client.expire(key, expirationSeconds);
  }
}
