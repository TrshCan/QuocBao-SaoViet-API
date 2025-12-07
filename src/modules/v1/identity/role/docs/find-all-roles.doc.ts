import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ClassFindAllRolesDto } from '../dto';

export const FindAllRolesApiOperation = () => {
  return ApiOperation({
    summary: 'Find All Roles',
    description: `
          * Get a paginated list of all roles
          * Supports pagination, search, and sorting
          * Requires ADMIN role
          * Return if successful:
          * - paginated list of roles
          * - total count
          * - page information
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get all roles with pagination',
    },
  });
};

export const FindAllRolesApiQuery = () => {
  return ApiQuery({
    name: 'query',
    type: ClassFindAllRolesDto,
    required: false,
    description: 'Query parameters for pagination, search, and sorting',
    example: {
      page: 1,
      limit: 10,
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    },
  });
};

export const FindAllRolesApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Roles fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Roles fetched successfully',
        },
        metadata: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string', nullable: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  });
};
