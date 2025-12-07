import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindOneByIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Receipt By ID',
    description: `
          * Lấy thông tin chi tiết một phiếu nhập kho theo ID
          * Bao gồm thông tin kho và chi tiết nhập kho (có thông tin sản phẩm)
          * Return if successful:
          * - thông tin chi tiết phiếu nhập kho với đầy đủ thông tin
          * If failed:
          * - error message (e.g., không tìm thấy phiếu nhập)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy thông tin phiếu nhập kho theo ID',
    },
  });
};

export const FindOneByIdApiParam = () => {
  return ApiParam({
    name: 'id',
    type: String,
    description: 'ID phiếu nhập kho',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindOneByIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Phiếu nhập kho đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Phiếu nhập kho đã được lấy thành công',
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
              description: 'Danh sách chi tiết nhập kho với thông tin sản phẩm',
              items: { type: 'object' },
            },
          },
        },
      },
    },
  });
};
