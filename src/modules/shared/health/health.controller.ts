import { Controller, Get, Inject } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
  type HealthCheckResult,
} from '@nestjs/terminus';

import { KEY_THROTTLER } from '@/common/constants';

import { PrismaService } from '@/modules/shared/prisma/prisma.service';
import { CacheManagerHealthIndicator } from '@/modules/shared/cache-manager';
import type { ResponseController } from '@/types/response-controller';
import { IoredisHealthIndicator } from '../ioredis';
import type { RedisClient } from '../ioredis/ioredis.provider';
import { REDIS_CLIENT } from '../ioredis/ioredis.constants';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly ioredis: IoredisHealthIndicator,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
    private prisma: PrismaHealthIndicator,
    private prismaService: PrismaService,
    private cacheManager: CacheManagerHealthIndicator,
  ) {}

  /**
   * Check the health of the application
   * @link https://docs.nestjs.com/recipes/terminus#http-healthcheck
   * @returns The health check result
   */
  @Get()
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 10000 } })
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.prisma.pingCheck('prisma', this.prismaService),
      () => this.ioredis.pingCheck('ioredis', this.redisClient),
      () => this.cacheManager.isHealthy('redis-cache'),
      // () =>
      //   this.disk.checkStorage('disk', {
      //     path: process.platform === 'win32' ? 'C:\\' : '/',
      //     thresholdPercent: 25 * 1024 * 1024 * 1024, // 25GB
      //   }),
      // () => this.memory.checkHeap('memory_heap', 50 * 1024 * 1024), // 50MB
    ]);
  }

  @Get('/redis')
  async checkRedis(): Promise<ResponseController<{ redis: string }>> {
    const ok = await this.cacheManager.checkRedis();
    return {
      metadata: { redis: ok ? 'UP' : 'DOWN' },
      message: ok ? 'Redis is healthy' : 'Redis is not healthy',
    };
  }
}
