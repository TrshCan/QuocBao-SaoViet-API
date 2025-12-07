import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const MeApiOperation = () => {
  return ApiOperation({
    summary: 'Get current user',
    description: `
            * Only authenticated user can use this API
            * Get current user information
            * Requires valid access token in header
            * Return if successful:
            * - user information without password
            * If failed:
            * - error message (e.g., authentication required, token invalid)
            * - error code
            * - error status
        `,
  });
};

export const MeApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Get current user successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Token is valid',
        },
        metadata: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            fullName: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  });
};
