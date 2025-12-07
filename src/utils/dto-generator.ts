import { z } from 'zod/v4';
import { createZodDto } from 'nestjs-zod';

/**
 * The magic function that converts Zod schemas to NestJS DTOs
 * with automatic Swagger documentation
 * @link https://stackoverflow.com/questions/77568689/zod-to-swagger-api-dto-class-for-nestjs-swagger
 */
export function createDto<T extends z.ZodType>(schema: T, className: string) {
  const DtoClass = createZodDto(schema);

  // Set the class name for better debugging and documentation
  Object.defineProperty(DtoClass, 'name', { value: className });

  return DtoClass;
}

/**
 * Batch create DTOs from multiple schemas
 */
export function createDtos<T extends Record<string, z.ZodType>>(schemas: T) {
  const dtos: Record<string, ReturnType<typeof createDto<z.ZodType>>> = {};

  for (const [key, schema] of Object.entries(schemas)) {
    const className = key.replace(/Schema$/, 'Dto');

    dtos[key] = createDto(schema, className);
  }

  return dtos;
}
