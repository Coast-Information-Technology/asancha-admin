// app/review-queues/api-partners/page.tsx

/**
 * File purpose:
 * Renders the API partner application review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for API partner applications and access
 * review workflows.
 *
 * Key exports:
 * - ApiPartnerReviewQueuePage renders /review-queues/api-partners.
 *
 * Business relevance:
 * API partner access is a commercial and operational workflow that must be
 * reviewed carefully before clients, plans, scopes, subscriptions, keys,
 * webhooks, usage, and billing are activated.
 *
 * Security note:
 * API access screens must not expose full API keys after initial reveal, API
 * key hashes, webhook secrets, private infrastructure values, internal admin
 * documentation, or unrestricted Swagger/admin documentation.
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

const apiPartnerQueues = [
  {
    title: 'Applications',
    description: 'API partner applications awaiting review or decision.',
    href: '/api-access/applications',
    tone: 'warning',
  },
  {
    title: 'Clients',
    description: 'API clients requiring access review or operational oversight.',
    href: '/api-access/clients',
    tone: 'info',
  },
  {
    title: 'Plans',
    description: 'API access plans and commercial structure review.',
    href: '/api-access/plans',
    tone: 'neutral',
  },
  {
    title: 'Subscriptions',
    description: 'API partner subscription status and plan assignment review.',
    href: '/api-access/subscriptions',
    tone: 'info',
  },
  {
    title: 'Webhooks',
    description: 'Webhook configuration and delivery oversight with secret redaction.',
    href: '/api-access/webhooks',
    tone: 'danger',
  },
] as const;

export default function ApiPartnerReviewQueuePage() {
  return (
    <PageShell
      description="API partner applications, clients, plans, subscriptions, webhooks, and access review."
      title="API partner review queue"
    >
      <section className="asancha-card-grid">
        {apiPartnerQueues.map((queue) => (
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
                Open API access
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
