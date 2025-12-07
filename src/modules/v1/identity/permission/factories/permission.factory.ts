import { Injectable } from '@nestjs/common';

import { RbacHierarchicalStrategy } from '../strategies';

import { PermissionStrategy as PermissionStrategyEnum } from '@/common/enums';

import type { PermissionStrategy } from '../interfaces';

export type PermissionStrategyTypes = PermissionStrategyEnum;

@Injectable()
export class PermissionFactory {
  constructor(private rbacStrategy: RbacHierarchicalStrategy) {}

  getStrategy(strategy: PermissionStrategyTypes): PermissionStrategy {
    switch (strategy) {
      case PermissionStrategyEnum.RBAC_HIERARCHICAL:
        return this.rbacStrategy;
      default:
        return this.rbacStrategy;
    }
  }
}
