import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/common/pipes/validation.pipe';
import { KEY_THROTTLER } from '@/common/constants';

import { WarehousesService } from './warehouses.service';
import { createWarehouseSchema, findWarehouseByIdSchema } from './validations';
import type { ResponseController } from '@/types/response-controller';
import type { CreateWarehouseDto, FindWarehouseByIdDto } from './dto';

import {
  CreateWarehouseApiBody,
  CreateWarehouseApiOperation,
  CreateWarehouseApiResponse,
} from './docs/create-warehouse.doc';
import {
  FindAllWarehousesApiOperation,
  FindAllWarehousesApiResponse,
} from './docs/find-all-warehouses.doc';
import {
  FindOneByIdApiOperation,
  FindOneByIdApiParam,
  FindOneByIdApiResponse,
} from './docs/find-one-by-id.doc';

@Controller({ path: 'warehouses', version: '1' })
@ApiTags('Warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UsePipes(new ZodValidationPipe({ body: createWarehouseSchema }))
  @CreateWarehouseApiOperation()
  @CreateWarehouseApiBody()
  @CreateWarehouseApiResponse()
  async create(
    @Body() dto: CreateWarehouseDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.warehousesService.create(dto);
    return {
      message: 'Kho đã được tạo thành công',
      metadata: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @FindAllWarehousesApiOperation()
  @FindAllWarehousesApiResponse()
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.warehousesService.findAll();
    return {
      message: 'Danh sách kho đã được lấy thành công',
      metadata: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindWarehouseByIdDto, FindWarehouseByIdDto>({
      param: findWarehouseByIdSchema.shape.id,
    }),
  )
  @FindOneByIdApiOperation()
  @FindOneByIdApiParam()
  @FindOneByIdApiResponse()
  async findOne(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.warehousesService.findOne(id);
    return {
      message: 'Kho đã được lấy thành công',
      metadata: result,
    };
  }
}
