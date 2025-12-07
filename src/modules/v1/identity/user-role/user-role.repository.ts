import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

import type { Prisma } from '@/generated/prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/client';

type UserRoleQuery = Prisma.UserRoleSelect<DefaultArgs> | undefined;
type UserRoleInclude = Prisma.UserRoleInclude<DefaultArgs> | undefined;
type UserRoleResult = Prisma.UserRoleGetPayload<{
  select: UserRoleQuery;
  include: UserRoleInclude;
}>;

@Injectable()
export class UserRoleRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByUserIdRoleId(
    userId: string,
    roleId: string,
    options?: { select?: UserRoleQuery; include?: UserRoleInclude },
  ): Promise<UserRoleResult | null> {
    const buildQuery = await this.prisma.userRole.findUnique({
      where: { userId_roleId: { userId, roleId } },
      ...options,
    });
    return buildQuery;
  }

  async findManyByUserId(
    userId: string,
    options?: { select?: UserRoleQuery; include?: UserRoleInclude },
  ): Promise<UserRoleResult[]> {
    const buildQuery = await this.prisma.userRole.findMany({
      where: { userId },
      ...options,
    });
    return buildQuery;
  }

  async createOne(
    data: Prisma.UserRoleCreateInput,
    options?: { select?: UserRoleQuery; include?: UserRoleInclude },
  ): Promise<UserRoleResult> {
    const buildQuery = await this.prisma.userRole.create({
      data,
      ...options,
    });
    return buildQuery;
  }
}
