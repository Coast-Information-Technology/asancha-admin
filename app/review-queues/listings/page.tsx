// app/review-queues/listings/page.tsx

/**
 * File purpose:
 * Renders the listing review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for listing submissions, visibility
 * checks, and listing lifecycle review.
 *
 * Key exports:
 * - ListingReviewQueuePage renders /review-queues/listings.
 *
 * Business relevance:
 * Listing review ensures marketplace-facing opportunities meet operational and
 * compliance expectations before publication or reservation workflows.
 *
 * Security note:
 * Listing publication, rejection, visibility, audit, and lifecycle actions must
 * be enforced by backend permissions and audit logging.
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

const listingQueues = [
  {
    title: 'Submitted listings',
    description: 'Listings submitted and waiting for initial staff review.',
    href: '/listings?status=submitted',
    tone: 'warning',
  },
  {
    title: 'Under review',
    description: 'Listings actively being reviewed by authorised operations staff.',
    href: '/listings?status=under_review',
    tone: 'info',
  },
  {
    title: 'Published listings',
    description: 'Live listings available for operational oversight.',
    href: '/listings?status=published',
    tone: 'success',
  },
  {
    title: 'Reserved listings',
    description: 'Listings connected to active reservation workflows.',
    href: '/listings?status=reserved',
    tone: 'neutral',
  },
  {
    title: 'Rejected listings',
    description: 'Rejected listings retained for safe status and audit-aware review.',
    href: '/listings?status=rejected',
    tone: 'danger',
  },
] as const;

export default function ListingReviewQueuePage() {
  return (
    <PageShell
      description="Listing submission, visibility, publication, and lifecycle review queue."
      title="Listing review queue"
    >
      <section className="asancha-card-grid">
        {listingQueues.map((queue) => (
          <Card key={queue.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{queue.title}</CardTitle>
                <Badge tone={queue.tone}>0 records</Badge>
              </div>
              <CardDescription>{queue.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={queue.href} size="sm" variant="secondary">
                Open listings
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
