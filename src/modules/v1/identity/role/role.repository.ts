import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/shared/prisma';

import type { Prisma } from '@/generated/prisma/client';

type RoleQuery = Prisma.RoleSelect | null;
type RoleInclude = Prisma.RoleInclude | null;
type RoleResult = Prisma.RoleGetPayload<{
  select: RoleQuery;
  include: RoleInclude;
}>;

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(query: Prisma.RoleFindManyArgs) {
    const { take: limit, skip: offset, where, orderBy, ...rest } = query;
    const buildQuery = await this.prisma.role.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy,
      ...rest,
    });
    return buildQuery;
  }

  async thenCount(query: Prisma.RoleCountArgs) {
    const { where, ...rest } = query;
    const buildQuery = await this.prisma.role.count({
      where,
      ...rest,
    });
    return buildQuery;
  }

  async findOneById(
    roleId: string,
    options?: { select?: RoleQuery; include?: RoleInclude },
  ) {
    const buildQuery = await this.prisma.role.findUnique({
      where: { id: roleId },
      ...options,
    });
    return buildQuery;
  }

  async createOneWithTransaction<
    T extends RoleQuery = null,
    I extends RoleInclude = null,
  >(
    tx: Prisma.TransactionClient,
    data: Prisma.RoleCreateInput,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<RoleResult> {
    const buildQuery = await tx.role.create({
      data,
      ...options,
    });
    return buildQuery;
  }
}
