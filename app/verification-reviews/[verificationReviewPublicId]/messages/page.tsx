// app/verification-reviews/[verificationReviewPublicId]/messages/page.tsx

/**
 * File purpose:
 * Renders the verification review messages page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe verification-related messages shell before
 * live conversation and message data are connected.
 *
 * Key exports:
 * - VerificationReviewMessagesPage renders
 *   /verification-reviews/[verificationReviewPublicId]/messages.
 *
 * Business relevance:
 * Verification messages support back-and-forth clarification, correction
 * requests, replacement guidance, and staff-user communication during review.
 *
 * Security note:
 * Messages must not expose private KYC notes, internal admin notes, raw risk
 * payloads, restricted document URLs, ObjectIds, secrets, or unauthorised audit
 * details. Backend conversation permissions remain final.
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

export interface VerificationReviewMessagesPageProps {
  params: Promise<{
    verificationReviewPublicId: string;
  }>;
}

const messageSections = [
  {
    title: 'Open messages',
    description: 'Verification-related conversations that need staff attention.',
    href: '?status=open',
    tone: 'warning',
  },
  {
    title: 'Assigned messages',
    description: 'Verification conversations assigned to a staff member or support queue.',
    href: '?status=assigned',
    tone: 'info',
  },
  {
    title: 'Correction messages',
    description: 'Safe user-facing correction or replacement request message threads.',
    href: '?category=correction',
    tone: 'danger',
  },
  {
    title: 'Resolved messages',
    description: 'Verification-related conversations that have been resolved or closed.',
    href: '?status=resolved',
    tone: 'success',
  },
] as const;

export default async function VerificationReviewMessagesPage({
  params,
}: VerificationReviewMessagesPageProps) {
  const { verificationReviewPublicId } = await params;

  return (
    <PageShell
      description="Verification-related conversations and safe staff-user follow-up context."
      title="Verification messages"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Verification review public ID</CardTitle>
              <CardDescription>
                Message records shown here must use safe public identifiers and conversation
                permissions.
              </CardDescription>
            </div>
            <Badge tone="neutral">{verificationReviewPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Button
            href={`/verification-reviews/${verificationReviewPublicId}`}
            size="sm"
            variant="secondary"
          >
            Back to verification detail
          </Button>
        </CardContent>
      </Card>

      <section className="asancha-card-grid">
        {messageSections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>0 threads</Badge>
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
            <CardTitle>Message data connection</CardTitle>
            <CardDescription>
              Live verification-related conversations will be connected through the messages feature
              layer.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show verification conversation rows, assignment status, last
              message summary, unread state, and links to message threads. It must not expose
              internal notes, private KYC notes, or restricted document URLs.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
