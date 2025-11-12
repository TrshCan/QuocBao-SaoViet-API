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
import { REDIS_CLIENT } from '@/modules/shared/ioredis/ioredis.constants';
import { IoredisHealthIndicator } from '@/modules/shared/ioredis/ioredis.health';
import type { RedisClient } from '@/modules/shared/ioredis/ioredis.provider';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private ioredis: IoredisHealthIndicator,
    private prismaService: PrismaService,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
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
      () =>
        this.disk.checkStorage('disk', {
          path: '/',
          thresholdPercent: 25 * 1024 * 1024 * 1024, // 25GB
        }),
      () => this.memory.checkHeap('memory_heap', 50 * 1024 * 1024), // 50MB
    ]);
  }
}
