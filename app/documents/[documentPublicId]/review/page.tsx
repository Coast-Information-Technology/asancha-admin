// app/documents/[documentPublicId]/review/page.tsx

/**
 * File purpose:
 * Renders the document review page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe document review shell before live document
 * review data and review actions are connected.
 *
 * Key exports:
 * - DocumentReviewPage renders /documents/[documentPublicId]/review.
 *
 * Business relevance:
 * Document review protects onboarding quality, profile approval, company
 * approval, property approval, verification workflows, API partner readiness,
 * and platform trust.
 *
 * Security note:
 * Document review actions are permission-sensitive. Backend authorization,
 * review action transitions, safe user messaging, internal note separation,
 * private file access, redaction, and audit logging remain final.
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

export interface DocumentReviewPageProps {
  params: Promise<{
    documentPublicId: string;
  }>;
}

const reviewSections = [
  {
    title: 'Review status',
    description: 'Current document review state and safe metadata summary.',
    href: '#review-status',
    tone: 'info',
  },
  {
    title: 'Document checks',
    description:
      'Permission-aware review checks for document type, ownership context, and replacement need.',
    href: '#document-checks',
    tone: 'warning',
  },
  {
    title: 'Safe user message',
    description:
      'User-facing document correction or replacement message separated from internal notes.',
    href: '#safe-user-message',
    tone: 'success',
  },
  {
    title: 'Internal note',
    description:
      'Restricted internal staff note area that must never be exposed to public users.',
    href: '#internal-note',
    tone: 'danger',
  },
  {
    title: 'Review actions',
    description:
      'Permission-aware approve, reject, hold, or replacement-required actions with confirmation.',
    href: '#review-actions',
    tone: 'danger',
  },
] as const;

export default async function DocumentReviewPage({ params }: DocumentReviewPageProps) {
  const { documentPublicId } = await params;

  return (
    <PageShell
      description="Document review, safe user messaging, internal notes, and permission-aware actions."
      title="Document review"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Document public ID</CardTitle>
              <CardDescription>
                Review data must use safe public identifiers and role-aware redaction.
              </CardDescription>
            </div>
            <Badge tone="neutral">{documentPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {reviewSections.map((section) => (
              <Button href={section.href} key={section.href} size="sm" variant="secondary">
                {section.title}
              </Button>
            ))}
            <Button href={`/documents/${documentPublicId}`} size="sm" variant="secondary">
              Back to document detail
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
                Live review data for document {documentPublicId} will be connected through the
                documents feature layer. Backend permissions will decide which review fields,
                document files, internal notes, and actions are visible or allowed for the current
                staff role.
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
              Document review must separate safe user messages from internal notes.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="asancha-status asancha-status-warning" role="status">
              Do not expose private document URLs, raw KYC files, internal admin notes, private KYC
              notes, ObjectIds, secrets, or restricted review payloads.
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
