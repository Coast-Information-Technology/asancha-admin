// src/components/users/users-table.tsx

/**
 * File purpose:
 * Renders a reusable, scannable users table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe user rows with selection, role, status,
 * verification, sortable timestamps, and contextual row actions.
 *
 * Key exports:
 * - UsersTable renders user list items and table controls.
 *
 * Business relevance:
 * Staff need to find, compare, select, and review user accounts efficiently.
 *
 * Security note:
 * User rows must use public IDs only and must not expose ObjectIds, private KYC
 * notes, internal admin notes, restricted documents, secrets, or audit details.
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import type {
  UserBulkAction,
  UserListItem,
  UserSortColumn,
  UserSortState,
  UserVerificationStatus,
} from '../../features/users/types/users.types';
import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { DropdownMenu } from '../ui/dropdown-menu/dropdown-menu';
import { Skeleton } from '../ui/skeleton/skeleton';

import { UserRoleBadge } from './user-role-badge';
import { UserStatusBadge } from './user-status-badge';

import styles from './users.module.css';

export interface UsersTableProps {
  users: readonly UserListItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  selectedUserIds?: readonly string[];
  sortState?: UserSortState;
  onSortChange?: (column: UserSortColumn) => void;
  onSelectionChange?: (userPublicId: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;
  onBulkAction?: (action: UserBulkAction) => void;
}

const DEFAULT_SORT_STATE: UserSortState = {
  column: 'createdAt',
  direction: 'desc',
};

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
  selectedUserIds = [],
  sortState = DEFAULT_SORT_STATE,
  onSortChange = () => undefined,
  onSelectionChange = () => undefined,
  onSelectAll = () => undefined,
  onBulkAction = () => undefined,
}: UsersTableProps) {
  if (!isLoading && users.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  const selectedSet = new Set(selectedUserIds);
  const selectedVisibleCount = users.filter((user) => selectedSet.has(user.userPublicId)).length;
  const allVisibleSelected = users.length > 0 && selectedVisibleCount === users.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;

  return (
    <div aria-busy={isLoading} className={styles.tableWrap}>
      {!isLoading && selectedUserIds.length > 0 ? (
        <div className={styles.bulkToolbar}>
          <p className={styles.bulkToolbarInfo}>
            <strong>{selectedUserIds.length}</strong> user{selectedUserIds.length === 1 ? '' : 's'}{' '}
            selected
          </p>
          <div className={styles.bulkToolbarActions}>
            <Button onClick={() => onBulkAction('verify')} size="sm" variant="secondary">
              Verify selected
            </Button>
            <Button onClick={() => onBulkAction('deactivate')} size="sm" variant="danger">
              Deactivate selected
            </Button>
          </div>
        </div>
      ) : null}

      <table className={styles.table}>
        <caption className="asancha-sr-only">
          {isLoading ? 'Loading users...' : 'User records'}
        </caption>
        <colgroup>
          <col className={styles.selectionColumn} />
          <col className={styles.userColumn} />
          <col className={styles.roleColumn} />
          <col className={styles.statusColumn} />
          <col className={styles.verificationColumn} />
          <col className={styles.dateColumn} />
          <col className={styles.dateColumn} />
          <col className={styles.actionColumn} />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.selectionCell} scope="col">
              <TableCheckbox
                ariaLabel="Select all visible users"
                checked={allVisibleSelected}
                disabled={isLoading || users.length === 0}
                indeterminate={someVisibleSelected}
                onChange={onSelectAll}
              />
            </th>
            <th className={styles.userHeader} scope="col">
              User
            </th>
            <th className={styles.roleCell} scope="col">
              Role
            </th>
            <th className={styles.statusHeader} scope="col">
              Account status
            </th>
            <th className={styles.verificationHeader} scope="col">
              Verification
            </th>
            <SortableHeader
              column="createdAt"
              label="Created"
              onSortChange={onSortChange}
              sortState={sortState}
            />
            <SortableHeader
              column="updatedAt"
              label="Updated"
              onSortChange={onSortChange}
              sortState={sortState}
            />
            <th className={styles.actionCell} scope="col">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => <UserSkeletonRow key={index} />)
            : users.map((user) => {
                const isSelected = selectedSet.has(user.userPublicId);

                return (
                  <tr
                    className={isSelected ? styles.selectedRow : undefined}
                    key={user.userPublicId}
                  >
                    <td className={styles.selectionCell}>
                      <TableCheckbox
                        ariaLabel={`Select ${user.emailLabel}`}
                        checked={isSelected}
                        onChange={(checked) => onSelectionChange(user.userPublicId, checked)}
                      />
                    </td>
                    <td>
                      <p
                        className={`${styles.userName} ${styles.truncatedValue}`}
                        title={user.displayName}
                      >
                        {user.displayName}
                      </p>
                      <div className={styles.userMeta}>
                        <span className={styles.truncatedValue} title={user.emailLabel}>
                          {user.emailLabel}
                        </span>
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
                        <span
                          className={`${styles.truncatedValue} ${styles.publicIdValue}`}
                          title={user.userPublicId}
                        >
                          {user.userPublicId}
                        </span>
                      </div>
                    </td>

                    <td className={styles.roleCell}>
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

                    <td className={styles.actionCell}>
                      <UserRowActions user={user} />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

interface SortableHeaderProps {
  column: UserSortColumn;
  label: string;
  sortState: UserSortState;
  onSortChange: (column: UserSortColumn) => void;
}

function SortableHeader({ column, label, sortState, onSortChange }: SortableHeaderProps) {
  const isActive = sortState.column === column;
  const directionLabel = isActive
    ? sortState.direction === 'asc'
      ? 'ascending'
      : 'descending'
    : 'none';

  return (
    <th aria-sort={directionLabel} className={styles.dateHeader} scope="col">
      <button className={styles.sortButton} onClick={() => onSortChange(column)} type="button">
        <span>{label}</span>
        <span aria-hidden="true" className={styles.sortIndicator}>
          {isActive ? (sortState.direction === 'asc' ? '↑' : '↓') : '↕'}
        </span>
      </button>
    </th>
  );
}

interface TableCheckboxProps {
  ariaLabel: string;
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
}

function TableCheckbox({
  ariaLabel,
  checked,
  disabled = false,
  indeterminate = false,
  onChange,
}: TableCheckboxProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      aria-label={ariaLabel}
      checked={checked}
      className={styles.tableCheckbox}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
      ref={ref}
      type="checkbox"
    />
  );
}

function UserRowActions({ user }: { user: UserListItem }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu
      align="right"
      items={[
        {
          key: 'open',
          label: 'Open profile',
          onSelect: () => window.location.assign(user.href),
        },
        {
          key: 'copy-email',
          label: 'Copy email',
          onSelect: () => void navigator.clipboard?.writeText(user.emailLabel),
        },
        {
          key: 'copy-public-id',
          label: 'Copy public ID',
          onSelect: () => void navigator.clipboard?.writeText(user.userPublicId),
        },
      ]}
      onOpenChange={setOpen}
      open={open}
      trigger={
        <Button
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`Actions for ${user.emailLabel}`}
          className={styles.rowActionButton}
          size="icon"
          variant="ghost"
        >
          <span aria-hidden="true" className={styles.kebabIcon}>
            ⋮
          </span>
        </Button>
      }
    />
  );
}

function UserSkeletonRow() {
  return (
    <tr aria-hidden="true">
      <td className={styles.selectionCell}>
        <Skeleton height="1rem" rounded width="1rem" />
      </td>
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
      <td className={styles.actionCell}>
        <Skeleton height="2rem" rounded width="2rem" />
      </td>
    </tr>
  );
}
