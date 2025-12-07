import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/shared/prisma';

import { RolePermissionService } from './role-permission.service';
import { RolePermissionRepository } from './role-permission.repository';

@Module({
  imports: [PrismaModule],
  providers: [RolePermissionService, RolePermissionRepository],
  exports: [RolePermissionService, RolePermissionRepository],
})
export class RolePermissionModule {}
