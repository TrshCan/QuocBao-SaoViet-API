import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ResponseController } from '@/types/response-controller';

type CreateProductDto = {
  maSanPham: string;
  tenSanPham: string;
  nhom?: string;
  moTa?: string;
  donViTinhId: string;
  quanLyLo?: boolean;
  quanLyHSD?: boolean;
  quanLySerial?: boolean;
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
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
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.productsService.findAll();
    return {
      message: 'Danh sách sản phẩm đã được lấy thành công',
      metadata: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.productsService.findOne(id);
    return {
      message: 'Sản phẩm đã được lấy thành công',
      metadata: result,
    };
  }
}
