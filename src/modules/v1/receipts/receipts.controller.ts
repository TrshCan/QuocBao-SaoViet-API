import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/common/pipes/validation.pipe';
import { KEY_THROTTLER } from '@/common/constants';

import { ReceiptsService } from './receipts.service';
import {
  createReceiptSchema,
  findReceiptByIdSchema,
  validateReceiptSchema,
} from './validations';
import type { ResponseController } from '@/types/response-controller';
import type {
  CreateReceiptDto,
  FindReceiptByIdDto,
  ValidateReceiptDto,
} from './dto';

import {
  CreateReceiptApiBody,
  CreateReceiptApiOperation,
  CreateReceiptApiResponse,
} from './docs/create-receipt.doc';
import {
  FindAllReceiptsApiOperation,
  FindAllReceiptsApiResponse,
} from './docs/find-all-receipts.doc';
import {
  FindOneByIdApiOperation,
  FindOneByIdApiParam,
  FindOneByIdApiResponse,
} from './docs/find-one-by-id.doc';
import {
  ValidateReceiptApiOperation,
  ValidateReceiptApiParam,
  ValidateReceiptApiResponse,
} from './docs/validate-receipt.doc';

@Controller({ path: 'receipts', version: '1' })
@ApiTags('Receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UsePipes(new ZodValidationPipe({ body: createReceiptSchema }))
  @CreateReceiptApiOperation()
  @CreateReceiptApiBody()
  @CreateReceiptApiResponse()
  async create(
    @Body() dto: CreateReceiptDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.receiptsService.createReceipt(dto);
    return {
      message: 'Phiếu nhập kho đã được tạo thành công',
      metadata: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @FindAllReceiptsApiOperation()
  @FindAllReceiptsApiResponse()
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.receiptsService.findAll();
    return {
      message: 'Danh sách phiếu nhập kho đã được lấy thành công',
      metadata: result,
    };
  }

  @Put('validate/:id')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<ValidateReceiptDto, ValidateReceiptDto>({
      param: validateReceiptSchema.shape.id,
    }),
  )
  @ValidateReceiptApiOperation()
  @ValidateReceiptApiParam()
  @ValidateReceiptApiResponse()
  async validate(
    @Param('id') id: string,
  ): Promise<ResponseController<unknown>> {
    const result = await this.receiptsService.validateReceipt(id);
    return {
      message: 'Phiếu nhập kho đã được xác nhận thành công',
      metadata: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindReceiptByIdDto, FindReceiptByIdDto>({
      param: findReceiptByIdSchema.shape.id,
    }),
  )
  @FindOneByIdApiOperation()
  @FindOneByIdApiParam()
  @FindOneByIdApiResponse()
  async getById(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.receiptsService.getReceiptById(id);
    return {
      message: 'Phiếu nhập kho đã được lấy thành công',
      metadata: result,
    };
  }
}
