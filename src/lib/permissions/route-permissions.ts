// src/lib/permissions/route-permissions.ts

/**
 * File purpose:
 * Defines route-level frontend permission rules for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file maps admin route patterns to allowed staff roles and optional
 * permission keys. It supports middleware, layouts, page guards, and
 * permission-aware route access checks.
 *
 * Key exports:
 * - RoutePermissionRule defines one frontend route permission rule.
 * - ADMIN_ROUTE_PERMISSION_RULES defines the approved admin route map.
 * - findRoutePermissionRule resolves a pathname to a route rule.
 * - canStaffRoleAccessRoute checks whether a staff role may access a pathname.
 *
 * Business relevance:
 * Detail pages are valid routes but must not appear as sidebar menu items.
 * Customer care representatives must only access safe support views. Admin users
 * must not access super-admin-only areas such as audit logs and settings.
 *
 * Security note:
 * Frontend route checks guide UX only. The backend API must still enforce
 * authentication, authorization, account status, staff permissions, resource
 * visibility, audit logging, and all sensitive decisions.
 */

import type { StaffRole } from '../auth/staff-role-guards';
import { hasStaffRolePermission, type StaffPermissionKey } from './staff-role-permissions';

export type RouteAccessMode = 'public_auth' | 'staff_auth' | 'staff_protected';

export interface RoutePermissionRule {
  pathPattern: string;
  label: string;
  accessMode: RouteAccessMode;
  allowedRoles: readonly StaffRole[];
  requiredPermissions?: readonly StaffPermissionKey[];
  exact?: boolean;
  isDetailRoute?: boolean;
  isSidebarEligible?: boolean;
  isCustomerCareSafe?: boolean;
}

const ALL_STAFF_ROLES: readonly StaffRole[] = ['super_admin', 'admin', 'customer_care_rep'];
const REVIEW_STAFF_ROLES: readonly StaffRole[] = ['super_admin', 'admin'];
const SUPER_ADMIN_ONLY: readonly StaffRole[] = ['super_admin'];
const ADMIN_AND_SUPER_ADMIN: readonly StaffRole[] = ['super_admin', 'admin'];

