// src/features/dashboard/types/dashboard.types.ts

/**
 * File purpose:
 * Defines dashboard feature types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file provides strongly typed structures for super admin, admin, and
 * customer care dashboard states.
 *
 * Key exports:
 * - DashboardStaffRole defines supported staff roles for dashboard views.
 * - DashboardMetric defines top-level dashboard counters.
 * - ReviewQueueSummaryItem defines review queue summary rows.
 * - StaffActivitySummaryItem defines staff activity summaries.
 * - OperationalAlert defines operational alert records.
 * - CustomerCareSummaryItem defines support-safe customer care summaries.
 * - Dashboard state interfaces define role-specific dashboard payloads.
 *
 * Business relevance:
 * Dashboards guide staff toward the correct operational queues and safe
 * role-specific actions.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Backend resource
 * visibility, permissions, redaction, and audit rules remain final.
 */

export type DashboardStaffRole = 'super_admin' | 'admin' | 'customer_care_rep';

export type DashboardMetricTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DashboardMetricKey =
  | 'review_queues'
  | 'pending_profiles'
  | 'pending_companies'
  | 'pending_properties'
  | 'pending_listings'
  | 'pending_documents'
  | 'pending_verification_reviews'
  | 'pending_payments'
  | 'pending_deal_reservations'
  | 'pending_bookings'
  | 'api_partner_applications'
  | 'assigned_messages'
  | 'support_messages'
  | 'booking_support'
  | 'status_inquiries'
  | 'staff_activity'
  | 'audit_alerts'
  | 'system_notifications'
  | 'platform_health';

export interface DashboardMetric {
  key: DashboardMetricKey;
  label: string;
  value: number;
  description: string;
  href: string;
  tone: DashboardMetricTone;
}

export type ReviewQueueType =
  | 'profiles'
  | 'companies'
  | 'properties'
  | 'listings'
  | 'documents'
  | 'verification_reviews'
  | 'payments'
  | 'deal_reservations'
  | 'bookings'
  | 'api_partners'
  | 'ai';

export interface ReviewQueueSummaryItem {
  queueType: ReviewQueueType;
  label: string;
  pendingCount: number;
  urgentCount: number;
  oldestItemAgeLabel: string;
  href: string;
  allowedRoles: readonly DashboardStaffRole[];
}

export interface StaffActivitySummaryItem {
  staffPublicId: string;
  staffName: string;
  staffRole: DashboardStaffRole;
  summary: string;
  lastActivityAtLabel: string;
  href: string;
}

export type OperationalAlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface OperationalAlert {
  alertPublicId: string;
  title: string;
  description: string;
  severity: OperationalAlertSeverity;
  createdAtLabel: string;
  href: string;
}

export type CustomerCareSummaryType =
  | 'assigned_messages'
  | 'booking_support'
  | 'document_status'
  | 'verification_status'
  | 'payment_status'
  | 'user_lookup'
  | 'notifications';

export interface CustomerCareSummaryItem {
  type: CustomerCareSummaryType;
  label: string;
  count: number;
  description: string;
  href: string;
}

export interface DashboardLink {
  label: string;
  description: string;
  href: string;
}

export interface BaseDashboardState {
  role: DashboardStaffRole;
  generatedAtLabel: string;
  metrics: readonly DashboardMetric[];
  reviewQueues: readonly ReviewQueueSummaryItem[];
  quickLinks: readonly DashboardLink[];
}

export interface SuperAdminDashboardState extends BaseDashboardState {
  role: 'super_admin';
  staffActivity: readonly StaffActivitySummaryItem[];
  operationalAlerts: readonly OperationalAlert[];
}

export interface AdminDashboardState extends BaseDashboardState {
  role: 'admin';
  staffActivity: readonly StaffActivitySummaryItem[];
  operationalAlerts: readonly OperationalAlert[];
}

export interface CustomerCareDashboardState extends BaseDashboardState {
  role: 'customer_care_rep';
  supportSummaries: readonly CustomerCareSummaryItem[];
}

export type StaffDashboardState =
  SuperAdminDashboardState | AdminDashboardState | CustomerCareDashboardState;
