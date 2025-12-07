import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCreateSupplierDto } from '../dto';

export const CreateSupplierApiOperation = () => {
  return ApiOperation({
    summary: 'Create Supplier',
    description: `
          * Create a new supplier in the system
          * Supplier name is required
          * Other fields (address, contact person, phone) are optional
          * Return if successful:
          * - created supplier information
          * If failed:
          * - error message (e.g., validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Create a new supplier',
    },
  });
};

export const CreateSupplierApiBody = () => {
  return ApiBody({
    type: ClassCreateSupplierDto,
    description: 'Supplier creation data',
    examples: {
      example1: {
        value: {
          tenNhaCungCap: 'ABC Company',
          diaChi: '123 Main Street, City',
          nguoiLienHe: 'John Doe',
          soDienThoai: '+1234567890',
        },
        summary: 'Create supplier with all fields',
      },
      example2: {
        value: {
          tenNhaCungCap: 'XYZ Corporation',
        },
        summary: 'Create supplier with minimal fields',
      },
    },
  });
};

export const CreateSupplierApiResponse = () => {
  return ApiResponse({
    status: 201,
    description: 'Supplier created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Supplier created successfully',
        },
        metadata: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            tenNhaCungCap: { type: 'string' },
            diaChi: { type: 'string', nullable: true },
            nguoiLienHe: { type: 'string', nullable: true },
            soDienThoai: { type: 'string', nullable: true },
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
