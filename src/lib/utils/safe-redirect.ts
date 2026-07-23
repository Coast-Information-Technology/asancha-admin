// src/lib/utils/safe-redirect.ts

/**
 * File purpose:
 * Provides safe internal redirect helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file prevents unsafe redirect targets from being used after sign-in,
 * sign-out, locked account handling, unauthorized access, and protected action
 * flows.
 *
 * Key exports:
 * - getSafeRedirectPath validates a redirect target.
 * - createReturnToParam creates a safe returnTo value.
 * - resolvePostAuthRedirect resolves where authenticated staff should land.
 *
 * Business relevance:
 * Admin authentication and staff workflows must avoid open redirects and must
 * not redirect users to public app URLs, backend URLs, private service URLs, or
 * unknown external domains from internal auth flows.
 *
 * Security note:
 * Redirect safety protects frontend routing. Backend auth and session handling
 * must still validate authentication, account status, permissions, and resource
 * visibility.
 */

import { normaliseRoutePath } from './routes';

export interface SafeRedirectOptions {
  fallbackPath?: string;
  allowedPrefixes?: readonly string[];
  blockedPrefixes?: readonly string[];
}

const DEFAULT_FALLBACK_PATH = '/dashboard';

const DEFAULT_ALLOWED_PREFIXES = [
  '/dashboard',
  '/review-queues',
  '/users',
  '/staff',
  '/profiles',
  '/companies',
  '/properties',
  '/listings',
  '/documents',
  '/verification-reviews',
  '/deal-reservations',
  '/deal-activities',
  '/payments',
  '/bookings',
  '/messages',
  '/notifications',
  '/api-access',
  '/ai',
  '/audit-logs',
  '/settings',
  '/my-profile',
  '/system',
] as const;

const DEFAULT_BLOCKED_PREFIXES = [
  '/auth/sign-in',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/set-password',
  '/auth/verify-staff-invite',
] as const;

function stripUnsafeControlCharacters(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim();
}

function isExternalRedirectTarget(value: string): boolean {
  return /^https?:\/\//i.test(value) || value.startsWith('//') || value.startsWith('\\');
}

function splitPathAndSearch(value: string): { pathname: string; search: string } {
  const [pathname = '/', search = ''] = value.split('?');

  return {
    pathname,
    search,
  };
}

export function isSafeInternalRedirectPath(
  value: unknown,
  options: SafeRedirectOptions = {},
): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  const cleanedValue = stripUnsafeControlCharacters(value);

  if (cleanedValue.length === 0 || isExternalRedirectTarget(cleanedValue)) {
    return false;
  }

  const { pathname } = splitPathAndSearch(cleanedValue);
  const normalisedPath = normaliseRoutePath(pathname);

  const allowedPrefixes = options.allowedPrefixes ?? DEFAULT_ALLOWED_PREFIXES;
  const blockedPrefixes = options.blockedPrefixes ?? DEFAULT_BLOCKED_PREFIXES;

  const isBlocked = blockedPrefixes.some((prefix) => {
    const normalisedPrefix = normaliseRoutePath(prefix);

    return normalisedPath === normalisedPrefix || normalisedPath.startsWith(`${normalisedPrefix}/`);
  });

  if (isBlocked) {
    return false;
  }

  return allowedPrefixes.some((prefix) => {
    const normalisedPrefix = normaliseRoutePath(prefix);

    return normalisedPath === normalisedPrefix || normalisedPath.startsWith(`${normalisedPrefix}/`);
  });
}

export function getSafeRedirectPath(value: unknown, options: SafeRedirectOptions = {}): string {
  const fallbackPath = options.fallbackPath ?? DEFAULT_FALLBACK_PATH;

  if (!isSafeInternalRedirectPath(value, options)) {
    return fallbackPath;
  }

  const cleanedValue = stripUnsafeControlCharacters(value);
  const { pathname, search } = splitPathAndSearch(cleanedValue);
  const normalisedPath = normaliseRoutePath(pathname);

  return search.length > 0 ? `${normalisedPath}?${search}` : normalisedPath;
}

export function createReturnToParam(pathname: string, search = ''): string {
  const rawPath = `${pathname}${search}`;
  const safePath = getSafeRedirectPath(rawPath, {
    fallbackPath: DEFAULT_FALLBACK_PATH,
  });

  return encodeURIComponent(safePath);
}

export function resolvePostAuthRedirect(
  returnTo: unknown,
  fallbackPath = DEFAULT_FALLBACK_PATH,
): string {
  return getSafeRedirectPath(returnTo, {
    fallbackPath,
  });
}

export function shouldUseFallbackRedirect(value: unknown): boolean {
  return !isSafeInternalRedirectPath(value);
}
