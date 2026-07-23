// app/verification-reviews/[verificationReviewPublicId]/audit/page.tsx

/**
 * File purpose:
 * Renders the verification review audit page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a permission-restricted verification audit shell
 * before live audit log data is connected.
 *
 * Key exports:
 * - VerificationReviewAuditPage renders
 *   /verification-reviews/[verificationReviewPublicId]/audit.
 *
 * Business relevance:
 * Verification audit context supports internal compliance traceability for
 * review decisions, correction requests, document decisions, risk changes, and
 * sensitive action unlocks.
 *
 * Security note:
 * Audit logs are internal compliance/security records. They must not be exposed
 * to customer care or unauthorised staff. Audit detail must redact passwords,
 * tokens, full API keys, API key hashes, webhook secrets, private KYC notes,
 * internal notes where restricted, private document URLs, raw files, ObjectIds,
 * and restricted payloads.
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

export interface VerificationReviewAuditPageProps {
  params: Promise<{
    verificationReviewPublicId: string;
  }>;
}

const auditSections = [
  {
    title: 'Review decisions',
    description: 'Audit summaries for approve, reject, hold, and correction-required decisions.',
    href: '?category=review_decision',
    tone: 'danger',
  },
  {
    title: 'Risk changes',
    description: 'Audit summaries for risk-rating or readiness-related changes.',
    href: '?category=risk',
    tone: 'warning',
  },
  {
    title: 'Document audit',
    description: 'Audit summaries for linked document review and replacement events.',
    href: '?category=document',
    tone: 'info',
  },
  {
    title: 'Message audit',
    description: 'Audit summaries for verification-related staff/user communication actions.',
    href: '?category=message',
    tone: 'neutral',
  },
] as const;

export default async function VerificationReviewAuditPage({
  params,
}: VerificationReviewAuditPageProps) {
  const { verificationReviewPublicId } = await params;

  return (
    <PageShell
      description="Permission-restricted audit context for verification review decisions."
      title="Verification audit"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Verification review public ID</CardTitle>
              <CardDescription>
                Audit records shown here must use safe public identifiers and redacted summaries
                only.
              </CardDescription>
            </div>
            <Badge tone="neutral">{verificationReviewPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="asancha-status asancha-status-warning" role="status">
              Audit logs are separate from verification messages and document history. They must be
              hidden from customer care and unauthorised staff.
            </div>

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
        {auditSections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>Restricted</Badge>
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
            <CardTitle>Audit data connection</CardTitle>
            <CardDescription>
              Live verification audit data will be connected through the audit logs feature layer
              with strict redaction.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe audit summaries such as action category, actor label,
              target label, status, source, request ID, correlation ID, and created time. It must
              not expose passwords, tokens, API keys, webhook secrets, private KYC notes, raw risk
              payloads, private document URLs, raw files, ObjectIds, or restricted payloads.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
