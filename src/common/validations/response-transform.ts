import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod/v4';

export const responseTransformSchema = (dataSchema: z.ZodType) =>
  z.object({
    message: z.string().optional(),
    data: dataSchema,
    statusCode: z.number(),
    success: z.boolean(),
    timestamp: z.string(),
  });

export function ResponseTransformDto<
  TModel extends new (...args: any[]) => any,
>(model: TModel) {
  class ClassResponseTransformDto {
    @ApiProperty()
    message: string;

    @ApiProperty({ type: model, required: false })
    data: InstanceType<TModel>;

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    success: boolean;

    @ApiProperty()
    timestamp: string;
  }

  Object.defineProperty(ClassResponseTransformDto, 'name', {
    value: `${model.name}Response`,
  });

  return ClassResponseTransformDto;
}
