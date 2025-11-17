import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UnitsService } from './units.service';
import { ResponseController } from '@/types/response-controller';

type CreateUnitDto = {
  ten: string;
  moTa?: string;
};

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
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
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.unitsService.findAll();
    return {
      message: 'Danh sách đơn vị tính đã được lấy thành công',
      metadata: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.unitsService.findOne(id);
    return {
      message: 'Đơn vị tính đã được lấy thành công',
      metadata: result,
    };
  }
}
