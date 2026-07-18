// src/components/properties/property-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible property status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays property lifecycle and review states with text and a
 * visual marker that does not rely on colour alone.
 *
 * Key exports:
 * - PropertyStatusBadge renders a property status label.
 *
 * Business relevance:
 * Property status helps staff understand whether a property is submitted,
 * under review, approved, rejected, archived, suspended, or needs correction.
 *
 * Security note:
 * Status display is informational only. Backend status transitions,
 * permissions, and audit logging remain final.
 */

import { PROPERTY_STATUS_LABELS } from '../../features/properties/constants/properties.constants';
import type { PropertyStatus } from '../../features/properties/types/properties.types';

import styles from './properties.module.css';

export interface PropertyStatusBadgeProps {
  status: PropertyStatus;
}

function getPropertyStatusClassName(status: PropertyStatus): string {
  if (status === 'approved') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'rejected' || status === 'suspended') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (
    status === 'submitted' ||
    status === 'under_review' ||
    status === 'correction_requested'
  ) {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (status === 'archived') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function PropertyStatusBadge({ status }: PropertyStatusBadgeProps) {
  return (
    <span className={getPropertyStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{PROPERTY_STATUS_LABELS[status]}</span>
    </span>
  );
}
