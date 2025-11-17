import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { ResponseController } from '@/types/response-controller';

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
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.warehousesService.findAll();
    return {
      message: 'Danh sách kho đã được lấy thành công',
      metadata: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.warehousesService.findOne(id);
    return {
      message: 'Kho đã được lấy thành công',
      metadata: result,
    };
  }
}
