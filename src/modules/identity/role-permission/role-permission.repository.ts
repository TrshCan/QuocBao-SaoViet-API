import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/shared/prisma';

import { Prisma } from '@/generated/prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/client';

type RolePermissionQuery = Prisma.RolePermissionSelect<DefaultArgs> | undefined;
type RolePermissionInclude =
  | Prisma.RolePermissionInclude<DefaultArgs>
  | undefined;
type RolePermissionResult = Prisma.RolePermissionGetPayload<{
  select: RolePermissionQuery;
  include: RolePermissionInclude;
}>;

@Injectable()
export class RolePermissionRepository {
  constructor(private prisma: PrismaService) {}

  findFirstByRoleIdPermissionName(
    ancestorRoleIds: string[],
    permissionName: string,
    options?: { select?: RolePermissionQuery; include?: RolePermissionInclude },
  ): Promise<RolePermissionResult | null> {
    return this.prisma.rolePermission.findFirst({
      where: {
        roleId: { in: ancestorRoleIds },
        permission: { name: permissionName },
      },
      ...options,
    });
  }
}
