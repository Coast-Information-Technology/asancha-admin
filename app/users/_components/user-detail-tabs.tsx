// app/users/_components/user-detail-tabs.tsx

/**
 * File purpose:
 * Renders the safe user detail tab navigation for Asancha Admin.
 *
 * Role in the project:
 * This component displays anchor links to user detail sections without creating
 * sidebar menu items for detail pages.
 *
 * Key exports:
 * - UserDetailTabs renders user detail section links.
 *
 * Business relevance:
 * User detail needs organised operational sections for support and admin review.
 *
 * Security note:
 * Tab visibility is frontend guidance only. Backend permissions and redaction
 * remain final, especially for audit trail and sensitive verification data.
 */

import { Button } from '../../../src/components/ui/button/button';

export interface UserDetailTabsProps {
  userPublicId: string;
}

const tabs = [
  { label: 'Overview', href: '#overview' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'Companies', href: '#companies' },
  { label: 'Properties', href: '#properties' },
  { label: 'Listings', href: '#listings' },
  { label: 'Deal reservations', href: '#deal-reservations' },
  { label: 'Bookings', href: '#bookings' },
  { label: 'Payments', href: '#payments' },
  { label: 'Documents', href: '#documents' },
  { label: 'Verification', href: '#verification' },
  { label: 'Messages', href: '#messages' },
  { label: 'Notifications', href: '#notifications' },
  { label: 'Audit trail', href: '#audit-trail' },
] as const;

export function UserDetailTabs({ userPublicId }: UserDetailTabsProps) {
  return (
    <nav aria-label={`User detail sections for ${userPublicId}`}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tabs.map((tab) => (
          <Button href={tab.href} key={tab.href} size="sm" variant="secondary">
            {tab.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}
