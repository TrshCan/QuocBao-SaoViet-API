import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/common/pipes';

import { CustomersService } from './customers.service';

import {
  findAllCustomersSchema,
  findCustomerByIdSchema,
  createCustomerSchema,
  updateCustomerSchema,
} from './validations';

import type { ResponseController } from '@/types/response-controller';
import type {
  CreateCustomerDto,
  FindAllCustomersDto,
  FindCustomerByIdDto,
  UpdateCustomerDto,
} from './dto';

@Controller({ path: 'customers', version: '1' })
@ApiTags('Customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe<FindAllCustomersDto, FindAllCustomersDto>({
      query: findAllCustomersSchema,
    }),
  )
  async findAll(
    @Query() query: FindAllCustomersDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.customersService.findAll(query);
    return {
      message: 'Customers fetched successfully',
      metadata: result,
    };
  }

  @Get(':customerId')
  @UsePipes(
    new ZodValidationPipe<FindCustomerByIdDto, FindCustomerByIdDto>({
      param: findCustomerByIdSchema.shape.customerId,
    }),
  )
  async findOneById(
    @Param('customerId') customerId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.customersService.findOneById(customerId);
    return {
      message: 'Customer fetched successfully',
      metadata: result,
    };
  }

  @Post()
  @UsePipes(
    new ZodValidationPipe<CreateCustomerDto, CreateCustomerDto>({
      body: createCustomerSchema,
    }),
  )
  async createCustomer(
    @Body() body: CreateCustomerDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.customersService.createCustomer(body);
    return {
      message: 'Customer created successfully',
      metadata: result,
    };
  }

  @Patch(':customerId')
  @UsePipes(
    new ZodValidationPipe<
      FindCustomerByIdDto & UpdateCustomerDto,
      FindCustomerByIdDto & UpdateCustomerDto
    >({
      param: findCustomerByIdSchema.shape.customerId,
      body: updateCustomerSchema,
    }),
  )
  async updateCustomer(
    @Param('customerId') customerId: string,
    @Body() body: UpdateCustomerDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.customersService.updateCustomer(customerId, body);
    return {
      message: 'Customer updated successfully',
      metadata: result,
    };
  }

  @Delete(':customerId')
  @UsePipes(
    new ZodValidationPipe<FindCustomerByIdDto, FindCustomerByIdDto>({
      param: findCustomerByIdSchema.shape.customerId,
    }),
  )
  async deleteCustomer(
    @Param('customerId') customerId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.customersService.deleteCustomer(customerId);
    return {
      message: 'Customer deleted successfully',
      metadata: result,
    };
  }

  @Patch(':customerId/restore')
  @UsePipes(
    new ZodValidationPipe<FindCustomerByIdDto, FindCustomerByIdDto>({
      param: findCustomerByIdSchema.shape.customerId,
    }),
  )
  async restoreCustomer(
    @Param('customerId') customerId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.customersService.restoreCustomer(customerId);
    return {
      message: 'Customer restored successfully',
      metadata: result,
    };
  }
}
