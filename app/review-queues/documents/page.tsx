// app/review-queues/documents/page.tsx

/**
 * File purpose:
 * Renders the document review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for pending, approved, rejected,
 * on-hold, and replacement-required document states.
 *
 * Key exports:
 * - DocumentReviewQueuePage renders /review-queues/documents.
 *
 * Business relevance:
 * Document review supports onboarding, verification, property review, company
 * review, API access, and operational trust workflows.
 *
 * Security note:
 * This page must not expose private document URLs, raw KYC files, internal
 * admin notes to public users, private KYC notes, secrets, ObjectIds, or
 * restricted document access.
 */

import { PageShell } from '../../../src/components/layout/page-shell/page-shell';
import { Badge } from '../../../src/components/ui/badge/badge';
import { Button } from '../../../src/components/ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';

const documentQueues = [
  {
    title: 'Pending documents',
    description: 'Documents waiting for authorised review.',
    href: '/documents?status=pending',
    tone: 'warning',
  },
  {
    title: 'On-hold documents',
    description: 'Documents paused while staff or users resolve review concerns.',
    href: '/documents?status=on_hold',
    tone: 'neutral',
  },
  {
    title: 'Replacement required',
    description: 'Documents requiring user replacement or correction.',
    href: '/documents?status=replacement_required',
    tone: 'danger',
  },
  {
    title: 'Approved documents',
    description: 'Approved documents available for safe operational reference.',
    href: '/documents?status=approved',
    tone: 'success',
  },
  {
    title: 'Rejected documents',
    description: 'Rejected documents retained for safe history and review status.',
    href: '/documents?status=rejected',
    tone: 'danger',
  },
] as const;

export default function DocumentReviewQueuePage() {
  return (
    <PageShell
      description="Document review, replacement, status, and history queue."
      title="Document review queue"
    >
      <section className="asancha-card-grid">
        {documentQueues.map((queue) => (
          <Card key={queue.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{queue.title}</CardTitle>
                <Badge tone={queue.tone}>0 records</Badge>
              </div>
              <CardDescription>{queue.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={queue.href} size="sm" variant="secondary">
                Open documents
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
