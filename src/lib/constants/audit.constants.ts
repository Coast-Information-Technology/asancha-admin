// src/lib/constants/audit.constants.ts

/**
 * File purpose:
 * Defines audit log constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises audit categories, target types, action groups, statuses,
 * risk labels, and safe display constants used by audit log lists, audit detail
 * pages, high-risk filters, and sensitive action confirmations.
 *
 * Key exports:
 * - AUDIT_CATEGORY_VALUES defines audit category filters.
 * - AUDIT_TARGET_TYPE_VALUES defines target resource types.
 * - AUDIT_STATUS_VALUES defines audit event status values.
 * - HIGH_RISK_AUDIT_ACTIONS defines frontend high-risk audit categories.
 *
 * Business relevance:
 * Audit logs are internal compliance/security records. They are different from
 * notifications, messages/conversations, emails, jobs, and deal activities.
 *
 * Security note:
 * Audit UI must not expose passwords, tokens, full API keys, API key hashes,
 * webhook secrets, private document URLs, raw KYC files, payment provider
 * secrets, private AI prompts, private admin notes, or MongoDB ObjectIds.
 */

import type { StaffRole } from '../auth/staff-role-guards';

export const AUDIT_CATEGORY_VALUES = [
  'auth',
  'staff',
  'users',
  'profiles',
  'companies',
  'properties',
  'listings',
  'documents',
  'verification',
  'payments',
  'deal_reservations',
  'deal_activities',
  'bookings',
  'messages',
  'notifications',
  'api_access',
  'ai',
  'settings',
  'system',
] as const;

export type AuditCategory = (typeof AUDIT_CATEGORY_VALUES)[number];

export const AUDIT_CATEGORY_LABELS: Record<AuditCategory, string> = {
  auth: 'Auth',
  staff: 'Staff',
  users: 'Users',
  profiles: 'Profiles',
  companies: 'Companies',
  properties: 'Properties',
  listings: 'Listings',
  documents: 'Documents',
  verification: 'Verification',
  payments: 'Payments',
  deal_reservations: 'Deal Reservations',
  deal_activities: 'Deal Activities',
  bookings: 'Bookings',
  messages: 'Messages',
  notifications: 'Notifications',
  api_access: 'API Access',
  ai: 'AI',
  settings: 'Settings',
  system: 'System',
};

export const AUDIT_TARGET_TYPE_VALUES = [
  'user',
  'staff',
  'profile',
  'company',
  'property',
  'listing',
  'document',
  'verification_review',
  'payment',
  'deal_reservation',
  'deal_activity',
  'booking',
  'conversation',
  'message',
  'notification',
  'api_client',
  'api_key',
  'webhook',
  'ai_analysis',
  'setting',
  'system',
] as const;

export type AuditTargetType = (typeof AUDIT_TARGET_TYPE_VALUES)[number];

export const AUDIT_STATUS_VALUES = ['success', 'failed', 'blocked', 'pending'] as const;

export type AuditStatus = (typeof AUDIT_STATUS_VALUES)[number];

export const AUDIT_STATUS_LABELS: Record<AuditStatus, string> = {
  success: 'Success',
  failed: 'Failed',
  blocked: 'Blocked',
  pending: 'Pending',
};

export const AUDIT_RISK_LEVEL_VALUES = ['low', 'medium', 'high', 'critical'] as const;

export type AuditRiskLevel = (typeof AUDIT_RISK_LEVEL_VALUES)[number];

export const AUDIT_RISK_LEVEL_LABELS: Record<AuditRiskLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const HIGH_RISK_AUDIT_ACTIONS = [
  'staff_created',
  'staff_status_changed',
  'staff_role_changed',
  'staff_permissions_changed',
  'user_suspended',
  'user_restored',
  'document_approved',
  'document_rejected',
  'verification_approved',
  'verification_rejected',
  'payment_reference_generated',
  'payment_approved',
  'payment_rejected',
  'deal_reservation_cancelled',
  'listing_published',
  'listing_rejected',
  'api_client_approved',
  'api_client_suspended',
  'api_key_created',
  'api_key_revoked',
  'settings_updated',
  'webhook_secret_rotated',
] as const;

export type HighRiskAuditAction = (typeof HIGH_RISK_AUDIT_ACTIONS)[number];

export const AUDIT_VIEW_ROLES: readonly StaffRole[] = ['super_admin'];

export const AUDIT_REDACTED_VALUE = '[redacted]';

export const AUDIT_SAFE_FIELD_LABELS = {
  actorPublicId: 'Actor Public ID',
  actorRole: 'Actor Role',
  action: 'Action',
  category: 'Category',
  targetType: 'Target Type',
  targetPublicId: 'Target Public ID',
  status: 'Status',
  requestId: 'Request ID',
  correlationId: 'Correlation ID',
  source: 'Source',
  ipAddress: 'IP Address',
  userAgent: 'User Agent',
  createdAt: 'Created At',
} as const;

export function getAuditCategoryLabel(category: AuditCategory): string {
  return AUDIT_CATEGORY_LABELS[category];
}

export function canRoleViewAuditLogs(role: StaffRole | null | undefined): boolean {
  return role === 'super_admin';
}
