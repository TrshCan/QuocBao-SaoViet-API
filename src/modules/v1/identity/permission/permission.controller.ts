import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { ZodValidationPipe } from '@/common/pipes/validation.pipe';
import { JwtAuthenticateGuard } from '@/common/guards';
import { KEY_THROTTLER } from '@/common/constants';

import { PermissionService } from './permission.service';
import { requestPermissionCheckSchema } from './validations';
import type { ResponseController } from '@/types/response-controller';
import type { RequestPermissionCheckDto } from './dto';
import type { PermissionCheckResponse } from './interfaces';
import {
  PermissionCheckApiBody,
  PermissionCheckApiOperation,
  PermissionCheckApiResponse,
} from './docs/permission-check.doc';

@Controller({ path: 'permission', version: '1' })
@ApiTags('Permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post('check')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 20, ttl: 60000 } })
  @UseGuards(JwtAuthenticateGuard)
  @UsePipes(new ZodValidationPipe({ body: requestPermissionCheckSchema }))
  @PermissionCheckApiOperation()
  @PermissionCheckApiBody()
  @PermissionCheckApiResponse()
  async checkPermission(
    @Body() body: RequestPermissionCheckDto,
    @Req() request: Request,
  ): Promise<ResponseController<PermissionCheckResponse>> {
    if (!request.user) {
      throw new UnauthorizedException('Authentication required!');
    }

    const userId = request.user.id;
    const hasPermission = await this.permissionService.hasPermission(
      userId,
      body.permission,
      body.context,
    );

    return {
      message: 'Permission check completed successfully!',
      metadata: {
        hasPermission,
        permission: body.permission,
        userId,
      },
    };
  }
}
