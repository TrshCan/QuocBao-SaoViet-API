import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCreateReceiptDto } from '../dto';

export const CreateReceiptApiOperation = () => {
  return ApiOperation({
    summary: 'Create Receipt',
    description: `
          * Tạo mới một phiếu nhập kho
          * Tự động tạo số phiếu theo định dạng PNK-YYYYMMDD-XXXXXX
          * Tạo phiếu ở trạng thái DRAFT
          * Validate danh sách hàng nhập không được rỗng
          * Return if successful:
          * - thông tin phiếu nhập kho đã tạo (bao gồm chi tiết và thông tin kho)
          * If failed:
          * - error message (e.g., danh sách hàng nhập rỗng, validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Tạo mới phiếu nhập kho',
    },
  });
};

export const CreateReceiptApiBody = () => {
  return ApiBody({
    type: ClassCreateReceiptDto,
    description: 'Dữ liệu tạo phiếu nhập kho',
    examples: {
      example1: {
        value: {
          khoId: '01234567-89ab-cdef-0123-456789abcdef',
          ghiChu: 'Nhập hàng từ nhà cung cấp ABC',
          items: [
            {
              sanPhamId: '01234567-89ab-cdef-0123-456789abcdef',
              soLuong: '100',
              donGia: '50000',
              soLo: 'LOT001',
              hanSuDung: '2025-12-31T00:00:00Z',
            },
            {
              sanPhamId: '01234567-89ab-cdef-0123-456789abcdef',
              soLuong: '50',
              donGia: '75000',
              soSerial: 'SERIAL001',
            },
          ],
        },
        summary: 'Tạo phiếu nhập với đầy đủ thông tin',
      },
      example2: {
        value: {
          khoId: '01234567-89ab-cdef-0123-456789abcdef',
          items: [
            {
              sanPhamId: '01234567-89ab-cdef-0123-456789abcdef',
              soLuong: '200',
            },
          ],
        },
        summary: 'Tạo phiếu nhập với thông tin tối thiểu',
      },
    },
  });
};

export const CreateReceiptApiResponse = () => {
  return ApiResponse({
    status: 201,
    description: 'Phiếu nhập kho đã được tạo thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Phiếu nhập kho đã được tạo thành công',
        },
        metadata: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            soPhieu: { type: 'string' },
            khoId: { type: 'string' },
            ngayNhap: { type: 'string', format: 'date-time' },
            ghiChu: { type: 'string', nullable: true },
            trangThai: { type: 'string', enum: ['DRAFT', 'DONE'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            kho: {
              type: 'object',
              description: 'Thông tin kho',
            },
            chiTiet: {
              type: 'array',
              description: 'Danh sách chi tiết nhập kho',
              items: { type: 'object' },
            },
          },
        },
      },
    },
  });
};
