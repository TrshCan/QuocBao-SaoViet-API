import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCreateProductDto } from '../dto';

export const CreateProductApiOperation = () => {
  return ApiOperation({
    summary: 'Create Product',
    description: `
          * Tạo mới một sản phẩm trong hệ thống
          * Validate mã sản phẩm phải duy nhất
          * Yêu cầu đơn vị tính phải tồn tại
          * Return if successful:
          * - thông tin sản phẩm đã tạo (bao gồm đơn vị tính)
          * If failed:
          * - error message (e.g., mã sản phẩm đã tồn tại, validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Tạo mới sản phẩm',
    },
  });
};

export const CreateProductApiBody = () => {
  return ApiBody({
    type: ClassCreateProductDto,
    description: 'Dữ liệu tạo sản phẩm',
    examples: {
      example1: {
        value: {
          maSanPham: 'SP001',
          tenSanPham: 'Sản phẩm mẫu',
          nhom: 'Nhóm A',
          moTa: 'Mô tả sản phẩm mẫu',
          donViTinhId: '01234567-89ab-cdef-0123-456789abcdef',
          quanLyLo: true,
          quanLyHSD: false,
          quanLySerial: true,
        },
        summary: 'Tạo sản phẩm với đầy đủ thông tin',
      },
      example2: {
        value: {
          maSanPham: 'SP002',
          tenSanPham: 'Sản phẩm đơn giản',
          donViTinhId: '01234567-89ab-cdef-0123-456789abcdef',
        },
        summary: 'Tạo sản phẩm với thông tin tối thiểu',
      },
    },
  });
};

export const CreateProductApiResponse = () => {
  return ApiResponse({
    status: 201,
    description: 'Sản phẩm đã được tạo thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Sản phẩm đã được tạo thành công',
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
