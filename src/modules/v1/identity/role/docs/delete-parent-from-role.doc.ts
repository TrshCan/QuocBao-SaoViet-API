import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const DeleteParentFromRoleApiOperation = () => {
  return ApiOperation({
    summary: 'Delete Parent From Role',
    description: `
          * Remove a parent role relationship from a child role
          * Deletes hierarchical relationship from role closure table
          * Only removes direct parent relationships (depth=1)
          * Requires ADMIN role
          * Return if successful:
          * - boolean indicating success
          * If failed:
          * - error message (e.g., parent is not a direct parent)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Remove parent role from child role',
    },
  });
};

export const DeleteParentFromRoleApiParam = () => {
  return ApiParam({
    name: 'roleId',
    type: String,
    description: 'Child role ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const DeleteParentFromRoleApiParam2 = () => {
  return ApiParam({
    name: 'parentRoleId',
    type: String,
    description: 'Parent role ID (UUID) to remove',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const DeleteParentFromRoleApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Parent deleted from role successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Parent deleted from role successfully',
        },
        metadata: {
          type: 'boolean',
          example: true,
        },
      },
    },
  });
};
