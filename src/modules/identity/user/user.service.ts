import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from './user.repository';
import { toErrorMessage } from '@/utils';
import { UserGetPayload } from '@/generated/prisma/models/User';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async getCurrentUser(userId: string) {
    try {
      const user: FoundCurrentUser | null =
        await this.userRepository.findOneById(userId, {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            status: true,
            // permissions: true,
          },
        });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error('Failed to get current user:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to get current user');
    }
  }
}

export type FoundCurrentUser = Pick<
  UserGetPayload<{
    select: {
      id: true;
      username: true;
      email: true;
      fullName: true;
      phone: true;
      role: true;
      status: true;
      // permissions: true,
    };
  }>,
  'id' | 'username' | 'email' | 'fullName' | 'phone' | 'role' | 'status'
  // | 'permissions'
>;
