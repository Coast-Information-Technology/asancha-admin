// app/profiles/property-owners/page.tsx

/**
 * File purpose:
 * Renders the property owner profiles page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for property owner profile listing,
 * filtering, and review before live profile API integration.
 *
 * Key exports:
 * - PropertyOwnerProfilesPage renders /profiles/property-owners.
 *
 * Business relevance:
 * Property owner profiles support property submission, ownership context,
 * company relationships, document review, and platform trust workflows.
 *
 * Security note:
 * Ownership details, documents, verification data, internal notes, and review
 * actions must remain backend-permission controlled and redacted where needed.
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

const ownerFilters = [
  {
    title: 'Pending owners',
    description: 'Property owner profiles awaiting review or onboarding completion checks.',
    href: '/profiles/property-owners?status=pending',
    tone: 'warning',
  },
  {
    title: 'Approved owners',
    description: 'Property owner profiles approved for property-related platform activity.',
    href: '/profiles/property-owners?status=approved',
    tone: 'success',
  },
  {
    title: 'Document attention',
    description: 'Property owner profiles with document or verification status requiring attention.',
    href: '/profiles/property-owners?documentStatus=attention_required',
    tone: 'danger',
  },
  {
    title: 'On hold',
    description: 'Property owner profiles paused for operational or support follow-up.',
    href: '/profiles/property-owners?status=on_hold',
    tone: 'neutral',
  },
] as const;

export default function PropertyOwnerProfilesPage() {
  return (
    <PageShell
      description="Property owner profile list and review entry point."
      title="Property owner profiles"
    >
      <section className="asancha-card-grid">
        {ownerFilters.map((filter) => (
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
            <CardTitle>Owner profile data connection</CardTitle>
            <CardDescription>
              Live property owner profile records will be connected through the profiles feature
              layer.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe owner profile rows, related user context, verification
              status, company/property links, and row links to profile detail.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
