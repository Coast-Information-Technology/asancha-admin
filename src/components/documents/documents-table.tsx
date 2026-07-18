// src/components/documents/documents-table.tsx

/**
 * File purpose:
 * Renders a reusable documents table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe document list rows with document label, owner
 * context, document status, risk label, replacement state, timestamps, and a
 * navigation action to the document detail page.
 *
 * Key exports:
 * - DocumentsTable renders document list items.
 *
 * Business relevance:
 * Document tables power document review, support-safe status views, replacement
 * workflows, onboarding checks, verification checks, and review queue workflows.
 *
 * Security note:
 * Document rows must use public IDs only and must not expose ObjectIds, private
 * document URLs, raw KYC files, private KYC notes, internal admin notes, secrets,
 * raw provider payloads, or unauthorised audit details.
 */

import { Button } from '../ui/button/button';

import {
  DOCUMENT_OWNER_TYPE_LABELS,
  DOCUMENT_REVIEW_RISK_LABELS,
} from '../../features/documents/constants/documents.constants';
import type {
  DocumentListItem,
  DocumentReviewRisk,
} from '../../features/documents/types/documents.types';

import { DocumentStatusBadge } from './document-status-badge';

import styles from './documents.module.css';

export interface DocumentsTableProps {
  documents: readonly DocumentListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

function getRiskClassName(risk: DocumentReviewRisk): string {
  if (risk === 'flagged' || risk === 'high') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (risk === 'medium') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (risk === 'low') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function DocumentsTable({
  documents,
  emptyTitle = 'No documents found',
  emptyDescription = 'No document records match this view yet. Try adjusting filters when live search is connected.',
}: DocumentsTableProps) {
  if (documents.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Document</th>
            <th scope="col">Owner</th>
            <th scope="col">Status</th>
            <th scope="col">Risk</th>
            <th scope="col">Replacement</th>
            <th scope="col">Submitted</th>
            <th scope="col">Updated</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((document) => (
            <tr key={document.documentPublicId}>
              <td>
                <p className={styles.documentTitle}>{document.documentLabel}</p>
                <div className={styles.documentMeta}>
                  <span>{document.documentPublicId}</span>
                  <span aria-hidden="true">•</span>
                  <span>{document.documentTypeLabel}</span>
                </div>
              </td>

              <td>
                <p className={styles.ownerTitle}>{document.ownerSummary.ownerLabel}</p>
                <div className={styles.ownerMeta}>
                  <span>
                    {DOCUMENT_OWNER_TYPE_LABELS[document.ownerSummary.ownerType]}:{' '}
                    {document.ownerSummary.ownerPublicId}
                  </span>
                  {document.ownerSummary.relatedUserLabel ? (
                    <span>{document.ownerSummary.relatedUserLabel}</span>
                  ) : null}
                </div>
              </td>

              <td>
                <DocumentStatusBadge status={document.status} />
              </td>

              <td>
                <span className={getRiskClassName(document.reviewRisk)}>
                  <span aria-hidden="true" className={styles.badgeDot} />
                  <span>{DOCUMENT_REVIEW_RISK_LABELS[document.reviewRisk]}</span>
                </span>
              </td>

              <td>{document.replacementRequired ? 'Required' : 'Not required'}</td>

              <td>{document.submittedAtLabel}</td>

              <td>{document.updatedAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={document.href} size="sm" variant="secondary">
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
