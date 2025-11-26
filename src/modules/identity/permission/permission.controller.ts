import { PermissionService } from './permission.service';
import { Controller } from '@nestjs/common';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
}
