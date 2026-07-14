// app/profiles/[profilePublicId]/page.tsx

/**
 * File purpose:
 * Renders the profile detail page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe profile detail shell before the live
 * profiles feature API and reusable detail components are connected.
 *
 * Key exports:
 * - ProfileDetailPage renders /profiles/[profilePublicId].
 *
 * Business relevance:
 * Profile detail pages centralise business-role context, onboarding status,
 * verification status, related user/company links, and permission-aware review
 * actions.
 *
 * Security note:
 * Profile detail must use public IDs only. It must not expose MongoDB ObjectIds,
 * private KYC notes, internal admin notes, restricted document URLs, secrets,
 * private risk data, or unauthorised audit details. Backend permissions remain
 * final.
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

export interface ProfileDetailPageProps {
  params: Promise<{
    profilePublicId: string;
  }>;
}

const profileDetailSections = [
  {
    title: 'Overview',
    description: 'Safe profile summary, public user context, role type, and onboarding status.',
    href: '#overview',
    tone: 'info',
  },
  {
    title: 'Related user',
    description: 'Safe related user context and support-safe identity labels.',
    href: '#related-user',
    tone: 'neutral',
  },
  {
    title: 'Company context',
    description: 'Related company, membership, and verification context where available.',
    href: '#company-context',
    tone: 'warning',
  },
  {
    title: 'Verification status',
    description: 'Profile verification status and safe review state. Risk data is restricted.',
    href: '#verification-status',
    tone: 'danger',
  },
  {
    title: 'Review actions',
    description: 'Permission-aware review actions will appear after live backend connection.',
    href: '#review-actions',
    tone: 'success',
  },
] as const;

export default async function ProfileDetailPage({ params }: ProfileDetailPageProps) {
  const { profilePublicId } = await params;

  return (
    <PageShell
      description="Safe profile detail page for authorised staff review and support."
      title="Profile detail"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Profile public ID</CardTitle>
              <CardDescription>
                This page uses the safe public profile identifier. Internal database identifiers
                must never be displayed.
              </CardDescription>
            </div>
            <Badge tone="neutral">{profilePublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {profileDetailSections.map((section) => (
              <Button href={section.href} key={section.href} size="sm" variant="secondary">
                {section.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="asancha-card-grid" style={{ marginTop: '1.5rem' }}>
        {profileDetailSections.map((section) => (
          <Card id={section.href.replace('#', '')} key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>API connection pending</Badge>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="asancha-page-description">
                Live data for profile {profilePublicId} will be connected through the profiles
                feature layer. Backend permissions will decide which fields and actions are visible
                to the current staff role.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
