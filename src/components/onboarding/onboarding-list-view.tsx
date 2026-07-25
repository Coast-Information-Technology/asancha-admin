/*
 * src/components/onboarding/onboarding-list-view.tsx
 *
 * File purpose:
 * Renders the live Admin Onboarding list and filter experience.
 *
 * Role in the project:
 * This component coordinates the confirmed onboarding API query, URL-backed
 * filters, operational metrics, refresh state, errors, and the record table.
 *
 * Business relevance:
 * Onboarding is a staff review queue. Its list must make progress, verification
 * readiness, role context, and next record actions easy to scan.
 *
 * Security note:
 * The frontend only guides staff navigation. Backend authorization and data
 * visibility remain final, and nested sensitive onboarding values are redacted
 * before they reach the table or detail view.
 */

'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';

import {
  ONBOARDING_PROFILE_TYPE_LABELS,
  ONBOARDING_STATUS_LABELS,
  ONBOARDING_VERIFICATION_LABELS,
} from '../../features/onboarding/constants/onboarding.constants';
import { useOnboardingList } from '../../features/onboarding/hooks/use-onboarding-list';
import type {
  OnboardingProfileType,
  OnboardingQuery,
  OnboardingStatus,
  OnboardingVerificationStatus,
} from '../../features/onboarding/types/onboarding.types';
import { getApiErrorMessage } from '../../lib/api/api-error';
import { Alert } from '../ui/alert/alert';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Select } from '../ui/select/select';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../layout/page-shell/management-list-page';

import { OnboardingTable } from './onboarding-table';

import styles from './onboarding.module.css';

interface OnboardingFilters {
  email: string;
  profileType: OnboardingProfileType | '';
  status: OnboardingStatus | '';
  verificationStatus: OnboardingVerificationStatus | '';
}

const EMPTY_FILTERS: OnboardingFilters = {
  email: '',
  profileType: '',
  status: '',
  verificationStatus: '',
};

const PROFILE_OPTIONS = Object.entries(ONBOARDING_PROFILE_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const STATUS_OPTIONS = Object.entries(ONBOARDING_STATUS_LABELS)
  .filter(([value]) => value !== 'unknown')
  .map(([value, label]) => ({ value, label }));

const VERIFICATION_OPTIONS = Object.entries(ONBOARDING_VERIFICATION_LABELS)
  .filter(([value]) => value !== 'unknown')
  .map(([value, label]) => ({ value, label }));

function isProfileType(value: string): value is OnboardingProfileType {
  return Object.hasOwn(ONBOARDING_PROFILE_TYPE_LABELS, value);
}

function isStatus(value: string): value is OnboardingStatus {
  return Object.hasOwn(ONBOARDING_STATUS_LABELS, value);
}

function isVerificationStatus(value: string): value is OnboardingVerificationStatus {
  return Object.hasOwn(ONBOARDING_VERIFICATION_LABELS, value);
}

function readUrlFilters(): OnboardingFilters {
  if (typeof window === 'undefined') return EMPTY_FILTERS;

  const params = new URLSearchParams(window.location.search);
  const profileType = params.get('profileType') ?? '';
  const status = params.get('status') ?? '';
  const verificationStatus = params.get('verificationStatus') ?? '';

  return {
    email: params.get('email') ?? '',
    profileType: isProfileType(profileType) ? profileType : '',
    status: isStatus(status) ? status : '',
    verificationStatus: isVerificationStatus(verificationStatus) ? verificationStatus : '',
  };
}

function writeUrlFilters(filters: OnboardingFilters) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams();
  if (filters.email.trim()) params.set('email', filters.email.trim());
  if (filters.profileType) params.set('profileType', filters.profileType);
  if (filters.status) params.set('status', filters.status);
  if (filters.verificationStatus) params.set('verificationStatus', filters.verificationStatus);

  const query = params.toString();
  window.history.replaceState(
    null,
    '',
    query ? `${window.location.pathname}?${query}` : window.location.pathname,
  );
}

