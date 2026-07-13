// src/lib/constants/statuses.constants.ts

/**
 * File purpose:
 * Defines shared status constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises status values used by users, staff, profiles,
 * companies, properties, listings, documents, verification reviews, payments,
 * bookings, deal reservations, messages, notifications, API access, AI screens,
 * and audit logs.
 *
 * Key exports:
 * - COMMON_STATUS_VALUES defines common status values.
 * - REVIEW_STATUS_VALUES defines review lifecycle statuses.
 * - PAYMENT_STATUS_VALUES defines payment display statuses.
 * - BOOKING_STATUS_VALUES defines booking display statuses.
 *
 * Business relevance:
 * Statuses guide admin and customer care decisions. The frontend may display
 * statuses and guide actions, but it must not treat display status as final
 * workflow authority.
 *
 * Security note:
 * Backend state machines, DTO validation, policy checks, payment verification,
 * verification rules, document review rules, and audit logs remain the source
 * of truth.
 */

export const COMMON_STATUS_VALUES = [
  'active',
  'inactive',
  'pending',
  'approved',
  'rejected',
  'on_hold',
  'suspended',
  'disabled',
  'locked',
  'unknown',
] as const;

export type CommonStatus = (typeof COMMON_STATUS_VALUES)[number];

export const REVIEW_STATUS_VALUES = [
  'draft',
  'submitted',
  'pending',
  'in_review',
  'under_review',
  'approved',
  'rejected',
  'on_hold',
  'correction_requested',
  'replacement_required',
] as const;

export type ReviewStatus = (typeof REVIEW_STATUS_VALUES)[number];

export const DOCUMENT_STATUS_VALUES = [
  'pending',
  'approved',
  'rejected',
  'on_hold',
  'replacement_required',
  'expired',
] as const;

export type DocumentStatus = (typeof DOCUMENT_STATUS_VALUES)[number];

export const VERIFICATION_REVIEW_STATUS_VALUES = [
  'pending',
  'in_review',
  'on_hold',
  'correction_requested',
  'approved',
  'rejected',
  'flagged',
] as const;

export type VerificationReviewStatus = (typeof VERIFICATION_REVIEW_STATUS_VALUES)[number];

export const PAYMENT_STATUS_VALUES = [
  'pending_payment',
  'payment_pending',
  'submitted_for_review',
  'paid',
  'expired',
  'cancelled',
  'rejected',
  'failed',
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUS_VALUES)[number];

export const BOOKING_STATUS_VALUES = [
  'upcoming',
  'pending',
  'scheduled',
  'rescheduled',
  'completed',
  'cancelled',
  'no_show',
] as const;

export type BookingStatus = (typeof BOOKING_STATUS_VALUES)[number];

export const DEAL_RESERVATION_STATUS_VALUES = [
  'pending',
  'payment_pending',
  'reserved',
  'expired',
  'cancelled',
  'completed',
] as const;

export type DealReservationStatus = (typeof DEAL_RESERVATION_STATUS_VALUES)[number];

export const LISTING_STATUS_VALUES = [
  'draft',
  'submitted',
  'under_review',
  'published',
  'reserved',
  'rejected',
  'archived',
] as const;

export type ListingStatus = (typeof LISTING_STATUS_VALUES)[number];

export const MESSAGE_STATUS_VALUES = ['open', 'closed', 'resolved', 'unread', 'read'] as const;

export type MessageStatus = (typeof MESSAGE_STATUS_VALUES)[number];

export const NOTIFICATION_STATUS_VALUES = ['unread', 'read', 'dismissed'] as const;

export type NotificationStatus = (typeof NOTIFICATION_STATUS_VALUES)[number];

export const RISK_STATUS_VALUES = ['low_risk', 'medium_risk', 'high_risk', 'flagged'] as const;

export type RiskStatus = (typeof RISK_STATUS_VALUES)[number];

export const STATUS_FILTER_LABELS: Record<string, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  on_hold: 'On Hold',
  suspended: 'Suspended',
  disabled: 'Disabled',
  locked: 'Locked',
  draft: 'Draft',
  submitted: 'Submitted',
  in_review: 'In Review',
  under_review: 'Under Review',
  correction_requested: 'Correction Requested',
  replacement_required: 'Replacement Required',
  pending_payment: 'Pending Payment',
  payment_pending: 'Payment Pending',
  submitted_for_review: 'Submitted for Review',
  paid: 'Paid',
  expired: 'Expired',
  cancelled: 'Cancelled',
  failed: 'Failed',
  upcoming: 'Upcoming',
  scheduled: 'Scheduled',
  rescheduled: 'Rescheduled',
  completed: 'Completed',
  no_show: 'No Show',
  reserved: 'Reserved',
  published: 'Published',
  archived: 'Archived',
  open: 'Open',
  closed: 'Closed',
  resolved: 'Resolved',
  unread: 'Unread',
  read: 'Read',
  dismissed: 'Dismissed',
  low_risk: 'Low Risk',
  medium_risk: 'Medium Risk',
  high_risk: 'High Risk',
  flagged: 'Flagged',
  unknown: 'Unknown',
};

export function getStatusFilterLabel(status: string): string {
  return STATUS_FILTER_LABELS[status] ?? status;
}
