// src/components/dashboard/staff-activity-summary-card.tsx

/**
 * File purpose:
 * Renders staff activity summary cards for Asancha Admin dashboards.
 *
 * Role in the project:
 * This component displays safe staff activity summaries for authorised admin
 * dashboards.
 *
 * Key exports:
 * - StaffActivitySummaryCard renders recent staff activity summaries.
 *
 * Business relevance:
 * Super admins and permitted admins need visibility into operational staff
 * activity without exposing restricted audit internals.
 *
 * Security note:
 * This component must show safe summaries only. Backend audit permissions,
 * redaction, and staff visibility rules remain final.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card/card';

import type { StaffActivitySummaryItem } from '../../features/dashboard/types/dashboard.types';

import styles from './dashboard.module.css';

export interface StaffActivitySummaryCardProps {
  items: readonly StaffActivitySummaryItem[];
  title?: string;
  description?: string;
}

export function StaffActivitySummaryCard({
  items,
  title = 'Staff activity',
  description = 'Safe summaries of recent staff operational activity.',
}: StaffActivitySummaryCardProps) {
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
              <li className={styles.listItem} key={item.staffPublicId}>
                <div className={styles.listItemHeader}>
                  <div>
                    <p className={styles.listItemTitle}>{item.staffName}</p>
                    <p className={styles.listItemDescription}>{item.summary}</p>
                  </div>

                  <Badge tone="neutral">{item.staffRole}</Badge>
                </div>

                <div className={styles.metaRow}>
                  <span>{item.lastActivityAtLabel}</span>
                </div>

                <Button href={item.href} size="sm" variant="secondary">
                  View activity
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No staff activity summary</p>
            <p className={styles.emptyDescription}>
              Staff activity summaries will appear here when the live dashboard endpoint is
              connected.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
