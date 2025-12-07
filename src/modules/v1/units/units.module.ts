import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { PrismaService } from '../../shared/prisma';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, PrismaService],
})
export class UnitsModule {}
