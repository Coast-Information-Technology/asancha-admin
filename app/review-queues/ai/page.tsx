// app/review-queues/ai/page.tsx

/**
 * File purpose:
 * Renders the AI/admin review queue page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a queue entry point for AI recommendations, matching
 * snapshots, analysis runs, and AI feedback requiring authorised staff review.
 *
 * Key exports:
 * - AiReviewQueuePage renders /review-queues/ai.
 *
 * Business relevance:
 * AI outputs may support staff analysis but must never override permission
 * rules, verification rules, payment rules, policy rules, reservation rules,
 * listing lifecycle rules, approval rules, or data visibility rules.
 *
 * Security note:
 * AI review screens must not expose sensitive AI payloads, private prompts,
 * private user data, private KYC/risk details, restricted documents, ObjectIds,
 * secrets, or unsupported legal/financial guarantees.
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

const aiQueues = [
  {
    title: 'Recommendations',
    description: 'AI recommendations requiring explainable staff review.',
    href: '/ai/recommendations',
    tone: 'info',
  },
  {
    title: 'Matching snapshots',
    description: 'AI matching snapshots linked to listings, profiles, and safe review context.',
    href: '/ai/matching-snapshots',
    tone: 'neutral',
  },
  {
    title: 'Analysis runs',
    description: 'AI analysis runs requiring operational visibility and safe status tracking.',
    href: '/ai/analysis-runs',
    tone: 'warning',
  },
  {
    title: 'Feedback',
    description: 'AI feedback queue for staff review and model improvement signals.',
    href: '/ai/feedback',
    tone: 'success',
  },
] as const;

export default function AiReviewQueuePage() {
  return (
    <PageShell
      description="AI recommendation, matching, analysis, and feedback review queue."
      title="AI review queue"
    >
      <section className="asancha-card-grid">
        {aiQueues.map((queue) => (
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
                Open AI review
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
