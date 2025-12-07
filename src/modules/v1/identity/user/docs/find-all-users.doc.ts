import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ClassFindAllUsersDto } from '../dto';

export const FindAllUsersApiOperation = () => {
  return ApiOperation({
    summary: 'Find All Users',
    description: `
          * Get a paginated list of all users
          * Supports pagination, search, sorting, and status filtering
          * Requires ADMIN role
          * Returns users without password and secretOtp fields
          * Return if successful:
          * - paginated list of users
          * - total count
          * - page information
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get all users with pagination',
    },
  });
};

export const FindAllUsersApiQuery = () => {
  return ApiQuery({
    name: 'query',
    type: ClassFindAllUsersDto,
    required: false,
    description:
      'Query parameters for pagination, search, sorting, and status filter',
    example: {
      page: 1,
      limit: 10,
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      status: 'ACTIVE',
    },
  });
};

export const FindAllUsersApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Users fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Users fetched successfully',
        },
        metadata: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
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
                },
              },
            },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'number' },
                limit: { type: 'number' },
                total: { type: 'number' },
                totalPages: { type: 'number' },
              },
            },
          },
        },
      },
    },
  });
};
