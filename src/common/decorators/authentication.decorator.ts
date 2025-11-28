import { SetMetadata } from '@nestjs/common';

/**
 * @description Symbol for authentication metadata
 */
export const AUTHENTICATION_KEY = Symbol('authentication');

/**
 * @description Decorator to mark a route as requiring authentication
 */
export const Authentication = () => SetMetadata(AUTHENTICATION_KEY, true);
