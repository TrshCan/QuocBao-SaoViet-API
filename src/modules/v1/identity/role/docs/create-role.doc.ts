import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassRoleCreationDto } from '../dto';

export const CreateRoleApiOperation = () => {
  return ApiOperation({
    summary: 'Create Role',
    description: `
          * Create a new role in the system
          * Optionally assign a parent role during creation
          * Creates role closure table entries for hierarchy
          * Requires ADMIN role
          * Return if successful:
          * - created role information
          * - addParent flag (if parent was assigned)
          * If failed:
          * - error message (e.g., validation error, duplicate role)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Create a new role',
    },
  });
};

export const CreateRoleApiBody = () => {
  return ApiBody({
    type: ClassRoleCreationDto,
    description: 'Role creation data',
    examples: {
      example1: {
        value: {
          name: 'Manager',
          description: 'Manager role with elevated permissions',
        },
        summary: 'Create role without parent',
      },
      example2: {
        value: {
          name: 'Senior Manager',
          description: 'Senior manager role',
          parentRoleId: '01234567-89ab-cdef-0123-456789abcdef',
        },
        summary: 'Create role with parent',
      },
    },
  });
};

export const CreateRoleApiResponse = () => {
  return ApiResponse({
    status: 201,
    description: 'Role created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Role created successfully',
        },
        metadata: {
          type: 'object',
          properties: {
            role: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string', nullable: true },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
            addParent: {
              type: 'boolean',
              nullable: true,
              description: 'True if parent was assigned during creation',
            },
          },
        },
      },
    },
  });
};
