import { TestBed } from '@suites/unit';
import type { Mocked } from '@suites/doubles.jest';

import { HttpService } from '@nestjs/axios';

import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { AuthHttpService } from './auth-http.service';

import type { LoginResponse } from './interfaces';
import type { ResponseController } from '@/types/response-controller';
import type { FoundUserLogin } from './auth.service';

describe('Auth Http Service Unit Test', () => {
  let authHttpService: AuthHttpService;
  let httpService: Mocked<HttpService>;

  beforeAll(async () => {
    // Isolate AuthHttpService and mock HttpService
    const { unit, unitRef } = await TestBed.solitary(AuthHttpService).compile();

    authHttpService = unit;
    httpService = unitRef.get<HttpService>(
      HttpService,
    ) as unknown as Mocked<HttpService>;
  });

  beforeEach(() => {
    authHttpService = new AuthHttpService(
      httpService as unknown as HttpService,
    );
  });

  it('should be defined', () => {
    expect(authHttpService).toBeDefined();
  });

  it('should login successfully', async () => {
    const mockUser: Omit<FoundUserLogin, 'password' | 'secretOtp' | 'status'> =
      {
        id: 'test-user-id',
        username: 'test',
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'super_admin',
        // permissions: [], as unknown as FoundUserLogin['permissions']
      };

    const mockLoginResponse: ResponseController<LoginResponse> = {
      message: 'Login successfully!',
      metadata: {
        user: mockUser,
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        expiresInAccessToken: 3600,
        expiresInRefreshToken: 86400,
        iatAccessToken: Math.floor(Date.now() / 1000),
        iatRefreshToken: Math.floor(Date.now() / 1000),
      },
    };

    httpService.post.mockReturnValue(
      of({
        data: mockLoginResponse,
      } as unknown as AxiosResponse<ResponseController<LoginResponse>>),
    );

    const response = await authHttpService.login('test', 'test');
    expect(response).toBeDefined();

    const responseData = response.data;
    expect(responseData.metadata.accessToken).toBe('test-access-token');
    expect(responseData.metadata.refreshToken).toBe('test-refresh-token');
    expect(responseData.metadata.user.username).toBe('test');
  });
});
