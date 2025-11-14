import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

import type { LoginResponse } from './interfaces';
import type { ResponseController } from '@/types/response-controller';

@Injectable()
export class AuthHttpService {
  constructor(private readonly httpService: HttpService) {}

  login(
    username: string,
    password: string,
  ): Promise<AxiosResponse<ResponseController<LoginResponse>>> {
    const response = this.httpService.post<
      ResponseController<LoginResponse>,
      { username: string; password: string }
    >('/auth/login', {
      username,
      password,
    });
    return lastValueFrom(response);
  }
}
