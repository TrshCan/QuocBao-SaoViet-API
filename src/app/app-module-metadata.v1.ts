import { ModuleMetadata } from '@nestjs/common';

// V1 Modules
import {
  AuthModule,
  RoleModule,
  RoleClosureModule,
  RolePermissionModule,
  UserRoleModule,
  PermissionModule,
  KeyTokenModule,
  UserModule,
} from '@/modules/v1/identity';
import { MailModule } from '@/modules/v1/mail';
import { ReceiptsModule } from '@/modules/v1/receipts';
import { WarehousesModule } from '@/modules/v1/warehouses';
import { UnitsModule } from '@/modules/v1/units';
import { ProductsModule } from '@/modules/v1/products';
import { CustomersModule } from '@/modules/v1/customers';
import { SuppliersModule } from '@/modules/v1/suppliers';

export const appModuleMetadataV1: ModuleMetadata = {
  imports: [
    // Identity Context
    MailModule,
    AuthModule,
    KeyTokenModule,
    RoleModule,
    RoleClosureModule,
    RolePermissionModule,
    UserRoleModule,
    PermissionModule,
    UserModule,
    // =================
    ReceiptsModule,
    WarehousesModule,
    UnitsModule,
    ProductsModule,
    CustomersModule,
    SuppliersModule,
    // =================
  ],
};
