import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';
import { IoredisService } from '@/modules/shared/ioredis';

import type { Session } from '@/types/session';
import type { DefaultArgs } from '@prisma/client/runtime/client';
import type {
  KeyTokenCreateInput,
  KeyTokenGetPayload,
  KeyTokenSelect,
  KeyTokenUpdateInput,
  KeyTokenWhereInput,
} from '@/generated/prisma/models/KeyToken';

@Injectable()
export class KeyTokenRepository {
  private readonly logger = new Logger(KeyTokenRepository.name);

  constructor(
    private prisma: PrismaService,
    private redisService: IoredisService,
  ) {}

  async findOneById<T extends KeyTokenSelect<DefaultArgs> | undefined>(
    id: string,
    options?: {
      select?: T;
    },
  ) {
    const buildQuery = await this.prisma.keyToken.findFirst({
      where: { id },
      ...options,
    });
    return buildQuery;
  }

  async findOneByUserId<T extends KeyTokenSelect<DefaultArgs> | undefined>(
    userId: string,
    options?: {
      select?: T;
    },
  ) {
    const buildQuery = await this.prisma.keyToken.findFirst({
      where: { userId },
      ...options,
    });
    return buildQuery;
  }

  async findManyByFilter<T extends KeyTokenSelect<DefaultArgs> | undefined>(
    where: KeyTokenWhereInput,
    options?: {
      select?: T;
    },
  ): Promise<KeyTokenGetPayload<{ select: T }>[] | null> {
    const buildQuery = (await this.prisma.keyToken.findMany({
      where,
      ...options,
    })) as KeyTokenGetPayload<{ select: T }>[] | null;
    return buildQuery;
  }

  async createOne<T extends KeyTokenSelect<DefaultArgs> | undefined>(
    data: KeyTokenCreateInput,
    options?: {
      select?: T;
    },
  ): Promise<KeyTokenGetPayload<{ select: T }>> {
    const buildQuery = (await this.prisma.keyToken.create({
      data,
      ...options,
    })) as KeyTokenGetPayload<{ select: T }>;
    return buildQuery;
  }

  async updateOneById<T extends KeyTokenSelect<DefaultArgs> | undefined>(
    id: string,
    data: KeyTokenUpdateInput,
    options?: {
      select?: T;
    },
  ): Promise<KeyTokenGetPayload<{ select: T }>> {
    const buildQuery = (await this.prisma.keyToken.update({
      where: { id },
      data,
      ...options,
    })) as KeyTokenGetPayload<{ select: T }>;
    return buildQuery;
  }

  async updateRefreshTokenById(
    id: string,
    refreshToken: string,
  ): Promise<boolean> {
    const { count } = await this.prisma.keyToken.updateMany({
      where: { id },
      data: { refreshToken },
    });
    return count > 0;
  }

  async deleteById(keyTokenId: string): Promise<boolean> {
    const isDeleted = await this.prisma.keyToken
      .delete({ where: { id: keyTokenId } })
      .catch(() => null);

    return !!isDeleted;
  }
  async deleteByUserId(userId: string): Promise<boolean> {
    const isDeleted = await this.prisma.keyToken
      .deleteMany({ where: { userId } })
      .catch(() => null);
    return !!isDeleted;
  }

  async deleteManyByFilter(where: KeyTokenWhereInput): Promise<boolean> {
    const isDeleted = await this.prisma.keyToken.deleteMany({ where });
    return isDeleted.count > 0 ? true : false;
  }

  deleteKeyStoreCachedByUserId() {}

  // REDIS
  async saveSessionToRedis(
    userId: string,
    sessionData: Session,
  ): Promise<void> {
    const key = `user_sessions:${userId}`;
    const sessionId = `session:${Date.now()}`;

    await this.redisService.hset(key, sessionId, JSON.stringify(sessionData));
    await this.redisService.setExpire(key, 3 * 24 * 60 * 60); // 3 days
  }
}
