import z from 'zod/v4';
import { createZodDto } from 'nestjs-zod';
import {
  addParentToRoleSchema,
  deleteParentFromRoleSchema,
  findAllRolesSchema,
  findByIdSchema,
  findChildrenRolesSchema,
  findParentsRolesSchema,
  roleCreationSchema,
} from '../validations';

export type AddParentToRoleDto = z.infer<typeof addParentToRoleSchema>;
export type DeleteParentFromRoleDto = z.infer<
  typeof deleteParentFromRoleSchema
>;
export type FindAllRolesDto = z.infer<typeof findAllRolesSchema>;
export type FindByIdDto = z.infer<typeof findByIdSchema>;
export type FindParentsRolesDto = z.infer<typeof findParentsRolesSchema>;
export type FindChildrenRolesDto = z.infer<typeof findChildrenRolesSchema>;
export type RoleCreationDto = z.infer<typeof roleCreationSchema>;

export class ClassAddParentToRoleDto extends createZodDto(
  addParentToRoleSchema,
) {}
export class ClassDeleteParentFromRoleDto extends createZodDto(
  deleteParentFromRoleSchema,
) {}
export class ClassFindAllRolesDto extends createZodDto(findAllRolesSchema) {}
export class ClassFindByIdDto extends createZodDto(findByIdSchema) {}
export class ClassFindParentsRolesDto extends createZodDto(
  findParentsRolesSchema,
) {}
export class ClassFindChildrenRolesDto extends createZodDto(
  findChildrenRolesSchema,
) {}
export class ClassRoleCreationDto extends createZodDto(roleCreationSchema) {}
