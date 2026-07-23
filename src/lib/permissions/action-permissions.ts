// src/lib/permissions/action-permissions.ts

/**
 * File purpose:
 * Defines frontend action permission helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file controls whether buttons, form actions, review actions, approval
 * actions, staff actions, payment actions, document actions, API access actions,
 * and settings actions should be visible or enabled in admin UI.
 *
 * Key exports:
 * - AdminPermissionAction defines high-level frontend action names.
 * - canPerformPermissionAction checks whether a staff role may attempt an
 *   action.
 * - getPermissionActionDeniedMessage returns safe blocked-action messages.
 *
 * Business relevance:
 * Customer care representatives must not approve payments, approve documents,
 * approve verification reviews, approve listings, manage API access, manage
 * staff, view audit logs, manage settings, or access super-admin controls.
 * No frontend route, form, modal, or action may create a super_admin.
 *
 * Security note:
 * These helpers only control frontend UI visibility and disabled states.
 * Backend guards, policies, services, DTOs, audit logging, and resource state
 * checks remain mandatory for all sensitive actions.
 */

import type { StaffRole } from '../auth/staff-role-guards';
import { canCreateStaffRole, canViewSuperAdminAccounts } from '../auth/staff-role-guards';
import type { StaffPermissionKey } from './staff-role-permissions';
import { hasStaffRolePermission } from './staff-role-permissions';

export type AdminPermissionAction =
  | 'view_dashboard'
  | 'view_review_queues'
  | 'view_users'
  | 'view_safe_user_support'
  | 'update_user_status'
  | 'update_user_role'
  | 'view_user_audit_trail'
  | 'view_staff'
  | 'view_super_admin_records'
  | 'create_staff'
  | 'create_admin'
  | 'create_customer_care_rep'
  | 'create_super_admin'
  | 'update_staff_status'
  | 'update_staff_role'
  | 'update_staff_permissions'
  | 'view_profiles'
  | 'review_profiles'
  | 'view_companies'
  | 'review_companies'
  | 'update_companies'
  | 'view_properties'
  | 'review_properties'
  | 'update_properties'
  | 'view_listings'
  | 'review_listings'
  | 'update_listing_visibility'
  | 'view_documents'
  | 'view_document_status'
  | 'review_documents'
  | 'request_document_correction'
  | 'view_verification_reviews'
  | 'view_verification_status'
  | 'review_verification_reviews'
  | 'request_verification_correction'
  | 'view_deal_reservations'
  | 'update_deal_reservations'
  | 'cancel_deal_reservations'
  | 'view_deal_activities'
  | 'view_payments'
  | 'view_payment_status'
  | 'review_payments'
  | 'approve_payments'
  | 'reject_payments'
  | 'view_payment_trace'
  | 'view_bookings'
  | 'view_booking_support'
  | 'create_bookings'
  | 'update_bookings'
  | 'reschedule_bookings'
  | 'view_messages'
  | 'view_assigned_messages'
  | 'reply_to_messages'
  | 'assign_messages'
  | 'view_notifications'
  | 'send_system_notifications'
  | 'send_user_notifications'
  | 'manage_notification_templates'
  | 'manage_notification_preferences'
  | 'view_api_access'
  | 'review_api_applications'
  | 'approve_api_access'
  | 'manage_api_clients'
  | 'manage_api_keys'
  | 'view_api_usage'
  | 'view_api_billing'
  | 'view_ai'
  | 'view_ai_recommendations'
  | 'view_ai_matching_snapshots'
  | 'view_ai_analysis_runs'
  | 'view_ai_feedback'
  | 'view_audit_logs'
  | 'view_high_risk_audit_logs'
  | 'view_settings'
  | 'manage_permission_settings'
  | 'manage_policy_settings'
  | 'manage_template_settings'
  | 'manage_integration_settings'
  | 'manage_system_settings'
  | 'view_my_profile'
  | 'update_my_profile_security'
  | 'update_my_profile_notifications'
  | 'view_my_profile_activity'
  | 'view_system_status';

export interface PermissionActionInput {
  role: StaffRole | null | undefined;
  action: AdminPermissionAction;
  targetRole?: StaffRole;
}

const ACTION_PERMISSION_MAP: Record<
  Exclude<
    AdminPermissionAction,
    | 'create_staff'
    | 'create_admin'
    | 'create_customer_care_rep'
    | 'create_super_admin'
    | 'view_super_admin_records'
  >,
  StaffPermissionKey
