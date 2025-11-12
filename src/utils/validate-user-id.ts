import { UnauthorizedException } from '@nestjs/common';

export const validateUserId = (
  expectedUserId: string,
  decodedUserId: unknown,
): void => {
  if (typeof decodedUserId !== 'string' || expectedUserId !== decodedUserId) {
    throw new UnauthorizedException('User ID mismatch');
  }
};
