import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const FindAllUnitsApiOperation = () => {
  return ApiOperation({
    summary: 'Find All Units',
    description: `
          * Lấy danh sách tất cả đơn vị tính
          * Chỉ trả về đơn vị tính chưa bị xóa (isDelete = false)
          * Sắp xếp theo thời gian tạo mới nhất
          * Return if successful:
          * - danh sách đơn vị tính
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy danh sách tất cả đơn vị tính',
    },
  });
};

export const FindAllUnitsApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Danh sách đơn vị tính đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Danh sách đơn vị tính đã được lấy thành công',
        },
        metadata: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              ten: { type: 'string' },
              moTa: { type: 'string', nullable: true },
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
