// src/components/companies/company-member-role-badge.tsx

/**
 * File purpose:
 * Renders an accessible company member role badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays company member roles consistently across company
 * detail, member lists, and related company views.
 *
 * Key exports:
 * - CompanyMemberRoleBadge renders a company member role label.
 *
 * Business relevance:
 * Company member roles help staff understand ownership, management,
 * operational contact, agent, sourcer, service provider, and API contact
 * relationships.
 *
 * Security note:
 * Role display is not authorization. Backend permissions and member visibility
 * remain final.
 */

import { COMPANY_MEMBER_ROLE_LABELS } from '../../features/companies/constants/companies.constants';
import type { CompanyMemberRole } from '../../features/companies/types/companies.types';

import styles from './companies.module.css';

export interface CompanyMemberRoleBadgeProps {
  role: CompanyMemberRole;
}

function getCompanyMemberRoleClassName(role: CompanyMemberRole): string {
  if (role === 'owner' || role === 'director') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (role === 'manager') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  if (role === 'api_contact') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function CompanyMemberRoleBadge({ role }: CompanyMemberRoleBadgeProps) {
  return (
    <span className={getCompanyMemberRoleClassName(role)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{COMPANY_MEMBER_ROLE_LABELS[role]}</span>
    </span>
  );
}
