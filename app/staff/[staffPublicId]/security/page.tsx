// app/staff/[staffPublicId]/security/page.tsx

/**
 * File purpose:
 * Renders the staff security page for Asancha Admin.
 *
 * Role in the project:
 * This page displays safe staff security placeholders including account state,
 * access restrictions, session review guidance, and password/security action
 * boundaries.
 *
 * Key exports:
 * - StaffSecurityPage renders /staff/[staffPublicId]/security.
 *
 * Business relevance:
 * Staff security state affects internal platform access and operational safety.
 *
 * Security note:
 * This page must never expose passwords, password hashes, reset tokens, refresh
 * tokens, JWTs, secret keys, session secrets, raw security signals, or private
 * audit payloads. Backend permissions remain final.
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

export interface StaffSecurityPageProps {
  params: Promise<{
    staffPublicId: string;
  }>;
}

const securityItems = [
  {
    title: 'Account status',
    description:
      'Live account status and lock state will be displayed safely after API connection.',
    tone: 'info',
  },
  {
    title: 'Password and reset safety',
    description: 'Password reset actions must be token-based and backend-audited.',
    tone: 'warning',
  },
  {
    title: 'Session review',
    description: 'Session metadata must be safe and redacted. Tokens must never be shown.',
    tone: 'danger',
  },
] as const;

export default async function StaffSecurityPage({ params }: StaffSecurityPageProps) {
  const { staffPublicId } = await params;

  return (
    <PageShell
      description="Security-sensitive staff account information for authorised staff management."
      title="Staff security"
    >
      <section className="asancha-card-grid">
        {securityItems.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{item.title}</CardTitle>
                <Badge tone={item.tone}>Restricted</Badge>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="asancha-page-description">
                Staff public ID: {staffPublicId}. Live security data will be connected through
                permission-aware backend endpoints.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div>
        <Button href={`/staff/${staffPublicId}`} size="sm" variant="secondary">
          Back to staff detail
        </Button>
      </div>
    </PageShell>
  );
}
