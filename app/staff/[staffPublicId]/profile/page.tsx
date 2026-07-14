// app/staff/[staffPublicId]/profile/page.tsx

/**
 * File purpose:
 * Renders the staff profile page for Asancha Admin.
 *
 * Role in the project:
 * This page displays safe staff profile placeholders before live staff detail
 * data is connected.
 *
 * Key exports:
 * - StaffProfilePage renders /staff/[staffPublicId]/profile.
 *
 * Business relevance:
 * Staff profile pages support internal staff management and operational
 * accountability.
 *
 * Security note:
 * Staff profile visibility is permission-sensitive. Backend authorization must
 * prevent unauthorised visibility of super_admin records and restricted staff
 * details.
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

export interface StaffProfilePageProps {
  params: Promise<{
    staffPublicId: string;
  }>;
}

export default async function StaffProfilePage({ params }: StaffProfilePageProps) {
  const { staffPublicId } = await params;

  return (
    <PageShell
      description="Safe staff profile information for authorised staff management."
      title="Staff profile"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Profile summary</CardTitle>
              <CardDescription>
                Staff profile placeholder for public ID {staffPublicId}. Live profile fields will be
                connected through the staff feature layer.
              </CardDescription>
            </div>
            <Badge tone="info">API connection pending</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div
            style={{
              display: 'grid',
              gap: '0.75rem',
              color: 'var(--asancha-color-text-muted)',
              fontSize: 'var(--asancha-font-size-sm)',
              lineHeight: 'var(--asancha-line-height-relaxed)',
            }}
          >
            <p style={{ margin: 0 }}>
              This page will show safe staff profile information such as display name, staff role,
              account status, email label, and operational profile summary.
            </p>
            <p style={{ margin: 0 }}>
              It must not show password data, tokens, secret values, private audit payloads, or
              unauthorised super_admin records.
            </p>

            <div style={{ marginTop: '0.5rem' }}>
              <Button href={`/staff/${staffPublicId}`} size="sm" variant="secondary">
                Back to staff detail
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
