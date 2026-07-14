// app/review-queues/deal-reservations/page.tsx

/**
 * File purpose:
 * Renders the deal reservation review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for reservation lifecycle states,
 * connected payments, messages, and activities.
 *
 * Key exports:
 * - DealReservationReviewQueuePage renders /review-queues/deal-reservations.
 *
 * Business relevance:
 * Deal reservations are a first-class admin workflow connected to listings,
 * investors, payments, messages, and deal lifecycle tracking.
 *
 * Security note:
 * Reservation approval, cancellation, payment handling, internal notes, and
 * lifecycle changes must be backend-permission controlled and audit logged.
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

const reservationQueues = [
  {
    title: 'Pending reservations',
    description: 'Reservations submitted and awaiting operational review.',
    href: '/deal-reservations?status=pending',
    tone: 'warning',
  },
  {
    title: 'Payment pending',
    description: 'Reservations waiting on related payment completion or review.',
    href: '/deal-reservations?status=payment_pending',
    tone: 'info',
  },
  {
    title: 'Reserved',
    description: 'Active reserved deals requiring lifecycle visibility.',
    href: '/deal-reservations?status=reserved',
    tone: 'success',
  },
  {
    title: 'Expired',
    description: 'Expired reservations for safe status and activity tracking.',
    href: '/deal-reservations?status=expired',
    tone: 'neutral',
  },
  {
    title: 'Cancelled',
    description: 'Cancelled reservations retained for safe lifecycle tracking.',
    href: '/deal-reservations?status=cancelled',
    tone: 'danger',
  },
] as const;

export default function DealReservationReviewQueuePage() {
  return (
    <PageShell
      description="Deal reservation lifecycle, payment, messages, and activity review queue."
      title="Deal reservation review queue"
    >
      <section className="asancha-card-grid">
        {reservationQueues.map((queue) => (
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
                Open reservations
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
