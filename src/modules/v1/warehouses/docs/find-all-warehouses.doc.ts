import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const FindAllWarehousesApiOperation = () => {
  return ApiOperation({
    summary: 'Find All Warehouses',
    description: `
          * Lấy danh sách tất cả kho
          * Chỉ trả về kho chưa bị xóa (isDelete = false)
          * Sắp xếp theo thời gian tạo mới nhất
          * Return if successful:
          * - danh sách kho
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy danh sách tất cả kho',
    },
  });
};

export const FindAllWarehousesApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Danh sách kho đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Danh sách kho đã được lấy thành công',
        },
        metadata: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              maKho: { type: 'string' },
              tenKho: { type: 'string' },
              diaChi: { type: 'string', nullable: true },
              dienTich: { type: 'string', nullable: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              createdBy: { type: 'string', nullable: true },
              updatedBy: { type: 'string', nullable: true },
              isDelete: { type: 'boolean' },
            },
          },
        },
      },
    },
  });
};
