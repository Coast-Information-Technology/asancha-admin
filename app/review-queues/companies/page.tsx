// app/review-queues/companies/page.tsx

/**
 * File purpose:
 * Renders the company review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides an operational entry point for company onboarding,
 * verification, member, and document review.
 *
 * Key exports:
 * - CompanyReviewQueuePage renders /review-queues/companies.
 *
 * Business relevance:
 * Company review supports trusted organisation participation across property,
 * sourcing, agency, service provider, and API partner workflows.
 *
 * Security note:
 * Company review actions must be enforced by the backend. Customer care must not
 * see high-risk mutation controls or restricted verification details.
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

const companyQueues = [
  {
    title: 'Pending companies',
    description: 'Companies submitted for review and awaiting operational decision.',
    href: '/companies?status=pending',
    tone: 'warning',
  },
  {
    title: 'On-hold companies',
    description: 'Companies paused for additional information or correction.',
    href: '/companies?status=on_hold',
    tone: 'neutral',
  },
  {
    title: 'Approved companies',
    description: 'Approved companies available for operational reference and support.',
    href: '/companies?status=approved',
    tone: 'success',
  },
  {
    title: 'Rejected companies',
    description: 'Rejected companies for safe review history and status tracking.',
    href: '/companies?status=rejected',
    tone: 'danger',
  },
] as const;

export default function CompanyReviewQueuePage() {
  return (
    <PageShell
      description="Company onboarding, verification, document, and member review queues."
      title="Company review queue"
    >
      <section className="asancha-card-grid">
        {companyQueues.map((queue) => (
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
                Open companies
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
