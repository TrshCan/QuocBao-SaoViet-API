import z from 'zod/v4';

export const findCategoryByIdSchema = z.object({
    categoryId: z.string().uuid('Invalid category ID'),
});
