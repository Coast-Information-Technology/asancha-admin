// src/lib/constants/staff-roles.constants.ts

/**
 * File purpose:
 * Defines staff role constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises internal staff role values, labels, descriptions,
 * creation restrictions, and role hierarchy used by admin navigation, guards,
 * staff forms, dashboards, and permission-aware UI.
 *
 * Key exports:
 * - STAFF_ROLE_VALUES defines the only staff roles supported by asancha-admin.
 * - STAFF_ROLE_OPTIONS defines safe display options.
 * - STAFF_CREATION_RULES defines frontend staff creation restrictions.
 *
 * Business relevance:
 * asancha-admin supports only super_admin, admin, and customer_care_rep. No
 * frontend route, form, modal, menu item, or action may create a super_admin.
 * Customer care representatives must only access safe support views.
 *
 * Security note:
 * These constants guide frontend UI only. Backend guards, policies, services,
 * account status checks, and audit logs must enforce the final staff permission
 * decisions.
 */

import type { StaffRole } from '../auth/staff-role-guards';

export const STAFF_ROLE_VALUES = ['super_admin', 'admin', 'customer_care_rep'] as const;

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  customer_care_rep: 'Customer Care Representative',
};

export const STAFF_ROLE_SHORT_LABELS: Record<StaffRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  customer_care_rep: 'Customer Care',
};

export const STAFF_ROLE_DESCRIPTIONS: Record<StaffRole, string> = {
  super_admin: 'Full internal operational access where backend permissions allow.',
  admin: 'Broad admin operational access with restricted staff creation controls.',
  customer_care_rep: 'Safe support-only access for users, bookings, messages, and status views.',
};

export const STAFF_ROLE_HIERARCHY: Record<StaffRole, number> = {
  super_admin: 100,
  admin: 70,
  customer_care_rep: 30,
};

export const STAFF_ROLE_OPTIONS = STAFF_ROLE_VALUES.map((role) => ({
  value: role,
  label: STAFF_ROLE_LABELS[role],
  shortLabel: STAFF_ROLE_SHORT_LABELS[role],
  description: STAFF_ROLE_DESCRIPTIONS[role],
}));

export type StaffCreationTargetRole = Exclude<StaffRole, 'super_admin'>;

export const STAFF_CREATION_TARGET_ROLE_VALUES = ['admin', 'customer_care_rep'] as const;

export const STAFF_CREATION_RULES: Record<StaffRole, readonly StaffCreationTargetRole[]> = {
  super_admin: ['admin', 'customer_care_rep'],
  admin: ['customer_care_rep'],
  customer_care_rep: [],
};

export const STAFF_ROLE_RESTRICTED_FROM_CUSTOMER_CARE = [
  'staff',
  'settings',
  'audit_logs',
  'api_access_approval',
  'ai_admin_insights',
  'payment_approval',
  'document_approval',
  'verification_approval',
  'listing_approval',
  'super_admin_controls',
] as const;

export const CUSTOMER_CARE_SAFE_AREAS = [
  'dashboard',
  'users_safe_support',
  'bookings_support',
  'messages',
  'documents_status',
  'verification_status',
  'payments_status',
  'notifications',
  'my_staff_account',
] as const;

export const STAFF_ACCOUNT_STATUS_VALUES = [
  'active',
  'pending',
  'invited',
  'locked',
  'suspended',
  'disabled',
  'unknown',
] as const;

export type StaffAccountStatusValue = (typeof STAFF_ACCOUNT_STATUS_VALUES)[number];

export const STAFF_ACCOUNT_STATUS_LABELS: Record<StaffAccountStatusValue, string> = {
  active: 'Active',
  pending: 'Pending',
  invited: 'Invited',
  locked: 'Locked',
  suspended: 'Suspended',
  disabled: 'Disabled',
  unknown: 'Unknown',
};

export function getStaffRoleLabel(role: StaffRole): string {
  return STAFF_ROLE_LABELS[role];
}

export function getStaffRoleShortLabel(role: StaffRole): string {
  return STAFF_ROLE_SHORT_LABELS[role];
}

export function canStaffRoleCreateTargetRole(actorRole: StaffRole, targetRole: StaffRole): boolean {
  if (targetRole === 'super_admin') {
    return false;
  }

  return STAFF_CREATION_RULES[actorRole].includes(targetRole);
}
