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
import { Skeleton } from '../ui/skeleton/skeleton';

import type { UserListItem, UserVerificationStatus } from '../../features/users/types/users.types';

import { UserRoleBadge } from './user-role-badge';
import { UserStatusBadge } from './user-status-badge';

import styles from './users.module.css';

export interface UsersTableProps {
  users: readonly UserListItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

const VERIFICATION_LABELS: Record<UserVerificationStatus, string> = {
  not_started: 'Not verified',
  pending: 'Pending',
  in_review: 'In review',
  correction_requested: 'Correction requested',
  approved: 'Verified',
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
  isLoading = false,
  emptyTitle = 'No users found',
  emptyDescription = 'No users match this view yet. Try adjusting the filters or search term when live search is connected.',
}: UsersTableProps) {
  if (!isLoading && users.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div aria-busy={isLoading} className={styles.tableWrap}>
      {isLoading ? (
        <div className={styles.tableLoadingState} role="status">
          <span aria-hidden="true" className={styles.loadingSpinner} />
          <span>Loading users…</span>
        </div>
      ) : null}
      <table className={styles.table}>
        <caption className="asancha-sr-only">
          {isLoading ? 'Loading users…' : 'User records'}
        </caption>
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Role</th>
            <th scope="col">Account status</th>
            <th scope="col">Verification</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => <UserSkeletonRow key={index} />)
            : users.map((user) => (
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
                      {user.mustChangePassword ? (
                        <Badge tone="warning">Password change required</Badge>
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

                  <td>{user.updatedAtLabel ?? user.lastSeenAtLabel ?? 'Not available'}</td>

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

function UserSkeletonRow() {
  return (
    <tr aria-hidden="true">
      <td>
        <div className={styles.skeletonStack}>
          <Skeleton height="1rem" width="11rem" />
          <Skeleton height="0.75rem" width="15rem" />
        </div>
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="6rem" />
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="6.5rem" />
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="6rem" />
      </td>
      <td>
        <Skeleton height="1rem" width="6rem" />
      </td>
      <td>
        <Skeleton height="1rem" width="6rem" />
      </td>
      <td>
        <Skeleton height="2rem" rounded width="4rem" />
      </td>
    </tr>
  );
}
