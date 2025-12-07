import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionService } from '@/modules/v1/identity/permission';
import { PERMISSIONS_KEY } from '../decorators';
import { PermissionObjectTypes } from '@/types/permission';

import type { Request } from 'express';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionObjectTypes[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      // No permission required → auto allow
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user.id) {
      throw new UnauthorizedException('User not found');
    }

    // Optionally context payload for ABAC strategy
    const resourceContext = {
      body: request.body as Record<string, any>,
      params: request.params,
      query: request.query,
    };

    for (const permission of requiredPermissions) {
      const permissionName = `${permission.action}.${permission.resource}`;
      const hasPermission = await this.permissionService.hasPermission(
        user.id,
        permissionName,
        resourceContext,
      );
      if (hasPermission) return true;
    }

    throw new ForbiddenException('Permission denied');
  }
}
