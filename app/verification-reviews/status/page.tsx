// app/verification-reviews/status/page.tsx

/**
 * File purpose:
 * Renders the support-safe verification review status page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe verification status view for authorised staff,
 * including customer care where allowed, without exposing restricted KYC data,
 * internal notes, private documents, or approval controls.
 *
 * Key exports:
 * - VerificationReviewsStatusPage renders /verification-reviews/status.
 *
 * Business relevance:
 * Verification status support helps staff answer questions about pending,
 * approved, rejected, correction-required, and on-hold verification states.
 *
 * Security note:
 * This page must not expose private KYC notes, internal admin notes, raw
 * document files, private document URLs, ObjectIds, secrets, risk payloads, or
 * approval controls to unauthorised staff. Backend redaction remains final.
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

const supportStatusSections = [
  {
    title: 'Pending verification',
    description: 'Support-safe explanation for verification reviews waiting for staff assessment.',
    href: '?status=pending',
    tone: 'warning',
  },
  {
    title: 'In review',
    description: 'Support-safe explanation for verification reviews currently being assessed.',
    href: '?status=in_review',
    tone: 'info',
  },
  {
    title: 'Correction required',
    description:
      'Support-safe explanation for verification reviews requiring user action or replacement.',
    href: '?status=correction_required',
    tone: 'danger',
  },
  {
    title: 'Approved',
    description: 'Support-safe confirmation that verification has been approved where applicable.',
    href: '?status=approved',
    tone: 'success',
  },
  {
    title: 'Rejected',
    description:
      'Support-safe verification rejection status without exposing restricted internal reasoning.',
    href: '?status=rejected',
    tone: 'danger',
  },
  {
    title: 'On hold',
    description: 'Support-safe explanation for verification reviews paused for additional checks.',
    href: '?status=on_hold',
    tone: 'neutral',
  },
] as const;

export default function VerificationReviewsStatusPage() {
  return (
    <PageShell
      description="Support-safe verification status view without restricted review controls."
      title="Verification status"
    >
      <Card>
        <CardHeader>
          <CardTitle>Support-safe verification status</CardTitle>
          <CardDescription>
            This route is for status visibility only. Approval, rejection, correction, risk update,
            and internal note controls belong in restricted review flows.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button href="/verification-reviews" size="sm" variant="secondary">
            Back to verification reviews
          </Button>
        </CardContent>
      </Card>

      <section className="asancha-card-grid">
        {supportStatusSections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>Status view</Badge>
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
            <CardTitle>Safe support rule</CardTitle>
            <CardDescription>
              Verification support language must be safe, clear, and separate from internal review
              context.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              Customer care may use safe status language such as “pending review”, “in review”,
              “correction required”, “approved”, “rejected”, or “on hold”. They must not see private
              KYC notes, internal notes, raw risk payloads, restricted document URLs, or approval
              controls.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
