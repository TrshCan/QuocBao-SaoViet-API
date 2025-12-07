import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ClassUpdateSupplierDto } from '../dto';

export const UpdateSupplierApiOperation = () => {
  return ApiOperation({
    summary: 'Update Supplier',
    description: `
          * Update an existing supplier's information
          * All fields are optional (partial update)
          * Return if successful:
          * - updated supplier information
          * If failed:
          * - error message (e.g., supplier not found, validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Update supplier information',
    },
  });
};

export const UpdateSupplierApiParam = () => {
  return ApiParam({
    name: 'supplierId',
    type: String,
    description: 'Supplier ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const UpdateSupplierApiBody = () => {
  return ApiBody({
    type: ClassUpdateSupplierDto,
    description: 'Supplier update data (all fields optional)',
    examples: {
      example1: {
        value: {
          tenNhaCungCap: 'ABC Company Updated',
          diaChi: '456 New Street, City',
          nguoiLienHe: 'Jane Smith',
          soDienThoai: '+1234567891',
        },
        summary: 'Update multiple fields',
      },
      example2: {
        value: {
          tenNhaCungCap: 'XYZ Corporation',
        },
        summary: 'Update single field',
      },
    },
  });
};

export const UpdateSupplierApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Supplier updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Supplier updated successfully',
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
