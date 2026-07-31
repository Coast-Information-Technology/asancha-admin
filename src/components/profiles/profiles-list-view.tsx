// src/components/profiles/profiles-list-view.tsx

/**
 * File purpose:
 * Coordinates the live Asancha Admin Profiles list experience.
 *
 * Role in the project:
 * This client view loads GET /admin/profiles, applies the optional role/status
 * view filters locally because the backend query contract is not confirmed,
 * and renders loading, error, empty, metric, and table states.
 *
 * Business relevance:
 * Profiles include both general user profiles and role-specific business
 * profiles. Staff need one record list with clear links into each profile.
 *
 * Security note:
 * Client filtering is presentation-only. Backend authorization, visibility,
 * redaction, and audit enforcement remain final.
 */

'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  PROFILE_STATUS_LABELS,
  PROFILE_TYPE_LABELS,
  PROFILE_TYPE_ROUTES,
} from '../../features/profiles/constants/profiles.constants';
import { useProfilesList } from '../../features/profiles/hooks/use-profiles-list';
import type {
  ProfileBulkAction,
  ProfileSortColumn,
  ProfileSortState,
  ProfileStatus,
  ProfileType,
} from '../../features/profiles/types/profiles.types';
import { getApiErrorMessage } from '../../lib/api/api-error';
import { Alert } from '../ui/alert/alert';
import { Button } from '../ui/button/button';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../layout/page-shell/management-list-page';

import { ProfilesTable } from './profiles-table';

interface ProfilesListViewProps {
  profileType?: ProfileType;
}

const ROLE_FILTERS: readonly { label: string; profileType: ProfileType; href: string }[] = [
  { label: 'All profiles', profileType: 'general', href: '/profiles' },
  { label: 'Investors', profileType: 'investor', href: PROFILE_TYPE_ROUTES.investor },
  {
    label: 'Property owners',
    profileType: 'property_owner',
    href: PROFILE_TYPE_ROUTES.property_owner,
  },
  {
    label: 'Property agents',
    profileType: 'property_agent',
    href: PROFILE_TYPE_ROUTES.property_agent,
  },
  {
    label: 'Property sourcers',
    profileType: 'property_sourcer',
    href: PROFILE_TYPE_ROUTES.property_sourcer,
  },
  {
    label: 'Service providers',
    profileType: 'service_provider',
    href: PROFILE_TYPE_ROUTES.service_provider,
  },
];

const STATUS_FILTERS: readonly { label: string; status: ProfileStatus }[] = [
  { label: 'Pending', status: 'pending' },
  { label: 'Approved', status: 'approved' },
  { label: 'Completed', status: 'completed' },
  { label: 'Correction required', status: 'correction_requested' },
];

function isProfileStatus(value: string): value is ProfileStatus {
  return Object.hasOwn(PROFILE_STATUS_LABELS, value);
}

function getStatusFromUrl(): ProfileStatus | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const status = new URLSearchParams(window.location.search).get('status');

  return status && isProfileStatus(status) ? status : undefined;
}

function getPageCopy(profileType?: ProfileType) {
  if (!profileType || profileType === 'general') {
    return {
      title: 'Profiles',
      description:
        'All general and role-specific profiles returned by the backend, with safe completion and verification context.',
      totalLabel: 'profiles',
    };
  }

  return {
    title: `${PROFILE_TYPE_LABELS[profileType]} profiles`,
    description: `Backend records for ${PROFILE_TYPE_LABELS[profileType].toLowerCase()} profiles with completion and verification context.`,
    totalLabel: `${PROFILE_TYPE_LABELS[profileType].toLowerCase()} profiles`,
  };
}

