/*
 * src/components/layout/page-shell/backend-pending-page.tsx
 *
 * File purpose:
 * Provides a safe placeholder page for Admin workspaces whose backend API
 * contract has not yet been confirmed.
 *
 * Role in the project:
 * This component lets the sidebar and page information architecture progress
 * without inventing records, counts, mutations, or backend response fields.
 *
 * Business relevance:
 * Verification, Support, and Transaction Case workspaces must clearly show
 * that their operational data will come from the backend service.
 *
 * Security note:
 * This page renders no demo records, secrets, internal notes, private URLs, or
 * MongoDB ObjectIds. Backend authorization remains final.
 */

import { Alert } from '../../ui/alert/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card/card';
import { PageShell } from './page-shell';

import styles from './backend-pending-page.module.css';

export interface BackendPendingPageProps {
  title: string;
  description: string;
  backendScope: string;
  plannedWork: readonly string[];
}

export function BackendPendingPage({
  title,
  description,
  backendScope,
  plannedWork,
}: BackendPendingPageProps) {
  return (
    <PageShell description={description} title={title}>
      <Alert className={styles.notice} title="Backend integration pending" tone="info">
        This workspace is ready for the confirmed backend response contract. No fabricated records
        or operational counts are shown yet.
      </Alert>

      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Workspace prepared</CardTitle>
          <CardDescription>
            The frontend structure is in place while the backend team confirms the data and action
            contracts for <code>{backendScope}</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className={styles.subheading}>Planned backend-backed capabilities</h4>
          <ul className={styles.list}>
            {plannedWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </PageShell>
  );
}
