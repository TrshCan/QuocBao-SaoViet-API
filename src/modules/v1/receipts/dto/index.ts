import z from 'zod/v4';
import { createZodDto } from 'nestjs-zod';
import {
  createReceiptSchema,
  createReceiptItemSchema,
  findReceiptByIdSchema,
  validateReceiptSchema,
} from '../validations';

export type CreateReceiptItemDto = z.infer<typeof createReceiptItemSchema>;
export type CreateReceiptDto = z.infer<typeof createReceiptSchema>;
export type FindReceiptByIdDto = z.infer<typeof findReceiptByIdSchema>;
export type ValidateReceiptDto = z.infer<typeof validateReceiptSchema>;

export class ClassCreateReceiptItemDto extends createZodDto(
  createReceiptItemSchema,
) {}
export class ClassCreateReceiptDto extends createZodDto(createReceiptSchema) {}
export class ClassFindReceiptByIdDto extends createZodDto(
  findReceiptByIdSchema,
) {}
export class ClassValidateReceiptDto extends createZodDto(
  validateReceiptSchema,
) {}
