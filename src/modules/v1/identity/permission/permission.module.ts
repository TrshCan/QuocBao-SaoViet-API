import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/shared/prisma';

import { PermissionFactory } from './factories';
import { RbacHierarchicalStrategy } from './strategies';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';

import { UserRoleModule } from '../user-role';
import { RoleClosureModule } from '../role-closure';
import { RolePermissionModule } from '../role-permission';
import { KeyTokenModule } from '../key-token';
import { IoredisModule } from '@/modules/shared';

@Module({
  imports: [
    PrismaModule,
    UserRoleModule,
    RoleClosureModule,
    RolePermissionModule,
    KeyTokenModule,
    IoredisModule,
  ],
  providers: [
    PermissionService,
    PermissionFactory,
    PermissionRepository,
    RbacHierarchicalStrategy,
  ],
  controllers: [PermissionController],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
