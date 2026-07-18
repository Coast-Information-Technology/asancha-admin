// src/components/layout/page-shell/management-list-page.tsx

/** Shared list-page frame for backend-shaped management records. */

import type { ReactNode } from 'react';

import { Alert } from '../../ui/alert/alert';
import { Badge, type BadgeTone } from '../../ui/badge/badge';
import { Button } from '../../ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card/card';
import { PageShell } from './page-shell';

import styles from './management-list-page.module.css';

export interface ManagementListMetric {
  label: string;
  value: string;
  detail: string;
  tone: BadgeTone;
}

export interface ManagementListFilter {
  label: string;
  href: string;
}

export interface ManagementListPageProps {
  title: string;
  description: string;
  totalLabel: string;
  metrics: readonly ManagementListMetric[];
  filters?: readonly ManagementListFilter[];
  children: ReactNode;
}

export function ManagementListPage({
  title,
  description,
  totalLabel,
  metrics,
  filters = [],
  children,
}: ManagementListPageProps) {
  return (
    <PageShell description={description} title={title}>
      <Alert className={styles.notice} title="Demo records loaded" tone="info">
        This list uses clearly labelled records shaped like the expected backend response. Select a
        row to open its detail page and related workflows.
      </Alert>

      <div className={styles.body}>
        <section aria-label={`${title} summary`} className={styles.metricsGrid}>
          {metrics.map((metric) => (
            <Card className={styles.metricCard} key={metric.label}>
              <CardHeader className={styles.metricHeader}>
                <div className={styles.metricLabelRow}>
                  <CardTitle className={styles.metricLabel}>{metric.label}</CardTitle>
                  <Badge tone={metric.tone}>Demo</Badge>
                </div>
              </CardHeader>
              <CardContent className={styles.metricContent}>
                <strong className={styles.metricValue}>{metric.value}</strong>
                <span className={styles.metricDetail}>{metric.detail}</span>
              </CardContent>
            </Card>
          ))}
        </section>

        {filters.length > 0 ? (
          <div aria-label={`${title} filters`} className={styles.filters}>
            <span className={styles.filterLabel}>Quick filters</span>
            {filters.map((filter) => (
              <Button href={filter.href} key={filter.href} size="sm" variant="secondary">
                {filter.label}
              </Button>
            ))}
          </div>
        ) : null}

        <Card className={styles.recordsCard}>
          <CardHeader className={styles.recordsHeader}>
            <CardTitle>All {totalLabel}</CardTitle>
            <Badge tone="muted">{totalLabel}</Badge>
          </CardHeader>
          <CardContent className={styles.recordsContent}>{children}</CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
