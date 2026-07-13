// src/lib/navigation/admin-top-bar-navigation.ts

/**
 * File purpose:
 * Defines shared navigation types and desktop top-bar navigation items for the
 * Asancha Admin frontend.
 *
 * Role in the project:
 * This file is the shared navigation type source used by sidebar, mobile
 * drawer, staff account, and permission visibility helpers.
 *
 * Key exports:
 * - StaffNavigationRole defines the staff roles supported by admin navigation.
 * - AdminNavigationItem defines the shared navigation item shape.
 * - ADMIN_TOP_BAR_NAVIGATION defines the approved desktop top-bar items.
 * - getAdminTopBarNavigation returns role-filtered top-bar navigation.
 *
 * Business relevance:
 * asancha-admin is only for super_admin, admin, and customer_care_rep users.
 * The admin top bar must include Messages and Notifications, and must not add
 * Help/Support as a separate admin top-bar area.
 *
 * Security note:
 * Navigation visibility is not security. The backend API remains the final
 * authority for authentication, authorization, account status, permissions,
 * resource visibility, review decisions, staff creation, and audit-sensitive
 * actions.
 */

export type StaffNavigationRole = 'super_admin' | 'admin' | 'customer_care_rep';

export type NavigationBadgeKey =
  | 'reviewQueueCount'
  | 'messageUnreadCount'
  | 'notificationUnreadCount'
  | 'paymentReviewCount'
  | 'documentReviewCount'
  | 'verificationReviewCount'
  | 'bookingSupportCount'
  | 'apiAccessReviewCount'
  | 'aiReviewCount';

export interface AdminNavigationItem {
  label: string;
  href: string;
  iconName: string;
  description?: string;
  badgeKey?: NavigationBadgeKey;
  allowedRoles: readonly StaffNavigationRole[];
  children?: readonly AdminNavigationItem[];
}

export const ALL_STAFF_NAVIGATION_ROLES: readonly StaffNavigationRole[] = [
  'super_admin',
  'admin',
  'customer_care_rep',
];

export const ADMIN_TOP_BAR_NAVIGATION: readonly AdminNavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    iconName: 'LayoutDashboard',
    description: 'Open the correct dashboard for the current staff role.',
    allowedRoles: ALL_STAFF_NAVIGATION_ROLES,
  },
  {
    label: 'Review Queues',
    href: '/review-queues',
    iconName: 'ListChecks',
    description: 'Open operational review queues.',
    badgeKey: 'reviewQueueCount',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    label: 'Messages',
    href: '/messages',
    iconName: 'MessagesSquare',
    description: 'Open staff messages and conversation threads.',
    badgeKey: 'messageUnreadCount',
    allowedRoles: ALL_STAFF_NAVIGATION_ROLES,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    iconName: 'Bell',
    description: 'Open operational staff notifications.',
    badgeKey: 'notificationUnreadCount',
    allowedRoles: ALL_STAFF_NAVIGATION_ROLES,
  },
  {
    label: 'My Staff Account',
    href: '/my-profile',
    iconName: 'UserCircle',
    description: 'Manage your staff profile, security, notifications, and activity.',
    allowedRoles: ALL_STAFF_NAVIGATION_ROLES,
  },
];

export function getAdminTopBarNavigation(role: StaffNavigationRole): AdminNavigationItem[] {
  return ADMIN_TOP_BAR_NAVIGATION.filter((item) => item.allowedRoles.includes(role));
}
