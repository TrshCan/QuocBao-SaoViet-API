import z from 'zod/v4';
import {
  findAllCustomersSchema,
  findCustomerByIdSchema,
  createCustomerSchema,
  updateCustomerSchema,
} from '../validations';

export type FindAllCustomersDto = z.infer<typeof findAllCustomersSchema>;
export type FindCustomerByIdDto = z.infer<typeof findCustomerByIdSchema>;
export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof updateCustomerSchema>;
