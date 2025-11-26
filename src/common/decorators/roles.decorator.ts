import { SetMetadata } from '@nestjs/common';

import { Roles as RolesEnum } from '@/common/enums';

export type RolesTypes = RolesEnum;

export const ROLES_KEY = Symbol('roles');
export const Roles = (...roles: RolesTypes[]) => SetMetadata(ROLES_KEY, roles);
