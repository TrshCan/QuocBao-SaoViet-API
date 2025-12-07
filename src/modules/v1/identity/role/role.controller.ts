import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '@/common/decorators';
import { Roles as RolesEnum } from '@/common/enums';
import { RolesGuard } from '@/common/guards';
import { ZodValidationPipe } from '@/common/pipes';
import { KEY_THROTTLER } from '@/common/constants';

import { RoleService, type RoleTreeNode } from './role.service';

import {
  addParentToRoleSchema,
  deleteParentFromRoleSchema,
  findAllRolesSchema,
  findByIdSchema,
  findChildrenRolesSchema,
  findParentsRolesSchema,
  roleCreationSchema,
} from './validations';

import type { ResponseController } from '@/types/response-controller';
import type {
  AddParentToRoleDto,
  DeleteParentFromRoleDto,
  FindAllRolesDto,
  FindByIdDto,
  FindChildrenRolesDto,
  FindParentsRolesDto,
  RoleCreationDto,
} from './dto';
import type { Role } from '@/generated/prisma/client';

import {
  FindAllRolesApiOperation,
  FindAllRolesApiQuery,
  FindAllRolesApiResponse,
} from './docs/find-all-roles.doc';
import {
  GetRoleTreeApiOperation,
  GetRoleTreeApiResponse,
} from './docs/get-role-tree.doc';
import {
  FindOneByIdApiOperation,
  FindOneByIdApiParam,
  FindOneByIdApiResponse,
} from './docs/find-one-by-id.doc';
import {
  FindParentsByRoleIdApiOperation,
  FindParentsByRoleIdApiParam,
  FindParentsByRoleIdApiResponse,
} from './docs/find-parents-by-role-id.doc';
import {
  FindChildrenByRoleIdApiOperation,
  FindChildrenByRoleIdApiParam,
  FindChildrenByRoleIdApiResponse,
} from './docs/find-children-by-role-id.doc';
import {
  CreateRoleApiBody,
  CreateRoleApiOperation,
  CreateRoleApiResponse,
} from './docs/create-role.doc';
import {
  AddParentToRoleApiOperation,
  AddParentToRoleApiParam,
  AddParentToRoleApiParam2,
  AddParentToRoleApiResponse,
} from './docs/add-parent-to-role.doc';
import {
  DeleteParentFromRoleApiOperation,
  DeleteParentFromRoleApiParam,
  DeleteParentFromRoleApiParam2,
  DeleteParentFromRoleApiResponse,
} from './docs/delete-parent-from-role.doc';

@Controller({ path: 'role', version: '1' })
@UseGuards(RolesGuard)
@Roles(RolesEnum.ADMIN)
@ApiTags('Role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindAllRolesDto, FindAllRolesDto>({
      query: findAllRolesSchema,
    }),
  )
  @FindAllRolesApiOperation()
  @FindAllRolesApiQuery()
  @FindAllRolesApiResponse()
  async findAllRoles(
    @Query() query: FindAllRolesDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.roleService.findAllRoles(query);
    return {
      message: 'Roles fetched successfully',
      metadata: result,
    };
  }

  @Get('tree')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 20, ttl: 60000 } })
  @GetRoleTreeApiOperation()
  @GetRoleTreeApiResponse()
  async getRoleTree(): Promise<
    ResponseController<(RoleTreeNode | undefined)[]>
  > {
    const result = await this.roleService.getRoleTree();
    return {
      message: 'Role tree fetched successfully',
      metadata: result,
    };
  }

  @Get(':roleId')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindByIdDto, FindByIdDto>({
      param: findByIdSchema.shape.roleId,
    }),
  )
  @FindOneByIdApiOperation()
  @FindOneByIdApiParam()
  @FindOneByIdApiResponse()
  async findOneById(
    @Param('roleId') roleId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.roleService.findOneById(roleId);
    return {
      message: 'Role fetched successfully',
      metadata: result,
    };
  }

  @Get(':roleId/parents')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindParentsRolesDto, FindParentsRolesDto>({
      param: findParentsRolesSchema,
    }),
  )
  @FindParentsByRoleIdApiOperation()
  @FindParentsByRoleIdApiParam()
  @FindParentsByRoleIdApiResponse()
  async findParentsByRoleId(
    @Param() params: FindParentsRolesDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.roleService.findParentsByRoleId(params.roleId);
    return {
      message: 'Parents roles fetched successfully',
      metadata: result,
    };
  }

  @Get(':roleId/children')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindChildrenRolesDto, FindChildrenRolesDto>({
      param: findChildrenRolesSchema,
    }),
  )
  @FindChildrenByRoleIdApiOperation()
  @FindChildrenByRoleIdApiParam()
  @FindChildrenByRoleIdApiResponse()
  async findChildrenByRoleId(
    @Param() params: FindChildrenRolesDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.roleService.findChildrenByRoleId(params.roleId);
    return {
      message: 'Children roles fetched successfully',
      metadata: result,
    };
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<RoleCreationDto, RoleCreationDto>({
      body: roleCreationSchema,
    }),
  )
  @CreateRoleApiOperation()
  @CreateRoleApiBody()
  @CreateRoleApiResponse()
  async createRole(
    @Body() body: RoleCreationDto,
  ): Promise<ResponseController<{ role: Role; addParent?: boolean }>> {
    const result = await this.roleService.createRole(body);
    return {
      message: 'Role created successfully',
      metadata: result,
    };
  }

  @Post(':roleId/add-parent/:parentRoleId')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<AddParentToRoleDto, AddParentToRoleDto>({
      param: addParentToRoleSchema,
    }),
  )
  @AddParentToRoleApiOperation()
  @AddParentToRoleApiParam()
  @AddParentToRoleApiParam2()
  @AddParentToRoleApiResponse()
  async addParentToRole(
    @Param() params: AddParentToRoleDto,
  ): Promise<ResponseController<boolean>> {
    const result = await this.roleService.addParentToRole(
      params.roleId,
      params.parentRoleId,
    );
    return {
      message: 'Parent added to role successfully',
      metadata: result,
    };
  }

  @Delete(':roleId/delete-parent/:parentRoleId')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<DeleteParentFromRoleDto, DeleteParentFromRoleDto>({
      param: deleteParentFromRoleSchema,
    }),
  )
  @DeleteParentFromRoleApiOperation()
  @DeleteParentFromRoleApiParam()
  @DeleteParentFromRoleApiParam2()
  @DeleteParentFromRoleApiResponse()
  async deleteParentFromRole(
    @Param() params: DeleteParentFromRoleDto,
  ): Promise<ResponseController<boolean>> {
    const result = await this.roleService.deleteParentFromRole(
      params.roleId,
      params.parentRoleId,
    );
    return {
      message: 'Parent deleted from role successfully',
      metadata: result,
    };
  }
}
