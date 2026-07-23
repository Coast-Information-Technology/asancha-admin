// src/components/layout/page-shell/route-preview-page.tsx

/** Consistent backend-shaped demo view for routes whose API resource is not connected yet. */

import { Alert } from '../../ui/alert/alert';
import { Badge } from '../../ui/badge/badge';
import { Button } from '../../ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card/card';
import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table/table';
import { PageShell } from './page-shell';
import { getRoutePreviewData } from './route-preview-page.data';

import styles from './route-preview-page.module.css';

export interface RoutePreviewPageProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function RoutePreviewPage({ title, description, actions }: RoutePreviewPageProps) {
  const preview = getRoutePreviewData(title);

  return (
    <PageShell actions={actions} description={description} title={title}>
      <Alert className={styles.notice} title="Demo preview data" tone="info">
        These clearly labelled records mirror the shape of data expected from the backend. They are
        safe frontend-only examples and can be replaced with API query results when the endpoint is
        ready.
      </Alert>

      <section aria-label="Summary metrics" className={styles.summaryGrid}>
        {preview.stats.map((stat) => (
          <Card className={styles.summaryCard} key={stat.label}>
            <CardHeader className={styles.summaryHeader}>
              <div className={styles.summaryLabelRow}>
                <CardTitle className={styles.summaryLabel}>{stat.label}</CardTitle>
                <Badge tone={stat.tone}>Demo</Badge>
              </div>
            </CardHeader>
            <CardContent className={styles.summaryContent}>
              <p className={styles.summaryValue}>{stat.value}</p>
              <p className={styles.summaryDetail}>{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className={styles.recordsCard}>
        <CardHeader className={styles.recordsHeader}>
          <div>
            <CardTitle>Recent {preview.recordLabel}</CardTitle>
            <p className={styles.recordsDescription}>
              Showing the latest demo records with public identifiers, workflow status, ownership,
              and update timestamps.
            </p>
          </div>
          <Badge tone="muted">3 demo records</Badge>
        </CardHeader>

        <CardContent className={styles.tableContent}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{preview.primaryColumn}</TableHead>
                <TableHead>{preview.secondaryColumn}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>{preview.ownerColumn}</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preview.records.map((record) => (
                <TableRow key={record.publicId}>
                  <TableCell>
                    <div className={styles.primaryCell}>
                      <strong>{record.primary}</strong>
                      <span>{record.publicId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{record.secondary}</TableCell>
                  <TableCell>
                    <Badge tone={record.statusTone}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>{record.owner}</TableCell>
                  <TableCell>{record.updatedAt}</TableCell>
                  <TableCell>
                    <Button href={record.detailHref} size="sm" variant="secondary">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className={styles.footerActions}>
        <span>Demo page 1 of 1 - API pagination will replace this state.</span>
        <Button href="/dashboard" variant="secondary">
          Return to dashboard
        </Button>
      </div>
    </PageShell>
  );
}
