import { UnauthorizedException } from '@nestjs/common';

import type { Request } from 'express';

import { getHeaderValue } from './get-header-value';

/**
 * Get the required header value, if not found, throw an error.
 *
 * @param req Express Request
 * @param headerKey The name of the header (string) like CLIENT_ID, etc.
 * @param errorMessage The error message if the header is missing
 */
export function requireHeader(
  req: Request,
  headerKey: string,
  errorMessage: string = `Missing ${headerKey}`,
): string {
  const raw = getHeaderValue(req, headerKey);
  if (!raw) throw new UnauthorizedException(errorMessage);

  return raw;
}
