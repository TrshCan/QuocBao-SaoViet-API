import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UnitsService } from './units.service';

type CreateUnitDto = {
  ten: string;
  moTa?: string;
};

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  async create(@Body() dto: CreateUnitDto) {
    return this.unitsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.unitsService.findOne(Number(id));
  }
}

