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

export type NavigationSection =
  'overview' | 'work' | 'records' | 'operations' | 'status' | 'communication' | 'governance';

export type NavigationBadgeKey =
  | 'reviewQueueCount'
  | 'onboardingReviewCount'
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
  renderAsSectionGroup?: boolean;
}

export const ALL_STAFF_NAVIGATION_ROLES: readonly StaffNavigationRole[] = [
  'super_admin',
  'admin',
  'customer_care_rep',
];

export const ADMIN_TOP_BAR_NAVIGATION: readonly AdminNavigationItem[] = [
  {
    label: 'Notifications',
    href: '/notifications',
    iconName: 'Bell',
    description: 'Open operational staff notifications.',
    badgeKey: 'notificationUnreadCount',
    allowedRoles: ALL_STAFF_NAVIGATION_ROLES,
  },
];

export function getAdminTopBarNavigation(role: StaffNavigationRole): AdminNavigationItem[] {
  return ADMIN_TOP_BAR_NAVIGATION.filter((item) => item.allowedRoles.includes(role));
}

export function getNavigationSection(item: AdminNavigationItem): NavigationSection {
  if (item.label === 'Dashboard') {
    return 'overview';
  }

  if (['Review Queues', 'Onboarding'].includes(item.label)) {
    return 'work';
  }

  if (
    [
      'Users',
      'Staff',
      'Profiles',
      'Companies',
      'Properties',
      'Listings',
      'Documents',
      'Verification Reviews',
      'Records',
    ].includes(item.label)
  ) {
    return 'records';
  }

  if (
    ['Operations', 'Deal Reservations', 'Deal Activities', 'Payments', 'Bookings'].includes(
      item.label,
    )
  ) {
    return 'operations';
  }

  if (item.label.endsWith('Status')) {
    return 'status';
  }

  if (['Communication', 'Messages', 'Notifications'].includes(item.label)) {
    return 'communication';
  }

  if (['Governance'].includes(item.label)) {
    return 'governance';
  }

  return 'governance';
}

export function getNavigationSectionLabel(section: NavigationSection): string {
  const labels: Record<NavigationSection, string> = {
    overview: 'Overview',
    work: 'Work queues',
    records: 'Records',
    operations: 'Operations',
    status: 'Status lookup',
    communication: 'Communication',
    governance: 'Governance',
  };

  return labels[section];
}
