import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindChildrenByRoleIdApiOperation = () => {
  return ApiOperation({
    summary: 'Find Children By Role ID',
    description: `
          * Get all child roles for a given role
          * Returns all descendants (depth > 0) of the specified role
          * Requires ADMIN role
          * Return if successful:
          * - array of child role closures
          * - includes descendant information and depth
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get child roles for a role',
    },
  });
};

export const FindChildrenByRoleIdApiParam = () => {
  return ApiParam({
    name: 'roleId',
    type: String,
    description: 'Role ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const FindChildrenByRoleIdApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Children roles fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Children roles fetched successfully',
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
