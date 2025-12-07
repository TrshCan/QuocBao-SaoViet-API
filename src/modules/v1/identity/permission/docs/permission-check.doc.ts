import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ClassRequestPermissionCheckDto,
  ClassPermissionCheckDto,
} from '../dto';
import { ResponseTransformDto } from '@/common/validations/response-transform';

export const PermissionCheckApiOperation = () => {
  return ApiOperation({
    summary: 'Check Permission',
    description: `
          * Check if the current user has a specific permission
          * Requires valid access token in header
          * Validates permission format (resource.action or resource.subresource.action)
          * Supports optional context for ABAC (Attribute-Based Access Control)
          * Return if check successfully:
          * - hasPermission: boolean indicating if user has the permission
          * - permission: the permission string that was checked
          * - userId: the user ID that was checked
          * If check failed:
          * - error message (e.g., invalid permission format, authentication required)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Check user permission',
    },
  });
};

export const PermissionCheckApiBody = () => {
  return ApiBody({
    type: ClassRequestPermissionCheckDto,
    description: 'Check permission with permission string and optional context',
    examples: {
      example1: {
        value: {
          permission: 'reports.cost.read',
        },
        summary: 'Simple permission check',
      },
      example2: {
        value: {
          permission: 'inventory.update',
          context: {
            body: { warehouseId: 'warehouse-123' },
            params: { id: 'item-456' },
          },
        },
        summary: 'Permission check with context',
      },
    },
  });
};

export const PermissionCheckApiResponse = () => {
  return ApiResponse({
    status: 200,
    type: ResponseTransformDto(ClassPermissionCheckDto),
    description: 'Permission check result',
  });
};
