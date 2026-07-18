// src/components/documents/document-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible document status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays document lifecycle and review states with text and a
 * visual marker that does not rely on colour alone.
 *
 * Key exports:
 * - DocumentStatusBadge renders a document status label.
 *
 * Business relevance:
 * Document status helps staff understand whether a document is pending,
 * in review, approved, rejected, on hold, replacement required, expired, or
 * archived.
 *
 * Security note:
 * Status display is informational only. Backend document access, status
 * transitions, private file access, permissions, and audit logging remain final.
 */

import { DOCUMENT_STATUS_LABELS } from '../../features/documents/constants/documents.constants';
import type { DocumentStatus } from '../../features/documents/types/documents.types';

import styles from './documents.module.css';

export interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

function getDocumentStatusClassName(status: DocumentStatus): string {
  if (status === 'approved') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'rejected' || status === 'replacement_required' || status === 'expired') {
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

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  return (
    <span className={getDocumentStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{DOCUMENT_STATUS_LABELS[status]}</span>
    </span>
  );
}
