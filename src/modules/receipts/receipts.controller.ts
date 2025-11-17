import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ResponseController } from '@/types/response-controller';

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
  async findAll(): Promise<ResponseController<unknown>> {
    const result = await this.receiptsService.findAll();
    return {
      message: 'Danh sách phiếu nhập kho đã được lấy thành công',
      metadata: result,
    };
  }

  @Put('validate/:id')
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
  async getById(@Param('id') id: string): Promise<ResponseController<unknown>> {
    const result = await this.receiptsService.getReceiptById(id);
    return {
      message: 'Phiếu nhập kho đã được lấy thành công',
      metadata: result,
    };
  }
}
