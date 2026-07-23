// src/lib/formatters/status-label.ts

/**
 * File purpose:
 * Provides safe status label and status tone formatting helpers for the
 * Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises how statuses are displayed across users, staff,
 * profiles, companies, properties, listings, documents, verification reviews,
 * payments, bookings, deal reservations, API access, AI, audit logs, messages,
 * and notifications.
 *
 * Key exports:
 * - StatusTone defines UI-safe status tone names.
 * - formatStatusLabel converts status keys into readable labels.
 * - getStatusTone returns a safe display tone for known statuses.
 *
 * Business relevance:
 * Status labels guide staff decisions. The frontend must display status clearly
 * but must not change backend workflow truth or expose sensitive internal review
 * details.
 *
 * Security note:
 * Status formatting is display-only. Backend state machines, review workflows,
 * payment checks, verification decisions, document review decisions, audit logs,
 * and permission checks remain the source of truth.
 */

export type StatusTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'pending' | 'muted';

export interface StatusDisplay {
  label: string;
  tone: StatusTone;
}

const STATUS_LABELS: Record<string, StatusDisplay> = {
  active: {
    label: 'Active',
    tone: 'success',
  },
  inactive: {
    label: 'Inactive',
    tone: 'muted',
  },
  pending: {
    label: 'Pending',
    tone: 'pending',
  },
  invited: {
    label: 'Invited',
    tone: 'info',
  },
  locked: {
    label: 'Locked',
    tone: 'danger',
  },
  suspended: {
    label: 'Suspended',
    tone: 'danger',
  },
  disabled: {
    label: 'Disabled',
    tone: 'danger',
  },
  draft: {
    label: 'Draft',
    tone: 'muted',
  },
  submitted: {
    label: 'Submitted',
    tone: 'info',
  },
  in_review: {
    label: 'In Review',
    tone: 'pending',
  },
  under_review: {
    label: 'Under Review',
    tone: 'pending',
  },
  approved: {
    label: 'Approved',
    tone: 'success',
  },
  rejected: {
    label: 'Rejected',
    tone: 'danger',
  },
  correction_requested: {
    label: 'Correction Requested',
    tone: 'warning',
  },
  on_hold: {
    label: 'On Hold',
    tone: 'warning',
  },
  verified: {
    label: 'Verified',
    tone: 'success',
  },
  unverified: {
    label: 'Unverified',
    tone: 'muted',
  },
  paid: {
    label: 'Paid',
    tone: 'success',
  },
  unpaid: {
    label: 'Unpaid',
    tone: 'warning',
  },
  payment_pending: {
    label: 'Payment Pending',
    tone: 'pending',
  },
  payment_failed: {
    label: 'Payment Failed',
    tone: 'danger',
  },
  payment_expired: {
    label: 'Payment Expired',
    tone: 'warning',
  },
  completed: {
    label: 'Completed',
    tone: 'success',
  },
  cancelled: {
    label: 'Cancelled',
    tone: 'danger',
  },
  expired: {
    label: 'Expired',
    tone: 'warning',
  },
  scheduled: {
    label: 'Scheduled',
    tone: 'info',
  },
  rescheduled: {
    label: 'Rescheduled',
    tone: 'info',
  },
  no_show: {
    label: 'No Show',
    tone: 'warning',
  },
  open: {
    label: 'Open',
    tone: 'info',
  },
  closed: {
    label: 'Closed',
    tone: 'muted',
  },
  resolved: {
    label: 'Resolved',
    tone: 'success',
  },
  unread: {
    label: 'Unread',
    tone: 'info',
  },
  read: {
    label: 'Read',
    tone: 'muted',
  },
  dismissed: {
    label: 'Dismissed',
    tone: 'muted',
  },
  high_risk: {
    label: 'High Risk',
    tone: 'danger',
  },
  medium_risk: {
    label: 'Medium Risk',
    tone: 'warning',
  },
  low_risk: {
    label: 'Low Risk',
    tone: 'success',
  },
  unknown: {
    label: 'Unknown',
    tone: 'neutral',
  },
};

function normaliseStatusKey(status: unknown): string {
  if (typeof status !== 'string') {
    return 'unknown';
  }

  const trimmedStatus = status.trim();

  if (trimmedStatus.length === 0) {
    return 'unknown';
  }

  return trimmedStatus
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

function titleCaseFromStatusKey(statusKey: string): string {
  return statusKey
    .split('_')
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

export function getStatusDisplay(status: unknown): StatusDisplay {
  const statusKey = normaliseStatusKey(status);

  return (
    STATUS_LABELS[statusKey] ?? {
      label: titleCaseFromStatusKey(statusKey),
      tone: 'neutral',
    }
  );
}

export function formatStatusLabel(status: unknown): string {
  return getStatusDisplay(status).label;
}

export function getStatusTone(status: unknown): StatusTone {
  return getStatusDisplay(status).tone;
}

export function isPositiveStatus(status: unknown): boolean {
  return getStatusTone(status) === 'success';
}

export function isWarningStatus(status: unknown): boolean {
  const tone = getStatusTone(status);

  return tone === 'warning' || tone === 'pending';
}

export function isDangerStatus(status: unknown): boolean {
  return getStatusTone(status) === 'danger';
}
