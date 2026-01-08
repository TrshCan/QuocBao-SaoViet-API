import z from 'zod/v4';

export const createCategorySchema = z.object({
    maDanhMuc: z
        .string()
        .min(1, 'Category code is required')
        .max(50, 'Category code must be at most 50 characters'),
    tenDanhMuc: z
        .string()
        .min(1, 'Category name is required')
        .max(255, 'Category name must be at most 255 characters'),
    moTa: z
        .string()
        .max(500, 'Description must be at most 500 characters')
        .optional(),
    thuTu: z
        .number()
        .int('Display order must be an integer')
        .min(0, 'Display order must be non-negative')
        .optional(),
    parentId: z
        .string()
        .uuid('Invalid parent category ID')
        .optional()
        .nullable(),
});
