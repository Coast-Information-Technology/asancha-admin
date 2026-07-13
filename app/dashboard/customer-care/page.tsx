// app/dashboard/customer-care/page.tsx

/**
 * File purpose:
 * Renders the customer care dashboard page for Asancha Admin.
 *
 * Role in the project:
 * This page gives customer care reps a safe support-focused dashboard covering
 * assigned messages, booking support, document status inquiries, verification
 * status inquiries, payment status inquiries, user lookup, and notifications.
 *
 * Key exports:
 * - CustomerCareDashboardPage renders /dashboard/customer-care.
 *
 * Business relevance:
 * Customer care must only see safe support views and must not access staff
 * management, audit logs, settings, API access approval, payment approval,
 * document approval, verification approval, listing approval, or super admin
 * controls.
 *
 * Security note:
 * Customer care dashboard cards are UI guidance only. Backend route and action
 * permissions remain final and must prevent restricted data or mutations.
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

const customerCareMetrics = [
  {
    label: 'Assigned messages',
    value: '7',
    description: 'Support conversations assigned to you or your support queue.',
    href: '/messages/assigned',
    tone: 'info',
  },
  {
    label: 'Booking support',
    value: '4',
    description: 'Booking-related support items needing follow-up.',
    href: '/bookings/support',
    tone: 'warning',
  },
  {
    label: 'Status inquiries',
    value: '5',
    description: 'Document, verification, and payment status questions.',
    href: '/documents/status',
    tone: 'neutral',
  },
  {
    label: 'Notifications',
    value: '3',
    description: 'Recent support-safe notifications for your role.',
    href: '/notifications',
    tone: 'success',
  },
] as const;

const customerCareActions = [
  {
    title: 'Search user safely',
    description:
      'Find a user by safe public account details and support them without exposing restricted internal data.',
    href: '/users/search',
  },
  {
    title: 'Handle assigned messages',
    description:
      'Respond to support messages and open related safe context where your role permits.',
    href: '/messages/assigned',
  },
  {
    title: 'Check support statuses',
    description:
      'Review safe document, verification, payment, and booking status information without approval controls.',
    href: '/bookings/support',
  },
] as const;

export default function CustomerCareDashboardPage() {
  return (
    <PageShell
      description="Support-safe dashboard for customer care operations."
      title="Customer care dashboard"
    >
      <section className="asancha-dashboard-grid">
        {customerCareMetrics.map((metric) => (
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
        {customerCareActions.map((action) => (
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
