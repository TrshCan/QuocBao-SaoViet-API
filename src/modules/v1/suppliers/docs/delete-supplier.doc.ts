import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const DeleteSupplierApiOperation = () => {
  return ApiOperation({
    summary: 'Delete Supplier',
    description: `
          * Soft delete a supplier from the system
          * Sets isDelete flag to true (soft delete)
          * Return if successful:
          * - success boolean
          * If failed:
          * - error message (e.g., supplier not found)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Soft delete a supplier',
    },
  });
};

export const DeleteSupplierApiParam = () => {
  return ApiParam({
    name: 'supplierId',
    type: String,
    description: 'Supplier ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const DeleteSupplierApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Supplier deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Supplier deleted successfully',
        },
        metadata: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
          },
        },
      },
    },
  });
};
