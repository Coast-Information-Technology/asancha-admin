// app/review-queues/properties/page.tsx

/**
 * File purpose:
 * Renders the property review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for submitted properties and their
 * review lifecycle.
 *
 * Key exports:
 * - PropertyReviewQueuePage renders /review-queues/properties.
 *
 * Business relevance:
 * Property review helps ensure submitted property records meet Asancha standards
 * before listings and deal activity progress.
 *
 * Security note:
 * Property review actions are permission-aware but must be enforced by backend
 * authorization, validation, visibility, and audit logging.
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

const propertyQueues = [
  {
    title: 'Submitted properties',
    description: 'Newly submitted property records waiting for first review.',
    href: '/properties?status=submitted',
    tone: 'warning',
  },
  {
    title: 'Under review',
    description: 'Properties currently being checked by authorised staff.',
    href: '/properties?status=under_review',
    tone: 'info',
  },
  {
    title: 'Approved properties',
    description: 'Approved properties ready for connected listing workflows.',
    href: '/properties?status=approved',
    tone: 'success',
  },
  {
    title: 'Rejected properties',
    description: 'Rejected property records retained for safe operational status tracking.',
    href: '/properties?status=rejected',
    tone: 'danger',
  },
] as const;

export default function PropertyReviewQueuePage() {
  return (
    <PageShell
      description="Property submission and lifecycle review queue."
      title="Property review queue"
    >
      <section className="asancha-card-grid">
        {propertyQueues.map((queue) => (
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
                Open properties
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
