import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';
import { Prisma } from '@generated/prisma';
import { DefaultArgs } from '@generated/prisma/runtime/library';

@Injectable()
export class KeyTokenRepository {
  constructor(private prisma: PrismaService) {}

  async findOneById<T extends Prisma.KeyTokenSelect<DefaultArgs> | undefined>(
    id: string,
    options?: {
      select?: T;
    },
  ): Promise<Prisma.KeyTokenGetPayload<{ select: T }> | null> {
    const buildQuery = (await this.prisma.keyToken.findFirst({
      where: { id },
      ...options,
    })) as Prisma.KeyTokenGetPayload<{ select: T }> | null;
    return buildQuery;
  }

  async findOneByUserId<
    T extends Prisma.KeyTokenSelect<DefaultArgs> | undefined,
  >(
    userId: string,
    options?: {
      select?: T;
    },
  ): Promise<Prisma.KeyTokenGetPayload<{ select: T }> | null> {
    const buildQuery = (await this.prisma.keyToken.findFirst({
      where: { userId },
      ...options,
    })) as Prisma.KeyTokenGetPayload<{ select: T }> | null;
    return buildQuery;
  }

  async findManyByFilter<
    T extends Prisma.KeyTokenSelect<DefaultArgs> | undefined,
  >(
    where: Prisma.KeyTokenWhereInput,
    options?: {
      select?: T;
    },
  ): Promise<Prisma.KeyTokenGetPayload<{ select: T }>[] | null> {
    const buildQuery = (await this.prisma.keyToken.findMany({
      where,
      ...options,
    })) as Prisma.KeyTokenGetPayload<{ select: T }>[] | null;
    return buildQuery;
  }

  async createOne<T extends Prisma.KeyTokenSelect<DefaultArgs> | undefined>(
    data: Prisma.KeyTokenCreateInput,
    options?: {
      select?: T;
    },
  ): Promise<Prisma.KeyTokenGetPayload<{ select: T }>> {
    const buildQuery = (await this.prisma.keyToken.create({
      data,
      ...options,
    })) as Prisma.KeyTokenGetPayload<{ select: T }>;
    return buildQuery;
  }

  async updateOneById<T extends Prisma.KeyTokenSelect<DefaultArgs> | undefined>(
    id: string,
    data: Prisma.KeyTokenUpdateInput,
    options?: {
      select?: T;
    },
  ): Promise<Prisma.KeyTokenGetPayload<{ select: T }>> {
    const buildQuery = (await this.prisma.keyToken.update({
      where: { id },
      data,
      ...options,
    })) as Prisma.KeyTokenGetPayload<{ select: T }>;
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

  async deleteManyByFilter(where: Prisma.KeyTokenWhereInput): Promise<boolean> {
    const isDeleted = await this.prisma.keyToken.deleteMany({ where });
    return isDeleted.count > 0 ? true : false;
  }

  deleteKeyStoreCachedByUserId() {}
}
