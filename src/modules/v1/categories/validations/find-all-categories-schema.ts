import z from 'zod/v4';

export const findAllCategoriesSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
    sortBy: z.enum(['tenDanhMuc', 'maDanhMuc', 'thuTu', 'createdAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    parentId: z.string().uuid().optional().nullable(),
});
