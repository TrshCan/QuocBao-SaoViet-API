import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

import type { Prisma } from '@/generated/prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/client';

type UserQuery = Prisma.UserSelect<DefaultArgs> | undefined;
type UserInclude = Prisma.UserInclude<DefaultArgs> | undefined;
type UserResult = Prisma.UserGetPayload<{
  select: UserQuery;
  include: UserInclude;
}>;

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(query: Prisma.UserFindManyArgs) {
    const { take: limit, skip: offset, where, orderBy, ...rest } = query;
    return this.prisma.user.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy,
      ...rest,
    });
  }

  async count(where: Prisma.UserWhereInput) {
    return this.prisma.user.count({ where });
  }

  async findOneByUsername<T extends UserQuery, I extends UserInclude>(
    username: string,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<UserResult | null> {
    const buildQuery = await this.prisma.user.findUnique({
      where: { username },
      ...options,
    });
    return buildQuery;
  }

  async findOneById<T extends UserQuery, I extends UserInclude>(
    id: string,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<UserResult | null> {
    const buildQuery = await this.prisma.user.findUnique({
      where: { id },
      ...options,
    });
    return buildQuery;
  }

  async findOneByEmail<T extends UserQuery, I extends UserInclude>(
    email: string,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<UserResult | null> {
    return this.prisma.user.findUnique({
      where: { email },
      ...options,
    });
  }

  async createOne<T extends UserQuery, I extends UserInclude>(
    data: Prisma.UserCreateInput,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<UserResult> {
    return this.prisma.user.create({
      data,
      ...options,
    });
  }

  async updateOneById<T extends UserQuery, I extends UserInclude>(
    id: string,
    data: Prisma.UserUpdateInput,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<UserResult | null> {
    return this.prisma.user.update({
      where: { id },
      data,
      ...options,
    });
  }

  async softDeleteById(id: string): Promise<UserResult> {
    return this.prisma.user.update({
      where: { id },
      data: { isDelete: true },
    });
  }

  async restoreById(id: string): Promise<UserResult> {
    return this.prisma.user.update({
      where: { id },
      data: { isDelete: false },
    });
  }
}
