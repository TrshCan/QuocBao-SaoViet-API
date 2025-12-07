import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const RestoreSupplierApiOperation = () => {
  return ApiOperation({
    summary: 'Restore Supplier',
    description: `
          * Restore a soft-deleted supplier
          * Sets isDelete flag to false
          * Return if successful:
          * - restored supplier information
          * If failed:
          * - error message (e.g., supplier not found)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Restore a soft-deleted supplier',
    },
  });
};

export const RestoreSupplierApiParam = () => {
  return ApiParam({
    name: 'supplierId',
    type: String,
    description: 'Supplier ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const RestoreSupplierApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Supplier restored successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Supplier restored successfully',
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
