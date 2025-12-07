import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindOneByIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Role By ID',
    description: `
          * Get a single role by its ID with full details
          * Includes parent roles, child roles, ancestors, descendants, and permissions
          * Requires ADMIN role
          * Return if successful:
          * - role information
          * - direct parents (depth=1)
          * - direct children (depth=1)
          * - all ancestors (depth >= 1)
          * - all descendants (depth >= 1)
          * - inherited permissions from ancestor roles
          * If failed:
          * - error message (e.g., role not found)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get role by ID with full details',
    },
  });
};

export const FindOneByIdApiParam = () => {
  return ApiParam({
    name: 'roleId',
    type: String,
    description: 'Role ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindOneByIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Role fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Role fetched successfully',
        },
        metadata: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            parents: { type: 'array' },
            children: { type: 'array' },
            ancestors: { type: 'array' },
            descendants: { type: 'array' },
            permissions: { type: 'array' },
          },
        },
      },
    },
  });
};
