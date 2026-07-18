// app/documents/[documentPublicId]/history/page.tsx

/**
 * File purpose:
 * Renders the document history page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe document history shell before live document
 * history and status timeline data are connected.
 *
 * Key exports:
 * - DocumentHistoryPage renders /documents/[documentPublicId]/history.
 *
 * Business relevance:
 * Document history provides operational traceability for submissions,
 * replacements, review actions, correction requests, holds, approvals, and
 * rejections.
 *
 * Security note:
 * Document history is not a raw audit log. It must not expose secrets, private
 * KYC notes, internal admin notes to public users, ObjectIds, private document
 * URLs, raw restricted files, or audit-sensitive compliance payloads.
 */

import { PageShell } from '../../../../src/components/layout/page-shell/page-shell';
import { Badge } from '../../../../src/components/ui/badge/badge';
import { Button } from '../../../../src/components/ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../src/components/ui/card/card';

export interface DocumentHistoryPageProps {
  params: Promise<{
    documentPublicId: string;
  }>;
}

const historySections = [
  {
    title: 'Submission history',
    description: 'Safe timeline entries for original upload and document intake.',
    href: '?category=submission',
    tone: 'info',
  },
  {
    title: 'Replacement history',
    description: 'Safe timeline entries for replacement requests and new uploads.',
    href: '?category=replacement',
    tone: 'warning',
  },
  {
    title: 'Review history',
    description: 'Safe timeline entries for review status changes and decisions.',
    href: '?category=review',
    tone: 'neutral',
  },
  {
    title: 'Correction history',
    description: 'Safe timeline entries for correction requests and user-facing messages.',
    href: '?category=correction',
    tone: 'danger',
  },
] as const;

export default async function DocumentHistoryPage({ params }: DocumentHistoryPageProps) {
  const { documentPublicId } = await params;

  return (
    <PageShell
      description="Safe document status timeline and review history for authorised staff."
      title="Document history"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Document public ID</CardTitle>
              <CardDescription>
                History records shown here must use safe public identifiers and operational
                summaries only.
              </CardDescription>
            </div>
            <Badge tone="neutral">{documentPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Button href={`/documents/${documentPublicId}`} size="sm" variant="secondary">
            Back to document detail
          </Button>
        </CardContent>
      </Card>

      <section className="asancha-card-grid">
        {historySections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>0 entries</Badge>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={section.href} size="sm" variant="secondary">
                Open filter
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>History data connection</CardTitle>
            <CardDescription>
              Live document history data will be connected through the documents feature layer.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe history rows such as submitted, review started,
              replacement requested, correction message sent, approved, rejected, or placed on hold.
              Audit logs remain separate and permission-restricted.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
