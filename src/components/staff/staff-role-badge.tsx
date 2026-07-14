// src/components/staff/staff-role-badge.tsx

/**
 * File purpose:
 * Renders an accessible staff role badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays super_admin, admin, and customer_care_rep role labels
 * consistently across staff screens.
 *
 * Key exports:
 * - StaffRoleBadge renders a staff role label.
 *
 * Business relevance:
 * Staff roles determine access to admin modules, review queues, staff
 * management, settings, audit logs, API access, and support views.
 *
 * Security note:
 * Role display is not authorization. Backend permissions and staff visibility
 * remain final.
 */

import type { StaffRole } from '../../features/staff/types/staff.types';

import styles from './staff.module.css';

export interface StaffRoleBadgeProps {
  role: StaffRole;
}

const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  super_admin: 'Super admin',
  admin: 'Admin',
  customer_care_rep: 'Customer care',
};

function getRoleClassName(role: StaffRole): string {
  if (role === 'super_admin') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (role === 'admin') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  return `${styles.badge} ${styles.badgeInfo}`;
}

export function StaffRoleBadge({ role }: StaffRoleBadgeProps) {
  return (
    <span className={getRoleClassName(role)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{STAFF_ROLE_LABELS[role]}</span>
    </span>
  );
}
