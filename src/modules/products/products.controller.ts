import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

type CreateProductDto = {
  maSanPham: string;
  tenSanPham: string;
  nhom?: string;
  moTa?: string;
  donViTinhId: number;
  quanLyLo?: boolean;
  quanLyHSD?: boolean;
  quanLySerial?: boolean;
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }
}

