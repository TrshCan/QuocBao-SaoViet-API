import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetRoleTreeApiOperation = () => {
  return ApiOperation({
    summary: 'Get Role Tree',
    description: `
          * Get the hierarchical role tree structure
          * Returns roles organized in a tree with parent-child relationships
          * Requires ADMIN role
          * Return if successful:
          * - array of root role nodes with nested children
          * - each node contains role information and children array
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get role hierarchy tree',
    },
  });
};

export const GetRoleTreeApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Role tree fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Role tree fetched successfully',
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
              children: {
                type: 'array',
                description: 'Nested children roles',
                items: { type: 'object' },
              },
            },
          },
        },
      },
    },
  });
};
