import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';

type CreateWarehouseDto = {
  maKho: string;
  tenKho: string;
  diaChi?: string;
  dienTich?: string;
};

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  async create(@Body() dto: CreateWarehouseDto) {
    return this.warehousesService.create(dto);
  }

  @Get()
  async findAll() {
    return this.warehousesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.warehousesService.findOne(Number(id));
  }
}

