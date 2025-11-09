import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';
import { Prisma } from 'generated/prisma';
import { DefaultArgs } from 'generated/prisma/runtime/library';

@Injectable()
export class KeyTokenRepository {
  constructor(private prisma: PrismaService) {}

  findOneByPk() {}

  findOneById() {}

  async findOneByUserId<
    T extends Prisma.KeyTokenSelect<DefaultArgs> | undefined,
    I extends Prisma.KeyTokenInclude<DefaultArgs> | undefined,
  >(
    userId: string,
    options?: {
      select?: T;
      include?: I;
    },
  ): Promise<Prisma.KeyTokenGetPayload<{ select: T; include: I }> | null> {
    const buildQuery = (await this.prisma.keyToken.findUnique({
      where: { userId },
      ...options,
    })) as Prisma.KeyTokenGetPayload<{ select: T; include: I }> | null;
    return buildQuery;
  }

  async deleteOneById(keyTokenId: string) {
    // Type assertion needed: PrismaService extends PrismaClient but TypeScript strict mode
    // has issues inferring nested model types in some cases
    return await this.prisma.keyToken.delete({ where: { id: keyTokenId } });
  }
  deleteOneByUserId() {}

  deleteKeyStoreCachedByUserId() {}
}
