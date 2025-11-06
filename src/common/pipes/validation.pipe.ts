import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { treeifyError, z, ZodType } from 'zod/v4';

type SchemaMap = Partial<{
  body: ZodType;
  query: ZodType;
  param: ZodType;
}>;

export class ZodValidationPipe<T = any, R = any>
  implements PipeTransform<T, R>
{
  constructor(private schemas: SchemaMap) {}

  transform(value: T, metadata: ArgumentMetadata): R {
    const { type } = metadata;

    const schema = this.schemas[type as keyof SchemaMap];

    if (!schema) {
      return value as unknown as R;
    }

    try {
      const parsedValue = schema.parse(value);
      return parsedValue as R;
    } catch (error) {
      if (error instanceof z.ZodError)
        throw new BadRequestException(treeifyError(error));
      throw new BadRequestException('Validation failed');
    }
  }
}
