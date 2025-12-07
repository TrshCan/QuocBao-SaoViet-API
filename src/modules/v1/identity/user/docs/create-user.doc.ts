import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCreateUserDto } from '../dto';

export const CreateUserApiOperation = () => {
  return ApiOperation({
    summary: 'Create User',
    description: `
          * Create a new user in the system
          * Validates username uniqueness and email uniqueness (if provided)
          * Hashes password before storing
          * Requires ADMIN role
          * Return if successful:
          * - created user information (without password and secretOtp)
          * If failed:
          * - error message (e.g., username already exists, email already exists, validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Create a new user',
    },
  });
};

export const CreateUserApiBody = () => {
  return ApiBody({
    type: ClassCreateUserDto,
    description: 'User creation data',
    examples: {
      example1: {
        value: {
          username: 'john_doe',
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          password: 'SecurePassword123!',
          role: 'USER',
          avatar: 'https://example.com/avatar.jpg',
        },
        summary: 'Create user with all fields',
      },
      example2: {
        value: {
          username: 'jane_smith',
          fullName: 'Jane Smith',
          password: 'SecurePassword123!',
          role: 'ADMIN',
        },
        summary: 'Create user with minimal fields',
      },
    },
  });
};

export const CreateUserApiResponse = () => {
  return ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User created successfully',
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
