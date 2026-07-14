// src/components/staff/staff-table.tsx

/**
 * File purpose:
 * Renders a reusable staff table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe staff list rows with role, account status,
 * created date, last activity, and a navigation action to the staff detail page.
 *
 * Key exports:
 * - StaffTable renders staff list items.
 *
 * Business relevance:
 * Staff tables support staff governance, account review, permission oversight,
 * and operational access management.
 *
 * Security note:
 * Staff rows must use public IDs only and must not expose ObjectIds, password
 * data, tokens, secrets, private audit payloads, or super_admin records to
 * unauthorised staff.
 */

import { Button } from '../ui/button/button';

import type { StaffListItem } from '../../features/staff/types/staff.types';

import { StaffRoleBadge } from './staff-role-badge';
import { StaffStatusBadge } from './staff-status-badge';

import styles from './staff.module.css';

export interface StaffTableProps {
  staff: readonly StaffListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function StaffTable({
  staff,
  emptyTitle = 'No staff found',
  emptyDescription = 'No staff records match this view yet. Try adjusting filters when live search is connected.',
}: StaffTableProps) {
  if (staff.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Staff</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Created</th>
            <th scope="col">Last active</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((member) => (
            <tr key={member.staffPublicId}>
              <td>
                <p className={styles.staffName}>{member.displayName}</p>
                <div className={styles.staffMeta}>
                  <span>{member.emailLabel}</span>
                  <span aria-hidden="true">•</span>
                  <span>{member.staffPublicId}</span>
                </div>
              </td>

              <td>
                <StaffRoleBadge role={member.role} />
              </td>

              <td>
                <StaffStatusBadge status={member.status} />
              </td>

              <td>{member.createdAtLabel}</td>

              <td>{member.lastActiveAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={member.href} size="sm" variant="secondary">
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
