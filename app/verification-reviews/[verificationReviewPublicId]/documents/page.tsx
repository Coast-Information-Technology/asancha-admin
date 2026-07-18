// app/verification-reviews/[verificationReviewPublicId]/documents/page.tsx

/**
 * File purpose:
 * Renders the verification review documents page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a safe shell for documents linked to a specific
 * verification review before live document data and actions are connected.
 *
 * Key exports:
 * - VerificationReviewDocumentsPage renders
 *   /verification-reviews/[verificationReviewPublicId]/documents.
 *
 * Business relevance:
 * Verification-linked documents support KYC/AML readiness, correction workflows,
 * profile approval, company approval, property approval, API partner readiness,
 * and platform trust.
 *
 * Security note:
 * This page must not expose private document URLs, raw KYC files, private KYC
 * notes, internal admin notes, raw risk payloads, ObjectIds, or secrets.
 * Backend permissions and redaction remain final.
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

export interface VerificationReviewDocumentsPageProps {
  params: Promise<{
    verificationReviewPublicId: string;
  }>;
}

const documentSections = [
  {
    title: 'Required documents',
    description: 'Documents required for this verification review target.',
    href: '?status=required',
    tone: 'warning',
  },
  {
    title: 'Submitted documents',
    description: 'Documents submitted for this verification review.',
    href: '?status=submitted',
    tone: 'info',
  },
  {
    title: 'Approved documents',
    description: 'Approved verification-linked document metadata.',
    href: '?status=approved',
    tone: 'success',
  },
  {
    title: 'Replacement required',
    description: 'Documents requiring replacement or correction from the user.',
    href: '?status=replacement_required',
    tone: 'danger',
  },
  {
    title: 'Rejected documents',
    description: 'Rejected verification-linked document metadata.',
    href: '?status=rejected',
    tone: 'danger',
  },
] as const;

export default async function VerificationReviewDocumentsPage({
  params,
}: VerificationReviewDocumentsPageProps) {
  const { verificationReviewPublicId } = await params;

  return (
    <PageShell
      description="Documents linked to this verification review and their safe review state."
      title="Verification documents"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Verification review public ID</CardTitle>
              <CardDescription>
                Document records shown here must use safe metadata and public identifiers only.
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
        {documentSections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge tone={section.tone}>0 documents</Badge>
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
            <CardTitle>Document data connection</CardTitle>
            <CardDescription>
              Live verification-linked document metadata and permission-aware document actions will
              be connected through the verification reviews and documents feature layers.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe document labels, document status, submitted date,
              replacement status, and links to document detail. It must not expose raw restricted
              files, private document URLs, or private KYC/risk notes.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
