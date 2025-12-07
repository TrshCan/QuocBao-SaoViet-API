import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindOneByIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Product By ID',
    description: `
          * Lấy thông tin chi tiết một sản phẩm theo ID
          * Chỉ trả về sản phẩm chưa bị xóa (isDelete = false)
          * Bao gồm thông tin đơn vị tính
          * Return if successful:
          * - thông tin chi tiết sản phẩm với đơn vị tính
          * If failed:
          * - error message (e.g., không tìm thấy sản phẩm)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy thông tin sản phẩm theo ID',
    },
  });
};

export const FindOneByIdApiParam = () => {
  return ApiParam({
    name: 'id',
    type: String,
    description: 'ID sản phẩm',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindOneByIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Sản phẩm đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Sản phẩm đã được lấy thành công',
        },
        metadata: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            maSanPham: { type: 'string' },
            tenSanPham: { type: 'string' },
            nhom: { type: 'string', nullable: true },
            moTa: { type: 'string', nullable: true },
            donViTinhId: { type: 'string' },
            quanLyLo: { type: 'boolean' },
            quanLyHSD: { type: 'boolean' },
            quanLySerial: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            createdBy: { type: 'string', nullable: true },
            updatedBy: { type: 'string', nullable: true },
            isDelete: { type: 'boolean' },
            donViTinh: {
              type: 'object',
              description: 'Thông tin đơn vị tính',
            },
          },
        },
      },
    },
  });
};
