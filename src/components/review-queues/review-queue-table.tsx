// src/components/review-queues/review-queue-table.tsx

/**
 * File purpose:
 * Renders a reusable review queue item table for Asancha Admin.
 *
 * Role in the project:
 * This component displays review queue rows with title, safe summary, status,
 * priority, age, assignment, related context, and a safe navigation action.
 *
 * Key exports:
 * - ReviewQueueTable renders queue items.
 *
 * Business relevance:
 * Queue tables let staff open the correct detail page from list rows, while
 * keeping detail pages out of sidebar navigation.
 *
 * Security note:
 * Table display is not authorization. Backend permissions, visibility,
 * redaction, and audit logging remain final.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';

import {
  REVIEW_QUEUE_LABEL_BY_TYPE,
  REVIEW_QUEUE_STATUS_LABELS,
} from '../../features/review-queues/constants/review-queues.constants';
import type { ReviewQueueItem } from '../../features/review-queues/types/review-queues.types';

import { ReviewPriorityBadge } from './review-priority-badge';

import styles from './review-queues.module.css';

export interface ReviewQueueTableProps {
  items: readonly ReviewQueueItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

function getStatusTone(status: ReviewQueueItem['status']) {
  if (
    status === 'approved' ||
    status === 'published' ||
    status === 'reserved' ||
    status === 'paid' ||
    status === 'completed'
  ) {
    return 'success';
  }

  if (
    status === 'rejected' ||
    status === 'failed' ||
    status === 'expired' ||
    status === 'cancelled' ||
    status === 'flagged' ||
    status === 'replacement_required'
  ) {
    return 'danger';
  }

  if (
    status === 'pending' ||
    status === 'submitted' ||
    status === 'submitted_for_review' ||
    status === 'payment_pending' ||
    status === 'correction_requested'
  ) {
    return 'warning';
  }

  if (status === 'in_review' || status === 'under_review') {
    return 'info';
  }

  return 'neutral';
}

export function ReviewQueueTable({
  items,
  emptyTitle = 'No queue items found',
  emptyDescription = 'There are no review queue items for this view yet. New submissions will appear here when available.',
}: ReviewQueueTableProps) {
  if (items.length === 0) {
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
            <th scope="col">Item</th>
            <th scope="col">Queue</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Age</th>
            <th scope="col">Assigned</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.itemPublicId}>
              <td>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemSummary}>{item.summary}</p>

                <div className={styles.itemMeta}>
                  <span>{item.submittedAtLabel}</span>
                  {item.relatedUserLabel ? (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{item.relatedUserLabel}</span>
                    </>
                  ) : null}
                  {item.relatedResourceLabel ? (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{item.relatedResourceLabel}</span>
                    </>
                  ) : null}
                </div>
              </td>

              <td>{REVIEW_QUEUE_LABEL_BY_TYPE[item.queueType]}</td>

              <td>
                <Badge tone={getStatusTone(item.status)}>
                  {REVIEW_QUEUE_STATUS_LABELS[item.status]}
                </Badge>
              </td>

              <td>
                <ReviewPriorityBadge priority={item.priority} />
              </td>

              <td>{item.ageLabel}</td>

              <td>{item.assignedStaffName ?? 'Unassigned'}</td>

              <td>
                <Button href={item.href} size="sm" variant="secondary">
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
