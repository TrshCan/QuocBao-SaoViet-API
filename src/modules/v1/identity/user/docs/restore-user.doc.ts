import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const RestoreUserApiOperation = () => {
  return ApiOperation({
    summary: 'Restore User',
    description: `
          * Restore a soft-deleted user
          * Sets isDelete flag to false
          * Requires ADMIN role
          * Return if successful:
          * - restored user information (without password and secretOtp)
          * If failed:
          * - error message (e.g., user not found)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Restore a soft-deleted user',
    },
  });
};

export const RestoreUserApiParam = () => {
  return ApiParam({
    name: 'userId',
    type: String,
    description: 'User ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const RestoreUserApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'User restored successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User restored successfully',
        },
        metadata: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            fullName: { type: 'string' },
            email: { type: 'string', nullable: true },
            phone: { type: 'string', nullable: true },
            role: { type: 'string' },
            avatar: { type: 'string', nullable: true },
            status: { type: 'string' },
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
