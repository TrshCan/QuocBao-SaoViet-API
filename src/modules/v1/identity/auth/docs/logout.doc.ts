import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const LogoutApiOperation = () => {
  return ApiOperation({
    summary: 'Logout',
    description: `
          * Logout the current user
          * Requires valid refresh token in header
          * Requires valid access token in header
          * Invalidates the current session
          * Removes key store from database
          * Adds access token to blacklist
          * Return if logout successfully:
          * - boolean result
          * If logout failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Logout the current user',
    },
  });
};

export const LogoutApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Logout successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Logout successfully!',
        },
        metadata: {
          type: 'boolean',
          example: true,
        },
      },
    },
  });
};
