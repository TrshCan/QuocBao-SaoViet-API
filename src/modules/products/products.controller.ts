import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

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
  async create(@Body() dto: CreateProductDto) {
    const result = await this.productsService.create(dto);
    return {
      message: 'Sản phẩm đã được tạo thành công',
      metadata: result,
    };
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
