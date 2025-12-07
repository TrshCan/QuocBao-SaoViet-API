import { z } from 'zod/v4';
import { createZodDto } from 'nestjs-zod';

import {
  requestPermissionCheckSchema,
  responsePermissionCheckSchema,
} from '../validations/permission-check-schema';

export type RequestPermissionCheckDto = z.infer<
  typeof requestPermissionCheckSchema
>;

export class ClassRequestPermissionCheckDto extends createZodDto(
  requestPermissionCheckSchema,
) {}

export class ClassPermissionCheckDto extends createZodDto(
  responsePermissionCheckSchema,
) {}
