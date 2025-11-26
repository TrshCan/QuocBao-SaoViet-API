import { SetMetadata } from '@nestjs/common';

import { PermissionObjectTypes } from '@/types/permission';

export const PERMISSIONS_KEY = Symbol('permissions');
export const Permissions = (...permissions: PermissionObjectTypes[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
