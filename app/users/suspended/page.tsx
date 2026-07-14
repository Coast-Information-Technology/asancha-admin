// app/users/suspended/page.tsx

/**
 * File purpose:
 * Renders the suspended users page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe entry point for reviewing suspended, restricted, or
 * blocked public user accounts.
 *
 * Key exports:
 * - SuspendedUsersPage renders /users/suspended.
 *
 * Business relevance:
 * Staff need safe visibility into suspended user states for support,
 * operations, and escalation workflows.
 *
 * Security note:
 * Suspension reasons, internal notes, risk details, and audit trails must be
 * shown only to authorised staff. Backend permissions and redaction remain
 * final.
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

const suspendedStates = [
  {
    title: 'Suspended accounts',
    description: 'Accounts suspended from platform activity pending review or support follow-up.',
    href: '/users/suspended?status=suspended',
    tone: 'warning',
  },
  {
    title: 'Restricted accounts',
    description: 'Accounts with partial restrictions or role-specific access blocks.',
    href: '/users/suspended?status=restricted',
    tone: 'danger',
  },
  {
    title: 'Locked accounts',
    description: 'Accounts locked due to security or access-state rules.',
    href: '/users/suspended?status=locked',
    tone: 'neutral',
  },
] as const;

export default function SuspendedUsersPage() {
  return (
    <PageShell
      description="Safe status page for suspended, restricted, and locked public user accounts."
      title="Suspended users"
    >
      <section className="asancha-card-grid">
        {suspendedStates.map((state) => (
          <Card key={state.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{state.title}</CardTitle>
                <Badge tone={state.tone}>0 users</Badge>
              </div>
              <CardDescription>{state.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={state.href} size="sm" variant="secondary">
                Open status list
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
