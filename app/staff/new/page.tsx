// app/staff/new/page.tsx

/**
 * File purpose:
 * Renders the create-staff page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for staff creation before the live staff
 * feature form and backend endpoint are connected.
 *
 * Key exports:
 * - NewStaffPage renders /staff/new.
 *
 * Business relevance:
 * Staff creation is restricted:
 * - super_admin may create admin.
 * - super_admin may create customer_care_rep.
 * - admin may create customer_care_rep.
 * - no frontend route may create super_admin.
 *
 * Security note:
 * This frontend page does not authorize staff creation. Backend permissions,
 * allowed role transitions, invite flow, audit logging, and account status
 * rules remain final.
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

const allowedCreationRules = [
  {
    actor: 'super_admin',
    allowed: 'admin',
    description: 'Super admins may invite/create admin staff where backend permission allows.',
  },
  {
    actor: 'super_admin',
    allowed: 'customer_care_rep',
    description: 'Super admins may invite/create customer care staff where backend permission allows.',
  },
  {
    actor: 'admin',
    allowed: 'customer_care_rep',
    description: 'Admins may invite/create customer care staff only.',
  },
] as const;

const blockedCreationRules = [
  'No frontend form may create super_admin.',
  'Admin must not create admin.',
  'Admin must not create super_admin.',
  'Customer care must not create staff accounts.',
] as const;

export default function NewStaffPage() {
  return (
    <PageShell
      description="Create permitted staff accounts through the authorised invite/setup flow."
      title="Create staff"
    >
      <section className="asancha-card-grid">
        {allowedCreationRules.map((rule) => (
          <Card key={`${rule.actor}-${rule.allowed}`}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{rule.actor}</CardTitle>
                <Badge tone="success">May create {rule.allowed}</Badge>
              </div>
              <CardDescription>{rule.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="asancha-page-description">
                The live create-staff form will be connected in the staff feature layer and must
                enforce this role matrix in the UI while the backend remains final authority.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <div className="asancha-cluster-between">
              <CardTitle>Blocked staff creation paths</CardTitle>
              <Badge tone="danger">Strict rule</Badge>
            </div>
            <CardDescription>
              These options must not appear in any route, form, modal, dropdown, or action.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul
              style={{
                display: 'grid',
                gap: '0.75rem',
                margin: 0,
                paddingLeft: '1.25rem',
                color: 'var(--asancha-color-text-muted)',
                fontSize: 'var(--asancha-font-size-sm)',
                lineHeight: 'var(--asancha-line-height-relaxed)',
              }}
            >
              {blockedCreationRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
              <Button href="/staff" size="sm" variant="secondary">
                Back to staff
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
