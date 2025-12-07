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
  UsePipes,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/common/pipes';
import { KEY_THROTTLER } from '@/common/constants';

import { SuppliersService } from './suppliers.service';

import {
  findAllSuppliersSchema,
  findSupplierByIdSchema,
  createSupplierSchema,
  updateSupplierSchema,
} from './validations';

import type { ResponseController } from '@/types/response-controller';
import type {
  CreateSupplierDto,
  FindAllSuppliersDto,
  FindSupplierByIdDto,
  UpdateSupplierDto,
} from './dto';

import {
  FindAllSuppliersApiOperation,
  FindAllSuppliersApiQuery,
  FindAllSuppliersApiResponse,
} from './docs/find-all-suppliers.doc';
import {
  FindOneByIdApiOperation,
  FindOneByIdApiParam,
  FindOneByIdApiResponse,
} from './docs/find-one-by-id.doc';
import {
  CreateSupplierApiBody,
  CreateSupplierApiOperation,
  CreateSupplierApiResponse,
} from './docs/create-supplier.doc';
import {
  UpdateSupplierApiBody,
  UpdateSupplierApiOperation,
  UpdateSupplierApiParam,
  UpdateSupplierApiResponse,
} from './docs/update-supplier.doc';
import {
  DeleteSupplierApiOperation,
  DeleteSupplierApiParam,
  DeleteSupplierApiResponse,
} from './docs/delete-supplier.doc';
import {
  RestoreSupplierApiOperation,
  RestoreSupplierApiParam,
  RestoreSupplierApiResponse,
} from './docs/restore-supplier.doc';

@Controller({ path: 'suppliers', version: '1' })
@ApiTags('Suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindAllSuppliersDto, FindAllSuppliersDto>({
      query: findAllSuppliersSchema,
    }),
  )
  @FindAllSuppliersApiOperation()
  @FindAllSuppliersApiQuery()
  @FindAllSuppliersApiResponse()
  async findAll(
    @Query() query: FindAllSuppliersDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.suppliersService.findAll(query);
    return {
      message: 'Suppliers fetched successfully',
      metadata: result,
    };
  }

  @Get(':supplierId')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 30, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindSupplierByIdDto, FindSupplierByIdDto>({
      param: findSupplierByIdSchema.shape.supplierId,
    }),
  )
  @FindOneByIdApiOperation()
  @FindOneByIdApiParam()
  @FindOneByIdApiResponse()
  async findOneById(
    @Param('supplierId') supplierId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.suppliersService.findOneById(supplierId);
    return {
      message: 'Supplier fetched successfully',
      metadata: result,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<CreateSupplierDto, CreateSupplierDto>({
      body: createSupplierSchema,
    }),
  )
  @CreateSupplierApiOperation()
  @CreateSupplierApiBody()
  @CreateSupplierApiResponse()
  async createSupplier(
    @Body() body: CreateSupplierDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.suppliersService.createSupplier(body);
    return {
      message: 'Supplier created successfully',
      metadata: result,
    };
  }

  @Patch(':supplierId')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<
      FindSupplierByIdDto & UpdateSupplierDto,
      FindSupplierByIdDto & UpdateSupplierDto
    >({
      param: findSupplierByIdSchema.shape.supplierId,
      body: updateSupplierSchema,
    }),
  )
  @UpdateSupplierApiOperation()
  @UpdateSupplierApiParam()
  @UpdateSupplierApiBody()
  @UpdateSupplierApiResponse()
  async updateSupplier(
    @Param('supplierId') supplierId: string,
    @Body() body: UpdateSupplierDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.suppliersService.updateSupplier(supplierId, body);
    return {
      message: 'Supplier updated successfully',
      metadata: result,
    };
  }

  @Delete(':supplierId')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindSupplierByIdDto, FindSupplierByIdDto>({
      param: findSupplierByIdSchema.shape.supplierId,
    }),
  )
  @DeleteSupplierApiOperation()
  @DeleteSupplierApiParam()
  @DeleteSupplierApiResponse()
  async deleteSupplier(
    @Param('supplierId') supplierId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.suppliersService.deleteSupplier(supplierId);
    return {
      message: 'Supplier deleted successfully',
      metadata: result,
    };
  }

  @Patch(':supplierId/restore')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindSupplierByIdDto, FindSupplierByIdDto>({
      param: findSupplierByIdSchema.shape.supplierId,
    }),
  )
  @RestoreSupplierApiOperation()
  @RestoreSupplierApiParam()
  @RestoreSupplierApiResponse()
  async restoreSupplier(
    @Param('supplierId') supplierId: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.suppliersService.restoreSupplier(supplierId);
    return {
      message: 'Supplier restored successfully',
      metadata: result,
    };
  }
}
