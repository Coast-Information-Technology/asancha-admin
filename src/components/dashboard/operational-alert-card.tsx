// src/components/dashboard/operational-alert-card.tsx

/**
 * File purpose:
 * Renders operational alert summaries for Asancha Admin dashboards.
 *
 * Role in the project:
 * This component displays safe operational alerts such as high-risk audit
 * signals, verification attention, payment review warnings, or platform status
 * notices.
 *
 * Key exports:
 * - OperationalAlertCard renders operational alert summaries.
 *
 * Business relevance:
 * Alerts help authorised staff prioritise sensitive operational work.
 *
 * Security note:
 * Alert summaries must not expose private KYC data, private document URLs,
 * secrets, ObjectIds, raw provider payloads, or restricted audit details.
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

import type {
  DashboardMetricTone,
  OperationalAlert,
  OperationalAlertSeverity,
} from '../../features/dashboard/types/dashboard.types';

import styles from './dashboard.module.css';

export interface OperationalAlertCardProps {
  items: readonly OperationalAlert[];
  title?: string;
  description?: string;
}

function getAlertTone(severity: OperationalAlertSeverity): DashboardMetricTone {
  if (severity === 'critical' || severity === 'high') {
    return 'danger';
  }

  if (severity === 'medium') {
    return 'warning';
  }

  return 'neutral';
}

function getAlertClassName(severity: OperationalAlertSeverity): string {
  if (severity === 'critical') {
    return `${styles.listItem} ${styles.alertCritical}`;
  }

  if (severity === 'high') {
    return `${styles.listItem} ${styles.alertHigh}`;
  }

  if (severity === 'medium') {
    return `${styles.listItem} ${styles.alertMedium}`;
  }

  return `${styles.listItem} ${styles.alertLow}`;
}

export function OperationalAlertCard({
  items,
  title = 'Operational alerts',
  description = 'Safe alert summaries requiring authorised staff attention.',
}: OperationalAlertCardProps) {
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
              <li className={getAlertClassName(item.severity)} key={item.alertPublicId}>
                <div className={styles.listItemHeader}>
                  <div>
                    <p className={styles.listItemTitle}>{item.title}</p>
                    <p className={styles.listItemDescription}>{item.description}</p>
                  </div>

                  <Badge tone={getAlertTone(item.severity)}>{item.severity}</Badge>
                </div>

                <div className={styles.metaRow}>
                  <span>{item.createdAtLabel}</span>
                </div>

                <Button href={item.href} size="sm" variant="secondary">
                  Review
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No operational alerts</p>
            <p className={styles.emptyDescription}>
              High-risk or urgent operational alerts will appear here when available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
