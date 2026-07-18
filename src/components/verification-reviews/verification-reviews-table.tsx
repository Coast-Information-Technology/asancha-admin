// src/components/verification-reviews/verification-reviews-table.tsx

/**
 * File purpose:
 * Renders a reusable verification reviews table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe verification review list rows with review title,
 * target context, status, risk, priority, assignment, timestamps, and a
 * navigation action to the verification review detail page.
 *
 * Key exports:
 * - VerificationReviewsTable renders verification review list items.
 *
 * Business relevance:
 * Verification review tables power review queues, KYC/AML readiness checks,
 * document correction workflows, support-safe status views, and review
 * operations.
 *
 * Security note:
 * Verification review rows must use public IDs only and must not expose
 * ObjectIds, private KYC notes, raw risk payloads, internal admin notes,
 * restricted document URLs, secrets, raw provider payloads, or unauthorised audit
 * details.
 */

import { Button } from '../ui/button/button';

import {
  VERIFICATION_REVIEW_PRIORITY_LABELS,
  VERIFICATION_REVIEW_TARGET_TYPE_LABELS,
} from '../../features/verification-reviews/constants/verification-reviews.constants';
import type {
  VerificationReviewListItem,
  VerificationReviewPriority,
} from '../../features/verification-reviews/types/verification-reviews.types';

import { VerificationReviewStatusBadge } from './verification-review-status-badge';
import { VerificationRiskBadge } from './verification-risk-badge';

import styles from './verification-reviews.module.css';

export interface VerificationReviewsTableProps {
  reviews: readonly VerificationReviewListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
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

export function VerificationReviewsTable({
  reviews,
  emptyTitle = 'No verification reviews found',
  emptyDescription = 'No verification review records match this view yet. Try adjusting filters when live search is connected.',
}: VerificationReviewsTableProps) {
  if (reviews.length === 0) {
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
            <th scope="col">Review</th>
            <th scope="col">Target</th>
            <th scope="col">Status</th>
            <th scope="col">Risk</th>
            <th scope="col">Priority</th>
            <th scope="col">Assigned</th>
            <th scope="col">Submitted</th>
            <th scope="col">Updated</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr key={review.verificationReviewPublicId}>
              <td>
                <p className={styles.reviewTitle}>{review.title}</p>
                <div className={styles.reviewMeta}>
                  <span>{review.verificationReviewPublicId}</span>
                </div>
              </td>

              <td>
                <p className={styles.targetTitle}>{review.targetSummary.targetLabel}</p>
                <div className={styles.targetMeta}>
                  <span>
                    {VERIFICATION_REVIEW_TARGET_TYPE_LABELS[review.targetSummary.targetType]}:{' '}
                    {review.targetSummary.targetPublicId}
                  </span>
                  {review.targetSummary.relatedUserLabel ? (
                    <span>{review.targetSummary.relatedUserLabel}</span>
                  ) : null}
                  {review.targetSummary.relatedCompanyLabel ? (
                    <span>{review.targetSummary.relatedCompanyLabel}</span>
                  ) : null}
                </div>
              </td>

              <td>
                <VerificationReviewStatusBadge status={review.status} />
              </td>

              <td>
                <VerificationRiskBadge riskRating={review.riskRating} />
              </td>

              <td>
                <span className={getPriorityClassName(review.priority)}>
                  <span aria-hidden="true" className={styles.badgeDot} />
                  <span>{VERIFICATION_REVIEW_PRIORITY_LABELS[review.priority]}</span>
                </span>
              </td>

              <td>{review.assignedToLabel ?? 'Unassigned'}</td>

              <td>{review.submittedAtLabel}</td>

              <td>{review.updatedAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={review.href} size="sm" variant="secondary">
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
