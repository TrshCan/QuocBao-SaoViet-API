import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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

import {
  FindAllUsersApiOperation,
  FindAllUsersApiQuery,
  FindAllUsersApiResponse,
} from './docs/find-all-users.doc';
import {
  FindOneByIdApiOperation,
  FindOneByIdApiParam,
  FindOneByIdApiResponse,
} from './docs/find-one-by-id.doc';
import {
  CreateUserApiBody,
  CreateUserApiOperation,
  CreateUserApiResponse,
} from './docs/create-user.doc';
import {
  UpdateUserApiBody,
  UpdateUserApiOperation,
  UpdateUserApiParam,
  UpdateUserApiResponse,
} from './docs/update-user.doc';
import {
  DeleteUserApiOperation,
  DeleteUserApiParam,
  DeleteUserApiResponse,
} from './docs/delete-user.doc';
import {
  RestoreUserApiOperation,
  RestoreUserApiParam,
  RestoreUserApiResponse,
} from './docs/restore-user.doc';

@Controller({ path: 'users', version: '1' })
@UseGuards(RolesGuard)
@Roles(RolesEnum.ADMIN)
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindAllUsersDto, FindAllUsersDto>({
      query: findAllUsersSchema,
    }),
  )
  @FindAllUsersApiOperation()
  @FindAllUsersApiQuery()
  @FindAllUsersApiResponse()
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
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindUserByIdDto, FindUserByIdDto>({
      param: findUserByIdSchema.shape.userId,
    }),
  )
  @FindOneByIdApiOperation()
  @FindOneByIdApiParam()
  @FindOneByIdApiResponse()
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
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<CreateUserDto, CreateUserDto>({
      body: createUserSchema,
    }),
  )
  @CreateUserApiOperation()
  @CreateUserApiBody()
  @CreateUserApiResponse()
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
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<
      FindUserByIdDto & UpdateUserDto,
      FindUserByIdDto & UpdateUserDto
    >({
      param: findUserByIdSchema.shape.userId,
      body: updateUserSchema,
    }),
  )
  @UpdateUserApiOperation()
  @UpdateUserApiParam()
  @UpdateUserApiBody()
  @UpdateUserApiResponse()
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
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindUserByIdDto, FindUserByIdDto>({
      param: findUserByIdSchema.shape.userId,
    }),
  )
  @DeleteUserApiOperation()
  @DeleteUserApiParam()
  @DeleteUserApiResponse()
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
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindUserByIdDto, FindUserByIdDto>({
      param: findUserByIdSchema.shape.userId,
    }),
  )
  @RestoreUserApiOperation()
  @RestoreUserApiParam()
  @RestoreUserApiResponse()
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
