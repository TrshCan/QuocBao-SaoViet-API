import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { PrismaModule } from '@/modules/shared/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
