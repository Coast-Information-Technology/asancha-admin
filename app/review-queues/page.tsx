// app/review-queues/page.tsx

/**
 * File purpose:
 * Renders the central review queues overview page for Asancha Admin.
 *
 * Role in the project:
 * This page gives authorised staff a high-level entry point into all operational
 * review queues across profiles, companies, properties, listings, documents,
 * verification reviews, payments, deal reservations, bookings, API partners,
 * and AI review.
 *
 * Key exports:
 * - ReviewQueuesPage renders /review-queues.
 *
 * Business relevance:
 * Review queues are the main operational control centre for staff review work.
 * Queue rows/cards should lead to list or detail pages, while detail pages must
 * not appear as sidebar menu items.
 *
 * Security note:
 * This page provides frontend navigation only. Backend permissions, staff role
 * checks, queue visibility, review actions, resource access, redaction, and
 * audit logging remain the final authority.
 */

import { PageShell } from '../../src/components/layout/page-shell/page-shell';
import { Badge } from '../../src/components/ui/badge/badge';
import { Button } from '../../src/components/ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card/card';
import {
  DEMO_COMPANIES,
  DEMO_DOCUMENTS,
  DEMO_LISTINGS,
  DEMO_PROPERTIES,
  DEMO_PROFILES,
  DEMO_VERIFICATION_REVIEWS,
} from '../../src/lib/demo/management-demo-data';

const queueCards = [
  {
    title: 'Profiles',
    description:
      'Investor, property owner, property agent, property sourcer, and service provider profile reviews.',
    href: '/review-queues/profiles',
    count: DEMO_PROFILES.filter((item) => item.status !== 'approved').length,
    tone: 'info',
  },
  {
    title: 'Companies',
    description: 'Company onboarding, membership, document, and verification review queue.',
    href: '/review-queues/companies',
    count: DEMO_COMPANIES.filter((item) => item.status !== 'approved').length,
    tone: 'info',
  },
  {
    title: 'Properties',
    description: 'Submitted properties awaiting operational review and approval flow.',
    href: '/review-queues/properties',
    count: DEMO_PROPERTIES.filter((item) => item.status !== 'approved').length,
    tone: 'info',
  },
  {
    title: 'Listings',
    description:
      'Listing submissions, publication readiness, visibility checks, and lifecycle review.',
    href: '/review-queues/listings',
    count: DEMO_LISTINGS.filter((item) => item.status !== 'published').length,
    tone: 'warning',
  },
  {
    title: 'Documents',
    description: 'Document review, replacement requests, holds, approvals, and rejection workflow.',
    href: '/review-queues/documents',
    count: DEMO_DOCUMENTS.filter((item) => item.status !== 'approved').length,
    tone: 'warning',
  },
  {
    title: 'Verification reviews',
    description: 'Identity, profile, company, and risk-aware verification review workflow.',
    href: '/review-queues/verification-reviews',
    count: DEMO_VERIFICATION_REVIEWS.filter((item) => item.status !== 'approved').length,
    tone: 'danger',
  },
  {
    title: 'Payments',
    description: 'Payment references, submitted proofs, review states, and trace checks.',
    href: '/review-queues/payments',
    count: 5,
    tone: 'warning',
  },
  {
    title: 'Deal reservations',
    description:
      'Reservation lifecycle review across listings, payments, messages, and activities.',
    href: '/review-queues/deal-reservations',
    count: 3,
    tone: 'info',
  },
  {
    title: 'Bookings',
    description:
      'Operational and support booking queue for upcoming, pending, and support bookings.',
    href: '/review-queues/bookings',
    count: 4,
    tone: 'neutral',
  },
  {
    title: 'API partners',
    description: 'API partner applications and access review for authorised admin staff.',
    href: '/review-queues/api-partners',
    count: 0,
    tone: 'danger',
  },
  {
    title: 'AI review',
    description:
      'AI recommendations, matching signals, review flags, and feedback requiring staff attention.',
    href: '/review-queues/ai',
    count: 0,
    tone: 'neutral',
  },
] as const;

export default function ReviewQueuesPage() {
  return (
    <PageShell
      description="Central role-aware review queue overview for Asancha Admin operations."
      title="Review queues"
    >
      <section className="asancha-card-grid">
        {queueCards.map((queue) => (
          <Card key={queue.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{queue.title}</CardTitle>
                <Badge tone={queue.tone}>{queue.count} pending</Badge>
              </div>
              <CardDescription>{queue.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={queue.href} size="sm" variant="secondary">
                Open queue
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
