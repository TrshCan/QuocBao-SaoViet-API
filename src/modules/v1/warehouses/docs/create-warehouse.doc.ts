import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCreateWarehouseDto } from '../dto';

export const CreateWarehouseApiOperation = () => {
  return ApiOperation({
    summary: 'Create Warehouse',
    description: `
          * Tạo mới một kho trong hệ thống
          * Validate mã kho phải duy nhất
          * Tên kho là bắt buộc
          * Địa chỉ và diện tích là tùy chọn
          * Return if successful:
          * - thông tin kho đã tạo
          * If failed:
          * - error message (e.g., mã kho đã tồn tại, validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Tạo mới kho',
    },
  });
};

export const CreateWarehouseApiBody = () => {
  return ApiBody({
    type: ClassCreateWarehouseDto,
    description: 'Dữ liệu tạo kho',
    examples: {
      example1: {
        value: {
          maKho: 'KHO001',
          tenKho: 'Kho chính',
          diaChi: '123 Đường ABC, Quận 1, TP.HCM',
          dienTich: '500.50',
        },
        summary: 'Tạo kho với đầy đủ thông tin',
      },
      example2: {
        value: {
          maKho: 'KHO002',
          tenKho: 'Kho phụ',
        },
        summary: 'Tạo kho với thông tin tối thiểu',
      },
    },
  });
};

export const CreateWarehouseApiResponse = () => {
  return ApiResponse({
    status: 201,
    description: 'Kho đã được tạo thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Kho đã được tạo thành công',
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
