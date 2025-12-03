import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';
import { toErrorMessage } from '@/utils';
import { buildPagination } from '@/utils/format-pagination';

import type { Prisma, User } from '@/generated/prisma/client';
import type { CreateUserDto, FindAllUsersDto, UpdateUserDto } from './dto';
import type { PaginatedResponse } from '@/types/pagination';

const SALT_ROUNDS = 10;

export type UserWithoutPassword = Omit<User, 'password' | 'secretOtp'>;

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async findAll(
    query: FindAllUsersDto,
  ): Promise<PaginatedResponse<UserWithoutPassword>> {
    try {
      const { page, limit, search, sortBy, sortOrder, status } = query;

      const whereQuery: Prisma.UserWhereInput = {
        isDelete: false,
        ...(status && { status }),
        ...(search && {
          OR: [
            { username: { contains: search, mode: 'insensitive' } },
            { fullName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const orderByQuery: Prisma.UserOrderByWithRelationInput = {
        [sortBy ?? 'createdAt']: sortOrder ?? 'desc',
      };

      const [users, total] = await Promise.all([
        this.userRepository.findMany({
          where: whereQuery,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: orderByQuery,
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
            phone: true,
            role: true,
            avatar: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            updatedBy: true,
            isDelete: true,
          },
        }),
        this.userRepository.count(whereQuery),
      ]);

      return {
        items: users as UserWithoutPassword[],
        pagination: buildPagination(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch users:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOneById(userId: string): Promise<UserWithoutPassword> {
    try {
      const user = await this.userRepository.findOneById(userId, {
        select: {
          id: true,
          username: true,
          fullName: true,
          email: true,
          phone: true,
          role: true,
          avatar: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          createdBy: true,
          updatedBy: true,
          isDelete: true,
        },
      });

      if (!user || user.isDelete) {
        throw new NotFoundException('User not found');
      }

      return user as UserWithoutPassword;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to get user:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to get user');
    }
  }

  async getCurrentUser(userId: string): Promise<UserWithoutPassword> {
    return this.findOneById(userId);
  }

  async createUser(
    data: CreateUserDto,
    createdBy?: string,
  ): Promise<UserWithoutPassword> {
    try {
      const existingUsername = await this.userRepository.findOneByUsername(
        data.username,
      );
      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }

      if (data.email) {
        const existingEmail = await this.userRepository.findOneByEmail(
          data.email,
        );
        if (existingEmail) {
          throw new ConflictException('Email already exists');
        }
      }

      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

      const user = await this.userRepository.createOne(
        {
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          password: hashedPassword,
          role: data.role,
          avatar: data.avatar,
          createdBy,
        },
        {
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
            phone: true,
            role: true,
            avatar: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            updatedBy: true,
            isDelete: true,
          },
        },
      );

      return user as UserWithoutPassword;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      this.logger.error('Failed to create user:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async updateUser(
    userId: string,
    data: UpdateUserDto,
    updatedBy?: string,
  ): Promise<UserWithoutPassword> {
    try {
      const existingUser = await this.userRepository.findOneById(userId);
      if (!existingUser || existingUser.isDelete) {
        throw new NotFoundException('User not found');
      }

      if (data.email && data.email !== existingUser.email) {
        const emailExists = await this.userRepository.findOneByEmail(
          data.email,
        );
        if (emailExists) {
          throw new ConflictException('Email already exists');
        }
      }

      const user = await this.userRepository.updateOneById(
        userId,
        {
          ...data,
          updatedBy,
        },
        {
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
            phone: true,
            role: true,
            avatar: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            updatedBy: true,
            isDelete: true,
          },
        },
      );

      return user as UserWithoutPassword;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      )
        throw error;
      this.logger.error('Failed to update user:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUser(userId: string): Promise<{ success: boolean }> {
    try {
      const existingUser = await this.userRepository.findOneById(userId);
      if (!existingUser || existingUser.isDelete) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.softDeleteById(userId);

      return { success: true };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to delete user:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async restoreUser(userId: string): Promise<UserWithoutPassword> {
    try {
      const existingUser = await this.userRepository.findOneById(userId);
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      const user = await this.userRepository.restoreById(userId);

      return {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
        isDelete: user.isDelete,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to restore user:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to restore user');
    }
  }
}
