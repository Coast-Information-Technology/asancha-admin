// src/components/profiles/profiles-table.tsx

/**
 * File purpose:
 * Renders the Asancha Admin profiles table and its loading and empty states.
 *
 * Role in the project:
 * This component displays normalized records returned by GET /admin/profiles
 * with selection, sorting, truncation, and contextual profile actions.
 *
 * Business relevance:
 * Staff can distinguish profile types, review completion and verification state,
 * compare timestamps, and open related workflows efficiently.
 *
 * Security note:
 * Profile rows use public IDs and safe backend fields only. Backend visibility,
 * authorization, redaction, and audit logging remain final.
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import { PROFILE_VERIFICATION_STATUS_LABELS } from '../../features/profiles/constants/profiles.constants';
import type {
  ProfileBulkAction,
  ProfileListItem,
  ProfileSortColumn,
  ProfileSortState,
  ProfileVerificationStatus,
} from '../../features/profiles/types/profiles.types';
import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { DropdownMenu } from '../ui/dropdown-menu/dropdown-menu';
import { Skeleton } from '../ui/skeleton/skeleton';

import { ProfileStatusBadge } from './profile-status-badge';
import { ProfileTypeBadge } from './profile-type-badge';

import styles from './profiles.module.css';

export interface ProfilesTableProps {
  profiles: readonly ProfileListItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  selectedProfileIds?: readonly string[];
  sortState?: ProfileSortState;
  onSortChange?: (column: ProfileSortColumn) => void;
  onSelectionChange?: (profilePublicId: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;
  onBulkAction?: (action: ProfileBulkAction) => void;
}

const DEFAULT_SORT_STATE: ProfileSortState = {
  column: 'createdAt',
  direction: 'desc',
};

function getVerificationTone(status: ProfileVerificationStatus) {
  if (status === 'approved') {
    return 'success';
  }

  if (status === 'rejected' || status === 'flagged') {
    return 'danger';
  }

  if (status === 'pending' || status === 'in_review') {
    return 'warning';
  }

  return 'neutral';
}

export function ProfilesTable({
  profiles,
  isLoading = false,
  emptyTitle = 'No profiles found',
  emptyDescription = 'No profile records match this view. Try another profile section or filter.',
  selectedProfileIds = [],
  sortState = DEFAULT_SORT_STATE,
  onSortChange = () => undefined,
  onSelectionChange = () => undefined,
  onSelectAll = () => undefined,
  onBulkAction,
}: ProfilesTableProps) {
  if (profiles.length === 0 && !isLoading) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  const selectedSet = new Set(selectedProfileIds);
  const selectedVisibleCount = profiles.filter((profile) =>
    selectedSet.has(profile.profilePublicId),
  ).length;
  const allVisibleSelected = profiles.length > 0 && selectedVisibleCount === profiles.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;
  const bulkActionsEnabled = Boolean(onBulkAction);

  return (
    <div aria-busy={isLoading} className={styles.tableWrap}>
      {!isLoading && bulkActionsEnabled && selectedProfileIds.length > 0 ? (
        <div className={styles.bulkToolbar}>
          <p className={styles.bulkToolbarInfo}>
            <strong>{selectedProfileIds.length}</strong> profile
            {selectedProfileIds.length === 1 ? '' : 's'} selected
          </p>
          <div className={styles.bulkToolbarActions}>
            <Button onClick={() => onBulkAction?.('approve')} size="sm" variant="secondary">
              Approve selected
            </Button>
            <Button onClick={() => onBulkAction?.('suspend')} size="sm" variant="danger">
              Suspend selected
            </Button>
          </div>
        </div>
      ) : null}

      <table className={styles.table}>
        <caption className="asancha-sr-only">
          {isLoading ? 'Loading profiles...' : 'Profile records'}
        </caption>
        <colgroup>
          <col className={styles.selectionColumn} />
          <col className={styles.profileColumn} />
          <col className={styles.typeColumn} />
          <col className={styles.statusColumn} />
          <col className={styles.verificationColumn} />
          <col className={styles.companyColumn} />
          <col className={styles.dateColumn} />
          <col className={styles.dateColumn} />
          <col className={styles.actionColumn} />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.selectionCell} scope="col">
              <TableCheckbox
                ariaLabel="Select all visible profiles"
                checked={allVisibleSelected}
                disabled={isLoading || profiles.length === 0}
                indeterminate={someVisibleSelected}
                onChange={onSelectAll}
              />
            </th>
            <th className={styles.profileHeader} scope="col">
              Profile
            </th>
            <th className={styles.typeHeader} scope="col">
              Type
            </th>
            <th className={styles.statusHeader} scope="col">
              Status
            </th>
            <th className={styles.verificationHeader} scope="col">
              Verification
            </th>
            <th className={styles.companyHeader} scope="col">
              Company
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
            ? Array.from({ length: 6 }, (_, index) => (
                <ProfileSkeletonRow key={`profile-skeleton-${index}`} />
              ))
            : profiles.map((profile) => {
                const isSelected = selectedSet.has(profile.profilePublicId);

                return (
                  <tr
                    className={isSelected ? styles.selectedRow : undefined}
                    key={profile.profilePublicId}
                  >
                    <td className={styles.selectionCell}>
                      <TableCheckbox
                        ariaLabel={`Select ${profile.emailLabel}`}
                        checked={isSelected}
                        onChange={(checked) => onSelectionChange(profile.profilePublicId, checked)}
                      />
                    </td>
                    <td>
                      <p
                        className={`${styles.profileTitle} ${styles.truncatedValue}`}
                        title={profile.displayName}
                      >
                        {profile.displayName}
                      </p>
                      <div className={styles.profileMeta}>
                        <span className={styles.truncatedValue} title={profile.emailLabel}>
                          {profile.emailLabel}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span
                          className={`${styles.truncatedValue} ${styles.publicIdValue}`}
                          title={profile.profilePublicId}
                        >
                          {profile.profilePublicId}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span
                          className={`${styles.truncatedValue} ${styles.publicIdValue}`}
                          title={profile.userPublicId}
                        >
                          User: {profile.userPublicId}
                        </span>
                      </div>
                    </td>

                    <td>
                      <ProfileTypeBadge profileType={profile.profileType} />
                    </td>

                    <td>
                      <ProfileStatusBadge status={profile.status} />
                    </td>

                    <td>
                      <Badge tone={getVerificationTone(profile.verificationStatus)}>
                        {PROFILE_VERIFICATION_STATUS_LABELS[profile.verificationStatus]}
                      </Badge>
                    </td>

                    <td>
                      <span
                        className={styles.truncatedValue}
                        title={profile.companyLabel ?? 'Not linked'}
                      >
                        {profile.companyLabel ?? 'Not linked'}
                      </span>
                    </td>

                    <td>{profile.createdAtLabel}</td>
                    <td>{profile.updatedAtLabel ?? 'Not available'}</td>

                    <td className={styles.actionCell}>
                      <ProfileRowActions profile={profile} />
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
  column: ProfileSortColumn;
  label: string;
  sortState: ProfileSortState;
  onSortChange: (column: ProfileSortColumn) => void;
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

function ProfileRowActions({ profile }: { profile: ProfileListItem }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu
      align="right"
      items={[
        {
          key: 'open',
          label: 'Open profile',
          onSelect: () => window.location.assign(profile.href),
        },
        {
          key: 'copy-profile-id',
          label: 'Copy profile ID',
          onSelect: () => void navigator.clipboard?.writeText(profile.profilePublicId),
        },
        {
          key: 'copy-user-id',
          label: 'Copy user ID',
          onSelect: () => void navigator.clipboard?.writeText(profile.userPublicId),
        },
      ]}
      onOpenChange={setOpen}
      open={open}
      trigger={
        <Button
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`Actions for ${profile.emailLabel}`}
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

function ProfileSkeletonRow() {
  return (
    <tr aria-hidden="true">
      <td className={styles.selectionCell}>
        <Skeleton height="1rem" rounded width="1rem" />
      </td>
      <td>
        <div className={styles.skeletonStack}>
          <Skeleton height="0.9rem" width="9rem" />
          <Skeleton height="0.7rem" width="15rem" />
        </div>
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="6rem" />
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="5rem" />
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="6rem" />
      </td>
      <td>
        <Skeleton height="0.8rem" width="5rem" />
      </td>
      <td>
        <Skeleton height="0.8rem" width="7rem" />
      </td>
      <td>
        <Skeleton height="0.8rem" width="7rem" />
      </td>
      <td className={styles.actionCell}>
        <Skeleton height="2rem" rounded width="2rem" />
      </td>
    </tr>
  );
}
