import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindOneByIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Supplier By ID',
    description: `
          * Get a single supplier by its ID
          * Returns only non-deleted suppliers (isDelete = false)
          * Return if successful:
          * - supplier information
          * - all supplier fields
          * If failed:
          * - error message (e.g., supplier not found)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get supplier by ID',
    },
  });
};

export const FindOneByIdApiParam = () => {
  return ApiParam({
    name: 'supplierId',
    type: String,
    description: 'Supplier ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindOneByIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Supplier fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Supplier fetched successfully',
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
