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
import { RolesGuard } from '@/common/guards';
import { ZodValidationPipe } from '@/common/pipes';

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

@Controller('role')
@UseGuards(RolesGuard)
@Roles(RolesEnum.ADMIN)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe<FindAllRolesDto, FindAllRolesDto>({
      query: findAllRolesSchema,
    }),
  )
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
  // @UseGuards(JwtAuthenticateGuard)
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
  // @UseGuards(JwtAuthenticateGuard)
  @UsePipes(
    new ZodValidationPipe<FindByIdDto, FindByIdDto>({
      param: findByIdSchema.shape.roleId,
    }),
  )
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
  @UsePipes(
    new ZodValidationPipe<FindParentsRolesDto, FindParentsRolesDto>({
      param: findParentsRolesSchema,
    }),
  )
  // @UseGuards(JwtAuthenticateGuard)
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
  // @UseGuards(JwtAuthenticateGuard)
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
  // @UseGuards(JwtAuthenticateGuard)
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
  // @UseGuards(JwtAuthenticateGuard)
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
  // @UseGuards(JwtAuthenticateGuard)
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
