// app/review-queues/payments/page.tsx

/**
 * File purpose:
 * Renders the payment review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for payment references, submitted
 * payment proofs, status checks, and trace-aware payment review.
 *
 * Key exports:
 * - PaymentReviewQueuePage renders /review-queues/payments.
 *
 * Business relevance:
 * Payment review supports reservation, deal, billing, and platform revenue
 * workflows.
 *
 * Security note:
 * Payment approval, rejection, cancellation, trace data, provider data, and
 * sensitive payment metadata must be backend-permission controlled and redacted.
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

const paymentQueues = [
  {
    title: 'Pending payment',
    description: 'Payment records waiting for user payment or proof submission.',
    href: '/payments?status=pending_payment',
    tone: 'neutral',
  },
  {
    title: 'Submitted for review',
    description: 'Payment proofs submitted and awaiting authorised staff review.',
    href: '/payments?status=submitted_for_review',
    tone: 'warning',
  },
  {
    title: 'Paid',
    description: 'Payments marked paid after authorised review or provider confirmation.',
    href: '/payments?status=paid',
    tone: 'success',
  },
  {
    title: 'Expired',
    description: 'Expired payment references and payment windows.',
    href: '/payments?status=expired',
    tone: 'neutral',
  },
  {
    title: 'Rejected or failed',
    description: 'Rejected or failed payment records for safe review status tracking.',
    href: '/payments?status=rejected,failed',
    tone: 'danger',
  },
] as const;

export default function PaymentReviewQueuePage() {
  return (
    <PageShell
      description="Payment reference, proof, status, and trace review queue."
      title="Payment review queue"
    >
      <section className="asancha-card-grid">
        {paymentQueues.map((queue) => (
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
                Open payments
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
