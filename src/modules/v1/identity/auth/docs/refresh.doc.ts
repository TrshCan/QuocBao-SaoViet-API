import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const RefreshApiOperation = () => {
  return ApiOperation({
    summary: 'Refresh Token',
    description: `
          * Refresh access token and refresh token
          * Requires valid refresh token in header
          * Generates new token pair
          * Marks old refresh token as used
          * Return if refresh successfully:
          * - user information
          * - new access token
          * - new refresh token
          * - access token expires in
          * - refresh token expires in
          * - access token iat
          * - refresh token iat
          * If refresh failed:
          * - error message (e.g., token reused, invalid token)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Refresh token pair',
    },
  });
};

export const RefreshApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Refresh token successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Refresh token successfully!',
        },
        metadata: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                username: { type: 'string' },
                fullName: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
              },
            },
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            expiresInAccessToken: { type: 'number' },
            expiresInRefreshToken: { type: 'number' },
            iatAccessToken: { type: 'number' },
            iatRefreshToken: { type: 'number' },
          },
        },
      },
    },
  });
};
