import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { PrismaService } from '../shared/prisma';

@Module({
  controllers: [ReceiptsController],
  providers: [ReceiptsService, PrismaService],
})
export class ReceiptsModule {}
