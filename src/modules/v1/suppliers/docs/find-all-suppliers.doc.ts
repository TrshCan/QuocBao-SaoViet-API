import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ClassFindAllSuppliersDto } from '../dto';

export const FindAllSuppliersApiOperation = () => {
  return ApiOperation({
    summary: 'Find All Suppliers',
    description: `
          * Get a paginated list of all suppliers
          * Supports pagination, search, and sorting
          * Returns only non-deleted suppliers (isDelete = false)
          * Search across supplier name, address, contact person, and phone
          * Return if successful:
          * - paginated list of suppliers
          * - total count
          * - page information
          * If failed:
          * - error message
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Get all suppliers with pagination',
    },
  });
};

export const FindAllSuppliersApiQuery = () => {
  return ApiQuery({
    name: 'query',
    type: ClassFindAllSuppliersDto,
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

export const FindAllSuppliersApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Suppliers fetched successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Suppliers fetched successfully',
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
                  tenNhaCungCap: { type: 'string' },
                  diaChi: { type: 'string', nullable: true },
                  nguoiLienHe: { type: 'string', nullable: true },
                  soDienThoai: { type: 'string', nullable: true },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  createdBy: { type: 'string', nullable: true },
                  updatedBy: { type: 'string', nullable: true },
                  isDelete: { type: 'boolean' },
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
