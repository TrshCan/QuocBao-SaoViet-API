import { ROLE_DEFINITIONS } from '@/configs';

export type RoleType = (typeof ROLE_DEFINITIONS)[keyof typeof ROLE_DEFINITIONS];

export type RoleScope = 'SYSTEM' | 'COMPANY' | 'ASC_CENTER';
