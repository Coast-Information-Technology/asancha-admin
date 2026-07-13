// src/lib/permissions/staff-role-permissions.ts

/**
 * File purpose:
 * Defines role-to-permission mappings for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises frontend permission keys for super_admin, admin, and
 * customer_care_rep users. It is used by route guards, menu visibility helpers,
 * action permission helpers, and permission-aware UI components.
 *
 * Key exports:
 * - StaffPermissionKey defines frontend permission keys.
 * - STAFF_ROLE_PERMISSIONS maps staff roles to allowed frontend permissions.
 * - getStaffRolePermissions returns permissions for one staff role.
 * - hasStaffRolePermission checks whether a role has a specific permission.
 *
 * Business relevance:
 * asancha-admin is staff-only. Customer care representatives must only see safe
 * support views. Admin users must not create admin or super_admin accounts.
 * No frontend route, form, modal, or action may create a super_admin.
 *
 * Security note:
 * These permissions guide frontend visibility only. The backend API remains the
 * final authority for authentication, authorization, staff permissions, account
 * status, resource visibility, review decisions, payment decisions, API access
 * decisions, audit logs, and staff creation restrictions.
 */

import type { StaffRole } from '../auth/staff-role-guards';

export type StaffPermissionKey =
  | 'dashboard:view'
  | 'dashboard:view_super_admin'
  | 'dashboard:view_admin'
  | 'dashboard:view_customer_care'
  | 'review_queues:view'
  | 'review_queues:view_all'
  | 'review_queues:view_support'
  | 'users:view'
  | 'users:view_safe_support'
  | 'users:update_status'
  | 'users:update_role'
  | 'users:view_audit_trail'
  | 'staff:view'
  | 'staff:view_super_admin_records'
  | 'staff:create_admin'
  | 'staff:create_customer_care_rep'
  | 'staff:create_super_admin'
  | 'staff:update_status'
  | 'staff:update_role'
  | 'staff:update_permissions'
  | 'profiles:view'
  | 'profiles:review'
  | 'companies:view'
  | 'companies:review'
  | 'companies:update'
  | 'properties:view'
  | 'properties:review'
  | 'properties:update'
  | 'listings:view'
  | 'listings:review'
  | 'listings:update_visibility'
  | 'documents:view'
  | 'documents:view_status'
  | 'documents:review'
  | 'documents:request_correction'
  | 'verification_reviews:view'
  | 'verification_reviews:view_status'
  | 'verification_reviews:review'
  | 'verification_reviews:request_correction'
  | 'deal_reservations:view'
  | 'deal_reservations:update'
  | 'deal_reservations:cancel'
  | 'deal_activities:view'
  | 'payments:view'
  | 'payments:view_status'
  | 'payments:review'
  | 'payments:approve'
  | 'payments:reject'
  | 'payments:trace'
  | 'bookings:view'
  | 'bookings:view_support'
  | 'bookings:create'
  | 'bookings:update'
  | 'bookings:reschedule'
  | 'messages:view'
  | 'messages:view_assigned'
  | 'messages:reply'
  | 'messages:assign'
  | 'notifications:view'
  | 'notifications:send_system'
  | 'notifications:send_user'
  | 'notifications:manage_templates'
  | 'notifications:manage_preferences'
  | 'api_access:view'
  | 'api_access:review_applications'
  | 'api_access:approve'
  | 'api_access:manage_clients'
  | 'api_access:manage_keys'
  | 'api_access:view_usage'
  | 'api_access:view_billing'
  | 'ai:view'
  | 'ai:view_recommendations'
  | 'ai:view_matching_snapshots'
  | 'ai:view_analysis_runs'
  | 'ai:view_feedback'
  | 'audit_logs:view'
  | 'audit_logs:view_high_risk'
  | 'settings:view'
  | 'settings:manage_permissions'
  | 'settings:manage_policies'
  | 'settings:manage_templates'
  | 'settings:manage_integrations'
  | 'settings:manage_system'
  | 'my_profile:view'
  | 'my_profile:update_security'
  | 'my_profile:update_notifications'
  | 'my_profile:view_activity'
  | 'system:view_status';

