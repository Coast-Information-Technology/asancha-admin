// app/users/public/page.tsx

/**
 * File purpose:
 * Renders the public users list placeholder page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe public-user list entry point before the live users
 * table and API integration are connected.
 *
 * Key exports:
 * - PublicUsersPage renders /users/public.
 *
 * Business relevance:
 * Staff need to view public users across investor, property owner, property
 * agent, property sourcer, service provider, and API partner roles.
 *
 * Security note:
 * Public user list views must not expose internal ObjectIds, private KYC notes,
 * restricted documents, private admin notes, secrets, or unauthorised audit
 * data. Backend permissions remain final.
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

const publicUserSegments = [
  {
    label: 'Investors',
    href: '/users/public?role=investor',
    description: 'Investor accounts and investment-profile support context.',
  },
  {
    label: 'Property owners',
    href: '/users/public?role=property_owner',
    description: 'Owner accounts and related property submission context.',
  },
  {
    label: 'Property agents',
    href: '/users/public?role=property_agent',
    description: 'Agent accounts, company links, and listing-related context.',
  },
  {
    label: 'Property sourcers',
    href: '/users/public?role=property_sourcer',
    description: 'Sourcer accounts and deal submission context.',
  },
  {
    label: 'Service providers',
    href: '/users/public?role=service_provider',
    description: 'Provider accounts and service-readiness context.',
  },
  {
    label: 'API partners',
    href: '/users/public?role=api_partner',
    description: 'API partner user accounts and application context.',
  },
] as const;

export default function PublicUsersPage() {
  return (
    <PageShell
      description="Safe public user list entry point for authorised staff."
      title="Public users"
    >
      <section className="asancha-card-grid">
        {publicUserSegments.map((segment) => (
          <Card key={segment.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{segment.label}</CardTitle>
                <Badge tone="neutral">0 users</Badge>
              </div>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={segment.href} size="sm" variant="secondary">
                Open filtered list
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
