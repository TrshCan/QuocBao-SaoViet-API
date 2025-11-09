import type { Request } from 'express';
import type { DoubleCsrfConfigOptions } from 'csrf-csrf';
import { envConfig } from './config-env';
import { HttpStatus } from '@nestjs/common';
import { CSRF_TOKEN } from '@/common/constants';

/**
 * CSRF Configuration for csrf-csrf library
 *
 * How it works with cookie-parser:
 * 1. cookie-parser must be registered BEFORE doubleCsrfProtection middleware
 * 2. cookie-parser parses cookies and makes them available via req.cookies
 * 3. csrf-csrf uses cookies to store CSRF tokens securely
 *
 * For JWT-based authentication:
 * - getSecret: Returns a cryptographically secure secret (from env)
 * - getSessionIdentifier: Returns a unique identifier per user/session
 *   - For authenticated users: uses user ID from JWT
 *   - For anonymous users: uses IP + User-Agent combination
 */
export const doubleCsrfOptions: DoubleCsrfConfigOptions = {
  // Required: Returns the secret used for HMAC generation
  // This should be a cryptographically secure random string
  getSecret: () => envConfig.CSRF_SECRET,

  // Required: Returns a unique identifier for the session/user
  // For JWT-based auth, use user ID if available, otherwise use IP+User-Agent
  getSessionIdentifier: (req: Request): string => {
    // If user is authenticated (JWT token validated), use their user ID
    if (req.user?.id) {
      return `user:${req.user.id}`;
    }

    // For anonymous requests, use IP + User-Agent as identifier
    // This ensures CSRF protection works even for unauthenticated endpoints
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    return `anonymous:${ip}:${userAgent}`;
  },

  // Cookie name for CSRF token
  // Using __Host- prefix for additional security (requires secure=true, path=/)
  cookieName:
    envConfig.NODE_ENV === 'production'
      ? '__Host-psifi.x-csrf-token'
      : 'x-csrf-token',

  // Cookie options
  cookieOptions: {
    sameSite: 'strict',
    path: '/',
    secure: envConfig.NODE_ENV === 'production',
    httpOnly: true, // Prevents JavaScript access
  },

  // HTTP methods that don't require CSRF protection
  // GET, HEAD, OPTIONS are safe by HTTP specification
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],

  // Function to retrieve CSRF token from request
  // Default: looks for 'x-csrf-token' header
  getCsrfTokenFromRequest: (req: Request) => {
    return req.headers[CSRF_TOKEN];
  },

  // Error configuration
  errorConfig: {
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Invalid CSRF token',
    // code: 'EBADCSRFTOKEN',
  },
};
