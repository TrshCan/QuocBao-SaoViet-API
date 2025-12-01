import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function ApiBodyWithSingleFile(
  name = 'file',
  body_properties?: Record<string, SchemaObject | ReferenceObject>,
  required_properties?: string[],
  local_options?: MulterOptions,
) {
  const fileProperty: SchemaObject = {
    type: 'string',
    format: 'binary',
  };

  const properties: Record<string, SchemaObject | ReferenceObject> =
    body_properties
      ? { ...body_properties, [name]: fileProperty }
      : { [name]: fileProperty };

  const api_body = {
    schema: {
      type: 'object' as const,
      properties,
      required: required_properties,
    },
  };

  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody(api_body),
    UseInterceptors(FileInterceptor(name, local_options)),
  );
}
