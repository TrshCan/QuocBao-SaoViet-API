import { HttpModuleOptions } from '@nestjs/axios';
import { envConfig } from './config-env';

export const httpModuleConfig: HttpModuleOptions = {
  baseURL: envConfig.API_BASE_URL,
};
