// app/listings/[listingPublicId]/visibility/page.tsx

/**
 * File purpose:
 * Renders the listing visibility page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe listing visibility shell before live
 * publication and visibility controls are connected.
 *
 * Key exports:
 * - ListingVisibilityPage renders /listings/[listingPublicId]/visibility.
 *
 * Business relevance:
 * Listing visibility controls determine whether a listing can appear in
 * permitted marketplace, reservation, investor, and operational contexts.
 *
 * Security note:
 * Visibility and publication controls are high-impact. Backend authorization,
 * lifecycle rules, confirmation requirements, audit logging, and redaction
 * remain final. Hidden frontend buttons are not security.
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

export interface ListingVisibilityPageProps {
  params: Promise<{
    listingPublicId: string;
  }>;
}

const visibilitySections = [
  {
    title: 'Publication state',
    description: 'Current listing publication status and safe visibility summary.',
    href: '#publication-state',
    tone: 'info',
  },
  {
    title: 'Marketplace visibility',
    description: 'Controls and status for whether the listing is visible where permitted.',
    href: '#marketplace-visibility',
    tone: 'success',
  },
  {
    title: 'Reservation visibility',
    description: 'Visibility and availability context for deal reservation workflows.',
    href: '#reservation-visibility',
    tone: 'warning',
  },
  {
    title: 'Visibility actions',
    description: 'Permission-aware visibility, archive, publish, or unpublish actions.',
    href: '#visibility-actions',
    tone: 'danger',
  },
] as const;

export default async function ListingVisibilityPage({ params }: ListingVisibilityPageProps) {
  const { listingPublicId } = await params;

  return (
    <PageShell
      description="Publication state and visibility controls for authorised listing management."
      title="Listing visibility"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Listing public ID</CardTitle>
              <CardDescription>
                Visibility data must be displayed safely and enforced by backend lifecycle rules.
              </CardDescription>
            </div>
            <Badge tone="neutral">{listingPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {visibilitySections.map((section) => (
              <Button href={section.href} key={section.href} size="sm" variant="secondary">
                {section.title}
              </Button>
            ))}
            <Button href={`/listings/${listingPublicId}`} size="sm" variant="secondary">
              Back to listing detail
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="asancha-card-grid">
        {visibilitySections.map((section) => (
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
                Live visibility data for listing {listingPublicId} will be connected through the
                listings feature layer. Backend permissions will decide which visibility actions are
                allowed for the current staff role.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
