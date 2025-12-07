import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassAuthLoginDto, ClassRequestAuthLoginDto } from '../dto';
import { ResponseTransformDto } from '@/common/validations/response-transform';

export const LoginApiOperation = () => {
  return ApiOperation({
    summary: 'Login',
    description: `
          * Login with username and password
          * Return if login successfully: 
          * - user omit password
          * - access token
          * - refresh token
          * - access token expires in
          * - refresh token expires in
          * - access token iat
          * - refresh token iat
          * - if login failed:
          * - - error message
          * - - error code
          * - - error status
          * - - error stack
          * - - error timestamp
          * - - error path
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Login with username and password',
    },
  });
};

export const LoginApiBody = () => {
  return ApiBody({
    type: ClassRequestAuthLoginDto,
    description: 'Login with username and password',
    examples: {
      admin: {
        value: {
          username: 'admin',
          password: 'Admin@123',
        },
      },
    },
  });
};

export const LoginApiResponse = () => {
  return ApiResponse({
    status: 200,
    type: ResponseTransformDto(ClassAuthLoginDto),
  });
};