const SUPER_ADMIN_PERMISSIONS: readonly StaffPermissionKey[] = [
  'dashboard:view',
  'dashboard:view_super_admin',
  'dashboard:view_admin',
  'dashboard:view_customer_care',
  'review_queues:view',
  'review_queues:view_all',
  'review_queues:view_support',
  'users:view',
  'users:view_safe_support',
  'users:update_status',
  'users:update_role',
  'users:view_audit_trail',
  'staff:view',
  'staff:view_super_admin_records',
  'staff:create_admin',
  'staff:create_customer_care_rep',
  'staff:update_status',
  'staff:update_role',
  'staff:update_permissions',
  'profiles:view',
  'profiles:review',
  'companies:view',
  'companies:review',
  'companies:update',
  'properties:view',
  'properties:review',
  'properties:update',
  'listings:view',
  'listings:review',
  'listings:update_visibility',
  'documents:view',
  'documents:view_status',
  'documents:review',
  'documents:request_correction',
  'verification_reviews:view',
  'verification_reviews:view_status',
  'verification_reviews:review',
  'verification_reviews:request_correction',
  'deal_reservations:view',
  'deal_reservations:update',
  'deal_reservations:cancel',
  'deal_activities:view',
  'payments:view',
  'payments:view_status',
  'payments:review',
  'payments:approve',
  'payments:reject',
  'payments:trace',
  'bookings:view',
  'bookings:view_support',
  'bookings:create',
  'bookings:update',
  'bookings:reschedule',
  'messages:view',
  'messages:view_assigned',
  'messages:reply',
  'messages:assign',
  'notifications:view',
  'notifications:send_system',
  'notifications:send_user',
  'notifications:manage_templates',
  'notifications:manage_preferences',
  'api_access:view',
  'api_access:review_applications',
  'api_access:approve',
  'api_access:manage_clients',
  'api_access:manage_keys',
  'api_access:view_usage',
  'api_access:view_billing',
  'ai:view',
  'ai:view_recommendations',
  'ai:view_matching_snapshots',
  'ai:view_analysis_runs',
  'ai:view_feedback',
  'audit_logs:view',
  'audit_logs:view_high_risk',
  'settings:view',
  'settings:manage_permissions',
  'settings:manage_policies',
  'settings:manage_templates',
  'settings:manage_integrations',
  'settings:manage_system',
  'my_profile:view',
  'my_profile:update_security',
  'my_profile:update_notifications',
  'my_profile:view_activity',
  'system:view_status',
];

const ADMIN_PERMISSIONS: readonly StaffPermissionKey[] = [
  'dashboard:view',
  'dashboard:view_admin',
  'review_queues:view',
  'review_queues:view_all',
  'users:view',
  'users:view_safe_support',
  'users:update_status',
  'staff:view',
  'staff:create_customer_care_rep',
  'staff:update_status',
  'profiles:view',
  'profiles:review',
  'companies:view',
  'companies:review',
  'companies:update',
  'properties:view',
  'properties:review',
  'properties:update',
  'listings:view',
  'listings:review',
  'listings:update_visibility',
  'documents:view',
  'documents:view_status',
  'documents:review',
  'documents:request_correction',
  'verification_reviews:view',
  'verification_reviews:view_status',
  'verification_reviews:review',
  'verification_reviews:request_correction',
  'deal_reservations:view',
  'deal_reservations:update',
  'deal_activities:view',
  'payments:view',
  'payments:view_status',
  'payments:review',
  'payments:trace',
  'bookings:view',
  'bookings:view_support',
  'bookings:create',
  'bookings:update',
  'bookings:reschedule',
  'messages:view',
  'messages:view_assigned',
  'messages:reply',
  'messages:assign',
  'notifications:view',
  'notifications:send_user',
  'api_access:view',
  'api_access:review_applications',
  'api_access:view_usage',
  'ai:view',
  'ai:view_recommendations',
  'ai:view_matching_snapshots',
  'ai:view_analysis_runs',
  'ai:view_feedback',
  'my_profile:view',
  'my_profile:update_security',
  'my_profile:update_notifications',
  'my_profile:view_activity',
  'system:view_status',
];

const CUSTOMER_CARE_PERMISSIONS: readonly StaffPermissionKey[] = [
  'dashboard:view',
  'dashboard:view_customer_care',
  'users:view_safe_support',
  'documents:view_status',
  'verification_reviews:view_status',
  'payments:view_status',
  'bookings:view_support',
  'messages:view',
  'messages:view_assigned',
  'messages:reply',
  'notifications:view',
  'my_profile:view',
  'my_profile:update_security',
  'my_profile:update_notifications',
  'my_profile:view_activity',
];

export const STAFF_ROLE_PERMISSIONS: Record<StaffRole, readonly StaffPermissionKey[]> = {
  super_admin: SUPER_ADMIN_PERMISSIONS,
  admin: ADMIN_PERMISSIONS,
  customer_care_rep: CUSTOMER_CARE_PERMISSIONS,
};

export function getStaffRolePermissions(role: StaffRole): readonly StaffPermissionKey[] {
  return STAFF_ROLE_PERMISSIONS[role];
}

export function hasStaffRolePermission(
  role: StaffRole | null | undefined,
  permission: StaffPermissionKey,
): boolean {
  if (!role) {
    return false;
  }

  if (permission === 'staff:create_super_admin') {
    return false;
  }

  return STAFF_ROLE_PERMISSIONS[role].includes(permission);
}

export function hasAnyStaffRolePermission(
  role: StaffRole | null | undefined,
  permissions: readonly StaffPermissionKey[],
): boolean {
  return permissions.some((permission) => hasStaffRolePermission(role, permission));
}

export function hasEveryStaffRolePermission(
  role: StaffRole | null | undefined,
  permissions: readonly StaffPermissionKey[],
): boolean {
  return permissions.every((permission) => hasStaffRolePermission(role, permission));
}

export function canRoleSeeSuperAdminRecords(role: StaffRole | null | undefined): boolean {
  return hasStaffRolePermission(role, 'staff:view_super_admin_records');
}

export function canRoleCreateAdmin(role: StaffRole | null | undefined): boolean {
  return hasStaffRolePermission(role, 'staff:create_admin');
}

export function canRoleCreateCustomerCareRep(role: StaffRole | null | undefined): boolean {
  return hasStaffRolePermission(role, 'staff:create_customer_care_rep');
}

export function canRoleCreateSuperAdmin(): boolean {
  return false;
}
