// proxy.ts

/**
 * File purpose:
 * Provides request-level routing protection for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file replaces the older Next.js middleware convention. It performs
 * lightweight frontend routing checks for staff-only admin routes and redirects
 * visitors to safe auth pages when needed.
 *
 * Key exports:
 * - proxy is the Next.js request handler for route protection.
 * - config defines the matcher for protected/admin routes.
 *
 * Business relevance:
 * asancha-admin is restricted to super_admin, admin, and customer_care_rep.
 * Public users must not be treated as valid admin users.
 *
 * Security note:
 * Proxy checks guide frontend routing only. Backend authentication,
 * authorization, account status, staff permissions, resource visibility, and
 * audit logging remain the final authority.
 */

import { NextResponse, type NextRequest } from 'next/server';

type StaffRole = 'super_admin' | 'admin' | 'customer_care_rep';

type StaffAccountStatus =
  | 'active'
  | 'pending'
  | 'invited'
  | 'locked'
  | 'suspended'
  | 'disabled'
  | 'unknown';

const STAFF_COOKIE_NAMES = {
  accessToken: 'asancha_admin_access_token',
  role: 'asancha_admin_role',
  accountStatus: 'asancha_admin_account_status',
} as const;

const AUTH_ROUTES = [
  '/auth/sign-in',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/set-password',
  '/auth/verify-staff-invite',
  '/auth/locked',
  '/auth/unauthorized',
] as const;

const STAFF_ROLES: readonly StaffRole[] = ['super_admin', 'admin', 'customer_care_rep'];

const LOCKED_ACCOUNT_STATUSES: readonly StaffAccountStatus[] = [
  'locked',
  'suspended',
  'disabled',
];

function isStaffRole(value: string | undefined): value is StaffRole {
  return STAFF_ROLES.includes(value as StaffRole);
}

function isLockedAccountStatus(value: string | undefined): boolean {
  return LOCKED_ACCOUNT_STATUSES.includes(value as StaffAccountStatus);
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function isPublicAssetRoute(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/logo') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  );
}

function createRedirectUrl(request: NextRequest, pathname: string): URL {
  return new URL(pathname, request.url);
}

function createSignInRedirectUrl(request: NextRequest): URL {
  const signInUrl = createRedirectUrl(request, '/auth/sign-in');
  const currentPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (currentPath !== '/' && !currentPath.startsWith('/auth/sign-in')) {
    signInUrl.searchParams.set('returnTo', currentPath);
  }

  return signInUrl;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAssetRoute(pathname)) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.redirect(createRedirectUrl(request, '/dashboard'));
  }

  const accessToken = request.cookies.get(STAFF_COOKIE_NAMES.accessToken)?.value;
  const role = request.cookies.get(STAFF_COOKIE_NAMES.role)?.value;
  const accountStatus = request.cookies.get(STAFF_COOKIE_NAMES.accountStatus)?.value;

  const hasSessionCookie = Boolean(accessToken);
  const hasStaffRole = isStaffRole(role);
  const lockedAccount = isLockedAccountStatus(accountStatus);

  if (lockedAccount && pathname !== '/auth/locked') {
    return NextResponse.redirect(createRedirectUrl(request, '/auth/locked'));
  }

  if (isAuthRoute(pathname)) {
    if (hasSessionCookie && hasStaffRole && !lockedAccount) {
      return NextResponse.redirect(createRedirectUrl(request, '/dashboard'));
    }

    return NextResponse.next();
  }

  if (!hasSessionCookie) {
    return NextResponse.redirect(createSignInRedirectUrl(request));
  }

  if (!hasStaffRole) {
    return NextResponse.redirect(createRedirectUrl(request, '/auth/unauthorized'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run proxy on all routes except static Next.js internals and common files.
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
