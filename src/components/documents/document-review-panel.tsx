// src/components/documents/document-review-panel.tsx

/**
 * File purpose:
 * Renders a reusable document review panel for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe document review context, owner context, review
 * status, risk label, replacement state, safe user-message guidance, internal
 * note warning, and permission-aware action placeholders.
 *
 * Key exports:
 * - DocumentReviewPanel renders document review metadata and action entry.
 *
 * Business relevance:
 * Document review supports onboarding, profile approval, company approval,
 * property approval, verification workflows, API partner readiness, and platform
 * trust.
 *
 * Security note:
 * This panel must keep safe user messages separate from internal notes. It must
 * not expose private document URLs, raw KYC files, private KYC notes, ObjectIds,
 * secrets, or restricted review payloads. Backend permissions and audit logging
 * remain final.
 */

import { Button } from '../ui/button/button';

import {
  DOCUMENT_ACTION_LABELS,
  DOCUMENT_OWNER_TYPE_LABELS,
  DOCUMENT_REVIEW_RISK_LABELS,
} from '../../features/documents/constants/documents.constants';
import type {
  DocumentActionType,
  DocumentDetail,
  DocumentReviewRisk,
} from '../../features/documents/types/documents.types';

import { DocumentHistoryList } from './document-history-list';
import { DocumentStatusBadge } from './document-status-badge';

import styles from './documents.module.css';

export interface DocumentReviewPanelProps {
  document: DocumentDetail;
  permittedActions?: readonly DocumentActionType[];
  onActionSelect?: (action: DocumentActionType) => void;
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

export function DocumentReviewPanel({
  document,
  permittedActions = [],
  onActionSelect,
}: DocumentReviewPanelProps) {
  const hasActions = permittedActions.length > 0;

  return (
    <section className={styles.panel} aria-labelledby="document-review-panel-title">
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle} id="document-review-panel-title">
          Document review
        </h2>
        <p className={styles.panelDescription}>
          Review safe document metadata, owner context, status, replacement state, and history.
          Private files and restricted notes must remain backend-permission controlled.
        </p>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Document</p>
          <p className={styles.summaryValue}>{document.documentLabel}</p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Document type</p>
          <p className={styles.summaryValue}>{document.documentTypeLabel}</p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Status</p>
          <DocumentStatusBadge status={document.status} />
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Risk</p>
          <span className={getRiskClassName(document.reviewRisk)}>
            <span aria-hidden="true" className={styles.badgeDot} />
            <span>{DOCUMENT_REVIEW_RISK_LABELS[document.reviewRisk]}</span>
          </span>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Owner</p>
          <p className={styles.summaryValue}>{document.ownerSummary.ownerLabel}</p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Owner type</p>
          <p className={styles.summaryValue}>
            {DOCUMENT_OWNER_TYPE_LABELS[document.ownerSummary.ownerType]}
          </p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Submitted</p>
          <p className={styles.summaryValue}>{document.submittedAtLabel}</p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Replacement</p>
          <p className={styles.summaryValue}>
            {document.replacementRequired ? 'Required' : 'Not required'}
          </p>
        </div>
      </div>

      <div className={styles.warningBox}>
        Safe user messages are user-facing. They should explain what the user needs to do next
        without exposing private KYC notes, internal review reasoning, or restricted admin context.
      </div>

      <div className={styles.dangerBox}>
        Internal notes are restricted staff-only context. They must never be exposed to public users,
        customer-facing messages, emails, notifications, or document status support views.
      </div>

      <div>
        <p className={styles.summaryLabel}>Summary</p>
        <p className={styles.panelDescription}>{document.summary}</p>
      </div>

      {document.reviewSummary.latestSafeUserMessage ? (
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Latest safe user message</p>
          <p className={styles.panelDescription}>
            {document.reviewSummary.latestSafeUserMessage}
          </p>
        </div>
      ) : null}

      {document.reviewSummary.latestInternalNoteLabel ? (
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Latest internal note label</p>
          <p className={styles.panelDescription}>
            {document.reviewSummary.latestInternalNoteLabel}
          </p>
        </div>
      ) : null}

      <div>
        <p className={styles.summaryLabel}>Available actions</p>

        {hasActions ? (
          <div className={styles.actionList}>
            {permittedActions.map((action) => (
              <Button
                key={action}
                onClick={() => onActionSelect?.(action)}
                size="sm"
                type="button"
                variant={action === 'approve' ? 'primary' : 'secondary'}
              >
                {DOCUMENT_ACTION_LABELS[action]}
              </Button>
            ))}
          </div>
        ) : (
          <p className={styles.panelDescription}>
            No document review actions are available in this view. Backend permissions decide which
            actions are allowed for the current staff role.
          </p>
        )}
      </div>

      <div>
        <p className={styles.summaryLabel}>Document history</p>
        <DocumentHistoryList history={document.history} />
      </div>
    </section>
  );
}
