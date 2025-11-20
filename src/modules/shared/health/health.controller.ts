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

import { PrismaService } from '@/modules/shared/prisma';
import { MailService } from '@/modules/mail';
import { IoredisHealthIndicator } from '../ioredis';
import { REDIS_CLIENT } from '../ioredis/ioredis.constants';

import type { RedisClient } from '../ioredis/ioredis.provider';
import type { ResponseController } from '@/types/response-controller';

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
    private mailService: MailService,
  ) {}

  /**
   * Check the health of the application
   * @link https://docs.nestjs.com/recipes/terminus#http-healthcheck
   * @returns The health check result
   */
  @Get()
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 10000 } })
  @HealthCheck()
  async check(): Promise<ResponseController<HealthCheckResult>> {
    const result: HealthCheckResult = await this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.prisma.pingCheck('prisma', this.prismaService),
      () => this.ioredis.pingCheck('ioredis', this.redisClient),
      () =>
        this.disk.checkStorage('disk', {
          path: process.platform === 'win32' ? 'C:\\' : '/',
          thresholdPercent: 25 * 1024 * 1024 * 1024, // 25GB
        }),
      () => this.memory.checkHeap('memory_heap', 50 * 1024 * 1024), // 50MB
    ]);

    return {
      message: 'Health check successfully!',
      metadata: result,
    };
  }

  /**
   * Check the health of the email service
   * @returns The health check result
   */
  @Get('email')
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 10000 } })
  async checkEmail(): Promise<ResponseController<boolean>> {
    const result = await this.mailService.checkTransporter();
    return {
      message: 'Email service health check successfully!',
      metadata: result,
    };
  }
}
