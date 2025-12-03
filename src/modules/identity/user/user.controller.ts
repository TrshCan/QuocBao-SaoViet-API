import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { Roles } from '@/common/decorators';
import { Roles as RolesEnum } from '@/common/enums';
import { RolesGuard } from '@/common/guards';
import { ZodValidationPipe } from '@/common/pipes';

import { UserService } from './user.service';

import {
  findAllUsersSchema,
  findUserByIdSchema,
  createUserSchema,
  updateUserSchema,
} from './validations';

import type { ResponseController } from '@/types/response-controller';
import type {
  CreateUserDto,
  FindAllUsersDto,
  FindUserByIdDto,
  UpdateUserDto,
} from './dto';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(RolesEnum.ADMIN)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe<FindAllUsersDto, FindAllUsersDto>({
      query: findAllUsersSchema,
    }),
  )
  async findAll(
    @Query() query: FindAllUsersDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.userService.findAll(query);
    return {
      message: 'Users fetched successfully',
      metadata: result,
    };
  }

  @Get(':userId')
  @UsePipes(
    new ZodValidationPipe<FindUserByIdDto, FindUserByIdDto>({
      param: findUserByIdSchema.shape.userId,
    }),
  )
  async findOneById(
    @Param('userId') userId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.userService.findOneById(userId);
    return {
      message: 'User fetched successfully',
      metadata: result,
    };
  }

  @Post()
  @UsePipes(
    new ZodValidationPipe<CreateUserDto, CreateUserDto>({
      body: createUserSchema,
    }),
  )
  async createUser(
    @Body() body: CreateUserDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.userService.createUser(body);
    return {
      message: 'User created successfully',
      metadata: result,
    };
  }

  @Patch(':userId')
  @UsePipes(
    new ZodValidationPipe<
      FindUserByIdDto & UpdateUserDto,
      FindUserByIdDto & UpdateUserDto
    >({
      param: findUserByIdSchema.shape.userId,
      body: updateUserSchema,
    }),
  )
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.userService.updateUser(userId, body);
    return {
      message: 'User updated successfully',
      metadata: result,
    };
  }

  @Delete(':userId')
  @UsePipes(
    new ZodValidationPipe<FindUserByIdDto, FindUserByIdDto>({
      param: findUserByIdSchema.shape.userId,
    }),
  )
  async deleteUser(
    @Param('userId') userId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.userService.deleteUser(userId);
    return {
      message: 'User deleted successfully',
      metadata: result,
    };
  }

  @Patch(':userId/restore')
  @UsePipes(
    new ZodValidationPipe<FindUserByIdDto, FindUserByIdDto>({
      param: findUserByIdSchema.shape.userId,
    }),
  )
  async restoreUser(
    @Param('userId') userId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.userService.restoreUser(userId);
    return {
      message: 'User restored successfully',
      metadata: result,
    };
  }
}
