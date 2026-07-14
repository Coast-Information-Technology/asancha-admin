// app/profiles/property-agents/page.tsx

/**
 * File purpose:
 * Renders the property agent profiles page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for property agent profile listing,
 * filtering, and review before live profile API integration.
 *
 * Key exports:
 * - PropertyAgentProfilesPage renders /profiles/property-agents.
 *
 * Business relevance:
 * Property agent profiles support company relationships, listing activity,
 * property submissions, deal workflows, and platform trust.
 *
 * Security note:
 * Agent details, company verification, restricted documents, internal notes, and
 * review controls must remain backend-permission controlled.
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

const agentFilters = [
  {
    title: 'Pending agents',
    description: 'Property agent profiles awaiting admin review or onboarding checks.',
    href: '/profiles/property-agents?status=pending',
    tone: 'warning',
  },
  {
    title: 'Approved agents',
    description: 'Property agent profiles approved for permitted platform workflows.',
    href: '/profiles/property-agents?status=approved',
    tone: 'success',
  },
  {
    title: 'Company-linked agents',
    description: 'Property agent profiles connected to company records.',
    href: '/profiles/property-agents?companyLinked=true',
    tone: 'info',
  },
  {
    title: 'On hold',
    description: 'Property agent profiles paused for operational or support follow-up.',
    href: '/profiles/property-agents?status=on_hold',
    tone: 'neutral',
  },
] as const;

export default function PropertyAgentProfilesPage() {
  return (
    <PageShell
      description="Property agent profile list and review entry point."
      title="Property agent profiles"
    >
      <section className="asancha-card-grid">
        {agentFilters.map((filter) => (
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
            <CardTitle>Agent profile data connection</CardTitle>
            <CardDescription>
              Live property agent profile records will be connected through the profiles feature
              layer.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe agent profile rows, company context, status filters,
              listing links, and row links to profile detail.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
