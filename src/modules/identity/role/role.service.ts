import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

import { RoleRepository } from './role.repository';
import { RoleClosureRepository } from '../role-closure';
import { UserRoleRepository } from '../user-role';

import type { RoleCreationDto } from './dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    private roleRepository: RoleRepository,
    private roleClosureRepository: RoleClosureRepository,
    private userRoleRepository: UserRoleRepository,
  ) {}

  async createRole(data: RoleCreationDto) {
    const transaction = await this.prisma.$transaction(async (tx) => {
      const role = await this.roleRepository.createOneWithTransaction(tx, {
        name: data.name,
        description: data.description,
      });

      await this.roleClosureRepository.createOneWithTransaction(tx, {
        ancestor: { connect: { id: role.id } },
        descendant: { connect: { id: role.id } },
        depth: 0,
      });
      return role;
    });
    return transaction;
  }

  async addParentToRole(childRoleId: string, parentRoleId: string) {
    const transaction = this.prisma.$transaction(async (tx) => {
      // Check if childRoleId is the same as parentRoleId
      if (childRoleId === parentRoleId) {
        throw new BadRequestException('A role cannot be parent of itself');
      }
      // Check if childRoleId is already a descendant of parentRoleId
      const isDescendant =
        await this.roleClosureRepository.findUniqueByAncestorIdDescendantIdWithTransaction(
          tx,
          parentRoleId,
          childRoleId,
        );
      if (isDescendant) {
        throw new BadRequestException(
          'Cycle detected: Child role is already a descendant of parent role',
        );
      }
      // get all ancestor of parent (a)
      const parentAncestors =
        await this.roleClosureRepository.findManyAncestorByDescendantId(
          parentRoleId,
          {
            select: {
              ancestorId: true,
              depth: true,
            },
          },
        );
      // get all descendant of child (d)
      const childDescendants =
        await this.roleClosureRepository.findManyDescendantByAncestorId(
          childRoleId,
          {
            select: {
              descendantId: true,
              depth: true,
            },
          },
        );
      // Merge all (a, d) then insert row into depth = dept(a -> parent) + 1 + dept(child -> d)
      const closureRelationsToInsert: Prisma.RoleClosureCreateManyInput[] = [];
      for (const parentAncestor of parentAncestors) {
        for (const childDescendant of childDescendants) {
          const depth = parentAncestor.depth + 1 + childDescendant.depth;
          closureRelationsToInsert.push({
            ancestorId: parentAncestor.ancestorId,
            descendantId: childDescendant.descendantId,
            depth,
          });
        }
      }

      // Insert all closure relations
      // Void duplicate check -> throw error if duplicate
      // Check existence of all closure relations -> throw null if not exist
      for (const closureRelation of closureRelationsToInsert) {
        const existingClosureRelation = await this.roleClosureRepository
          .findUniqueByAncestorIdDescendantIdWithTransaction(
            tx,
            closureRelation.ancestorId,
            closureRelation.descendantId,
          )
          .catch(() => null);

        if (!existingClosureRelation) {
          await this.roleClosureRepository.createOneWithTransaction(tx, {
            ancestor: { connect: { id: closureRelation.ancestorId } },
            descendant: { connect: { id: closureRelation.descendantId } },
            depth: closureRelation.depth,
          });
        }
      }

      // Return true if all closure relations are inserted successfully
      return true;
    });

    return transaction;
  }

  async assignRoleToUser(userId: string, roleId: string) {
    const exists = await this.userRoleRepository.findOneByUserIdRoleId(
      userId,
      roleId,
    );
    if (exists) {
      throw new BadRequestException('Role already assigned to user');
    }

    const createUserRole = await this.userRoleRepository.createOne({
      user: { connect: { id: userId } },
      role: { connect: { id: roleId } },
    });

    return createUserRole;
  }
}
