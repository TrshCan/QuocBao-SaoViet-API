import z from 'zod/v4';
import { createZodDto } from 'nestjs-zod';
import { createUnitSchema, findUnitByIdSchema } from '../validations';

export type CreateUnitDto = z.infer<typeof createUnitSchema>;
export type FindUnitByIdDto = z.infer<typeof findUnitByIdSchema>;

export class ClassCreateUnitDto extends createZodDto(createUnitSchema) {}
export class ClassFindUnitByIdDto extends createZodDto(findUnitByIdSchema) {}
