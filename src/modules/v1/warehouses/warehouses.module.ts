import { Module } from '@nestjs/common';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { PrismaService } from '@/modules/shared/prisma';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService, PrismaService],
})
export class WarehousesModule {}
