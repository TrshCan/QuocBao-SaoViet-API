import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindParentsByRoleIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Parents By Role ID',
    description: `
          * Get all parent roles for a given role
          * Returns all ancestors (depth > 0) of the specified role
          * Requires ADMIN role
          * Return if successful:
          * - array of parent role closures
          * - includes ancestor information and depth
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get parent roles for a role',
    },
  });
};

export const FindParentsByRoleIdApiParam = () => {
  return ApiParam({
    name: 'roleId',
    type: String,
    description: 'Role ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindParentsByRoleIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Parents roles fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Parents roles fetched successfully',
        },
        metadata: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ancestorId: { type: 'string' },
              descendantId: { type: 'string' },
              depth: { type: 'number' },
            },
          },
        },
      },
    },
  });
};
