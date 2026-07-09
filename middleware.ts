// middleware.ts

/**
 * File purpose:
 * Provides root-level Next.js middleware for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file protects admin/staff frontend routes before a page is rendered.
 * It redirects unauthenticated users to staff sign-in, redirects locked staff
 * accounts to the locked screen, and blocks non-staff users from admin screens.
 *
 * Key functions/constants:
 * - STAFF_ROLES defines the only staff roles allowed into the admin app.
 * - AUTH_ROUTES defines staff authentication and recovery routes.
 * - middleware performs route-level frontend access checks.
 * - config defines which routes the middleware should inspect.
 *
 * Business relevance:
 * asancha-admin is a staff-only frontend for super_admin, admin, and
 * customer_care_rep users. Public users, guests, investors, property owners,
 * property agents, property sourcers, service providers, and API partners must
 * not access admin screens. This middleware guides frontend UX, while the
 * backend remains the final authority for authentication, authorization,
 * permissions, resource visibility, and audit-sensitive actions.
 */

import { NextRequest, NextResponse } from 'next/server';

const ADMIN_AUTH_TOKEN_COOKIE = 'asancha_admin_access_token';
const ADMIN_ROLE_COOKIE = 'asancha_admin_role';
const ADMIN_ACCOUNT_STATUS_COOKIE = 'asancha_admin_account_status';

const STAFF_ROLES = new Set(['super_admin', 'admin', 'customer_care_rep']);

const AUTH_ROUTES = [
  '/auth/sign-in',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/set-password',
  '/auth/verify-staff-invite',
  '/auth/locked',
  '/auth/unauthorized',
];

const GUEST_ONLY_AUTH_ROUTES = ['/auth/sign-in', '/auth/forgot-password'];

const LOCKED_ACCOUNT_STATUSES = new Set(['locked', 'suspended', 'disabled']);

/**
 * Checks whether the current pathname belongs to the staff authentication area.
 *
 * Business rule:
 * Staff authentication routes must remain separate from public signup and
 * public onboarding routes. asancha-admin must not expose public-user flows.
 *
 * @param pathname - The current request pathname.
 * @returns True when the pathname is an allowed staff auth route.
 */
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * Checks whether the current pathname should be used only by unauthenticated users.
 *
 * Business rule:
 * Authenticated staff users should not remain on sign-in or forgot-password
 * screens because they already have an admin session context.
 *
 * @param pathname - The current request pathname.
 * @returns True when the pathname is a guest-only staff auth route.
 */
function isGuestOnlyAuthRoute(pathname: string): boolean {
  return GUEST_ONLY_AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * Creates an absolute redirect URL for the current request origin.
 *
 * Business rule:
 * Redirects should remain inside the admin frontend and must not expose
 * private service URLs or internal backend URLs.
 *
 * @param request - The incoming Next.js request.
 * @param pathname - The target internal admin pathname.
 * @returns A URL object for the redirect target.
 */
function createRedirectUrl(request: NextRequest, pathname: string): URL {
  return new URL(pathname, request.url);
}

/**
 * Creates a staff sign-in redirect and preserves the intended destination.
 *
 * Business rule:
 * Unauthenticated users must be redirected to staff sign-in before accessing
 * admin screens. The return path helps staff resume their intended workflow
 * after authentication.
 *
 * @param request - The incoming Next.js request.
 * @returns A redirect response to the staff sign-in screen.
 */
function createSignInRedirect(request: NextRequest): NextResponse {
  const signInUrl = createRedirectUrl(request, '/auth/sign-in');
  const currentPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (currentPath !== '/auth/sign-in') {
    signInUrl.searchParams.set('returnTo', currentPath);
  }

  return NextResponse.redirect(signInUrl);
}

/**
 * Runs frontend route protection for the Asancha Admin app.
 *
 * Business rule:
 * This middleware is a UX and route-guidance layer only. It must not be treated
 * as the final security authority. The backend API must still enforce staff
 * authentication, role permissions, account status, staff visibility,
 * super_admin restrictions, and all audit-sensitive actions.
 *
 * @param request - The incoming Next.js request.
 * @returns The next response or a redirect response.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get(ADMIN_AUTH_TOKEN_COOKIE)?.value;
  const role = request.cookies.get(ADMIN_ROLE_COOKIE)?.value;
  const accountStatus = request.cookies.get(ADMIN_ACCOUNT_STATUS_COOKIE)?.value;

  const isAuthenticated = Boolean(authToken);
  const isStaffRole = role ? STAFF_ROLES.has(role) : false;
  const isLockedAccount = accountStatus ? LOCKED_ACCOUNT_STATUSES.has(accountStatus) : false;

  if (pathname === '/') {
    return NextResponse.redirect(createRedirectUrl(request, '/dashboard'));
  }

  if (!isAuthenticated && !isAuthRoute(pathname)) {
    return createSignInRedirect(request);
  }

  if (isAuthenticated && isGuestOnlyAuthRoute(pathname)) {
    return NextResponse.redirect(createRedirectUrl(request, '/dashboard'));
  }

  if (isAuthenticated && isLockedAccount && pathname !== '/auth/locked') {
    return NextResponse.redirect(createRedirectUrl(request, '/auth/locked'));
  }

  if (isAuthenticated && !isStaffRole && pathname !== '/auth/unauthorized') {
    return NextResponse.redirect(createRedirectUrl(request, '/auth/unauthorized'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Next.js internals
     * - static files
     * - images
     * - favicon
     * - robots
     * - sitemap
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
