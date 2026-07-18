// src/components/listings/listing-visibility-badge.tsx

/**
 * File purpose:
 * Renders an accessible listing visibility badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays listing visibility states with text and a visual
 * marker that does not rely on colour alone.
 *
 * Key exports:
 * - ListingVisibilityBadge renders a listing visibility status label.
 *
 * Business relevance:
 * Listing visibility helps staff understand whether a listing is public,
 * private, hidden, restricted, paused, or archived.
 *
 * Security note:
 * Visibility display is informational only. Backend visibility rules,
 * publication controls, reservation visibility, permissions, and audit logging
 * remain final.
 */

import { LISTING_VISIBILITY_STATUS_LABELS } from '../../features/listings/constants/listings.constants';
import type { ListingVisibilityStatus } from '../../features/listings/types/listings.types';

import styles from './listings.module.css';

export interface ListingVisibilityBadgeProps {
  visibilityStatus: ListingVisibilityStatus;
}

function getListingVisibilityClassName(status: ListingVisibilityStatus): string {
  if (status === 'public') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'restricted' || status === 'archived') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (status === 'paused') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (status === 'private') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function ListingVisibilityBadge({ visibilityStatus }: ListingVisibilityBadgeProps) {
  return (
    <span className={getListingVisibilityClassName(visibilityStatus)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{LISTING_VISIBILITY_STATUS_LABELS[visibilityStatus]}</span>
    </span>
  );
}
