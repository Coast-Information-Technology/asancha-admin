// app/profiles/property-sourcers/page.tsx

/**
 * File purpose:
 * Renders the property sourcer profiles page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for property sourcer profile listing,
 * filtering, and review before live profile API integration.
 *
 * Key exports:
 * - PropertySourcerProfilesPage renders /profiles/property-sourcers.
 *
 * Business relevance:
 * Property sourcer profiles support deal sourcing, property submissions, listing
 * preparation, document checks, and review workflows.
 *
 * Security note:
 * Sourcer review actions, documents, private notes, company links, and sensitive
 * sourcing data must remain backend-permission controlled.
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

const sourcerFilters = [
  {
    title: 'Pending sourcers',
    description: 'Property sourcer profiles awaiting review or onboarding completion checks.',
    href: '/profiles/property-sourcers?status=pending',
    tone: 'warning',
  },
  {
    title: 'Approved sourcers',
    description: 'Property sourcer profiles approved for permitted sourcing workflows.',
    href: '/profiles/property-sourcers?status=approved',
    tone: 'success',
  },
  {
    title: 'Submitted deal context',
    description: 'Sourcer profiles connected to submitted property/deal activity.',
    href: '/profiles/property-sourcers?hasSubmissions=true',
    tone: 'info',
  },
  {
    title: 'On hold',
    description: 'Property sourcer profiles paused for additional checks or support.',
    href: '/profiles/property-sourcers?status=on_hold',
    tone: 'neutral',
  },
] as const;

export default function PropertySourcerProfilesPage() {
  return (
    <PageShell
      description="Property sourcer profile list and review entry point."
      title="Property sourcer profiles"
    >
      <section className="asancha-card-grid">
        {sourcerFilters.map((filter) => (
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
            <CardTitle>Sourcer profile data connection</CardTitle>
            <CardDescription>
              Live property sourcer profile records will be connected through the profiles feature
              layer.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe sourcer profile rows, submission context, review
              status, and row links to profile detail.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
