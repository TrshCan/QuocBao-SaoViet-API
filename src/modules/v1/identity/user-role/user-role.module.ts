import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/shared/prisma';

import { UserRoleService } from './user-role.service';
import { UserRoleRepository } from './user-role.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService, UserRoleRepository],
})
export class UserRoleModule {}
