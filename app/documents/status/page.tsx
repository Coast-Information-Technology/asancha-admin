// app/documents/status/page.tsx

/**
 * File purpose:
 * Renders the support-safe document status page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe document status view for authorised staff, including
 * customer care where allowed, without exposing restricted document content or
 * approval controls.
 *
 * Key exports:
 * - DocumentsStatusPage renders /documents/status.
 *
 * Business relevance:
 * Document status support helps staff answer user questions about pending,
 * approved, rejected, on-hold, and replacement-required document states without
 * exposing private review data.
 *
 * Security note:
 * This page must not expose private document URLs, raw KYC files, private KYC
 * notes, internal admin notes, ObjectIds, secrets, or approval controls to
 * unauthorised staff. Backend permissions and redaction remain final.
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
    title: 'Pending status',
    description:
      'Support-safe explanation for documents waiting for review. No approval controls shown here.',
    href: '?status=pending',
    tone: 'warning',
  },
  {
    title: 'Approved status',
    description: 'Support-safe confirmation that document metadata has been approved.',
    href: '?status=approved',
    tone: 'success',
  },
  {
    title: 'Rejected status',
    description:
      'Support-safe status view for rejected documents without exposing restricted internal notes.',
    href: '?status=rejected',
    tone: 'danger',
  },
  {
    title: 'Replacement required',
    description:
      'Support-safe status view for documents requiring replacement or correction from the user.',
    href: '?status=replacement_required',
    tone: 'danger',
  },
  {
    title: 'On hold',
    description:
      'Support-safe view for documents paused for additional review or verification checks.',
    href: '?status=on_hold',
    tone: 'info',
  },
] as const;

export default function DocumentsStatusPage() {
  return (
    <PageShell
      description="Support-safe document status view without restricted document review controls."
      title="Document status"
    >
      <Card>
        <CardHeader>
          <CardTitle>Support-safe document status</CardTitle>
          <CardDescription>
            This route is for status visibility. Approval, rejection, replacement, and internal note
            controls belong in restricted review flows only.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button href="/documents" size="sm" variant="secondary">
            Back to documents
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
            <CardTitle>Safe messaging rule</CardTitle>
            <CardDescription>
              User-facing document messages must be separated from internal staff notes.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              Customer care may use safe status language such as “pending review”, “approved”,
              “replacement required”, or “on hold”. They must not see private KYC files, internal
              notes, raw review payloads, or restricted document URLs.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
