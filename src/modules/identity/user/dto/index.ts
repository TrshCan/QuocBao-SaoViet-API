import z from 'zod/v4';
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
