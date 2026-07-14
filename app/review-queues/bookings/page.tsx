// app/review-queues/bookings/page.tsx

/**
 * File purpose:
 * Renders the booking review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for upcoming, pending, completed,
 * cancelled, and support-related bookings.
 *
 * Key exports:
 * - BookingReviewQueuePage renders /review-queues/bookings.
 *
 * Business relevance:
 * Booking queues support operational scheduling, support coordination,
 * rescheduling, and participant visibility.
 *
 * Security note:
 * Booking participant data, reschedule actions, cancellation actions, and
 * support details must be backend-permission controlled and safely displayed.
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

const bookingQueues = [
  {
    title: 'Upcoming bookings',
    description: 'Upcoming bookings needing operational visibility.',
    href: '/bookings?status=upcoming',
    tone: 'info',
  },
  {
    title: 'Pending bookings',
    description: 'Bookings waiting for confirmation or staff action.',
    href: '/bookings?status=pending',
    tone: 'warning',
  },
  {
    title: 'Support bookings',
    description: 'Support-related bookings and customer care coordination items.',
    href: '/bookings/support',
    tone: 'neutral',
  },
  {
    title: 'Completed bookings',
    description: 'Completed bookings retained for operational history.',
    href: '/bookings?status=completed',
    tone: 'success',
  },
  {
    title: 'Cancelled bookings',
    description: 'Cancelled bookings retained for safe status tracking.',
    href: '/bookings?status=cancelled',
    tone: 'danger',
  },
] as const;

export default function BookingReviewQueuePage() {
  return (
    <PageShell
      description="Booking management and support queue for authorised staff."
      title="Booking review queue"
    >
      <section className="asancha-card-grid">
        {bookingQueues.map((queue) => (
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
                Open bookings
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
