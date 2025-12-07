import z from 'zod/v4';
import { createZodDto } from 'nestjs-zod';
import { createProductSchema, findProductByIdSchema } from '../validations';

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type FindProductByIdDto = z.infer<typeof findProductByIdSchema>;

export class ClassCreateProductDto extends createZodDto(createProductSchema) {}
export class ClassFindProductByIdDto extends createZodDto(
  findProductByIdSchema,
) {}
