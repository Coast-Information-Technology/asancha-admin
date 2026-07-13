// app/dashboard/super-admin/page.tsx

/**
 * File purpose:
 * Renders the super admin dashboard page for Asancha Admin.
 *
 * Role in the project:
 * This page gives super admins a high-level operational view of review queues,
 * staff activity, audit alerts, system notifications, and platform health.
 *
 * Key exports:
 * - SuperAdminDashboardPage renders /dashboard/super-admin.
 *
 * Business relevance:
 * Super admins need the broadest internal oversight, but no frontend screen may
 * create another super_admin account.
 *
 * Security note:
 * Dashboard cards are frontend summaries only. Backend permissions, audit log
 * access, payment decisions, review decisions, staff visibility, and sensitive
 * data redaction remain final.
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

const superAdminMetrics = [
  {
    label: 'Review queues',
    value: '12',
    description: 'Profiles, companies, properties, listings, documents, payments, and API partners.',
    href: '/review-queues',
    tone: 'info',
  },
  {
    label: 'Pending payments',
    value: '4',
    description: 'Payment proofs and references awaiting authorised review.',
    href: '/review-queues/payments',
    tone: 'warning',
  },
  {
    label: 'Staff activity',
    value: '8',
    description: 'Recent staff actions requiring operational awareness.',
    href: '/audit-logs/staff',
    tone: 'neutral',
  },
  {
    label: 'High-risk alerts',
    value: '2',
    description: 'Sensitive audit and verification events requiring attention.',
    href: '/audit-logs/high-risk',
    tone: 'danger',
  },
] as const;

const superAdminFocusAreas = [
  {
    title: 'Operational review',
    description:
      'Monitor queues across profiles, companies, properties, listings, documents, verification reviews, deal reservations, payments, bookings, API partners, and AI.',
    href: '/review-queues',
  },
  {
    title: 'Staff governance',
    description:
      'Review staff activity and manage authorised admin or customer care accounts. Super admin creation remains seed/bootstrap only.',
    href: '/staff',
  },
  {
    title: 'Platform controls',
    description:
      'Review audit logs, settings, API access, AI/admin insights, notifications, and system status where permitted.',
    href: '/settings',
  },
] as const;

export default function SuperAdminDashboardPage() {
  return (
    <PageShell
      description="Full internal operations overview for authorised super admin staff."
      title="Super admin dashboard"
    >
      <section className="asancha-dashboard-grid">
        {superAdminMetrics.map((metric) => (
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
        {superAdminFocusAreas.map((area) => (
          <Card key={area.title}>
            <CardHeader>
              <CardTitle>{area.title}</CardTitle>
              <CardDescription>{area.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button href={area.href} size="sm">
                Continue
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
