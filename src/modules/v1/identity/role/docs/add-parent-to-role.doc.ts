import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const AddParentToRoleApiOperation = () => {
  return ApiOperation({
    summary: 'Add Parent To Role',
    description: `
          * Add a parent role to a child role
          * Creates hierarchical relationship in role closure table
          * Prevents cycles (child cannot be ancestor of parent)
          * Prevents self-reference (role cannot be parent of itself)
          * Requires ADMIN role
          * Return if successful:
          * - boolean indicating success
          * If failed:
          * - error message (e.g., cycle detected, self-reference)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Add parent role to child role',
    },
  });
};

export const AddParentToRoleApiParam = () => {
  return ApiParam({
    name: 'roleId',
    type: String,
    description: 'Child role ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const AddParentToRoleApiParam2 = () => {
  return ApiParam({
    name: 'parentRoleId',
    type: String,
    description: 'Parent role ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const AddParentToRoleApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Parent added to role successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Parent added to role successfully',
        },
        metadata: {
          type: 'boolean',
          example: true,
        },
      },
    },
  });
};
