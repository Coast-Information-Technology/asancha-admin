// src/lib/auth/staff-auth-guards.ts

/**
 * File purpose:
 * Provides staff authentication and route-access guard helpers for the Asancha
 * Admin frontend.
 *
 * Role in the project:
 * This file helps layouts, middleware, and protected pages decide whether a
 * staff user should see a page, be redirected to sign-in, be redirected to
 * locked, or be redirected to unauthorized.
 *
 * Key exports:
 * - getStaffAuthRedirectPath returns the correct redirect path.
 * - canAccessAdminFrontend checks whether a session can enter admin screens.
 * - assertStaffSession throws a safe error when no staff session exists.
 *
 * Business relevance:
 * asancha-admin is only for internal staff users. Public users and guests must
 * not access admin screens. Locked, suspended, or disabled staff accounts must
 * not continue to operational pages.
 *
 * Security note:
 * These helpers only guide frontend routing and UX. The backend API remains the
 * final authority for authentication, authorization, account status, resource
 * visibility, review decisions, staff creation, and audit-sensitive actions.
 */

import {
  hasStaffSession,
  isLockedStaffAccountStatus,
  type StaffSession,
} from './staff-session';

export interface StaffAuthGuardResult {
  allowed: boolean;
  redirectTo: string | null;
  reason:
    | 'allowed'
    | 'unauthenticated'
    | 'locked_account'
    | 'missing_staff_role'
    | 'unauthorized';
}

export class StaffAuthGuardError extends Error {
  public readonly redirectTo: string;
  public readonly reason: StaffAuthGuardResult['reason'];

  public constructor(message: string, redirectTo: string, reason: StaffAuthGuardResult['reason']) {
    super(message);

    this.name = 'StaffAuthGuardError';
    this.redirectTo = redirectTo;
    this.reason = reason;
  }
}

export function canAccessAdminFrontend(session: StaffSession | null | undefined): boolean {
  return Boolean(
    hasStaffSession(session) &&
      session.role &&
      session.user &&
      !isLockedStaffAccountStatus(session.accountStatus),
  );
}

export function getStaffAuthGuardResult(
  session: StaffSession | null | undefined,
): StaffAuthGuardResult {
  if (!session?.isAuthenticated) {
    return {
      allowed: false,
      redirectTo: '/auth/sign-in',
      reason: 'unauthenticated',
    };
  }

  if (isLockedStaffAccountStatus(session.accountStatus)) {
    return {
      allowed: false,
      redirectTo: '/auth/locked',
      reason: 'locked_account',
    };
  }

  if (!session.role || !session.user) {
    return {
      allowed: false,
      redirectTo: '/auth/unauthorized',
      reason: 'missing_staff_role',
    };
  }

  if (!canAccessAdminFrontend(session)) {
    return {
      allowed: false,
      redirectTo: '/auth/unauthorized',
      reason: 'unauthorized',
    };
  }

  return {
    allowed: true,
    redirectTo: null,
    reason: 'allowed',
  };
}

export function getStaffAuthRedirectPath(
  session: StaffSession | null | undefined,
): string | null {
  return getStaffAuthGuardResult(session).redirectTo;
}

export function assertStaffSession(session: StaffSession | null | undefined): asserts session is StaffSession {
  const result = getStaffAuthGuardResult(session);

  if (!result.allowed) {
    throw new StaffAuthGuardError(
      'You do not have permission to access this admin area.',
      result.redirectTo ?? '/auth/unauthorized',
      result.reason,
    );
  }
}

export function shouldRedirectAuthenticatedStaffAwayFromAuthRoute(
  session: StaffSession | null | undefined,
  pathname: string,
): boolean {
  const guestOnlyAuthRoutes = ['/auth/sign-in', '/auth/forgot-password'];
  const isGuestOnlyAuthRoute = guestOnlyAuthRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return Boolean(isGuestOnlyAuthRoute && canAccessAdminFrontend(session));
}

export function isStaffAuthRoute(pathname: string): boolean {
  const staffAuthRoutes = [
    '/auth/sign-in',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/set-password',
    '/auth/verify-staff-invite',
    '/auth/locked',
    '/auth/unauthorized',
  ];

  return staffAuthRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