export function ProfilesListView({ profileType }: ProfilesListViewProps) {
  const [status, setStatus] = useState<ProfileStatus | undefined>();
  const [sortState, setSortState] = useState<ProfileSortState>({
    column: 'createdAt',
    direction: 'desc',
  });
  const [selectedProfileIds, setSelectedProfileIds] = useState<readonly string[]>([]);
  const [bulkActionMessage, setBulkActionMessage] = useState('');
  const profilesQuery = useProfilesList({ profileType, status });
  const pageCopy = getPageCopy(profileType);
  const profiles = useMemo(() => profilesQuery.data?.items ?? [], [profilesQuery.data?.items]);
  const isLoading = profilesQuery.isFetching;

  const sortedProfiles = useMemo(() => {
    return [...profiles].sort((left, right) => {
      const leftValue = Date.parse(
        sortState.column === 'createdAt' ? (left.createdAt ?? '') : (left.updatedAt ?? ''),
      );
      const rightValue = Date.parse(
        sortState.column === 'createdAt' ? (right.createdAt ?? '') : (right.updatedAt ?? ''),
      );

      if (leftValue === rightValue) return 0;
      if (!Number.isFinite(leftValue)) return 1;
      if (!Number.isFinite(rightValue)) return -1;

      return sortState.direction === 'asc' ? leftValue - rightValue : rightValue - leftValue;
    });
  }, [profiles, sortState]);

  useEffect(() => {
    const syncStatus = () => {
      setStatus(getStatusFromUrl());
      setSelectedProfileIds([]);
    };

    syncStatus();
    window.addEventListener('popstate', syncStatus);

    return () => window.removeEventListener('popstate', syncStatus);
  }, []);

  function handleSortChange(column: ProfileSortColumn) {
    setSortState((current) => ({
      column,
      direction: current.column === column && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  function handleSelectionChange(profilePublicId: string, checked: boolean) {
    setSelectedProfileIds((current) => {
      const next = new Set(current);

      if (checked) {
        next.add(profilePublicId);
      } else {
        next.delete(profilePublicId);
      }

      return [...next];
    });
  }

  function handleSelectAll(checked: boolean) {
    setSelectedProfileIds((current) => {
      const next = new Set(current);

      sortedProfiles.forEach((profile) => {
        if (checked) {
          next.add(profile.profilePublicId);
        } else {
          next.delete(profile.profilePublicId);
        }
      });

      return [...next];
    });
  }

  function handleBulkAction(action: ProfileBulkAction) {
    const actionLabel = action === 'approve' ? 'Approve' : 'Suspend';
    setBulkActionMessage(
      `${actionLabel} selected is ready in the interface, but a bulk profile-action contract is not connected yet.`,
    );
  }

  const metrics: readonly ManagementListMetric[] = [
    {
      label: 'Records returned',
      value: isLoading ? '—' : String(profilesQuery.data?.total ?? 0),
      detail: 'Profiles returned by the backend',
      tone: 'info',
    },
    {
      label: 'Approved or completed',
      value: isLoading
        ? '—'
        : String(
            profiles.filter((profile) => ['approved', 'completed'].includes(profile.status)).length,
          ),
      detail: 'Ready or completed profile records',
      tone: 'success',
    },
    {
      label: 'Pending review',
      value: isLoading
        ? '—'
        : String(
            profiles.filter((profile) =>
              ['pending', 'under_review', 'correction_requested', 'on_hold'].includes(
                profile.status,
              ),
            ).length,
          ),
      detail: 'Records requiring operational attention',
      tone: 'warning',
    },
    {
      label: 'Flagged verification',
      value: isLoading
        ? '—'
        : String(profiles.filter((profile) => profile.verificationStatus === 'flagged').length),
      detail: 'Verification records marked for attention',
      tone: 'danger',
    },
  ];

  const filters = [
    ...ROLE_FILTERS.filter(
      (filter) =>
        !profileType || filter.profileType === 'general' || filter.profileType !== profileType,
    ).map(({ label, href }) => ({ label, href })),
    ...STATUS_FILTERS.map(({ label: statusLabel, status: statusValue }) => ({
      label: statusLabel,
      href: profileType
        ? `${PROFILE_TYPE_ROUTES[profileType]}?status=${statusValue}`
        : `/profiles?status=${statusValue}`,
    })),
  ];

  return (
    <ManagementListPage
      actions={
        <Button
          disabled={isLoading}
          loading={profilesQuery.isRefetching}
          onClick={() => void profilesQuery.refetch()}
          variant="secondary"
        >
          Refresh
        </Button>
      }
      dataSource="live"
      description={pageCopy.description}
      filters={filters}
      metrics={metrics}
      title={pageCopy.title}
      totalLabel={
        isLoading ? 'profiles' : `${profilesQuery.data?.total ?? 0} ${pageCopy.totalLabel}`
      }
    >
      {profilesQuery.isError ? (
        <Alert title="Unable to load profiles" tone="danger">
          {getApiErrorMessage(profilesQuery.error)}
        </Alert>
      ) : (
        <>
          {bulkActionMessage ? (
            <Alert title="Bulk action not connected" tone="info">
              {bulkActionMessage}
            </Alert>
          ) : null}
          <ProfilesTable
            emptyDescription="No profile records match this view. Try another role or status filter."
            isLoading={isLoading}
            onBulkAction={handleBulkAction}
            onSelectAll={handleSelectAll}
            onSelectionChange={handleSelectionChange}
            onSortChange={handleSortChange}
            profiles={isLoading ? [] : sortedProfiles}
            selectedProfileIds={selectedProfileIds}
            sortState={sortState}
          />
        </>
      )}
    </ManagementListPage>
  );
}
