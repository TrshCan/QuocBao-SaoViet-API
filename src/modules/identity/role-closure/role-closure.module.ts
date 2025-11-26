import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/shared/prisma';
import { RoleModule } from '@/modules/identity/role';

import { RoleClosureService } from './role-closure.service';
import { RoleClosureRepository } from './role-closure.repository';

@Module({
  imports: [PrismaModule, RoleModule],
  providers: [RoleClosureService, RoleClosureRepository],
  exports: [RoleClosureService, RoleClosureRepository],
})
export class RoleClosureModule {}
