// app/verification-reviews/[verificationReviewPublicId]/review/page.tsx

/**
 * File purpose:
 * Renders the verification review decision page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe verification review shell before live
 * review data, correction requests, risk labels, and decision actions are
 * connected.
 *
 * Key exports:
 * - VerificationReviewDecisionPage renders
 *   /verification-reviews/[verificationReviewPublicId]/review.
 *
 * Business relevance:
 * Verification review decisions protect onboarding quality, KYC/AML readiness,
 * marketplace trust, API partner readiness, and sensitive action unlocks.
 *
 * Security note:
 * Verification review decisions are permission-sensitive and high-impact.
 * Backend authorization, risk handling, review transitions, safe user messaging,
 * internal note separation, redaction, and audit logging remain final.
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

export interface VerificationReviewDecisionPageProps {
  params: Promise<{
    verificationReviewPublicId: string;
  }>;
}

const reviewSections = [
  {
    title: 'Review status',
    description: 'Current verification review state and target readiness summary.',
    href: '#review-status',
    tone: 'info',
  },
  {
    title: 'Risk context',
    description:
      'Safe risk label and readiness context without exposing raw private KYC/risk payloads.',
    href: '#risk-context',
    tone: 'warning',
  },
  {
    title: 'Document checks',
    description:
      'Verification-linked documents, replacement requirements, and review readiness checks.',
    href: '#document-checks',
    tone: 'neutral',
  },
  {
    title: 'Safe user message',
    description:
      'User-facing correction or review message separated from internal staff notes.',
    href: '#safe-user-message',
    tone: 'success',
  },
  {
    title: 'Internal note',
    description:
      'Restricted staff-only note area that must never be exposed to public users.',
    href: '#internal-note',
    tone: 'danger',
  },
  {
    title: 'Review actions',
    description:
      'Permission-aware approve, reject, hold, or correction-required actions with confirmation.',
    href: '#review-actions',
    tone: 'danger',
  },
] as const;

export default async function VerificationReviewDecisionPage({
  params,
}: VerificationReviewDecisionPageProps) {
  const { verificationReviewPublicId } = await params;

  return (
    <PageShell
      description="Verification decision, correction, risk context, and permission-aware actions."
      title="Verification review"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Verification review public ID</CardTitle>
              <CardDescription>
                Review data must use safe public identifiers and role-aware redaction.
              </CardDescription>
            </div>
            <Badge tone="neutral">{verificationReviewPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {reviewSections.map((section) => (
              <Button href={section.href} key={section.href} size="sm" variant="secondary">
                {section.title}
              </Button>
            ))}
            <Button
              href={`/verification-reviews/${verificationReviewPublicId}`}
              size="sm"
              variant="secondary"
            >
              Back to verification detail
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
                Live review data for verification review {verificationReviewPublicId} will be
                connected through the verification reviews feature layer. Backend permissions will
                decide which review fields, risk fields, documents, internal notes, and actions are
                visible or allowed for the current staff role.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Restricted review reminder</CardTitle>
            <CardDescription>
              Verification review must separate safe user messages from internal notes and private
              risk context.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="asancha-status asancha-status-warning" role="status">
              Do not expose private KYC notes, raw risk payloads, restricted document URLs, internal
              admin notes, ObjectIds, secrets, or unauthorised audit details.
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
