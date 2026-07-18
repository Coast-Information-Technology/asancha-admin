// src/components/verification-reviews/verification-review-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible verification review status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays verification review lifecycle states with text and a
 * visual marker that does not rely on colour alone.
 *
 * Key exports:
 * - VerificationReviewStatusBadge renders a verification review status label.
 *
 * Business relevance:
 * Verification review status helps staff understand whether a review is pending,
 * in review, correction required, approved, rejected, on hold, expired, or
 * archived.
 *
 * Security note:
 * Status display is informational only. Backend review decisions, risk handling,
 * permissions, redaction, and audit logging remain final.
 */

import { VERIFICATION_REVIEW_STATUS_LABELS } from '../../features/verification-reviews/constants/verification-reviews.constants';
import type { VerificationReviewStatus } from '../../features/verification-reviews/types/verification-reviews.types';

import styles from './verification-reviews.module.css';

export interface VerificationReviewStatusBadgeProps {
  status: VerificationReviewStatus;
}

function getVerificationReviewStatusClassName(status: VerificationReviewStatus): string {
  if (status === 'approved') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'rejected' || status === 'correction_required' || status === 'expired') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (status === 'pending' || status === 'in_review') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (status === 'on_hold') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function VerificationReviewStatusBadge({
  status,
}: VerificationReviewStatusBadgeProps) {
  return (
    <span className={getVerificationReviewStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{VERIFICATION_REVIEW_STATUS_LABELS[status]}</span>
    </span>
  );
}
