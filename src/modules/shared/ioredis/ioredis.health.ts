import { Injectable } from '@nestjs/common';
import {
  HealthIndicatorService,
  type HealthIndicatorResult,
} from '@nestjs/terminus';

import { RedisClient } from './ioredis.provider';

export interface IoredisPingCheckSettings {
  /**
   * The amount of time the check should require in ms
   */
  timeout?: number;
}

/**
 * Executes a promise in the given timeout. If the promise
 * does not finish in the given timeout, it will raise a TimeoutError
 */
function promiseTimeout<T>(ms: number, promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout of ${ms}ms exceeded`)), ms),
    ),
  ]);
}

/**
 * The IoredisHealthIndicator contains health indicators
 * which are used for health checks related to Redis (ioredis)
 *
 * @publicApi
 * @module TerminusModule
 */
@Injectable()
export class IoredisHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}

  private async pingRedis(
    timeout: number,
    redisClient: RedisClient,
  ): Promise<void> {
    await promiseTimeout(timeout, redisClient.ping());
  }

  /**
   * Checks if Redis responds in (default) 1000ms and
   * returns a result object corresponding to the result
   *
   * @param key The key which will be used for the result object
   * @param redisClient RedisClient (ioredis instance)
   * @param options The options for the ping
   */
  async pingCheck<Key extends string = string>(
    key: Key,
    redisClient: RedisClient,
    options?: IoredisPingCheckSettings,
  ): Promise<HealthIndicatorResult<Key>> {
    const timeout = options?.timeout ?? 1000;

    try {
      await this.pingRedis(timeout, redisClient);
      return this.healthIndicatorService.check(key).up();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return this.healthIndicatorService.check(key).down({ message });
    }
  }
}
