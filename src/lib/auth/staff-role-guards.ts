// src/lib/auth/staff-role-guards.ts

/**
 * File purpose:
 * Defines staff role types and role guard helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file centralises staff role checks used by navigation, page guards,
 * staff management screens, dashboard routing, and permission-aware UI.
 *
 * Key exports:
 * - StaffRole defines admin-supported staff roles.
 * - isStaffRole validates unknown role values.
 * - canCreateStaffRole checks frontend staff creation restrictions.
 * - getDashboardPathForStaffRole resolves the correct role dashboard.
 *
 * Business relevance:
 * Only super_admin, admin, and customer_care_rep are valid staff roles in
 * asancha-admin. No frontend screen, route, form, modal, or action may create
 * a super_admin. Customer care representatives must only access safe support
 * views.
 *
 * Security note:
 * These helpers guide frontend UX only. The backend must enforce all staff
 * permissions, role changes, staff creation restrictions, and super_admin
 * visibility rules.
 */

export type StaffRole = 'super_admin' | 'admin' | 'customer_care_rep';

export const STAFF_ROLES = ['super_admin', 'admin', 'customer_care_rep'] as const;

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  customer_care_rep: 'Customer Care',
};

export function isStaffRole(value: unknown): value is StaffRole {
  return value === 'super_admin' || value === 'admin' || value === 'customer_care_rep';
}

export function isSuperAdmin(role: StaffRole | null | undefined): boolean {
  return role === 'super_admin';
}

export function isAdmin(role: StaffRole | null | undefined): boolean {
  return role === 'admin';
}

export function isCustomerCareRep(role: StaffRole | null | undefined): boolean {
  return role === 'customer_care_rep';
}

export function getStaffRoleLabel(role: StaffRole | null | undefined): string {
  if (!role) {
    return 'Unknown Staff Role';
  }

  return STAFF_ROLE_LABELS[role];
}

export function getDashboardPathForStaffRole(role: StaffRole): string {
  if (role === 'super_admin') {
    return '/dashboard/super-admin';
  }

  if (role === 'admin') {
    return '/dashboard/admin';
  }

  return '/dashboard/customer-care';
}

export function canViewSuperAdminAccounts(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin';
}

export function canCreateStaffRole(
  actorRole: StaffRole | null | undefined,
  targetRole: StaffRole,
): boolean {
  if (targetRole === 'super_admin') {
    return false;
  }

  if (actorRole === 'super_admin') {
    return targetRole === 'admin' || targetRole === 'customer_care_rep';
  }

  if (actorRole === 'admin') {
    return targetRole === 'customer_care_rep';
  }

  return false;
}

export function canManageStaff(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin' || actorRole === 'admin';
}

export function canAccessAuditLogs(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin';
}

export function canAccessSettings(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin';
}

export function canAccessApiAccessManagement(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin' || actorRole === 'admin';
}

export function canAccessAiAdminInsights(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin' || actorRole === 'admin';
}

export function canAccessApprovalControls(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin' || actorRole === 'admin';
}

export function canAccessSafeSupportViews(actorRole: StaffRole | null | undefined): boolean {
  return actorRole === 'super_admin' || actorRole === 'admin' || actorRole === 'customer_care_rep';
}
