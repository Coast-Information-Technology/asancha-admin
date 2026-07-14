// app/profiles/investors/page.tsx

/**
 * File purpose:
 * Renders the investor profiles page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for investor profile listing, filtering,
 * and review before live profile API integration.
 *
 * Key exports:
 * - InvestorProfilesPage renders /profiles/investors.
 *
 * Business relevance:
 * Investor profiles help Asancha understand buying criteria, seriousness,
 * funding readiness, preferred locations, budgets, deal preferences, and
 * support needs.
 *
 * Security note:
 * Investor profile details, funding context, documents, private notes, and
 * review actions must remain backend-permission controlled and safely redacted.
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

const investorFilters = [
  {
    title: 'Pending investors',
    description: 'Investor profiles awaiting review or onboarding completion checks.',
    href: '/profiles/investors?status=pending',
    tone: 'warning',
  },
  {
    title: 'Approved investors',
    description: 'Investor profiles approved for safe platform activity and deal matching.',
    href: '/profiles/investors?status=approved',
    tone: 'success',
  },
  {
    title: 'Correction required',
    description: 'Investor profiles requiring user correction or additional information.',
    href: '/profiles/investors?status=correction_requested',
    tone: 'danger',
  },
  {
    title: 'On hold',
    description: 'Investor profiles paused for review, support, or policy checks.',
    href: '/profiles/investors?status=on_hold',
    tone: 'neutral',
  },
] as const;

export default function InvestorProfilesPage() {
  return (
    <PageShell
      description="Investor profile list and review entry point."
      title="Investor profiles"
    >
      <section className="asancha-card-grid">
        {investorFilters.map((filter) => (
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
            <CardTitle>Investor profile data connection</CardTitle>
            <CardDescription>
              Live investor profile records will be connected through the profiles feature layer.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show investor profile tables with safe public IDs, onboarding
              status, verification status, buying criteria summary, and row links to profile detail.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
