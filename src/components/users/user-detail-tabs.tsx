// src/components/users/user-detail-tabs.tsx

/**
 * File purpose:
 * Renders reusable user detail tab links for Asancha Admin.
 *
 * Role in the project:
 * This component provides accessible in-page navigation for user detail sections
 * without placing detail pages in sidebar menus.
 *
 * Key exports:
 * - UserDetailTabs renders user detail section anchors.
 *
 * Business relevance:
 * User detail pages contain many operational sections and need clear navigation.
 *
 * Security note:
 * Tab visibility is frontend guidance only. Backend permissions and redaction
 * remain final, especially for audit trail and verification sections.
 */

import { Button } from '../ui/button/button';

import styles from './users.module.css';

export interface UserDetailTabsProps {
  userPublicId: string;
  showAuditTrail?: boolean;
}

const baseTabs = [
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
] as const;

const auditTab = { label: 'Audit trail', href: '#audit-trail' } as const;

export function UserDetailTabs({ userPublicId, showAuditTrail = false }: UserDetailTabsProps) {
  const tabs = showAuditTrail ? [...baseTabs, auditTab] : baseTabs;

  return (
    <nav aria-label={`User detail sections for ${userPublicId}`}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <Button href={tab.href} key={tab.href} size="sm" variant="secondary">
            {tab.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}
