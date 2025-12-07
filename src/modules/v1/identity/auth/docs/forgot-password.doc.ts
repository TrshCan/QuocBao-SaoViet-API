import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassRequestAuthForgotPasswordDto } from '../dto';

export const ForgotPasswordApiOperation = () => {
  return ApiOperation({
    summary: 'Forgot Password',
    description: `
          * Request password reset link
          * Requires username and email
          * Validates user exists and email matches
          * Generates temporary reset token
          * Sends reset link to user's email
          * Return if request successfully:
          * - user email (masked)
          * If request failed:
          * - error message (e.g., user not found, email mismatch)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Request password reset',
    },
  });
};

export const ForgotPasswordApiBody = () => {
  return ApiBody({
    type: ClassRequestAuthForgotPasswordDto,
    description: 'Forgot password with username and email',
    examples: {
      example1: {
        value: {
          username: 'admin',
          email: 'admin@example.com',
        },
      },
    },
  });
};

export const ForgotPasswordApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Password reset email sent successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Successfully sent email to reset password!',
        },
        metadata: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'ad***@example.com',
            },
          },
        },
      },
    },
  });
};
