// app/review-queues/profiles/page.tsx

/**
 * File purpose:
 * Renders the profile review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for profile reviews across investor,
 * property owner, property agent, property sourcer, and service provider
 * profiles.
 *
 * Key exports:
 * - ProfileReviewQueuePage renders /review-queues/profiles.
 *
 * Business relevance:
 * Profile review ensures public user role profiles are checked before broader
 * platform activity is trusted.
 *
 * Security note:
 * Frontend queue display does not authorize review actions. Backend permissions,
 * profile visibility, private notes, document access, and audit logging remain
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

const profileQueues = [
  {
    title: 'Investor profiles',
    description: 'Investor profile submissions, investment readiness, and onboarding status checks.',
    href: '/profiles/investors',
    status: 'Ready for list connection',
  },
  {
    title: 'Property owner profiles',
    description: 'Owner profile submissions and property ownership context review.',
    href: '/profiles/property-owners',
    status: 'Ready for list connection',
  },
  {
    title: 'Property agent profiles',
    description: 'Agent profile submissions, company relationships, and status checks.',
    href: '/profiles/property-agents',
    status: 'Ready for list connection',
  },
  {
    title: 'Property sourcer profiles',
    description: 'Sourcer profile submissions and sourcing readiness review.',
    href: '/profiles/property-sourcers',
    status: 'Ready for list connection',
  },
  {
    title: 'Service provider profiles',
    description: 'Provider profile submissions and service readiness status checks.',
    href: '/profiles/service-providers',
    status: 'Ready for list connection',
  },
] as const;

export default function ProfileReviewQueuePage() {
  return (
    <PageShell
      description="Profile review queues for public user business roles."
      title="Profile review queue"
    >
      <section className="asancha-card-grid">
        {profileQueues.map((queue) => (
          <Card key={queue.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{queue.title}</CardTitle>
                <Badge tone="info">{queue.status}</Badge>
              </div>
              <CardDescription>{queue.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={queue.href} size="sm" variant="secondary">
                Open profiles
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
