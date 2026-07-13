// src/types/dashboard.types.ts

/**
 * File purpose:
 * Defines shared dashboard types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises dashboard card, metric, widget, alert, and role-specific
 * dashboard contracts used by super_admin, admin, and customer_care dashboards.
 *
 * Key exports:
 * - DashboardMetricCard defines dashboard metric cards.
 * - StaffDashboardPayload defines role-specific dashboard payloads.
 * - DashboardWidgetKey defines approved dashboard widget keys.
 *
 * Business relevance:
 * Dashboard content must be role-aware. Customer care dashboards must only show
 * support-safe widgets, while admin and super_admin dashboards may show broader
 * operational widgets where backend permissions allow.
 *
 * Security note:
 * Dashboard types are display contracts only. Backend endpoints remain the
 * source of truth for counts, permissions, audit visibility, payment status,
 * verification status, review state, and system status.
 */

import type { StaffRole } from './staff.types';
import type { ReviewQueueSummary } from './review-queues.types';

export type DashboardMetricTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DashboardWidgetKey =
  | 'review_queue_summary'
  | 'pending_profiles'
  | 'pending_companies'
  | 'pending_properties'
  | 'pending_listings'
  | 'pending_documents'
  | 'pending_verification_reviews'
  | 'pending_payments'
  | 'pending_deal_reservations'
  | 'api_partner_applications'
  | 'staff_activity'
  | 'audit_alerts'
  | 'system_notifications'
  | 'platform_health'
  | 'assigned_messages'
  | 'booking_support'
  | 'document_status_inquiries'
  | 'verification_status_inquiries'
  | 'payment_status_inquiries'
  | 'user_lookup';

export interface DashboardMetricCard {
  key: string;
  label: string;
  value: number;
  tone: DashboardMetricTone;
  href?: string;
  description?: string;
}

export interface DashboardAlert {
  alertPublicId: string;
  title: string;
  description: string;
  tone: DashboardMetricTone;
  href?: string;
  createdAt: string;
}

export interface DashboardWidget {
  key: DashboardWidgetKey;
  label: string;
  description?: string;
  visible: boolean;
  href?: string;
}

export interface StaffDashboardPayload {
  role: StaffRole;
  metrics: readonly DashboardMetricCard[];
  reviewQueues: readonly ReviewQueueSummary[];
  alerts: readonly DashboardAlert[];
  widgets: readonly DashboardWidget[];
  lastUpdatedAt: string;
}

export interface PlatformHealthSummary {
  status: 'healthy' | 'degraded' | 'down' | 'unknown';
  label: string;
  checkedAt: string;
  message?: string;
}
