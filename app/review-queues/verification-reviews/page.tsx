// app/review-queues/verification-reviews/page.tsx

/**
 * File purpose:
 * Renders the verification review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for verification reviews, status
 * filters, risk flags, related documents, messages, and audit-aware review.
 *
 * Key exports:
 * - VerificationReviewQueuePage renders /review-queues/verification-reviews.
 *
 * Business relevance:
 * Verification reviews protect trust, risk handling, profile approval, company
 * approval, and high-impact platform activity.
 *
 * Security note:
 * Risk details, private KYC details, internal notes, restricted documents, and
 * review decisions must remain backend-permission controlled.
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

const verificationQueues = [
  {
    title: 'Pending verification',
    description: 'Verification reviews awaiting staff action.',
    href: '/verification-reviews?status=pending',
    tone: 'warning',
  },
  {
    title: 'In review',
    description: 'Verification reviews currently being handled by staff.',
    href: '/verification-reviews?status=in_review',
    tone: 'info',
  },
  {
    title: 'On hold',
    description: 'Verification reviews paused for additional information or checks.',
    href: '/verification-reviews?status=on_hold',
    tone: 'neutral',
  },
  {
    title: 'Correction requested',
    description: 'Verification reviews where safe user correction has been requested.',
    href: '/verification-reviews?status=correction_requested',
    tone: 'warning',
  },
  {
    title: 'Flagged risk',
    description: 'Verification reviews with risk flags for authorised staff only.',
    href: '/verification-reviews?risk=flagged',
    tone: 'danger',
  },
] as const;

export default function VerificationReviewQueuePage() {
  return (
    <PageShell
      description="Verification review, correction, risk, document, message, and audit-aware queue."
      title="Verification review queue"
    >
      <section className="asancha-card-grid">
        {verificationQueues.map((queue) => (
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
                Open verification reviews
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