> = {
  view_dashboard: 'dashboard:view',
  view_review_queues: 'review_queues:view',
  view_users: 'users:view',
  view_safe_user_support: 'users:view_safe_support',
  update_user_status: 'users:update_status',
  update_user_role: 'users:update_role',
  view_user_audit_trail: 'users:view_audit_trail',
  view_staff: 'staff:view',
  update_staff_status: 'staff:update_status',
  update_staff_role: 'staff:update_role',
  update_staff_permissions: 'staff:update_permissions',
  view_profiles: 'profiles:view',
  review_profiles: 'profiles:review',
  view_companies: 'companies:view',
  review_companies: 'companies:review',
  update_companies: 'companies:update',
  view_properties: 'properties:view',
  review_properties: 'properties:review',
  update_properties: 'properties:update',
  view_listings: 'listings:view',
  review_listings: 'listings:review',
  update_listing_visibility: 'listings:update_visibility',
  view_documents: 'documents:view',
  view_document_status: 'documents:view_status',
  review_documents: 'documents:review',
  request_document_correction: 'documents:request_correction',
  view_verification_reviews: 'verification_reviews:view',
  view_verification_status: 'verification_reviews:view_status',
  review_verification_reviews: 'verification_reviews:review',
  request_verification_correction: 'verification_reviews:request_correction',
  view_deal_reservations: 'deal_reservations:view',
  update_deal_reservations: 'deal_reservations:update',
  cancel_deal_reservations: 'deal_reservations:cancel',
  view_deal_activities: 'deal_activities:view',
  view_payments: 'payments:view',
  view_payment_status: 'payments:view_status',
  review_payments: 'payments:review',
  approve_payments: 'payments:approve',
  reject_payments: 'payments:reject',
  view_payment_trace: 'payments:trace',
  view_bookings: 'bookings:view',
  view_booking_support: 'bookings:view_support',
  create_bookings: 'bookings:create',
  update_bookings: 'bookings:update',
  reschedule_bookings: 'bookings:reschedule',
  view_messages: 'messages:view',
  view_assigned_messages: 'messages:view_assigned',
  reply_to_messages: 'messages:reply',
  assign_messages: 'messages:assign',
  view_notifications: 'notifications:view',
  send_system_notifications: 'notifications:send_system',
  send_user_notifications: 'notifications:send_user',
  manage_notification_templates: 'notifications:manage_templates',
  manage_notification_preferences: 'notifications:manage_preferences',
  view_api_access: 'api_access:view',
  review_api_applications: 'api_access:review_applications',
  approve_api_access: 'api_access:approve',
  manage_api_clients: 'api_access:manage_clients',
  manage_api_keys: 'api_access:manage_keys',
  view_api_usage: 'api_access:view_usage',
  view_api_billing: 'api_access:view_billing',
  view_ai: 'ai:view',
  view_ai_recommendations: 'ai:view_recommendations',
  view_ai_matching_snapshots: 'ai:view_matching_snapshots',
  view_ai_analysis_runs: 'ai:view_analysis_runs',
  view_ai_feedback: 'ai:view_feedback',
  view_audit_logs: 'audit_logs:view',
  view_high_risk_audit_logs: 'audit_logs:view_high_risk',
  view_settings: 'settings:view',
  manage_permission_settings: 'settings:manage_permissions',
  manage_policy_settings: 'settings:manage_policies',
  manage_template_settings: 'settings:manage_templates',
  manage_integration_settings: 'settings:manage_integrations',
  manage_system_settings: 'settings:manage_system',
  view_my_profile: 'my_profile:view',
  update_my_profile_security: 'my_profile:update_security',
  update_my_profile_notifications: 'my_profile:update_notifications',
  view_my_profile_activity: 'my_profile:view_activity',
  view_system_status: 'system:view_status',
};

export function canPerformPermissionAction(input: PermissionActionInput): boolean {
  const { role, action, targetRole } = input;

  if (!role) {
    return false;
  }

  if (action === 'create_super_admin') {
    return false;
  }

  if (action === 'view_super_admin_records') {
    return canViewSuperAdminAccounts(role);
  }

  if (action === 'create_staff') {
    return targetRole
      ? canCreateStaffRole(role, targetRole)
      : role === 'super_admin' || role === 'admin';
  }

  if (action === 'create_admin') {
    return canCreateStaffRole(role, 'admin');
  }

  if (action === 'create_customer_care_rep') {
    return canCreateStaffRole(role, 'customer_care_rep');
  }

  return hasStaffRolePermission(role, ACTION_PERMISSION_MAP[action]);
}

export function canPerformEveryPermissionAction(
  role: StaffRole | null | undefined,
  actions: readonly AdminPermissionAction[],
): boolean {
  return actions.every((action) => canPerformPermissionAction({ role, action }));
}

export function canPerformAnyPermissionAction(
  role: StaffRole | null | undefined,
  actions: readonly AdminPermissionAction[],
): boolean {
  return actions.some((action) => canPerformPermissionAction({ role, action }));
}

export function getPermissionActionDeniedMessage(action: AdminPermissionAction): string {
  if (action === 'create_super_admin') {
    return 'Super admin accounts cannot be created from the admin frontend.';
  }

  if (
    action === 'approve_payments' ||
    action === 'reject_payments' ||
    action === 'review_payments'
  ) {
    return 'You do not have permission to perform payment review actions.';
  }

  if (action === 'review_documents' || action === 'request_document_correction') {
    return 'You do not have permission to perform document review actions.';
  }

  if (action === 'review_verification_reviews' || action === 'request_verification_correction') {
    return 'You do not have permission to perform verification review actions.';
  }

  if (action === 'view_audit_logs' || action === 'view_high_risk_audit_logs') {
    return 'You do not have permission to view audit logs.';
  }

  if (action.startsWith('manage_')) {
    return 'You do not have permission to manage this area.';
  }

  if (action.includes('staff')) {
    return 'You do not have permission to manage staff accounts.';
  }

  return 'You do not have permission to perform this action.';
}

export function shouldDisablePermissionAction(input: PermissionActionInput): boolean {
  return !canPerformPermissionAction(input);
}

export function shouldHidePermissionAction(input: PermissionActionInput): boolean {
  if (input.action === 'create_super_admin') {
    return true;
  }

  return !canPerformPermissionAction(input);
}
