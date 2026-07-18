// app/listings/[listingPublicId]/review/page.tsx

/**
 * File purpose:
 * Renders the listing review page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe listing review shell before live review
 * data and lifecycle actions are connected.
 *
 * Key exports:
 * - ListingReviewPage renders /listings/[listingPublicId]/review.
 *
 * Business relevance:
 * Listing review protects marketplace quality by checking listing readiness,
 * property alignment, safe content, approval state, and rejection/correction
 * needs.
 *
 * Security note:
 * Listing review actions are permission-sensitive and high-impact. Backend
 * authorization, action transitions, confirmation requirements, internal notes,
 * safe user messages, audit logging, and redaction remain final.
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

export interface ListingReviewPageProps {
  params: Promise<{
    listingPublicId: string;
  }>;
}

const reviewSections = [
  {
    title: 'Review status',
    description: 'Current listing review state and publication readiness summary.',
    href: '#review-status',
    tone: 'info',
  },
  {
    title: 'Property alignment',
    description: 'Checks that listing content is connected to the correct approved property.',
    href: '#property-alignment',
    tone: 'warning',
  },
  {
    title: 'Content checks',
    description: 'Safe review of listing title, description, pricing labels, and media metadata.',
    href: '#content-checks',
    tone: 'neutral',
  },
  {
    title: 'Review actions',
    description: 'Permission-aware approve, reject, hold, or correction-request actions.',
    href: '#review-actions',
    tone: 'danger',
  },
] as const;

export default async function ListingReviewPage({ params }: ListingReviewPageProps) {
  const { listingPublicId } = await params;

  return (
    <PageShell
      description="Listing review state, quality checks, and permission-aware lifecycle actions."
      title="Listing review"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Listing public ID</CardTitle>
              <CardDescription>
                Listing review data must use safe public identifiers and role-aware redaction.
              </CardDescription>
            </div>
            <Badge tone="neutral">{listingPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {reviewSections.map((section) => (
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
        {reviewSections.map((section) => (
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
                Live review data for listing {listingPublicId} will be connected through the
                listings feature layer. Backend permissions will decide which review actions are
                visible and allowed for the current staff role.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
