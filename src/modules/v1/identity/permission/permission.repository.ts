import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

@Injectable()
export class PermissionRepository {
  constructor(private prisma: PrismaService) {}
}
