// app/staff/[staffPublicId]/page.tsx

/**
 * File purpose:
 * Renders the staff detail overview page for Asancha Admin.
 *
 * Role in the project:
 * This page displays a safe staff detail shell with links to profile, security,
 * and permissions sections.
 *
 * Key exports:
 * - StaffDetailPage renders /staff/[staffPublicId].
 *
 * Business relevance:
 * Staff detail helps authorised users inspect staff profile, access status,
 * security context, and permissions without exposing restricted data.
 *
 * Security note:
 * Staff detail must use public IDs only. It must not expose ObjectIds, password
 * data, tokens, secret values, private audit payloads, or super_admin records to
 * unauthorised staff. Backend permissions remain final.
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

export interface StaffDetailPageProps {
  params: Promise<{
    staffPublicId: string;
  }>;
}

export default async function StaffDetailPage({ params }: StaffDetailPageProps) {
  const { staffPublicId } = await params;

  const detailLinks = [
    {
      title: 'Profile',
      description: 'View staff identity, role, contact, and safe profile summary.',
      href: `/staff/${staffPublicId}/profile`,
      tone: 'info',
    },
    {
      title: 'Security',
      description: 'View safe account security state, sessions, and access restrictions.',
      href: `/staff/${staffPublicId}/security`,
      tone: 'warning',
    },
    {
      title: 'Permissions',
      description: 'Review role-based permissions and restricted action guidance.',
      href: `/staff/${staffPublicId}/permissions`,
      tone: 'danger',
    },
  ] as const;

  return (
    <PageShell
      description="Safe staff detail overview for authorised Asancha staff management."
      title="Staff detail"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Staff public ID</CardTitle>
              <CardDescription>
                This page uses the safe public staff identifier. Internal database identifiers must
                never be displayed.
              </CardDescription>
            </div>
            <Badge tone="neutral">{staffPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="asancha-status asancha-status-info" role="status">
            Live staff detail data will be connected through the staff feature layer.
          </div>
        </CardContent>
      </Card>

      <section className="asancha-card-grid">
        {detailLinks.map((link) => (
          <Card key={link.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{link.title}</CardTitle>
                <Badge tone={link.tone}>Restricted</Badge>
              </div>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={link.href} size="sm" variant="secondary">
                Open {link.title.toLowerCase()}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
