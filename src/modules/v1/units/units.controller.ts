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

import { UnitsService } from './units.service';
import { createUnitSchema, findUnitByIdSchema } from './validations';
import type { ResponseController } from '@/types/response-controller';
import type { CreateUnitDto, FindUnitByIdDto } from './dto';

import {
  CreateUnitApiBody,
  CreateUnitApiOperation,
  CreateUnitApiResponse,
} from './docs/create-unit.doc';
import {
  FindAllUnitsApiOperation,
  FindAllUnitsApiResponse,
} from './docs/find-all-units.doc';
import {
  FindOneByIdApiOperation,
  FindOneByIdApiParam,
  FindOneByIdApiResponse,
} from './docs/find-one-by-id.doc';

@Controller({ path: 'units', version: '1' })
@ApiTags('Units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UsePipes(new ZodValidationPipe({ body: createUnitSchema }))
  @CreateUnitApiOperation()
  @CreateUnitApiBody()
  @CreateUnitApiResponse()
  async create(
    @Body() dto: CreateUnitDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.unitsService.create(dto);
    return {
      message: 'Đơn vị tính đã được tạo thành công',
      metadata: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @FindAllUnitsApiOperation()
  @FindAllUnitsApiResponse()
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.unitsService.findAll();
    return {
      message: 'Danh sách đơn vị tính đã được lấy thành công',
      metadata: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindUnitByIdDto, FindUnitByIdDto>({
      param: findUnitByIdSchema.shape.id,
    }),
  )
  @FindOneByIdApiOperation()
  @FindOneByIdApiParam()
  @FindOneByIdApiResponse()
  async findOne(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.unitsService.findOne(id);
    return {
      message: 'Đơn vị tính đã được lấy thành công',
      metadata: result,
    };
  }
}
