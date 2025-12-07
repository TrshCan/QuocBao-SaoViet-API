import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ClassUpdateUserDto } from '../dto';

export const UpdateUserApiOperation = () => {
  return ApiOperation({
    summary: 'Update User',
    description: `
          * Update an existing user's information
          * Validates email uniqueness if email is being changed
          * All fields are optional (partial update)
          * Requires ADMIN role
          * Return if successful:
          * - updated user information (without password and secretOtp)
          * If failed:
          * - error message (e.g., user not found, email already exists, validation error)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Update user information',
    },
  });
};

export const UpdateUserApiParam = () => {
  return ApiParam({
    name: 'userId',
    type: String,
    description: 'User ID (UUID)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const UpdateUserApiBody = () => {
  return ApiBody({
    type: ClassUpdateUserDto,
    description: 'User update data (all fields optional)',
    examples: {
      example1: {
        value: {
          fullName: 'John Doe Updated',
          email: 'john.doe.updated@example.com',
          phone: '+1234567891',
          role: 'ADMIN',
          status: 'ACTIVE',
        },
        summary: 'Update multiple fields',
      },
      example2: {
        value: {
          fullName: 'Jane Smith',
        },
        summary: 'Update single field',
      },
    },
  });
};

export const UpdateUserApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User updated successfully',
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
