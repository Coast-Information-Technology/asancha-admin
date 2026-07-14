// src/components/staff/staff-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible staff account status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays staff account statuses with text and a visual marker
 * that does not rely on colour alone.
 *
 * Key exports:
 * - StaffStatusBadge renders a staff account status.
 *
 * Business relevance:
 * Staff status controls internal access readiness, account lock state, and
 * operational availability.
 *
 * Security note:
 * Status display is informational only. Backend account status rules and
 * permissions remain final.
 */

import type { StaffAccountStatus } from '../../features/staff/types/staff.types';

import styles from './staff.module.css';

export interface StaffStatusBadgeProps {
  status: StaffAccountStatus;
}

const STAFF_STATUS_LABELS: Record<StaffAccountStatus, string> = {
  invited: 'Invited',
  pending: 'Pending',
  active: 'Active',
  locked: 'Locked',
  suspended: 'Suspended',
  disabled: 'Disabled',
};

function getStatusClassName(status: StaffAccountStatus): string {
  if (status === 'active') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'locked' || status === 'suspended' || status === 'disabled') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (status === 'invited' || status === 'pending') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function StaffStatusBadge({ status }: StaffStatusBadgeProps) {
  return (
    <span className={getStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{STAFF_STATUS_LABELS[status]}</span>
    </span>
  );
}
