import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCreateUnitDto } from '../dto';

export const CreateUnitApiOperation = () => {
  return ApiOperation({
    summary: 'Create Unit',
    description: `
          * Tạo mới một đơn vị tính trong hệ thống
          * Tên đơn vị tính là bắt buộc
          * Mô tả là tùy chọn
          * Return if successful:
          * - thông tin đơn vị tính đã tạo
          * If failed:
          * - error message (e.g., validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Tạo mới đơn vị tính',
    },
  });
};

export const CreateUnitApiBody = () => {
  return ApiBody({
    type: ClassCreateUnitDto,
    description: 'Dữ liệu tạo đơn vị tính',
    examples: {
      example1: {
        value: {
          ten: 'Cái',
          moTa: 'Đơn vị tính theo cái',
        },
        summary: 'Tạo đơn vị tính với đầy đủ thông tin',
      },
      example2: {
        value: {
          ten: 'Kg',
        },
        summary: 'Tạo đơn vị tính với thông tin tối thiểu',
      },
    },
  });
};

export const CreateUnitApiResponse = () => {
  return ApiResponse({
    status: 201,
    description: 'Đơn vị tính đã được tạo thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Đơn vị tính đã được tạo thành công',
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
