// src/lib/auth/staff-permission-guards.ts

/**
 * File purpose:
 * Defines permission-aware frontend guard helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file helps admin screens, sidebar navigation, action buttons, review
 * panels, and settings pages decide whether a staff user should see or attempt
 * a frontend action.
 *
 * Key exports:
 * - StaffPermission defines known frontend permission keys.
 * - hasStaffPermission checks explicit permission strings.
 * - canAccessAdminArea checks role-based access to admin route groups.
 * - canPerformAdminAction checks high-level frontend action visibility.
 *
 * Business relevance:
 * Customer care representatives must only access safe support views.
 * Admin and super_admin users may access broader operational areas where
 * allowed. super_admin creation must never be available from frontend actions.
 *
 * Security note:
 * These helpers do not replace backend permission checks. The backend remains
 * the final enforcement authority for all sensitive operations, including staff
 * management, payment approval, document approval, verification approval, API
 * access approval, settings, audit logs, and super_admin restrictions.
 */

import {
  canAccessAiAdminInsights,
  canAccessApiAccessManagement,
  canAccessApprovalControls,
  canAccessAuditLogs,
  canAccessSettings,
  canCreateStaffRole,
  canManageStaff,
  type StaffRole,
} from './staff-role-guards';
import type { StaffSession } from './staff-session';

export type AdminArea =
  | 'dashboard'
  | 'review_queues'
  | 'users'
  | 'staff'
  | 'profiles'
  | 'companies'
  | 'properties'
  | 'listings'
  | 'documents'
  | 'verification_reviews'
  | 'deal_reservations'
  | 'deal_activities'
  | 'payments'
  | 'bookings'
  | 'messages'
  | 'notifications'
  | 'api_access'
  | 'ai'
  | 'audit_logs'
  | 'settings'
  | 'my_profile'
  | 'system';

export type AdminAction =
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'request_correction'
  | 'suspend'
  | 'restore'
  | 'assign'
  | 'export'
  | 'send_notification'
  | 'manage_permissions'
  | 'create_staff'
  | 'create_super_admin';

export type StaffPermission =
  | `${AdminArea}:${AdminAction}`
  | 'staff:create_admin'
  | 'staff:create_customer_care_rep'
  | 'staff:create_super_admin'
  | 'audit_logs:view_high_risk'
  | 'api_access:approve'
  | 'payments:approve'
  | 'documents:approve'
  | 'verification_reviews:approve'
  | 'listings:approve';

export interface PermissionCheckInput {
  role: StaffRole | null | undefined;
  permissions?: string[] | null;
  area: AdminArea;
  action?: AdminAction;
  targetRole?: StaffRole;
}

const CUSTOMER_CARE_SAFE_AREAS = new Set<AdminArea>([
  'dashboard',
  'users',
  'bookings',
  'messages',
  'documents',
  'verification_reviews',
  'payments',
  'notifications',
  'my_profile',
]);

const ADMIN_BROAD_AREAS = new Set<AdminArea>([
  'dashboard',
  'review_queues',
  'users',
  'staff',
  'profiles',
  'companies',
  'properties',
  'listings',
  'documents',
  'verification_reviews',
  'deal_reservations',
  'deal_activities',
  'payments',
  'bookings',
  'messages',
  'notifications',
  'api_access',
  'ai',
  'my_profile',
  'system',
]);

const SUPER_ADMIN_AREAS = new Set<AdminArea>([
  'dashboard',
  'review_queues',
  'users',
  'staff',
  'profiles',
  'companies',
  'properties',
  'listings',
  'documents',
  'verification_reviews',
  'deal_reservations',
  'deal_activities',
  'payments',
  'bookings',
  'messages',
  'notifications',
  'api_access',
  'ai',
  'audit_logs',
  'settings',
  'my_profile',
  'system',
]);

function hasExplicitPermission(
  permissions: string[] | null | undefined,
  permission: StaffPermission,
): boolean {
  return Boolean(permissions?.includes(permission));
}

export function hasStaffPermission(
  session: StaffSession | null | undefined,
  permission: StaffPermission,
): boolean {
  if (!session?.isAuthenticated || !session.role) {
    return false;
  }

  if (session.role === 'super_admin') {
    return permission !== 'staff:create_super_admin';
  }

  return hasExplicitPermission(session.permissions, permission);
}

export function canAccessAdminArea(role: StaffRole | null | undefined, area: AdminArea): boolean {
  if (role === 'super_admin') {
    return SUPER_ADMIN_AREAS.has(area);
  }

  if (role === 'admin') {
    return ADMIN_BROAD_AREAS.has(area);
  }

  if (role === 'customer_care_rep') {
    return CUSTOMER_CARE_SAFE_AREAS.has(area);
  }

  return false;
}

export function canPerformAdminAction(input: PermissionCheckInput): boolean {
  const { role, permissions, area, action = 'view', targetRole } = input;

  if (!role) {
    return false;
  }

  if (!canAccessAdminArea(role, area)) {
    return false;
  }

  if (action === 'create_super_admin') {
    return false;
  }

  if (area === 'staff' && action === 'create') {
    return targetRole ? canCreateStaffRole(role, targetRole) : canManageStaff(role);
  }

  if (area === 'audit_logs') {
    return canAccessAuditLogs(role);
  }

  if (area === 'settings') {
    return canAccessSettings(role);
  }

  if (area === 'api_access') {
    return canAccessApiAccessManagement(role);
  }

  if (area === 'ai') {
    return canAccessAiAdminInsights(role);
  }

  if (
    action === 'approve' ||
    action === 'reject' ||
    action === 'request_correction' ||
    action === 'manage_permissions'
  ) {
    return canAccessApprovalControls(role);
  }

  if (role === 'super_admin') {
    return true;
  }

  if (role === 'admin') {
    return true;
  }

  if (role === 'customer_care_rep') {
    return action === 'view' || action === 'assign' || action === 'update';
  }

  const permissionKey = `${area}:${action}` as StaffPermission;

  return hasExplicitPermission(permissions, permissionKey);
}

export function canAccessRouteGroup(
  session: StaffSession | null | undefined,
  area: AdminArea,
): boolean {
  if (!session?.isAuthenticated || !session.role) {
    return false;
  }

  return canAccessAdminArea(session.role, area);
}

export function canShowSidebarItem(
  session: StaffSession | null | undefined,
  area: AdminArea,
): boolean {
  return canAccessRouteGroup(session, area);
}

export function getPermissionDeniedMessage(area: AdminArea): string {
  if (area === 'audit_logs') {
    return 'You do not have permission to view audit logs.';
  }

  if (area === 'settings') {
    return 'You do not have permission to manage settings.';
  }

  if (area === 'staff') {
    return 'You do not have permission to manage staff accounts.';
  }

  return 'You do not have permission to access this admin area.';
}
