import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './modules/receipts/receipts.module';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { UnitsModule } from './modules/units/units.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [ReceiptsModule, WarehousesModule, UnitsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
