// src/components/profiles/profile-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible profile status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays profile lifecycle and review states with text and a
 * visual marker that does not rely on colour alone.
 *
 * Key exports:
 * - ProfileStatusBadge renders a profile status label.
 *
 * Business relevance:
 * Profile status helps staff understand whether a profile is pending,
 * under review, approved, rejected, on hold, suspended, or needs correction.
 *
 * Security note:
 * Status display is informational only. Backend status transitions,
 * permissions, and audit logging remain final.
 */

import { PROFILE_STATUS_LABELS } from '../../features/profiles/constants/profiles.constants';
import type { ProfileStatus } from '../../features/profiles/types/profiles.types';

import styles from './profiles.module.css';

export interface ProfileStatusBadgeProps {
  status: ProfileStatus;
}

function getProfileStatusClassName(status: ProfileStatus): string {
  if (status === 'approved' || status === 'completed') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'rejected' || status === 'suspended') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (status === 'pending' || status === 'under_review' || status === 'correction_requested') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (status === 'on_hold') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function ProfileStatusBadge({ status }: ProfileStatusBadgeProps) {
  return (
    <span className={getProfileStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{PROFILE_STATUS_LABELS[status]}</span>
    </span>
  );
}
