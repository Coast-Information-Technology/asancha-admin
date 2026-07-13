// src/lib/auth/staff-cookies.ts

/**
 * File purpose:
 * Defines staff cookie names and cookie helper functions for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file centralises frontend cookie names used by middleware and
 * session-aware route helpers. It also provides safe cookie parsing utilities
 * without hardcoding secrets or live service URLs.
 *
 * Key exports:
 * - STAFF_COOKIE_NAMES defines admin cookie keys.
 * - parseCookieHeader reads a cookie header safely.
 * - getCookieValueFromHeader retrieves one cookie value from a header.
 * - createStaffCookieSnapshot creates a lightweight cookie-based session hint.
 *
 * Business relevance:
 * asancha-admin is staff-only. Cookie values may help the frontend route users
 * to sign-in, locked, unauthorized, or dashboard screens. They must not be
 * treated as the final proof of identity or permission.
 *
 * Security note:
 * HttpOnly cookies cannot and should not be read by client-side JavaScript.
 * This file is mainly for middleware/server-safe cookie handling. Backend API
 * enforcement remains final.
 */

import {
  isLockedStaffAccountStatus,
  isStaffAccountStatus,
  type StaffAccountStatus,
} from './staff-session';
import { isStaffRole, type StaffRole } from './staff-role-guards';

export const STAFF_COOKIE_NAMES = {
  accessToken: 'asancha_admin_access_token',
  refreshToken: 'asancha_admin_refresh_token',
  role: 'asancha_admin_role',
  accountStatus: 'asancha_admin_account_status',
  staffPublicId: 'asancha_admin_staff_public_id',
} as const;

export interface StaffCookieSnapshot {
  hasAccessToken: boolean;
  staffPublicId: string | null;
  role: StaffRole | null;
  accountStatus: StaffAccountStatus;
  isStaffRole: boolean;
  isLockedAccount: boolean;
}

export interface CookieValueSource {
  get(name: string): { value?: string } | string | undefined;
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseCookieHeader(cookieHeader: string | null | undefined): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((cookies, cookiePair) => {
    const [rawName, ...rawValueParts] = cookiePair.split('=');
    const name = rawName?.trim();

    if (!name) {
      return cookies;
    }

    const value = rawValueParts.join('=').trim();

    cookies[name] = safeDecodeURIComponent(value);

    return cookies;
  }, {});
}

export function getCookieValueFromHeader(
  cookieHeader: string | null | undefined,
  cookieName: string,
): string | undefined {
  return parseCookieHeader(cookieHeader)[cookieName];
}

export function getCookieValueFromSource(
  source: CookieValueSource | null | undefined,
  cookieName: string,
): string | undefined {
  if (!source) {
    return undefined;
  }

  const cookieValue = source.get(cookieName);

  if (typeof cookieValue === 'string') {
    return cookieValue;
  }

  return cookieValue?.value;
}

export function createStaffCookieSnapshotFromValues(values: {
  accessToken?: string;
  staffPublicId?: string;
  role?: string;
  accountStatus?: string;
}): StaffCookieSnapshot {
  const role = isStaffRole(values.role) ? values.role : null;
  const accountStatus = isStaffAccountStatus(values.accountStatus) ? values.accountStatus : 'unknown';

  return {
    hasAccessToken: Boolean(values.accessToken),
    staffPublicId: values.staffPublicId ?? null,
    role,
    accountStatus,
    isStaffRole: Boolean(role),
    isLockedAccount: isLockedStaffAccountStatus(accountStatus),
  };
}

export function createStaffCookieSnapshotFromHeader(
  cookieHeader: string | null | undefined,
): StaffCookieSnapshot {
  return createStaffCookieSnapshotFromValues({
    accessToken: getCookieValueFromHeader(cookieHeader, STAFF_COOKIE_NAMES.accessToken),
    staffPublicId: getCookieValueFromHeader(cookieHeader, STAFF_COOKIE_NAMES.staffPublicId),
    role: getCookieValueFromHeader(cookieHeader, STAFF_COOKIE_NAMES.role),
    accountStatus: getCookieValueFromHeader(cookieHeader, STAFF_COOKIE_NAMES.accountStatus),
  });
}

export function createStaffCookieSnapshotFromSource(
  source: CookieValueSource | null | undefined,
): StaffCookieSnapshot {
  return createStaffCookieSnapshotFromValues({
    accessToken: getCookieValueFromSource(source, STAFF_COOKIE_NAMES.accessToken),
    staffPublicId: getCookieValueFromSource(source, STAFF_COOKIE_NAMES.staffPublicId),
    role: getCookieValueFromSource(source, STAFF_COOKIE_NAMES.role),
    accountStatus: getCookieValueFromSource(source, STAFF_COOKIE_NAMES.accountStatus),
  });
}
