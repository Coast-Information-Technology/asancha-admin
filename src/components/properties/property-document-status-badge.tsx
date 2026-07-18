// src/components/properties/property-document-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible property document status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays property document review states with text and a visual
 * marker that does not rely on colour alone.
 *
 * Key exports:
 * - PropertyDocumentStatusBadge renders a property document status label.
 *
 * Business relevance:
 * Property document status helps staff understand whether a property has
 * pending, approved, rejected, replacement-required, on-hold, or unstarted
 * document review work.
 *
 * Security note:
 * Document status display is informational only. Backend document visibility,
 * private file access, review actions, redaction, and audit logging remain
 * final.
 */

import { PROPERTY_DOCUMENT_STATUS_LABELS } from '../../features/properties/constants/properties.constants';
import type { PropertyDocumentStatus } from '../../features/properties/types/properties.types';

import styles from './properties.module.css';

export interface PropertyDocumentStatusBadgeProps {
  status: PropertyDocumentStatus;
}

function getPropertyDocumentStatusClassName(status: PropertyDocumentStatus): string {
  if (status === 'approved') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'rejected' || status === 'replacement_required') {
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

export function PropertyDocumentStatusBadge({ status }: PropertyDocumentStatusBadgeProps) {
  return (
    <span className={getPropertyDocumentStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{PROPERTY_DOCUMENT_STATUS_LABELS[status]}</span>
    </span>
  );
}
