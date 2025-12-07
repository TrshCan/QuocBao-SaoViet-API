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

import { ProductsService } from './products.service';
import { createProductSchema, findProductByIdSchema } from './validations';
import type { ResponseController } from '@/types/response-controller';
import type { CreateProductDto, FindProductByIdDto } from './dto';

import {
  CreateProductApiBody,
  CreateProductApiOperation,
  CreateProductApiResponse,
} from './docs/create-product.doc';
import {
  FindAllProductsApiOperation,
  FindAllProductsApiResponse,
} from './docs/find-all-products.doc';
import {
  FindOneByIdApiOperation,
  FindOneByIdApiParam,
  FindOneByIdApiResponse,
} from './docs/find-one-by-id.doc';

@Controller({ path: 'products', version: '1' })
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UsePipes(new ZodValidationPipe({ body: createProductSchema }))
  @CreateProductApiOperation()
  @CreateProductApiBody()
  @CreateProductApiResponse()
  async create(
    @Body() dto: CreateProductDto,
  ): Promise<ResponseController<unknown>> {
    const result = await this.productsService.create(dto);
    return {
      message: 'Sản phẩm đã được tạo thành công',
      metadata: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @FindAllProductsApiOperation()
  @FindAllProductsApiResponse()
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.productsService.findAll();
    return {
      message: 'Danh sách sản phẩm đã được lấy thành công',
      metadata: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 50, ttl: 60000 } })
  @UsePipes(
    new ZodValidationPipe<FindProductByIdDto, FindProductByIdDto>({
      param: findProductByIdSchema.shape.id,
    }),
  )
  @FindOneByIdApiOperation()
  @FindOneByIdApiParam()
  @FindOneByIdApiResponse()
  async findOne(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.productsService.findOne(id);
    return {
      message: 'Sản phẩm đã được lấy thành công',
      metadata: result,
    };
  }
}
