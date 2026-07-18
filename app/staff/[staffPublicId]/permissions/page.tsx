// app/staff/[staffPublicId]/permissions/page.tsx

/**
 * File purpose:
 * Renders the staff permissions page for Asancha Admin.
 *
 * Role in the project:
 * This page displays permission guidance and placeholders for role-based access
 * review before live permission data is connected.
 *
 * Key exports:
 * - StaffPermissionsPage renders /staff/[staffPublicId]/permissions.
 *
 * Business relevance:
 * Staff permissions determine access to review queues, users, staff management,
 * documents, verification, payments, bookings, messages, notifications, API
 * access, AI, audit logs, settings, and system status.
 *
 * Security note:
 * Frontend permission display is not authorization. Backend permission checks
 * must enforce every protected route, action, resource, mutation, and audit
 * operation. Customer care must not access staff management broadly.
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

export interface StaffPermissionsPageProps {
  params: Promise<{
    staffPublicId: string;
  }>;
}

const permissionGroups = [
  {
    title: 'Super admin permissions',
    description:
      'Broad internal controls where allowed, including staff governance, settings, audit, API access, and high-risk review. Super admin creation remains seed/bootstrap only.',
    tone: 'danger',
  },
  {
    title: 'Admin permissions',
    description:
      'Operational review, users, queues, messages, bookings, notifications, and permitted customer care staff creation.',
    tone: 'warning',
  },
  {
    title: 'Customer care permissions',
    description:
      'Safe support views only: dashboard, safe user support, booking support, messages, status inquiries, notifications, and own account.',
    tone: 'info',
  },
] as const;

const blockedCustomerCareAreas = [
  'Staff management',
  'Audit logs',
  'Settings',
  'API access approval',
  'Payment approval controls',
  'Document approval controls',
  'Verification approval controls',
  'Listing approval controls',
  'Super admin controls',
] as const;

export default async function StaffPermissionsPage({ params }: StaffPermissionsPageProps) {
  const { staffPublicId } = await params;

  return (
    <PageShell
      description="Permission-sensitive staff access review for authorised staff management."
      title="Staff permissions"
    >
      <section className="asancha-card-grid">
        {permissionGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{group.title}</CardTitle>
                <Badge tone={group.tone}>Role-based</Badge>
              </div>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="asancha-page-description">
                Staff public ID: {staffPublicId}. Live permission data will be connected in the
                staff feature layer and enforced by backend authorization.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <div className="asancha-cluster-between">
              <CardTitle>Customer care blocked areas</CardTitle>
              <Badge tone="danger">Restricted</Badge>
            </div>
            <CardDescription>
              Customer care representatives must not access these modules or controls.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul
              style={{
                display: 'grid',
                gap: '0.75rem',
                margin: 0,
                paddingLeft: '1.25rem',
                color: 'var(--asancha-color-text-muted)',
                fontSize: 'var(--asancha-font-size-sm)',
                lineHeight: 'var(--asancha-line-height-relaxed)',
              }}
            >
              {blockedCustomerCareAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
              <Button href={`/staff/${staffPublicId}`} size="sm" variant="secondary">
                Back to staff detail
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
