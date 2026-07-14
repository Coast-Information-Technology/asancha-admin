// app/staff/page.tsx

/**
 * File purpose:
 * Renders the staff management overview page for Asancha Admin.
 *
 * Role in the project:
 * This page provides an authorised staff-management entry point for viewing
 * staff records and opening staff detail pages.
 *
 * Key exports:
 * - StaffPage renders /staff.
 *
 * Business relevance:
 * Staff management is restricted. Super admins may manage admin and customer
 * care accounts; admins may only create customer care accounts; customer care
 * representatives must not access staff management.
 *
 * Security note:
 * This page is frontend guidance only. Backend authorization must prevent
 * unauthorised access, super_admin creation, restricted staff visibility,
 * staff mutation, and audit-sensitive data exposure.
 */

import { PageShell } from '../../src/components/layout/page-shell/page-shell';
import { Badge } from '../../src/components/ui/badge/badge';
import { Button } from '../../src/components/ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card/card';

const staffSections = [
  {
    title: 'All staff',
    description:
      'View authorised Asancha staff accounts by role, status, and operational access.',
    href: '/staff',
    tone: 'info',
    countLabel: '0 staff',
  },
  {
    title: 'Admin staff',
    description:
      'Admin users support operational review, queues, messages, and permitted staff actions.',
    href: '/staff?role=admin',
    tone: 'warning',
    countLabel: '0 admins',
  },
  {
    title: 'Customer care reps',
    description:
      'Customer care users are restricted to safe support views and own account management.',
    href: '/staff?role=customer_care_rep',
    tone: 'neutral',
    countLabel: '0 reps',
  },
] as const;

export default function StaffPage() {
  return (
    <PageShell
      description="Authorised staff account management for Asancha Admin."
      title="Staff management"
    >
      <section className="asancha-card-grid">
        {staffSections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>{section.countLabel}</Badge>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={section.href} size="sm" variant="secondary">
                Open list
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>Create staff account</CardTitle>
            <CardDescription>
              Create only permitted staff roles. This frontend must never create a super admin
              account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="asancha-status asancha-status-warning" role="status">
                Super admin creation is seed/bootstrap only and must not exist in any frontend form.
              </div>

              <Button href="/staff/new" size="sm">
                Create permitted staff
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
