import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/shared/prisma';

import { PermissionFactory } from './factories';
import { RbacHierarchicalStrategy } from './strategies';

import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';

import { UserRoleModule } from '../user-role';

@Module({
  imports: [PrismaModule, UserRoleModule],
  providers: [
    PermissionService,
    PermissionFactory,
    PermissionRepository,
    RbacHierarchicalStrategy,
  ],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
