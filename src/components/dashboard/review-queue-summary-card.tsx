// src/components/dashboard/review-queue-summary-card.tsx

/**
 * File purpose:
 * Renders a review queue summary card for Asancha Admin dashboards.
 *
 * Role in the project:
 * This component displays role-aware review queue counts, urgent counts, oldest
 * pending item age, and safe links to queue pages.
 *
 * Key exports:
 * - ReviewQueueSummaryCard renders queue summaries.
 *
 * Business relevance:
 * Review queues are central to Asancha admin operations across profiles,
 * companies, properties, listings, documents, verification, payments,
 * reservations, bookings, API partners, and AI.
 *
 * Security note:
 * Frontend queue filtering is not authorization. Backend permissions must still
 * enforce queue visibility and action access.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card/card';

import type { ReviewQueueSummaryItem } from '../../features/dashboard/types/dashboard.types';

import styles from './dashboard.module.css';

export interface ReviewQueueSummaryCardProps {
  items: readonly ReviewQueueSummaryItem[];
  title?: string;
  description?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ReviewQueueSummaryCard({
  items,
  title = 'Review queue summary',
  description = 'Role-aware operational queues that may require staff attention.',
  emptyTitle = 'No review queues available',
  emptyDescription = 'There are no queue summaries available for this role right now.',
}: ReviewQueueSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((item) => (
              <li className={styles.listItem} key={item.queueType}>
                <div className={styles.listItemHeader}>
                  <div>
                    <p className={styles.listItemTitle}>{item.label}</p>
                    <p className={styles.listItemDescription}>
                      Oldest item: {item.oldestItemAgeLabel}
                    </p>
                  </div>

                  <Badge tone={item.urgentCount > 0 ? 'warning' : 'neutral'}>
                    {item.pendingCount} pending
                  </Badge>
                </div>

                <div className={styles.metaRow}>
                  <span>{item.urgentCount} urgent</span>
                  <span aria-hidden="true">•</span>
                  <span>{item.allowedRoles.length} allowed role group(s)</span>
                </div>

                <Button href={item.href} size="sm" variant="secondary">
                  Open queue
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>{emptyTitle}</p>
            <p className={styles.emptyDescription}>{emptyDescription}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
