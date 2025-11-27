import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { Roles } from '@/common/decorators';
import { Roles as RolesEnum } from '@/common/enums';
import { JwtAuthenticateGuard, RolesGuard } from '@/common/guards';
import { ZodValidationPipe } from '@/common/pipes';

import { RoleService, type RoleTreeNode } from '.';

import {
  addParentToRoleSchema,
  deleteParentFromRoleSchema,
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

@Controller('role')
@UseGuards(RolesGuard, JwtAuthenticateGuard)
@Roles(RolesEnum.ADMIN)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
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
  @UsePipes(
    new ZodValidationPipe<FindByIdDto, FindByIdDto>({
      param: findByIdSchema,
    }),
  )
  async findOneById(
    @Param() params: FindByIdDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.roleService.findOneById(params.roleId);
    return {
      message: 'Role fetched successfully',
      metadata: result,
    };
  }

  @Get(':roleId/parents')
  @UsePipes(
    new ZodValidationPipe<FindParentsRolesDto, FindParentsRolesDto>({
      param: findParentsRolesSchema,
    }),
  )
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
  @UsePipes(
    new ZodValidationPipe<FindChildrenRolesDto, FindChildrenRolesDto>({
      param: findChildrenRolesSchema,
    }),
  )
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
  @UsePipes(
    new ZodValidationPipe<RoleCreationDto, RoleCreationDto>({
      body: roleCreationSchema,
    }),
  )
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
  @UsePipes(
    new ZodValidationPipe<AddParentToRoleDto, AddParentToRoleDto>({
      param: addParentToRoleSchema,
    }),
  )
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
  @UsePipes(
    new ZodValidationPipe<DeleteParentFromRoleDto, DeleteParentFromRoleDto>({
      param: deleteParentFromRoleSchema,
    }),
  )
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
