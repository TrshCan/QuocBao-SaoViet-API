import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const DeleteUserApiOperation = () => {
  return ApiOperation({
    summary: 'Delete User',
    description: `
          * Soft delete a user from the system
          * Sets isDelete flag to true (soft delete)
          * Requires ADMIN role
          * Return if successful:
          * - success boolean
          * If failed:
          * - error message (e.g., user not found)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Soft delete a user',
    },
  });
};

export const DeleteUserApiParam = () => {
  return ApiParam({
    name: 'userId',
    type: String,
    description: 'User ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const DeleteUserApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User deleted successfully',
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
