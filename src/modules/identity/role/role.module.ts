import { Module } from '@nestjs/common';

import { PrismaModule, IoredisModule } from '@/modules/shared';
import { UserRoleModule } from '../user-role';
import { RoleClosureModule } from '../role-closure';
import { RolePermissionModule } from '../role-permission';
import { KeyTokenModule } from '../key-token';

import { ExtractPagination } from '@/utils/extract-pagination';

import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    PrismaModule,
    IoredisModule,
    UserRoleModule,
    RoleClosureModule,
    RolePermissionModule,
    KeyTokenModule,
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, ExtractPagination],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
