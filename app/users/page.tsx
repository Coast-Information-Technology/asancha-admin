// app/users/page.tsx

/**
 * File purpose:
 * Renders the main Users page for Asancha Admin.
 *
 * Role in the project:
 * This page provides a safe operational entry point for authorised staff to
 * review public platform users, search users, view suspended users, and open
 * safe user detail pages.
 *
 * Key exports:
 * - UsersPage renders /users.
 *
 * Business relevance:
 * Admin users need a safe way to support and manage public users across
 * investor, property owner, property agent, property sourcer, service provider,
 * and API partner roles.
 *
 * Security note:
 * This page must not expose MongoDB ObjectIds, private KYC notes, internal admin
 * notes, secrets, restricted document URLs, or super_admin records to
 * unauthorised staff. Backend permissions remain final.
 */

import { PageShell } from '../../src/components/layout/page-shell/page-shell';
import { Badge } from '../../src/components/ui/badge/badge';
import { Button } from '../../src/components/ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card/card';

const userEntryCards = [
  {
    title: 'Public users',
    description:
      'View public platform users by safe public profile and account context.',
    href: '/users/public',
    tone: 'info',
    countLabel: '0 users',
  },
  {
    title: 'Suspended users',
    description:
      'Review user accounts that are suspended, restricted, or require support-safe attention.',
    href: '/users/suspended',
    tone: 'warning',
    countLabel: '0 users',
  },
  {
    title: 'User search',
    description:
      'Search users by safe public identifiers, email context, phone context, or account status.',
    href: '/users/search',
    tone: 'neutral',
    countLabel: 'Safe search',
  },
] as const;

const roleFilters = [
  {
    label: 'Investors',
    href: '/users/public?role=investor',
  },
  {
    label: 'Property owners',
    href: '/users/public?role=property_owner',
  },
  {
    label: 'Property agents',
    href: '/users/public?role=property_agent',
  },
  {
    label: 'Property sourcers',
    href: '/users/public?role=property_sourcer',
  },
  {
    label: 'Service providers',
    href: '/users/public?role=service_provider',
  },
  {
    label: 'API partners',
    href: '/users/public?role=api_partner',
  },
] as const;

export default function UsersPage() {
  return (
    <PageShell
      description="Safe staff entry point for user lookup, public user support, and account status review."
      title="Users"
    >
      <section className="asancha-card-grid">
        {userEntryCards.map((card) => (
          <Card key={card.href}>
            <CardHeader>
              <div className="asancha-cluster-between">
                <CardTitle>{card.title}</CardTitle>
                <Badge tone={card.tone}>{card.countLabel}</Badge>
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button href={card.href} size="sm" variant="secondary">
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>User role filters</CardTitle>
            <CardDescription>
              Open public user lists by business role. Detail pages are reached from list rows, not
              sidebar items.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {roleFilters.map((filter) => (
                <Button href={filter.href} key={filter.href} size="sm" variant="secondary">
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
