// src/components/verification-reviews/verification-review-panel.tsx

/**
 * File purpose:
 * Renders a reusable verification review panel for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe verification review context, target context,
 * review status, risk label, priority, document/message/audit summaries, safe
 * user-message guidance, internal-note warning, and permission-aware action
 * placeholders.
 *
 * Key exports:
 * - VerificationReviewPanel renders verification review metadata and action
 *   entry points.
 *
 * Business relevance:
 * Verification review supports KYC/AML readiness, profile approval, company
 * approval, property approval, API partner readiness, and sensitive action
 * unlocks.
 *
 * Security note:
 * This panel must keep safe user messages separate from internal notes. It must
 * not expose private KYC notes, raw risk payloads, restricted document URLs,
 * ObjectIds, secrets, or unauthorised audit details. Backend permissions,
 * redaction, and audit logging remain final.
 */

import { Button } from '../ui/button/button';

import {
  VERIFICATION_REVIEW_ACTION_LABELS,
  VERIFICATION_REVIEW_PRIORITY_LABELS,
  VERIFICATION_REVIEW_TARGET_TYPE_LABELS,
} from '../../features/verification-reviews/constants/verification-reviews.constants';
import type {
  VerificationReviewActionType,
  VerificationReviewDetail,
  VerificationReviewPriority,
} from '../../features/verification-reviews/types/verification-reviews.types';

import { VerificationReviewStatusBadge } from './verification-review-status-badge';
import { VerificationRiskBadge } from './verification-risk-badge';

import styles from './verification-reviews.module.css';

export interface VerificationReviewPanelProps {
  review: VerificationReviewDetail;
  permittedActions?: readonly VerificationReviewActionType[];
  onActionSelect?: (action: VerificationReviewActionType) => void;
}

function getPriorityClassName(priority: VerificationReviewPriority): string {
  if (priority === 'critical' || priority === 'high') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (priority === 'normal') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function VerificationReviewPanel({
  review,
  permittedActions = [],
  onActionSelect,
}: VerificationReviewPanelProps) {
  const hasActions = permittedActions.length > 0;

  return (
    <section className={styles.panel} aria-labelledby="verification-review-panel-title">
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle} id="verification-review-panel-title">
          Verification review
        </h2>
        <p className={styles.panelDescription}>
          Review safe verification metadata, target context, risk label, document readiness,
          messages, and audit summaries. Private KYC/risk data remains backend-permission
          controlled.
        </p>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Review</p>
          <p className={styles.summaryValue}>{review.title}</p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Status</p>
          <VerificationReviewStatusBadge status={review.status} />
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Risk</p>
          <VerificationRiskBadge riskRating={review.riskRating} />
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Priority</p>
          <span className={getPriorityClassName(review.priority)}>
            <span aria-hidden="true" className={styles.badgeDot} />
            <span>{VERIFICATION_REVIEW_PRIORITY_LABELS[review.priority]}</span>
          </span>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Target</p>
          <p className={styles.summaryValue}>{review.targetSummary.targetLabel}</p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Target type</p>
          <p className={styles.summaryValue}>
            {VERIFICATION_REVIEW_TARGET_TYPE_LABELS[review.targetSummary.targetType]}
          </p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Submitted</p>
          <p className={styles.summaryValue}>{review.submittedAtLabel}</p>
        </div>

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Assigned to</p>
          <p className={styles.summaryValue}>{review.assignedToLabel ?? 'Unassigned'}</p>
        </div>
      </div>

      <div className={styles.metricGrid}>
        <div className={styles.metricItem}>
          <p className={styles.summaryLabel}>Documents</p>
          <span className={styles.metricValue}>{review.documentSummary.total}</span>
          <p className={styles.panelDescription}>
            {review.documentSummary.approved} approved, {review.documentSummary.pending} pending
          </p>
        </div>

        <div className={styles.metricItem}>
          <p className={styles.summaryLabel}>Replacement required</p>
          <span className={styles.metricValue}>
            {review.documentSummary.replacementRequired}
          </span>
          <p className={styles.panelDescription}>Documents needing replacement or correction.</p>
        </div>

        <div className={styles.metricItem}>
          <p className={styles.summaryLabel}>Open message threads</p>
          <span className={styles.metricValue}>{review.messageSummary.openThreads}</span>
          <p className={styles.panelDescription}>
            {review.messageSummary.unreadThreads} unread thread(s)
          </p>
        </div>

        <div className={styles.metricItem}>
          <p className={styles.summaryLabel}>High-impact audit actions</p>
          <span className={styles.metricValue}>
            {review.auditSummary.highImpactActionsCount}
          </span>
          <p className={styles.panelDescription}>Restricted audit context only.</p>
        </div>
      </div>

      <div className={styles.warningBox}>
        Safe user messages are user-facing. They should explain the next required action without
        exposing private KYC notes, raw risk context, internal review reasoning, or restricted admin
        details.
      </div>

      <div className={styles.dangerBox}>
        Internal notes and raw risk context are restricted staff-only data. They must never be
        exposed to public users, customer-facing messages, emails, notifications, or support-safe
        status views.
      </div>

      <div>
        <p className={styles.summaryLabel}>Safe summary</p>
        <p className={styles.panelDescription}>{review.safeSummary}</p>
      </div>

      {review.latestSafeUserMessage ? (
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Latest safe user message</p>
          <p className={styles.panelDescription}>{review.latestSafeUserMessage}</p>
        </div>
      ) : null}

      {review.latestInternalNoteLabel ? (
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Latest internal note label</p>
          <p className={styles.panelDescription}>{review.latestInternalNoteLabel}</p>
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
                {VERIFICATION_REVIEW_ACTION_LABELS[action]}
              </Button>
            ))}
          </div>
        ) : (
          <p className={styles.panelDescription}>
            No verification review actions are available in this view. Backend permissions decide
            which actions are allowed for the current staff role.
          </p>
        )}
      </div>
    </section>
  );
}
