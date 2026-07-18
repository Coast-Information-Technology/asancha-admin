// src/components/listings/listing-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible listing lifecycle status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays listing lifecycle states with text and a visual marker
 * that does not rely on colour alone.
 *
 * Key exports:
 * - ListingStatusBadge renders a listing status label.
 *
 * Business relevance:
 * Listing status helps staff understand whether a listing is submitted, under
 * review, published, reserved, rejected, archived, suspended, or still in draft.
 *
 * Security note:
 * Status display is informational only. Backend lifecycle rules, publication
 * controls, permissions, and audit logging remain final.
 */

import { LISTING_STATUS_LABELS } from '../../features/listings/constants/listings.constants';
import type { ListingStatus } from '../../features/listings/types/listings.types';

import styles from './listings.module.css';

export interface ListingStatusBadgeProps {
  status: ListingStatus;
}

function getListingStatusClassName(status: ListingStatus): string {
  if (status === 'published') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'rejected' || status === 'suspended') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (status === 'submitted' || status === 'under_review') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (status === 'reserved' || status === 'archived') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function ListingStatusBadge({ status }: ListingStatusBadgeProps) {
  return (
    <span className={getListingStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{LISTING_STATUS_LABELS[status]}</span>
    </span>
  );
}
