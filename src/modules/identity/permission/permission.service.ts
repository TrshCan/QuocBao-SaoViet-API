import { Injectable, Logger } from '@nestjs/common';

import { PermissionStrategy as PermissionStrategyEnum } from '@/common/enums';

import { PermissionFactory, PermissionStrategyTypes } from './factories';
@Injectable()
export class PermissionService {
  private strategy;
  private readonly logger = new Logger(PermissionService.name);

  constructor(private factory: PermissionFactory) {
    const model =
      (process.env.PERMISSION_MODEL as PermissionStrategyTypes) ||
      PermissionStrategyEnum.RBAC_HIERARCHICAL;
    this.strategy = this.factory.getStrategy(model);
  }

  async hasPermission(
    userId: string,
    permission: string,
    context?: Record<string, any>,
  ): Promise<boolean> {
    return await this.strategy.hasPermission(userId, permission, context);
  }
}
