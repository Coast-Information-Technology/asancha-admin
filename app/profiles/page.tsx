// app/profiles/page.tsx

/**
 * File purpose:
 * Renders the main Profiles overview page for Asancha Admin.
 *
 * Role in the project:
 * This page provides an authorised staff entry point for reviewing and managing
 * public user business profiles across investors, property owners, property
 * agents, property sourcers, and service providers.
 *
 * Key exports:
 * - ProfilesPage renders /profiles.
 *
 * Business relevance:
 * Profiles define what role a public user performs on Asancha and support
 * onboarding, review, verification, listing, property, sourcing, and service
 * provider workflows.
 *
 * Security note:
 * This page is frontend guidance only. Backend permissions, profile visibility,
 * review actions, restricted notes, document access, and audit logging remain
 * final.
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

const profileSections = [
  {
    title: 'Investors',
    description:
      'Investor profile records, investment readiness, buying criteria, and onboarding status.',
    href: '/profiles/investors',
    tone: 'info',
    countLabel: '0 profiles',
  },
  {
    title: 'Property owners',
    description:
      'Property owner profile records, ownership context, submitted properties, and review status.',
    href: '/profiles/property-owners',
    tone: 'success',
    countLabel: '0 profiles',
  },
  {
    title: 'Property agents',
    description:
      'Property agent profile records, company relationships, listings, and review status.',
    href: '/profiles/property-agents',
    tone: 'warning',
    countLabel: '0 profiles',
  },
  {
    title: 'Property sourcers',
    description:
      'Property sourcer profile records, sourcing readiness, submitted deals, and review status.',
    href: '/profiles/property-sourcers',
    tone: 'info',
    countLabel: '0 profiles',
  },
  {
    title: 'Service providers',
    description:
      'Service provider profile records, service readiness, company links, and support status.',
    href: '/profiles/service-providers',
    tone: 'neutral',
    countLabel: '0 profiles',
  },
] as const;

const statusFilters = [
  {
    label: 'Pending',
    href: '/profiles?status=pending',
  },
  {
    label: 'Under review',
    href: '/profiles?status=under_review',
  },
  {
    label: 'Approved',
    href: '/profiles?status=approved',
  },
  {
    label: 'Rejected',
    href: '/profiles?status=rejected',
  },
  {
    label: 'On hold',
    href: '/profiles?status=on_hold',
  },
] as const;

export default function ProfilesPage() {
  return (
    <PageShell
      description="Role-based public profile review and support entry point for Asancha Admin."
      title="Profiles"
    >
      <section className="asancha-card-grid">
        {profileSections.map((section) => (
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
                Open profiles
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>Profile status filters</CardTitle>
            <CardDescription>
              Filter profile records by review and onboarding state. Profile detail pages are opened
              from list rows, review queues, search results, or related-resource links.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {statusFilters.map((filter) => (
                <Button href={filter.href} key={filter.href} size="sm" variant="secondary">
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
