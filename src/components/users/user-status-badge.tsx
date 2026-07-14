// src/components/users/user-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible status badge for Asancha Admin user records.
 *
 * Role in the project:
 * This component displays user account statuses with text and a visual marker
 * that does not rely on colour alone.
 *
 * Key exports:
 * - UserStatusBadge renders a user account status.
 *
 * Business relevance:
 * Account status helps staff quickly understand whether a user is active,
 * pending, restricted, suspended, locked, or disabled.
 *
 * Security note:
 * Status display is informational only. Backend account rules and permissions
 * remain final.
 */

import type { UserAccountStatus } from '../../features/users/types/users.types';

import styles from './users.module.css';

export interface UserStatusBadgeProps {
  status: UserAccountStatus;
}

const STATUS_LABELS: Record<UserAccountStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  email_unverified: 'Email unverified',
  profile_incomplete: 'Profile incomplete',
  under_review: 'Under review',
  suspended: 'Suspended',
  restricted: 'Restricted',
  locked: 'Locked',
  disabled: 'Disabled',
};

function getStatusClassName(status: UserAccountStatus): string {
  if (status === 'active') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'suspended' || status === 'restricted' || status === 'locked' || status === 'disabled') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (status === 'under_review' || status === 'pending') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (status === 'email_unverified' || status === 'profile_incomplete') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <span className={getStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{STATUS_LABELS[status]}</span>
    </span>
  );
}
