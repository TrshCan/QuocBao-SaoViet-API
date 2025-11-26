import { RoleClosureRepository } from './role-closure.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleClosureService {
  constructor(private roleClosureRepository: RoleClosureRepository) {}
}
