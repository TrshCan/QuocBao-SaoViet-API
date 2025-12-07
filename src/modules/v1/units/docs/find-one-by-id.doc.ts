import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindOneByIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Unit By ID',
    description: `
          * Lấy thông tin chi tiết một đơn vị tính theo ID
          * Chỉ trả về đơn vị tính chưa bị xóa (isDelete = false)
          * Return if successful:
          * - thông tin chi tiết đơn vị tính
          * If failed:
          * - error message (e.g., không tìm thấy đơn vị tính)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Lấy thông tin đơn vị tính theo ID',
    },
  });
};

export const FindOneByIdApiParam = () => {
  return ApiParam({
    name: 'id',
    type: String,
    description: 'ID đơn vị tính',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindOneByIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Đơn vị tính đã được lấy thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Đơn vị tính đã được lấy thành công',
        },
        metadata: {
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
  });
};
