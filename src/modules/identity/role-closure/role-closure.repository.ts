import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';
import { Prisma } from '@/generated/prisma/client';

type RoleClosureQuery = Prisma.RoleClosureSelect | null;
type RoleClosureInclude = Prisma.RoleClosureInclude | null;
type RoleClosureResult = Prisma.RoleClosureGetPayload<{
  select: RoleClosureQuery;
  include: RoleClosureInclude;
}>;

@Injectable()
export class RoleClosureRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByAncestorIds(
    ancestorIds: string[],
    options?: {
      select?: RoleClosureQuery;
      include?: RoleClosureInclude;
    },
  ): Promise<RoleClosureResult[]> {
    const buildQuery = await this.prisma.roleClosure.findMany({
      where: { ancestorId: { in: ancestorIds } },
      ...options,
    });
    return buildQuery;
  }

  async findManyByDescendantIds(
    descendantIds: string[],
    options?: {
      select?: RoleClosureQuery;
      include?: RoleClosureInclude;
    },
  ): Promise<RoleClosureResult[]> {
    const buildQuery = await this.prisma.roleClosure.findMany({
      where: { descendantId: { in: descendantIds } },
      ...options,
    });
    return buildQuery;
  }

  async findManyAncestorByDescendantId(
    descendantId: string,
    options?: {
      select?: RoleClosureQuery;
      include?: RoleClosureInclude;
    },
  ): Promise<RoleClosureResult[]> {
    const buildQuery = await this.prisma.roleClosure.findMany({
      where: { descendantId },
      ...options,
    });
    return buildQuery;
  }

  async findManyDescendantByAncestorId(
    ancestorId: string,
    options?: {
      select?: RoleClosureQuery;
      include?: RoleClosureInclude;
    },
  ): Promise<RoleClosureResult[]> {
    const buildQuery = await this.prisma.roleClosure.findMany({
      where: { ancestorId },
      ...options,
    });
    return buildQuery;
  }

  async findUniqueByAncestorIdDescendantIdWithTransaction(
    tx: Prisma.TransactionClient,
    ancestorId: string,
    descendantId: string,
    options?: {
      select?: RoleClosureQuery;
      include?: RoleClosureInclude;
    },
  ): Promise<RoleClosureResult | null> {
    const buildQuery = await tx.roleClosure.findUnique({
      where: {
        ancestorId_descendantId: {
          ancestorId,
          descendantId,
        },
      },
      ...options,
    });
    return buildQuery;
  }

  async createOne<
    T extends RoleClosureQuery = null,
    I extends RoleClosureInclude = null,
  >(
    data: Prisma.RoleClosureCreateInput,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<RoleClosureResult> {
    const buildQuery = await this.prisma.roleClosure.create({
      data,
      ...options,
    });
    return buildQuery;
  }

  async createOneWithTransaction<
    T extends RoleClosureQuery = null,
    I extends RoleClosureInclude = null,
  >(
    tx: Prisma.TransactionClient,
    data: Prisma.RoleClosureCreateInput,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<RoleClosureResult> {
    const buildQuery = await tx.roleClosure.create({
      data,
      ...options,
    });
    return buildQuery;
  }
}
