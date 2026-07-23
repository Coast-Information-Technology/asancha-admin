// src/components/dashboard/customer-care-summary-card.tsx

/**
 * File purpose:
 * Renders support-safe customer care dashboard summaries.
 *
 * Role in the project:
 * This component displays assigned messages, booking support, document status,
 * verification status, payment status, and other support-safe counters for
 * customer care representatives.
 *
 * Key exports:
 * - CustomerCareSummaryCard renders customer care support summaries.
 *
 * Business relevance:
 * Customer care reps need safe operational visibility without approval,
 * settings, staff management, audit, API access, or super admin controls.
 *
 * Security note:
 * This component must not expose approval controls, audit logs, settings,
 * private KYC notes, internal admin notes, raw provider payloads, ObjectIds, or
 * secrets.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card/card';

import type { CustomerCareSummaryItem } from '../../features/dashboard/types/dashboard.types';

import styles from './dashboard.module.css';

export interface CustomerCareSummaryCardProps {
  items: readonly CustomerCareSummaryItem[];
  title?: string;
  description?: string;
}

export function CustomerCareSummaryCard({
  items,
  title = 'Customer care support summary',
  description = 'Support-safe work areas for customer care representatives.',
}: CustomerCareSummaryCardProps) {
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
              <li className={styles.listItem} key={item.type}>
                <div className={styles.listItemHeader}>
                  <div>
                    <p className={styles.listItemTitle}>{item.label}</p>
                    <p className={styles.listItemDescription}>{item.description}</p>
                  </div>

                  <Badge tone={item.count > 0 ? 'info' : 'neutral'}>
                    {item.count.toLocaleString()}
                  </Badge>
                </div>

                <Button href={item.href} size="sm" variant="secondary">
                  Open
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No customer care summary</p>
            <p className={styles.emptyDescription}>
              Support-safe summaries will appear here when live dashboard data is available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
