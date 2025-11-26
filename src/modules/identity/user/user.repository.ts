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
    const buildQuery = await this.prisma.user.findUnique({
      where: { email },
      ...options,
    });
    return buildQuery;
  }

  async updateOneById<T extends UserQuery, I extends UserInclude>(
    id: string,
    data: Prisma.UserUpdateInput,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<UserResult | null> {
    const buildQuery = await this.prisma.user.update({
      where: { id },
      data,
      ...options,
    });
    return buildQuery;
  }
}
