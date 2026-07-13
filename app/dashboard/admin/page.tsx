// app/dashboard/admin/page.tsx

/**
 * File purpose:
 * Renders the admin dashboard page for Asancha Admin.
 *
 * Role in the project:
 * This page gives admin staff an operational view of review queues, assigned
 * messages, booking support, API partner applications where allowed, and system
 * notifications.
 *
 * Key exports:
 * - AdminDashboardPage renders /dashboard/admin.
 *
 * Business relevance:
 * Admin users support broad operations but must not create admin or super_admin
 * accounts from the frontend.
 *
 * Security note:
 * Dashboard widgets are frontend guidance only. Backend permissions, mutations,
 * payment decisions, document approvals, verification reviews, and audit access
 * remain final.
 */

import { Badge } from '../../../src/components/ui/badge/badge';
import { Button } from '../../../src/components/ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card/card';
import { PageShell } from '../../../src/components/layout/page-shell/page-shell';

const adminMetrics = [
  {
    label: 'Review queues',
    value: '9',
    description: 'Operational queues requiring admin review or assignment.',
    href: '/review-queues',
    tone: 'info',
  },
  {
    label: 'Assigned messages',
    value: '6',
    description: 'Messages assigned to admin operations and support workflows.',
    href: '/messages/assigned',
    tone: 'neutral',
  },
  {
    label: 'Booking queue',
    value: '3',
    description: 'Upcoming or pending bookings needing admin coordination.',
    href: '/bookings',
    tone: 'warning',
  },
  {
    label: 'System notifications',
    value: '5',
    description: 'Recent operational notifications relevant to admin staff.',
    href: '/notifications',
    tone: 'success',
  },
] as const;

const adminActions = [
  {
    title: 'Review submitted records',
    description:
      'Work through profiles, companies, properties, listings, documents, verification reviews, reservations, and payments where permitted.',
    href: '/review-queues',
  },
  {
    title: 'Support users safely',
    description:
      'Search users, view safe account context, and support messages without exposing restricted internal data.',
    href: '/users/search',
  },
  {
    title: 'Coordinate operations',
    description:
      'Track bookings, messages, notifications, properties, listings, deal reservations, and payment statuses.',
    href: '/messages',
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <PageShell
      description="Operational dashboard for authorised Asancha admin staff."
      title="Admin dashboard"
    >
      <section className="asancha-dashboard-grid">
        {adminMetrics.map((metric) => (
          <Card className="asancha-dashboard-card" key={metric.label}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{metric.label}</CardTitle>
                <Badge tone={metric.tone}>{metric.value}</Badge>
              </div>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button href={metric.href} size="sm" variant="secondary">
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="asancha-card-grid" style={{ marginTop: '1.5rem' }}>
        {adminActions.map((action) => (
          <Card key={action.title}>
            <CardHeader>
              <CardTitle>{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button href={action.href} size="sm">
                Continue
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
