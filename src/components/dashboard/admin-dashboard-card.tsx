// src/components/dashboard/admin-dashboard-card.tsx

/**
 * File purpose:
 * Renders a reusable dashboard metric card for Asancha Admin.
 *
 * Role in the project:
 * This component displays a single role-aware dashboard metric with a count,
 * description, status tone, and navigation action.
 *
 * Key exports:
 * - AdminDashboardCard renders a dashboard metric card.
 *
 * Business relevance:
 * Dashboard metric cards guide staff to operational queues and permitted admin
 * areas.
 *
 * Security note:
 * Card visibility is not authorization. Backend route and action permissions
 * remain final.
 */

import { Button } from '../ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card/card';

import type { DashboardMetric } from '../../features/dashboard/types/dashboard.types';

import styles from './dashboard.module.css';

export interface AdminDashboardCardProps {
  metric: DashboardMetric;
  actionLabel?: string;
}

export function AdminDashboardCard({ metric, actionLabel = 'Open' }: AdminDashboardCardProps) {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.metricHeader}>
        <CardTitle>{metric.label}</CardTitle>
        <CardDescription>{metric.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className={styles.metricContent}>
          <p aria-label={`${metric.label}: ${metric.value}`} className={styles.metricValue}>
            {metric.value.toLocaleString()}
          </p>

          <div className={styles.cardFooter}>
            <Button href={metric.href} size="sm" variant="secondary">
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
