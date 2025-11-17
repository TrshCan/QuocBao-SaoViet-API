import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';

import { ZodValidationPipe } from '@/common/pipes/validation.pipe';
import { AUTHORIZATION, REFRESH_TOKEN } from '@/common/constants/headers';
import {
  JwtAuthenticateGuard,
  JwtRefreshAuthenticateGuard,
} from '@/common/guards';
import { KEY_THROTTLER } from '@/common/constants';

import { AuthService } from './auth.service';
import { authLoginSchema } from './validations';

import type { ResponseController } from '@/types/response-controller';
import type { AuthLoginDto } from './dto/auth-login.dto';
import type { LoginResponse } from './interfaces';
import { type FoundCurrentUser, UserService } from '../user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.LONG]: { limit: 100, ttl: 60000 } })
  @UseGuards(JwtAuthenticateGuard)
  async me(
    @Req() request: Request,
  ): Promise<ResponseController<FoundCurrentUser>> {
    if (!request.user) {
      throw new UnauthorizedException('Authentication required!');
    }

    const user: FoundCurrentUser = await this.userService.getCurrentUser(
      request.user.id,
    );

    return {
      message: 'Token is valid',
      metadata: user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UsePipes(new ZodValidationPipe({ body: authLoginSchema }))
  async login(
    @Body() body: AuthLoginDto,
  ): Promise<ResponseController<LoginResponse>> {
    const result = await this.authService.login(body);

    return {
      message: 'Login successfully!',
      metadata: result,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 10, ttl: 10000 } })
  @UseGuards(JwtRefreshAuthenticateGuard)
  async logout(
    @Req() request: Request,
    @Headers(AUTHORIZATION) accessToken: string,
  ): Promise<ResponseController<unknown>> {
    const { id: userId, keyStoreId } = request.refresh;
    if (!userId || !keyStoreId || !accessToken) {
      throw new UnauthorizedException('Authentication required!');
    }

    const result = await this.authService.logout({
      userId,
      keyStoreId,
      accessToken,
    });

    return {
      message: 'Logout successfully!',
      metadata: result,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 10, ttl: 10000 } })
  @UseGuards(JwtRefreshAuthenticateGuard)
  async handleRefreshToken(
    @Req() request: Request,
    @Headers(REFRESH_TOKEN) refreshToken: string,
  ): Promise<ResponseController<unknown>> {
    const mergeRequest = {
      keyStoreId: request.refresh.keyStoreId,
      userId: request.refresh.id,
      email: request.refresh.email,
      refreshToken,
    };

    const result = await this.authService.handleRefreshToken(mergeRequest);

    return {
      message: 'Refresh token successfully!',
      metadata: result,
    };
  }
}
