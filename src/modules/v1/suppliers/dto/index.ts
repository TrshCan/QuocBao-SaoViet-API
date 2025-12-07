import z from 'zod/v4';
import { createZodDto } from 'nestjs-zod';
import {
  findAllSuppliersSchema,
  findSupplierByIdSchema,
  createSupplierSchema,
  updateSupplierSchema,
} from '../validations';

export type FindAllSuppliersDto = z.infer<typeof findAllSuppliersSchema>;
export type FindSupplierByIdDto = z.infer<typeof findSupplierByIdSchema>;
export type CreateSupplierDto = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierDto = z.infer<typeof updateSupplierSchema>;

export class ClassFindAllSuppliersDto extends createZodDto(
  findAllSuppliersSchema,
) {}
export class ClassFindSupplierByIdDto extends createZodDto(
  findSupplierByIdSchema,
) {}
export class ClassCreateSupplierDto extends createZodDto(
  createSupplierSchema,
) {}
export class ClassUpdateSupplierDto extends createZodDto(
  updateSupplierSchema,
) {}