export const ADMIN_ROUTE_PERMISSION_RULES: readonly RoutePermissionRule[] = [
  {
    pathPattern: '/auth/sign-in',
    label: 'Staff Sign In',
    accessMode: 'public_auth',
    allowedRoles: ALL_STAFF_ROLES,
    exact: true,
  },
  {
    pathPattern: '/auth/forgot-password',
    label: 'Forgot Password',
    accessMode: 'public_auth',
    allowedRoles: ALL_STAFF_ROLES,
    exact: true,
  },
  {
    pathPattern: '/auth/reset-password',
    label: 'Reset Password',
    accessMode: 'public_auth',
    allowedRoles: ALL_STAFF_ROLES,
    exact: true,
  },
  {
    pathPattern: '/auth/set-password',
    label: 'Set Password',
    accessMode: 'public_auth',
    allowedRoles: ALL_STAFF_ROLES,
    exact: true,
  },
  {
    pathPattern: '/auth/verify-staff-invite',
    label: 'Verify Staff Invite',
    accessMode: 'public_auth',
    allowedRoles: ALL_STAFF_ROLES,
    exact: true,
  },
  {
    pathPattern: '/auth/locked',
    label: 'Locked Account',
    accessMode: 'staff_auth',
    allowedRoles: ALL_STAFF_ROLES,
    exact: true,
  },
  {
    pathPattern: '/auth/unauthorized',
    label: 'Unauthorized',
    accessMode: 'staff_auth',
    allowedRoles: ALL_STAFF_ROLES,
    exact: true,
  },
  {
    pathPattern: '/dashboard',
    label: 'Dashboard Resolver',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['dashboard:view'],
    exact: true,
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/dashboard/super-admin',
    label: 'Super Admin Dashboard',
    accessMode: 'staff_protected',
    allowedRoles: SUPER_ADMIN_ONLY,
    requiredPermissions: ['dashboard:view_super_admin'],
    exact: true,
    isSidebarEligible: true,
  },
  {
    pathPattern: '/dashboard/admin',
    label: 'Admin Dashboard',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['dashboard:view_admin'],
    exact: true,
    isSidebarEligible: true,
  },
  {
    pathPattern: '/dashboard/customer-care',
    label: 'Customer Care Dashboard',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['dashboard:view_customer_care'],
    exact: true,
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/review-queues',
    label: 'Review Queues',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['review_queues:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/onboarding',
    label: 'Onboarding',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['review_queues:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/users',
    label: 'Users',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['users:view_safe_support'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/users/[userPublicId]',
    label: 'User Detail',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['users:view_safe_support'],
    isDetailRoute: true,
    isSidebarEligible: false,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/staff',
    label: 'Staff',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['staff:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/staff/new',
    label: 'Create Staff',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['staff:create_customer_care_rep'],
    exact: true,
    isSidebarEligible: true,
  },
  {
    pathPattern: '/staff/[staffPublicId]',
    label: 'Staff Detail',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['staff:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/profiles',
    label: 'Profiles',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['profiles:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/profiles/[profilePublicId]',
    label: 'Profile Detail',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['profiles:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/companies',
    label: 'Companies',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['companies:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/companies/[companyPublicId]',
    label: 'Company Detail',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['companies:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/properties',
    label: 'Properties',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['properties:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/properties/[propertyPublicId]',
    label: 'Property Detail',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['properties:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/listings',
    label: 'Listings',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['listings:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/listings/[listingPublicId]',
    label: 'Listing Detail',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['listings:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/documents',
    label: 'Documents',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['documents:view_status'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/documents/[documentPublicId]',
    label: 'Document Detail',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['documents:view_status'],
    isDetailRoute: true,
    isSidebarEligible: false,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/verification-reviews',
    label: 'Verification Reviews',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['verification_reviews:view_status'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/verification-reviews/[verificationReviewPublicId]',
    label: 'Verification Review Detail',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['verification_reviews:view_status'],
    isDetailRoute: true,
    isSidebarEligible: false,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/deal-reservations',
    label: 'Deal Reservations',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['deal_reservations:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/deal-reservations/[reservationPublicId]',
    label: 'Deal Reservation Detail',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['deal_reservations:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/deal-activities',
    label: 'Deal Activities',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['deal_activities:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/deal-activities/[dealActivityPublicId]',
    label: 'Deal Activity Detail',
    accessMode: 'staff_protected',
    allowedRoles: REVIEW_STAFF_ROLES,
    requiredPermissions: ['deal_activities:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/payments',
    label: 'Payments',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['payments:view_status'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/payments/[paymentPublicId]',
    label: 'Payment Detail',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['payments:view_status'],
    isDetailRoute: true,
    isSidebarEligible: false,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/bookings',
    label: 'Bookings',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['bookings:view_support'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/bookings/[bookingPublicId]',
    label: 'Booking Detail',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['bookings:view_support'],
    isDetailRoute: true,
    isSidebarEligible: false,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/messages',
    label: 'Messages',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['messages:view'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/messages/[conversationPublicId]',
    label: 'Message Conversation',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['messages:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/notifications',
    label: 'Notifications',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['notifications:view'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/api-access',
    label: 'API Access',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['api_access:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/api-access/[section]',
    label: 'API Access Section',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['api_access:view'],
    isDetailRoute: false,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/api-access/[section]/[resourcePublicId]',
    label: 'API Access Detail',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['api_access:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/ai',
    label: 'AI',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['ai:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/audit-logs',
    label: 'Audit Logs',
    accessMode: 'staff_protected',
    allowedRoles: SUPER_ADMIN_ONLY,
    requiredPermissions: ['audit_logs:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/audit-logs/[auditLogPublicId]',
    label: 'Audit Log Detail',
    accessMode: 'staff_protected',
    allowedRoles: SUPER_ADMIN_ONLY,
    requiredPermissions: ['audit_logs:view'],
    isDetailRoute: true,
    isSidebarEligible: false,
  },
  {
    pathPattern: '/settings',
    label: 'Settings',
    accessMode: 'staff_protected',
    allowedRoles: SUPER_ADMIN_ONLY,
    requiredPermissions: ['settings:view'],
    isSidebarEligible: true,
  },
  {
    pathPattern: '/my-profile',
    label: 'My Staff Account',
    accessMode: 'staff_protected',
    allowedRoles: ALL_STAFF_ROLES,
    requiredPermissions: ['my_profile:view'],
    isSidebarEligible: true,
    isCustomerCareSafe: true,
  },
  {
    pathPattern: '/system/status',
    label: 'System Status',
    accessMode: 'staff_protected',
    allowedRoles: ADMIN_AND_SUPER_ADMIN,
    requiredPermissions: ['system:view_status'],
    exact: true,
    isSidebarEligible: false,
  },
];

function normalisePathname(pathname: string): string {
  const [pathWithoutQuery] = pathname.split('?');
  const trimmedPath = pathWithoutQuery.replace(/\/+$/g, '');

  return trimmedPath.length > 0 ? trimmedPath : '/';
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function routePatternToRegex(pattern: string, exact = false): RegExp {
  const normalisedPattern = normalisePathname(pattern);
  const escapedPattern = normalisedPattern
    .split('/')
    .map((segment) => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        return '[^/]+';
      }

      return escapeRegex(segment);
    })
    .join('/');

  return new RegExp(exact ? `^${escapedPattern}$` : `^${escapedPattern}(?:/.*)?$`);
}

export function doesPathMatchRouteRule(pathname: string, rule: RoutePermissionRule): boolean {
  const normalisedPathname = normalisePathname(pathname);

  return routePatternToRegex(rule.pathPattern, rule.exact).test(normalisedPathname);
}

export function findRoutePermissionRule(pathname: string): RoutePermissionRule | null {
  const normalisedPathname = normalisePathname(pathname);

  const exactMatch = ADMIN_ROUTE_PERMISSION_RULES.find(
    (rule) => rule.exact && doesPathMatchRouteRule(normalisedPathname, rule),
  );

  if (exactMatch) {
    return exactMatch;
  }

  const matchingRules = ADMIN_ROUTE_PERMISSION_RULES.filter((rule) =>
    doesPathMatchRouteRule(normalisedPathname, rule),
  );

  return (
    matchingRules.sort((firstRule, secondRule) => {
      return secondRule.pathPattern.length - firstRule.pathPattern.length;
    })[0] ?? null
  );
}

export function canStaffRoleAccessRoute(
  role: StaffRole | null | undefined,
  pathname: string,
): boolean {
  const rule = findRoutePermissionRule(pathname);

  if (!rule) {
    return false;
  }

  if (rule.accessMode === 'public_auth') {
    return true;
  }

  if (!role || !rule.allowedRoles.includes(role)) {
    return false;
  }

  if (!rule.requiredPermissions || rule.requiredPermissions.length === 0) {
    return true;
  }

  return rule.requiredPermissions.every((permission) => hasStaffRolePermission(role, permission));
}

export function isRouteSidebarEligible(pathname: string): boolean {
  const rule = findRoutePermissionRule(pathname);

  return Boolean(rule?.isSidebarEligible);
}

export function isRouteDetailPage(pathname: string): boolean {
  const rule = findRoutePermissionRule(pathname);

  return Boolean(rule?.isDetailRoute);
}

export function isCustomerCareSafeRoute(pathname: string): boolean {
  const rule = findRoutePermissionRule(pathname);

  return Boolean(rule?.isCustomerCareSafe);
}

export function getRoutePermissionDeniedPath(
  role: StaffRole | null | undefined,
  pathname: string,
): string {
  const rule = findRoutePermissionRule(pathname);

  if (!rule || rule.accessMode === 'staff_protected') {
    return role ? '/auth/unauthorized' : '/auth/sign-in';
  }

  return '/auth/unauthorized';
}
