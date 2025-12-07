import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/shared/prisma';

import { RoleClosureService } from './role-closure.service';
import { RoleClosureRepository } from './role-closure.repository';

@Module({
  imports: [PrismaModule],
  providers: [RoleClosureService, RoleClosureRepository],
  exports: [RoleClosureService, RoleClosureRepository],
})
export class RoleClosureModule {}
