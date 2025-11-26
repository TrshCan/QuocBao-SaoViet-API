import { Injectable } from '@nestjs/common';

import { UserRoleRepository } from './user-role.repository';

@Injectable()
export class UserRoleService {
  constructor(private userRoleRepository: UserRoleRepository) {}
}
