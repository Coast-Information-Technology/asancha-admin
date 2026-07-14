// app/profiles/service-providers/page.tsx

/**
 * File purpose:
 * Renders the service provider profiles page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for service provider profile listing,
 * filtering, and review before live profile API integration.
 *
 * Key exports:
 * - ServiceProviderProfilesPage renders /profiles/service-providers.
 *
 * Business relevance:
 * Service provider profiles support provider onboarding, service readiness,
 * company context, verification, and support operations.
 *
 * Security note:
 * Provider verification data, documents, internal notes, sensitive review
 * details, and action controls must remain backend-permission controlled.
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

const providerFilters = [
  {
    title: 'Pending providers',
    description: 'Service provider profiles awaiting review or onboarding completion checks.',
    href: '/profiles/service-providers?status=pending',
    tone: 'warning',
  },
  {
    title: 'Approved providers',
    description: 'Service provider profiles approved for permitted service workflows.',
    href: '/profiles/service-providers?status=approved',
    tone: 'success',
  },
  {
    title: 'Company-linked providers',
    description: 'Service provider profiles connected to company records.',
    href: '/profiles/service-providers?companyLinked=true',
    tone: 'info',
  },
  {
    title: 'On hold',
    description: 'Service provider profiles paused for support or operational checks.',
    href: '/profiles/service-providers?status=on_hold',
    tone: 'neutral',
  },
] as const;

export default function ServiceProviderProfilesPage() {
  return (
    <PageShell
      description="Service provider profile list and review entry point."
      title="Service provider profiles"
    >
      <section className="asancha-card-grid">
        {providerFilters.map((filter) => (
          <Card key={filter.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{filter.title}</CardTitle>
                <Badge tone={filter.tone}>0 profiles</Badge>
              </div>
              <CardDescription>{filter.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={filter.href} size="sm" variant="secondary">
                Open list
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>Service provider profile data connection</CardTitle>
            <CardDescription>
              Live service provider profile records will be connected through the profiles feature
              layer.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe provider profile rows, company context, verification
              status, service readiness, and row links to profile detail.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
