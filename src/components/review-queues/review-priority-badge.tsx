// src/components/review-queues/review-priority-badge.tsx

/**
 * File purpose:
 * Renders an accessible priority badge for Asancha Admin review queues.
 *
 * Role in the project:
 * This component displays low, normal, high, and urgent review priority labels
 * without relying on colour alone.
 *
 * Key exports:
 * - ReviewPriorityBadge renders a priority label.
 *
 * Business relevance:
 * Queue priority helps staff decide what to handle first across operational
 * review workflows.
 *
 * Security note:
 * Priority display is informational only. Backend priority rules and action
 * permissions remain final.
 */

import { REVIEW_QUEUE_PRIORITY_LABELS } from '../../features/review-queues/constants/review-queues.constants';
import type { ReviewQueuePriority } from '../../features/review-queues/types/review-queues.types';

import styles from './review-queues.module.css';

export interface ReviewPriorityBadgeProps {
  priority: ReviewQueuePriority;
}

function getPriorityClassName(priority: ReviewQueuePriority): string {
  if (priority === 'urgent') {
    return `${styles.priorityBadge} ${styles.priorityUrgent}`;
  }

  if (priority === 'high') {
    return `${styles.priorityBadge} ${styles.priorityHigh}`;
  }

  if (priority === 'normal') {
    return `${styles.priorityBadge} ${styles.priorityNormal}`;
  }

  return `${styles.priorityBadge} ${styles.priorityLow}`;
}

export function ReviewPriorityBadge({ priority }: ReviewPriorityBadgeProps) {
  return (
    <span className={getPriorityClassName(priority)}>
      <span aria-hidden="true" className={styles.priorityDot} />
      <span>{REVIEW_QUEUE_PRIORITY_LABELS[priority]}</span>
    </span>
  );
}
