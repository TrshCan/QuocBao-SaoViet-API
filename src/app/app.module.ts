import { Module } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from '@/infrastructures/events';
import { MulterModule } from '@/infrastructures/storages';
import { ThrottlerModule } from '@/infrastructures/throttler';
import { ConfigModule } from '@/infrastructures/config';

import {
  JwtAuthenticateGuard,
  PermissionGuard,
  RolesGuard,
} from '@/common/guards';

import { PrismaModule, HealthModule, IoredisModule } from '@/modules/shared';
import {
  AuthModule,
  RoleModule,
  RoleClosureModule,
  RolePermissionModule,
  UserRoleModule,
  PermissionModule,
  KeyTokenModule,
} from '@/modules/identity';
import { MailModule } from '@/modules/mail';
import { ReceiptsModule } from '@/modules/receipts';
import { WarehousesModule } from '@/modules/warehouses';
import { UnitsModule } from '@/modules/units';
import { ProductsModule } from '@/modules/products';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule,
    MulterModule,
    EventsModule,
    PrismaModule,
    IoredisModule,
    HealthModule,
    MailModule,
    // Identity Context
    AuthModule,
    KeyTokenModule,
    RoleModule,
    RoleClosureModule,
    RolePermissionModule,
    UserRoleModule,
    PermissionModule,
    // =================
    ReceiptsModule,
    WarehousesModule,
    UnitsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ApiAuthGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticateGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
