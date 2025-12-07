import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const FindAllProductsApiOperation = () => {
  return ApiOperation({
    summary: 'Find All Products',
    description: `
          * Lấy danh sách tất cả sản phẩm
          * Chỉ trả về sản phẩm chưa bị xóa (isDelete = false)
          * Sắp xếp theo thời gian tạo mới nhất
          * Bao gồm thông tin đơn vị tính
          * Return if successful:
          * - danh sách sản phẩm với đơn vị tính
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy danh sách tất cả sản phẩm',
    },
  });
};

export const FindAllProductsApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Danh sách sản phẩm đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Danh sách sản phẩm đã được lấy thành công',
        },
        metadata: {
          type: 'array',
          items: {
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
    },
  });
};
