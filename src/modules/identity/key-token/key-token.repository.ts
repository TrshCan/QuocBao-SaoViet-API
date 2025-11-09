import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

@Injectable()
export class KeyTokenRepository {
  constructor(private prisma: PrismaService) {}

  findOneByPk() {}

  findOneById() {}

  findOneByUserId() {}

  async deleteOneById(keyTokenId: string) {
    // Type assertion needed: PrismaService extends PrismaClient but TypeScript strict mode
    // has issues inferring nested model types in some cases
    return await this.prisma.keyToken.delete({ where: { id: keyTokenId } });
  }
  deleteOneByUserId() {}

  deleteKeyStoreCachedByUserId() {}
}
