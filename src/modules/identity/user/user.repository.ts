import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

import type { Prisma } from '@generated/prisma';
import { DefaultArgs } from '@generated/prisma/runtime/library';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByUsername<
    T extends Prisma.UserSelect<DefaultArgs> | undefined,
    I extends Prisma.UserInclude<DefaultArgs> | undefined,
  >(
    username: string,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<Prisma.UserGetPayload<{ select: T; include: I }> | null> {
    const buildQuery = (await this.prisma.user.findUnique({
      where: { username },
      ...options,
    })) as Prisma.UserGetPayload<{ select: T; include: I }> | null;
    return buildQuery;
  }

  async findOneById<
    T extends Prisma.UserSelect<DefaultArgs> | undefined,
    I extends Prisma.UserInclude<DefaultArgs> | undefined,
  >(
    id: string,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<Prisma.UserGetPayload<{ select: T; include: I }> | null> {
    const buildQuery = (await this.prisma.user.findUnique({
      where: { id },
      ...options,
    })) as Prisma.UserGetPayload<{ select: T; include: I }> | null;
    return buildQuery;
  }

  async findOneByEmail<
    T extends Prisma.UserSelect<DefaultArgs> | undefined,
    I extends Prisma.UserInclude<DefaultArgs> | undefined,
  >(
    email: string,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<Prisma.UserGetPayload<{ select: T; include: I }> | null> {
    const buildQuery = (await this.prisma.user.findUnique({
      where: { email },
      ...options,
    })) as Prisma.UserGetPayload<{ select: T; include: I }> | null;
    return buildQuery;
  }

  async updateOneById<
    T extends Prisma.UserSelect<DefaultArgs> | undefined,
    I extends Prisma.UserInclude<DefaultArgs> | undefined,
  >(
    id: string,
    data: Prisma.UserUpdateInput,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<Prisma.UserGetPayload<{ select: T; include: I }> | null> {
    const buildQuery = (await this.prisma.user.update({
      where: { id },
      data,
      ...options,
    })) as Prisma.UserGetPayload<{ select: T; include: I }> | null;
    return buildQuery;
  }
}
