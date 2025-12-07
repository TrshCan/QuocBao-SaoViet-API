import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindOneByIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Warehouse By ID',
    description: `
          * Lấy thông tin chi tiết một kho theo ID
          * Chỉ trả về kho chưa bị xóa (isDelete = false)
          * Return if successful:
          * - thông tin chi tiết kho
          * If failed:
          * - error message (e.g., không tìm thấy kho)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy thông tin kho theo ID',
    },
  });
};

export const FindOneByIdApiParam = () => {
  return ApiParam({
    name: 'id',
    type: String,
    description: 'ID kho',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindOneByIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Kho đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Kho đã được lấy thành công',
        },
        metadata: {
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
  });
};
