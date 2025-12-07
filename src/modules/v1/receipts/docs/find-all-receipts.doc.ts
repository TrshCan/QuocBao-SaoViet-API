import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const FindAllReceiptsApiOperation = () => {
  return ApiOperation({
    summary: 'Find All Receipts',
    description: `
          * Lấy danh sách tất cả phiếu nhập kho
          * Chỉ trả về phiếu nhập chưa bị xóa (isDelete = false)
          * Sắp xếp theo thời gian tạo mới nhất
          * Bao gồm thông tin kho và chi tiết nhập kho (có thông tin sản phẩm)
          * Return if successful:
          * - danh sách phiếu nhập kho với đầy đủ thông tin
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy danh sách tất cả phiếu nhập kho',
    },
  });
};

export const FindAllReceiptsApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Danh sách phiếu nhập kho đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Danh sách phiếu nhập kho đã được lấy thành công',
        },
        metadata: {
          type: 'array',
          items: {
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
                description:
                  'Danh sách chi tiết nhập kho với thông tin sản phẩm',
                items: { type: 'object' },
              },
            },
          },
        },
      },
    },
  });
};
