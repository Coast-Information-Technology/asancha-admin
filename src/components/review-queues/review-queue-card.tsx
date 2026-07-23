// src/components/review-queues/review-queue-card.tsx

/**
 * File purpose:
 * Renders a reusable review queue summary card for Asancha Admin.
 *
 * Role in the project:
 * This component displays queue summary information including pending count,
 * urgent count, oldest item age, description, and navigation to the queue page.
 *
 * Key exports:
 * - ReviewQueueCard renders a queue overview card.
 *
 * Business relevance:
 * Queue cards help staff navigate to the correct operational queue without
 * placing detail pages in sidebar menus.
 *
 * Security note:
 * Card visibility is not authorization. Backend permissions and queue
 * visibility remain final.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card/card';

import type { ReviewQueueSummary } from '../../features/review-queues/types/review-queues.types';

import styles from './review-queues.module.css';

export interface ReviewQueueCardProps {
  queue: ReviewQueueSummary;
  actionLabel?: string;
}

export function ReviewQueueCard({ queue, actionLabel = 'Open queue' }: ReviewQueueCardProps) {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <div className="asancha-cluster-between">
          <CardTitle>{queue.label}</CardTitle>
          <Badge tone={queue.urgentCount > 0 ? 'warning' : 'neutral'}>
            {queue.pendingCount.toLocaleString()} pending
          </Badge>
        </div>
        <CardDescription>{queue.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className={styles.cardBody}>
          <div className={styles.countGrid}>
            <div className={styles.countBox}>
              <span className={styles.countValue}>{queue.pendingCount.toLocaleString()}</span>
              <span className={styles.countLabel}>Pending</span>
            </div>

            <div className={styles.countBox}>
              <span className={styles.countValue}>{queue.urgentCount.toLocaleString()}</span>
              <span className={styles.countLabel}>Urgent</span>
            </div>
          </div>

          <div className={styles.cardMeta}>
            <span>Oldest: {queue.oldestItemAgeLabel}</span>
            <span aria-hidden="true">•</span>
            <span>{queue.allowedRoles.length} allowed role group(s)</span>
          </div>

          <Button href={queue.href} size="sm" variant="secondary">
            {actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
