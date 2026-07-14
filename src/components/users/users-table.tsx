// src/components/users/users-table.tsx

/**
 * File purpose:
 * Renders a reusable users table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe user list rows with role, status, verification
 * status, timestamps, and a navigation action to the user detail page.
 *
 * Key exports:
 * - UsersTable renders user list items.
 *
 * Business relevance:
 * User tables power public user lists, suspended user lists, search results, and
 * support workflows.
 *
 * Security note:
 * User rows must use public IDs only and must not expose ObjectIds, private KYC
 * notes, internal admin notes, restricted documents, secrets, or audit details.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';

import type {
  UserListItem,
  UserVerificationStatus,
} from '../../features/users/types/users.types';

import { UserRoleBadge } from './user-role-badge';
import { UserStatusBadge } from './user-status-badge';

import styles from './users.module.css';

export interface UsersTableProps {
  users: readonly UserListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

const VERIFICATION_LABELS: Record<UserVerificationStatus, string> = {
  not_started: 'Not started',
  pending: 'Pending',
  in_review: 'In review',
  correction_requested: 'Correction requested',
  approved: 'Approved',
  rejected: 'Rejected',
  flagged: 'Flagged',
};

function getVerificationTone(status: UserVerificationStatus) {
  if (status === 'approved') {
    return 'success';
  }

  if (status === 'rejected' || status === 'flagged') {
    return 'danger';
  }

  if (status === 'pending' || status === 'in_review' || status === 'correction_requested') {
    return 'warning';
  }

  return 'neutral';
}

export function UsersTable({
  users,
  emptyTitle = 'No users found',
  emptyDescription = 'No users match this view yet. Try adjusting the filters or search term when live search is connected.',
}: UsersTableProps) {
  if (users.length === 0) {
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
            <th scope="col">User</th>
            <th scope="col">Role</th>
            <th scope="col">Account status</th>
            <th scope="col">Verification</th>
            <th scope="col">Created</th>
            <th scope="col">Last seen</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.userPublicId}>
              <td>
                <p className={styles.userName}>{user.displayName}</p>
                <div className={styles.userMeta}>
                  <span>{user.emailLabel}</span>
                  {user.phoneLabel ? (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{user.phoneLabel}</span>
                    </>
                  ) : null}
                  <span aria-hidden="true">•</span>
                  <span>{user.userPublicId}</span>
                </div>
              </td>

              <td>
                <UserRoleBadge role={user.role} />
              </td>

              <td>
                <UserStatusBadge status={user.status} />
              </td>

              <td>
                <Badge tone={getVerificationTone(user.verificationStatus)}>
                  {VERIFICATION_LABELS[user.verificationStatus]}
                </Badge>
              </td>

              <td>{user.createdAtLabel}</td>

              <td>{user.lastSeenAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={user.href} size="sm" variant="secondary">
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
