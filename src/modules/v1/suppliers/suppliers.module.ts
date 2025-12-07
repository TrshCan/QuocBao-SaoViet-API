import { Module } from '@nestjs/common';

import { SuppliersRepository } from './suppliers.repository';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';

@Module({
  imports: [],
  controllers: [SuppliersController],
  providers: [SuppliersService, SuppliersRepository],
  exports: [SuppliersService, SuppliersRepository],
})
export class SuppliersModule {}
