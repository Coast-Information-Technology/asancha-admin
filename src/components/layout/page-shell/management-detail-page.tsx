// src/components/layout/page-shell/management-detail-page.tsx

/** Shared detail-page frame for backend-shaped management records. */

import type { ReactNode } from 'react';

import { Alert } from '../../ui/alert/alert';
import { Badge, type BadgeTone } from '../../ui/badge/badge';
import { Button } from '../../ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card/card';
import { PageShell } from './page-shell';

import styles from './management-detail-page.module.css';

export interface ManagementDetailLink {
  label: string;
  href: string;
}

export interface ManagementDetailPageProps {
  title: string;
  description: string;
  recordLabel: string;
  publicId: string;
  recordName: string;
  status: string;
  statusTone: BadgeTone;
  summary: string;
  links: readonly ManagementDetailLink[];
  children?: ReactNode;
}

export function ManagementDetailPage({
  title,
  description,
  recordLabel,
  publicId,
  recordName,
  status,
  statusTone,
  summary,
  links,
  children,
}: ManagementDetailPageProps) {
  return (
    <PageShell description={description} title={title}>
      <Alert className={styles.notice} title="Demo record detail" tone="info">
        This record is frontend-only demo data shaped like a backend detail response. Related links
        represent the workflows staff will access from the live record.
      </Alert>

      <div className={styles.body}>
        <Card>
          <CardHeader>
            <div className={styles.headerRow}>
              <div className={styles.heading}>
                <span className={styles.recordLabel}>{recordLabel}</span>
                <CardTitle>{recordName}</CardTitle>
                <CardDescription>{publicId}</CardDescription>
              </div>
              <Badge tone={statusTone}>{status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className={styles.summary}>{summary}</p>
            <nav aria-label={`${recordName} related workflows`} className={styles.links}>
              {links.map((link) => (
                <Button href={link.href} key={link.href} size="sm" variant="secondary">
                  {link.label}
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {children}
      </div>
    </PageShell>
  );
}
