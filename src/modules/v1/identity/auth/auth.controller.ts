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

import { ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ZodValidationPipe } from '@/common/pipes/validation.pipe';
import { AUTHORIZATION, REFRESH_TOKEN } from '@/common/constants/headers';
import {
  JwtAuthenticateGuard,
  JwtRefreshAuthenticateGuard,
} from '@/common/guards';
import { KEY_THROTTLER } from '@/common/constants';

import { AuthService } from './auth.service';
import {
  authForgotPasswordSchema,
  requestAuthLoginSchema,
} from './validations';

import { MailEvents } from '@/common/enums/mail-events';

import { UserService, type UserWithoutPassword } from '../user';

import type { ResponseController } from '@/types/response-controller';
import type { RequestAuthForgotPasswordDto, RequestAuthLoginDto } from './dto';
import type { LoginResponse, RefreshResponse } from './interfaces';
import type { ForgotPasswordEmailPayload } from '@/modules/v1/mail';
import {
  LoginApiBody,
  LoginApiOperation,
  LoginApiResponse,
} from './docs/login.doc';
import { MeApiOperation, MeApiResponse } from './docs/me.doc';
import { LogoutApiOperation, LogoutApiResponse } from './docs/logout.doc';
import { RefreshApiOperation, RefreshApiResponse } from './docs/refresh.doc';
import {
  ForgotPasswordApiBody,
  ForgotPasswordApiOperation,
  ForgotPasswordApiResponse,
} from './docs/forgot-password.doc';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.LONG]: { limit: 100, ttl: 60000 } })
  @UseGuards(JwtAuthenticateGuard)
  @MeApiOperation()
  @MeApiResponse()
  async me(
    @Req() request: Request,
  ): Promise<ResponseController<UserWithoutPassword>> {
    if (!request.user) {
      throw new UnauthorizedException('Authentication required!');
    }

    const user: UserWithoutPassword = await this.userService.getCurrentUser(
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
  @UsePipes(new ZodValidationPipe({ body: requestAuthLoginSchema }))
  @LoginApiOperation()
  @LoginApiBody()
  @LoginApiResponse()
  async login(
    @Body() body: RequestAuthLoginDto,
    @Req() request: Request,
  ): Promise<ResponseController<LoginResponse>> {
    const userAgent = request.headers['user-agent'] || 'unknown';
    const ipAddress = request.ip || '0.0.0.0';
    const result = await this.authService.login(body, userAgent, ipAddress);

    return {
      message: 'Login successfully!',
      metadata: result,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Throttle({ [KEY_THROTTLER.MEDIUM]: { limit: 10, ttl: 10000 } })
  @UseGuards(JwtRefreshAuthenticateGuard)
  @LogoutApiOperation()
  @LogoutApiResponse()
  async logout(
    @Req() request: Request,
    @Headers(AUTHORIZATION) accessToken: string,
  ): Promise<ResponseController<boolean>> {
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
  @RefreshApiOperation()
  @RefreshApiResponse()
  async handleRefreshToken(
    @Req() request: Request,
    @Headers(REFRESH_TOKEN) refreshToken: string,
  ): Promise<ResponseController<RefreshResponse>> {
    const mergeRequest = {
      keyStoreId: request.refresh.keyStoreId,
      userId: request.refresh.id,
      email: request.refresh.email,
      refreshToken,
      userAgent: request.headers['user-agent'] || 'unknown',
      ipAddress: request.ip || '0.0.0.0',
    };

    const result = await this.authService.handleRefreshToken(mergeRequest);

    return {
      message: 'Refresh token successfully!',
      metadata: result,
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UsePipes(new ZodValidationPipe({ body: authForgotPasswordSchema }))
  @ForgotPasswordApiOperation()
  @ForgotPasswordApiBody()
  @ForgotPasswordApiResponse()
  async forgotPassword(
    @Body() body: RequestAuthForgotPasswordDto,
  ): Promise<ResponseController<{ email: string }>> {
    const result = await this.authService.forgotPassword(body);

    this.eventEmitter.emit(MailEvents.SEND_FORGOT_PASSWORD_EMAIL, {
      to: result.email,
      resetLink: result.resetLink,
      userName: result.username,
    } as ForgotPasswordEmailPayload);

    return {
      message: 'Successfully sent email to reset password!',
      metadata: {
        email: result.email,
      },
    };
  }
}
