import z from 'zod/v4';
import { createZodDto } from 'nestjs-zod';
import {
  findAllUsersSchema,
  findUserByIdSchema,
  createUserSchema,
  updateUserSchema,
} from '../validations';

export type FindAllUsersDto = z.infer<typeof findAllUsersSchema>;
export type FindUserByIdDto = z.infer<typeof findUserByIdSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export class ClassFindAllUsersDto extends createZodDto(findAllUsersSchema) {}
export class ClassFindUserByIdDto extends createZodDto(findUserByIdSchema) {}
export class ClassCreateUserDto extends createZodDto(createUserSchema) {}
export class ClassUpdateUserDto extends createZodDto(updateUserSchema) {}
