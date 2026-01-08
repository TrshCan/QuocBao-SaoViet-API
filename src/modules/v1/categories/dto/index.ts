import z from 'zod/v4';

import {
    createCategorySchema,
    updateCategorySchema,
    findAllCategoriesSchema,
    findCategoryByIdSchema,
} from '../validations';

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
export type FindAllCategoriesDto = z.infer<typeof findAllCategoriesSchema>;
export type FindCategoryByIdDto = z.infer<typeof findCategoryByIdSchema>;
