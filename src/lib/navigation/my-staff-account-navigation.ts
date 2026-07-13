// src/lib/navigation/my-staff-account-navigation.ts

/**
 * File purpose:
 * Defines navigation items for the My Staff Account area of the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file centralises tabs and links for staff users managing their own
 * profile, security settings, notification preferences, and activity history.
 *
 * Key exports:
 * - MY_STAFF_ACCOUNT_NAVIGATION defines account-area navigation.
 * - getMyStaffAccountNavigation returns links available to the current role.
 *
 * Business relevance:
 * My Staff Account is available to super_admin, admin, and customer_care_rep.
 * This area is for the currently signed-in staff member only and must not
 * become a route for creating or editing super_admin accounts through normal
 * frontend mutation paths.
 *
 * Security note:
 * Account navigation does not replace backend session, account status, password,
 * permission, and audit checks.
 */

import type { AdminNavigationItem, StaffNavigationRole } from './admin-top-bar-navigation';

export const MY_STAFF_ACCOUNT_NAVIGATION: readonly AdminNavigationItem[] = [
  {
    label: 'Overview',
    href: '/my-profile',
    iconName: 'UserCircle',
    description: 'View your staff account overview.',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
  {
    label: 'Security',
    href: '/my-profile/security',
    iconName: 'ShieldCheck',
    description: 'Manage your password and account security.',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
  {
    label: 'Notifications',
    href: '/my-profile/notifications',
    iconName: 'Bell',
    description: 'Manage your notification preferences.',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
  {
    label: 'Activity',
    href: '/my-profile/activity',
    iconName: 'Activity',
    description: 'View your recent staff account activity.',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
];

export function getMyStaffAccountNavigation(role: StaffNavigationRole): AdminNavigationItem[] {
  return MY_STAFF_ACCOUNT_NAVIGATION.filter((item) => item.allowedRoles.includes(role));
}
