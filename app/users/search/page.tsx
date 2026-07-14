// app/users/search/page.tsx

/**
 * File purpose:
 * Renders the user search page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe placeholder for user lookup by authorised staff
 * before live API-backed search is connected.
 *
 * Key exports:
 * - UserSearchPage renders /users/search.
 *
 * Business relevance:
 * Staff need fast user lookup for support, messages, bookings, payments,
 * documents, verification, and account-status workflows.
 *
 * Security note:
 * Search must use safe public identifiers and redacted account context. It must
 * not expose internal ObjectIds, private notes, secrets, private document URLs,
 * or restricted audit details.
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

export default function UserSearchPage() {
  return (
    <PageShell
      description="Search users safely by public identifiers and support-safe account context."
      title="User search"
    >
      <Card>
        <CardHeader>
          <div className="asancha-cluster-between">
            <CardTitle>Safe user lookup</CardTitle>
            <Badge tone="info">API connection pending</Badge>
          </div>
          <CardDescription>
            Live search will support safe public ID, email context, phone context, role, status, and
            support workflows without exposing internal IDs or restricted notes.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              padding: '1rem',
              border: '1px dashed var(--asancha-color-border)',
              borderRadius: 'var(--asancha-radius-xl)',
              background: 'var(--asancha-color-surface-subtle)',
            }}
          >
            <p
              style={{
                margin: 0,
                color: 'var(--asancha-color-text-muted)',
                fontSize: 'var(--asancha-font-size-sm)',
                lineHeight: 'var(--asancha-line-height-relaxed)',
              }}
            >
              The API-backed user search form will be connected in the users feature layer. For now,
              use the public user list entry point.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Button href="/users/public" size="sm" variant="secondary">
                Open public users
              </Button>
              <Button href="/users/suspended" size="sm" variant="secondary">
                Open suspended users
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
