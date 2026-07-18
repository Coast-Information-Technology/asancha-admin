// src/components/dashboard/staff-dashboard-view.tsx

/** Shared role-aware dashboard view for all supported staff roles. */

'use client';

import { AdminDashboardCard } from './admin-dashboard-card';
import { CustomerCareSummaryCard } from './customer-care-summary-card';
import { OperationalAlertCard } from './operational-alert-card';
import { ReviewQueueSummaryCard } from './review-queue-summary-card';
import { StaffActivitySummaryCard } from './staff-activity-summary-card';
import { useStaffDashboardState } from '../../features/dashboard/hooks/use-staff-dashboard-state';
import type { DashboardStaffRole } from '../../features/dashboard/types/dashboard.types';
import { Alert } from '../ui/alert/alert';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card/card';
import { Skeleton } from '../ui/skeleton/skeleton';
import { PageShell } from '../layout/page-shell/page-shell';

import styles from './staff-dashboard-view.module.css';

export interface StaffDashboardViewProps {
  role: DashboardStaffRole;
  title: string;
  description: string;
}

export function StaffDashboardView({ role, title, description }: StaffDashboardViewProps) {
  const { data, isError, isLoading } = useStaffDashboardState(role);

  if (isLoading && !data) {
    return (
      <PageShell description={description} title={title}>
        <section aria-label="Loading dashboard" className={styles.metricsGrid}>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton height="10rem" key={index} rounded />
          ))}
        </section>
      </PageShell>
    );
  }

  if (!data) {
    return (
      <PageShell description={description} title={title}>
        <Alert title="Dashboard unavailable" tone="danger">
          The dashboard data could not be loaded. Check the API connection and try again.
        </Alert>
      </PageShell>
    );
  }

  const isCustomerCare = data.role === 'customer_care_rep';

  return (
    <PageShell
      description={description}
      title={title}
    >
      <Alert className={styles.previewNotice} title="Demo dashboard data" tone="info">
        This dashboard currently uses clearly labelled dummy data for UI development. The data
        source is isolated in the dashboard mock constants and can be replaced with the backend
        loader later.
      </Alert>
      {isError ? (
        <Alert className={styles.notice} title="Dashboard data error" tone="danger">
          The dashboard preview data could not be loaded.
        </Alert>
      ) : null}

      <section aria-label="Dashboard metrics" className={styles.metricsGrid}>
        {data.metrics.map((metric) => (
          <AdminDashboardCard key={metric.key} metric={metric} />
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionGrid}>
          <ReviewQueueSummaryCard items={data.reviewQueues} />
          {isCustomerCare ? (
            <CustomerCareSummaryCard items={data.supportSummaries} />
          ) : (
            <div className={styles.focusGrid}>
              <StaffActivitySummaryCard items={data.staffActivity} />
              <OperationalAlertCard items={data.operationalAlerts} />
            </div>
          )}
        </div>
      </section>

      <section aria-label="Dashboard quick links" className={styles.section}>
        <div className="asancha-card-grid">
          {data.quickLinks.map((link) => (
            <Card key={link.href}>
              <CardHeader>
                <CardTitle>{link.label}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button href={link.href} size="sm">
                  Continue
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
