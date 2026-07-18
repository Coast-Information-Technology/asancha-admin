// app/listings/[listingPublicId]/activities/page.tsx

/**
 * File purpose:
 * Renders the listing activities page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe listing business activity timeline shell
 * before live activity data is connected.
 *
 * Key exports:
 * - ListingActivitiesPage renders /listings/[listingPublicId]/activities.
 *
 * Business relevance:
 * Listing activities provide an operational timeline for listing submission,
 * review, publication, reservation, visibility, and business events.
 *
 * Security note:
 * Listing activities are not audit logs. Activity timelines must not expose
 * secrets, private KYC notes, internal admin notes to public users, ObjectIds,
 * private document URLs, or audit-sensitive compliance payloads.
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

export interface ListingActivitiesPageProps {
  params: Promise<{
    listingPublicId: string;
  }>;
}

const activitySections = [
  {
    title: 'Submission activity',
    description: 'Business timeline entries for listing submission and intake.',
    href: '?target=listing&category=submission',
    tone: 'info',
  },
  {
    title: 'Review activity',
    description: 'Business timeline entries for listing review lifecycle events.',
    href: '?target=listing&category=review',
    tone: 'warning',
  },
  {
    title: 'Visibility activity',
    description: 'Business timeline entries for publication and visibility changes.',
    href: '?target=listing&category=visibility',
    tone: 'success',
  },
  {
    title: 'Reservation activity',
    description: 'Business timeline entries connecting this listing to reservation workflows.',
    href: '?target=listing&category=reservation',
    tone: 'neutral',
  },
] as const;

export default async function ListingActivitiesPage({ params }: ListingActivitiesPageProps) {
  const { listingPublicId } = await params;

  return (
    <PageShell
      description="Business activity timeline connected to this listing. This is separate from audit logs."
      title="Listing activities"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Listing public ID</CardTitle>
              <CardDescription>
                Activity records shown here must use safe public identifiers and operational
                summaries only.
              </CardDescription>
            </div>
            <Badge tone="neutral">{listingPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Button href={`/listings/${listingPublicId}`} size="sm" variant="secondary">
            Back to listing detail
          </Button>
        </CardContent>
      </Card>

      <section className="asancha-card-grid">
        {activitySections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>0 activities</Badge>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={section.href} size="sm" variant="secondary">
                Open filter
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Activity timeline connection</CardTitle>
            <CardDescription>
              Live listing activity data will be connected through the listings and deal activities
              feature layers.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show business activity timeline rows such as listing submitted,
              review started, correction requested, listing published, reservation created, and
              visibility changed. Audit logs remain separate and permission-restricted.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