export function OnboardingListView() {
  const [draftFilters, setDraftFilters] = useState<OnboardingFilters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<OnboardingFilters>(EMPTY_FILTERS);

  useEffect(() => {
    const syncFromUrl = () => {
      const filters = readUrlFilters();
      setDraftFilters(filters);
      setAppliedFilters(filters);
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const query: OnboardingQuery = useMemo(
    () => ({
      email: appliedFilters.email || undefined,
      profileType: appliedFilters.profileType || undefined,
      status: appliedFilters.status || undefined,
      verificationStatus: appliedFilters.verificationStatus || undefined,
    }),
    [appliedFilters],
  );
  const onboardingQuery = useOnboardingList(query);
  const items = onboardingQuery.data?.items ?? [];
  const isLoading = onboardingQuery.isFetching;

  const metrics: readonly ManagementListMetric[] = [
    {
      label: 'Records returned',
      value: isLoading ? '-' : String(onboardingQuery.data?.total ?? 0),
      detail: 'Confirmed onboarding records from the backend',
      tone: 'info',
    },
    {
      label: 'Completed',
      value: isLoading ? '-' : String(items.filter((item) => item.status === 'completed').length),
      detail: 'Completed onboarding workflows',
      tone: 'success',
    },
    {
      label: 'In progress',
      value: isLoading ? '-' : String(items.filter((item) => item.status === 'in_progress').length),
      detail: 'Workflows still being completed',
      tone: 'warning',
    },
    {
      label: 'Pending verification',
      value: isLoading
        ? '-'
        : String(items.filter((item) => item.verificationStatus === 'pending').length),
      detail: 'Records awaiting verification review',
      tone: 'danger',
    },
  ];

  function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedFilters(draftFilters);
    writeUrlFilters(draftFilters);
  }

  function handleClear() {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    writeUrlFilters(EMPTY_FILTERS);
  }

  return (
    <ManagementListPage
      actions={
        <Button
          disabled={isLoading}
          loading={onboardingQuery.isRefetching}
          onClick={() => void onboardingQuery.refetch()}
          variant="secondary"
        >
          Refresh
        </Button>
      }
      dataSource="live"
      description="Review onboarding progress, submission state, verification readiness, and safe workflow data returned by the backend."
      metrics={metrics}
      title="Onboarding"
      totalLabel={isLoading ? 'onboarding records' : `${items.length} onboarding records`}
    >
      <form aria-label="Onboarding filters" className={styles.filterToolbar} onSubmit={handleApply}>
        <Input
          disabled={isLoading}
          label="User email"
          onChange={(event) =>
            setDraftFilters((current) => ({ ...current, email: event.target.value }))
          }
          placeholder="Filter by email"
          type="email"
          value={draftFilters.email}
        />
        <Select
          disabled={isLoading}
          label="Profile type"
          onChange={(event) =>
            setDraftFilters((current) => ({
              ...current,
              profileType: event.target.value as OnboardingProfileType | '',
            }))
          }
          options={PROFILE_OPTIONS}
          placeholder="All profile types"
          value={draftFilters.profileType}
        />
        <Select
          disabled={isLoading}
          label="Onboarding status"
          onChange={(event) =>
            setDraftFilters((current) => ({
              ...current,
              status: event.target.value as OnboardingStatus | '',
            }))
          }
          options={STATUS_OPTIONS}
          placeholder="All statuses"
          value={draftFilters.status}
        />
        <Select
          disabled={isLoading}
          label="Verification status"
          onChange={(event) =>
            setDraftFilters((current) => ({
              ...current,
              verificationStatus: event.target.value as OnboardingVerificationStatus | '',
            }))
          }
          options={VERIFICATION_OPTIONS}
          placeholder="All verification"
          value={draftFilters.verificationStatus}
        />
        <div className={styles.filterActions}>
          <Button disabled={isLoading} type="submit">
            Apply filters
          </Button>
          <Button disabled={isLoading} onClick={handleClear} type="button" variant="secondary">
            Clear filters
          </Button>
        </div>
      </form>

      {onboardingQuery.isError ? (
        <Alert title="Unable to load onboarding" tone="danger">
          {getApiErrorMessage(onboardingQuery.error)}
        </Alert>
      ) : (
        <OnboardingTable
          emptyDescription="No onboarding records match the selected profile, status, verification, or email filters."
          isLoading={isLoading}
          items={isLoading ? [] : items}
        />
      )}
    </ManagementListPage>
  );
}
