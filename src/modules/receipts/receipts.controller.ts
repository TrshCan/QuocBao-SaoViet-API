import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';

type CreateReceiptItemDto = {
  sanPhamId: string;
  soLuong: string;
  donGia?: string;
  soLo?: string;
  hanSuDung?: string;
  soSerial?: string;
};

type CreateReceiptDto = {
  khoId: string;
  ghiChu?: string;
  items: CreateReceiptItemDto[];
};

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  async create(@Body() dto: CreateReceiptDto) {
    return this.receiptsService.createReceipt(dto);
  }

  @Get()
  async findAll() {
    return this.receiptsService.findAll();
  }

  @Put('validate/:id')
  async validate(@Param('id') id: string) {
    return this.receiptsService.validateReceipt(id);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.receiptsService.getReceiptById(id);
  }
}
