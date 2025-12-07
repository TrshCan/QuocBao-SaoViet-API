import z from 'zod/v4';
import { createZodDto } from 'nestjs-zod';
import { createWarehouseSchema, findWarehouseByIdSchema } from '../validations';

export type CreateWarehouseDto = z.infer<typeof createWarehouseSchema>;
export type FindWarehouseByIdDto = z.infer<typeof findWarehouseByIdSchema>;

export class ClassCreateWarehouseDto extends createZodDto(
  createWarehouseSchema,
) {}
export class ClassFindWarehouseByIdDto extends createZodDto(
  findWarehouseByIdSchema,
) {}
