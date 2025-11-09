import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import type { Request } from 'express';

import { ZodValidationPipe } from '@/common/pipes/validation.pipe';

import { AuthService } from './auth.service';
import type { AuthLoginDto } from './dto/auth-login.dto';
import { authLoginSchema } from './validations/auth-login-schema';
import { AUTHORIZATION } from '@/common/constants/headers';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe({ body: authLoginSchema }))
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('logout')
  logout(@Req() request: Request, @Headers(AUTHORIZATION) accessToken: string) {
    const { userId, keyStoreId } = request.refresh;
    if (!userId || !keyStoreId || !accessToken) {
      throw new UnauthorizedException('Authentication required!');
    }

    return this.authService.logout({ userId, keyStoreId, accessToken });
  }
}
