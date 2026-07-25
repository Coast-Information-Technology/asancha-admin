// src/components/users/user-role-badge.tsx

/**
 * File purpose:
 * Renders an accessible role badge for Asancha Admin public user records.
 *
 * Role in the project:
 * This component displays public platform user roles in a consistent format.
 *
 * Key exports:
 * - UserRoleBadge renders a public user role label.
 *
 * Business relevance:
 * Public user roles determine profile, onboarding, support, API partner, and
 * operational context.
 *
 * Security note:
 * Role display is not authorization. Backend permissions and user visibility
 * remain final.
 */

import type { PublicUserRole } from '../../features/users/types/users.types';

import styles from './users.module.css';

export interface UserRoleBadgeProps {
  role: PublicUserRole;
}

const ROLE_LABELS: Record<PublicUserRole, string> = {
  guest: 'Guest',
  investor: 'Investor',
  property_owner: 'Property owner',
  property_agent: 'Property agent',
  property_sourcer: 'Property sourcer',
  service_provider: 'Service provider',
  api_partner: 'API partner',
  admin: 'Admin',
  super_admin: 'Super admin',
};

function getRoleClassName(role: PublicUserRole): string {
  if (role === 'guest') {
    return `${styles.badge} ${styles.badgeNeutral}`;
  }

  if (role === 'api_partner' || role === 'admin') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (role === 'super_admin') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  return `${styles.badge} ${styles.badgeInfo}`;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <span className={getRoleClassName(role)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{ROLE_LABELS[role]}</span>
    </span>
  );
}
