// app/listings/[listingPublicId]/audit/page.tsx

/**
 * File purpose:
 * Renders the listing audit page for Asancha Admin.
 *
 * Role in the project:
 * This dynamic route displays a permission-restricted listing audit shell before
 * live audit log data is connected.
 *
 * Key exports:
 * - ListingAuditPage renders /listings/[listingPublicId]/audit.
 *
 * Business relevance:
 * Listing audit context supports internal compliance traceability for listing
 * review, publication, visibility, reservation, rejection, archive, and other
 * high-impact lifecycle actions.
 *
 * Security note:
 * Audit logs are internal compliance/security records. They must not be exposed
 * to customer care or unauthorised staff. Audit detail must redact passwords,
 * tokens, full API keys, API key hashes, webhook secrets, private document URLs,
 * raw KYC files, payment provider secrets, private AI prompts, ObjectIds, and
 * restricted payloads.
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

export interface ListingAuditPageProps {
  params: Promise<{
    listingPublicId: string;
  }>;
}

const auditSections = [
  {
    title: 'High-impact actions',
    description: 'Audit summaries for approval, rejection, publication, archive, and restore.',
    href: '?category=high_impact',
    tone: 'danger',
  },
  {
    title: 'Review audit',
    description: 'Audit summaries for listing review actions and review-state changes.',
    href: '?category=review',
    tone: 'warning',
  },
  {
    title: 'Visibility audit',
    description: 'Audit summaries for publication and visibility changes.',
    href: '?category=visibility',
    tone: 'info',
  },
  {
    title: 'Reservation audit',
    description: 'Audit summaries for listing-reservation-related lifecycle events.',
    href: '?category=reservation',
    tone: 'neutral',
  },
] as const;

export default async function ListingAuditPage({ params }: ListingAuditPageProps) {
  const { listingPublicId } = await params;

  return (
    <PageShell
      description="Permission-restricted audit context for listing lifecycle actions."
      title="Listing audit"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <div>
              <CardTitle>Listing public ID</CardTitle>
              <CardDescription>
                Audit records shown here must use safe public identifiers and redacted summaries
                only.
              </CardDescription>
            </div>
            <Badge tone="neutral">{listingPublicId}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="asancha-status asancha-status-warning" role="status">
              Audit logs are separate from listing activities and must be hidden from customer care
              and unauthorised staff.
            </div>

            <Button href={`/listings/${listingPublicId}`} size="sm" variant="secondary">
              Back to listing detail
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
              Live listing audit data will be connected through the audit logs feature layer with
              strict redaction.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="asancha-page-description">
              This page will later show safe audit summaries such as action category, actor label,
              target label, status, source, request ID, correlation ID, and created time. It must not
              expose passwords, tokens, API keys, webhook secrets, private document URLs, raw KYC
              files, ObjectIds, or restricted payloads.
            </p>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
