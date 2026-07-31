// src/components/users/users-list-view.tsx

/**
 * File purpose:
 * Renders the live All Users management page for Asancha Admin.
 *
 * Role in the project:
 * This component coordinates the authenticated user list query, responsive
 * filter toolbar, local result filtering, loading states, and pagination before
 * the backend query and pagination contracts are finalised.
 *
 * Key exports:
 * - UsersListView renders the Users list route experience.
 * - UserPagination renders the local result navigation controls.
 *
 * Business relevance:
 * Staff need to find and review user accounts by email, phone, public ID, role,
 * account status, verification status, and creation date.
 *
 * Security note:
 * This component displays backend-safe public user data only. Filters and
 * pagination are presentation concerns and do not replace backend authorization
 * or visibility enforcement.
 */

'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';

import { useUsers } from '../../features/users/hooks/use-users';
import type { PublicUserRole, UserAccountStatus } from '../../features/users/types/users.types';
import { getApiErrorMessage } from '../../lib/api/api-error';
import { Alert } from '../ui/alert/alert';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Select } from '../ui/select/select';
import { UsersTable } from './users-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../layout/page-shell/management-list-page';

import styles from './users.module.css';

type VerificationFilter = 'verified' | 'not_verified' | '';

interface UserFilters {
  search: string;
  role: PublicUserRole | '';
  status: UserAccountStatus | '';
  verification: VerificationFilter;
  fromDate: string;
  toDate: string;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [10, 20, 30, 50] as const;

const EMPTY_FILTERS: UserFilters = {
  search: '',
  role: '',
  status: '',
  verification: '',
  fromDate: '',
  toDate: '',
};

const ROLE_OPTIONS: readonly { label: string; value: PublicUserRole }[] = [
  { label: 'Guest', value: 'guest' },
  { label: 'Investor', value: 'investor' },
  { label: 'Property owner', value: 'property_owner' },
  { label: 'Property agent', value: 'property_agent' },
  { label: 'Property sourcer', value: 'property_sourcer' },
  { label: 'Service provider', value: 'service_provider' },
  { label: 'API partner', value: 'api_partner' },
  { label: 'Admin', value: 'admin' },
  { label: 'Customer care', value: 'customer_care_rep' },
  { label: 'Super admin', value: 'super_admin' },
];

const STATUS_OPTIONS: readonly { label: string; value: UserAccountStatus }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Disabled', value: 'disabled' },
];

const VERIFICATION_OPTIONS = [
  { label: 'Verified', value: 'verified' },
  { label: 'Not verified', value: 'not_verified' },
] as const;

function isPublicUserRole(value: string): value is PublicUserRole {
  return ROLE_OPTIONS.some((option) => option.value === value);
}

function isUserAccountStatus(value: string): value is UserAccountStatus {
  return STATUS_OPTIONS.some((option) => option.value === value);
}

function isVerificationFilter(value: string): value is Exclude<VerificationFilter, ''> {
  return VERIFICATION_OPTIONS.some((option) => option.value === value);
}

function readUrlState(): { filters: UserFilters; page: number; pageSize: number } {
  if (typeof window === 'undefined') {
    return { filters: EMPTY_FILTERS, page: 1, pageSize: DEFAULT_PAGE_SIZE };
  }

  const params = new URLSearchParams(window.location.search);
  const role = params.get('role') ?? '';
  const status = params.get('status') ?? '';
  const verification = params.get('verification') ?? '';
  const parsedPage = Number.parseInt(params.get('page') ?? '', 10);
  const parsedPageSize = Number.parseInt(params.get('pageSize') ?? '', 10);

  return {
    filters: {
      search: params.get('search') ?? '',
      role: isPublicUserRole(role) ? role : '',
      status: isUserAccountStatus(status) ? status : '',
      verification: isVerificationFilter(verification) ? verification : '',
      fromDate: params.get('fromDate') ?? '',
      toDate: params.get('toDate') ?? '',
    },
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    pageSize: PAGE_SIZE_OPTIONS.includes(parsedPageSize as (typeof PAGE_SIZE_OPTIONS)[number])
      ? parsedPageSize
      : DEFAULT_PAGE_SIZE,
  };
}

function writeUrlState(filters: UserFilters, page: number, pageSize: number) {
  if (typeof window === 'undefined') {
    return;
  }

  const params = new URLSearchParams();

  if (filters.search.trim()) params.set('search', filters.search.trim());
  if (filters.role) params.set('role', filters.role);
  if (filters.status) params.set('status', filters.status);
  if (filters.verification) params.set('verification', filters.verification);
  if (filters.fromDate) params.set('fromDate', filters.fromDate);
  if (filters.toDate) params.set('toDate', filters.toDate);
  if (page > 1) params.set('page', String(page));
  if (pageSize !== DEFAULT_PAGE_SIZE) params.set('pageSize', String(pageSize));

  const query = params.toString();
  window.history.replaceState(
    null,
    '',
    query ? `${window.location.pathname}?${query}` : window.location.pathname,
  );
}

function getCreatedDateKey(createdAt?: string) {
  return createdAt?.slice(0, 10) ?? '';
}

export function UsersListView() {
  const usersQuery = useUsers();
  const fetchedUsers = usersQuery.data?.items;
  const users = useMemo(() => fetchedUsers ?? [], [fetchedUsers]);
  const [draftFilters, setDraftFilters] = useState<UserFilters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<UserFilters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isTableTransitioning, setIsTableTransitioning] = useState(false);

  useEffect(() => {
    if (!isTableTransitioning) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsTableTransitioning(false), 220);

    return () => window.clearTimeout(timeoutId);
  }, [isTableTransitioning]);

  useEffect(() => {
    const syncFromUrl = () => {
      const urlState = readUrlState();
      setDraftFilters(urlState.filters);
      setAppliedFilters(urlState.filters);
      setPage(urlState.page);
      setPageSize(urlState.pageSize);
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);

    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = appliedFilters.search.trim().toLowerCase();

    return users.filter((user) => {
      const createdDate = getCreatedDateKey(user.createdAt);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [user.emailLabel, user.userPublicId, user.phoneLabel]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedSearch));
      const matchesRole = !appliedFilters.role || user.role === appliedFilters.role;
      const matchesStatus = !appliedFilters.status || user.status === appliedFilters.status;
      const matchesVerification =
        !appliedFilters.verification ||
        (appliedFilters.verification === 'verified' && user.isVerified) ||
        (appliedFilters.verification === 'not_verified' && !user.isVerified);
      const matchesFromDate = !appliedFilters.fromDate || createdDate >= appliedFilters.fromDate;
      const matchesToDate = !appliedFilters.toDate || createdDate <= appliedFilters.toDate;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesVerification &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [appliedFilters, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const isTableLoading = usersQuery.isFetching || isTableTransitioning;
  const visibleUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [currentPage, filteredUsers, pageSize]);

  const metrics: readonly ManagementListMetric[] = [
    {
      label: 'All users',
      value: String(users.length),
      detail: 'Records returned by the backend',
      tone: 'info',
    },
    {
      label: 'Active',
      value: String(users.filter((user) => user.isActive && !user.isSuspended).length),
      detail: 'Accounts currently active',
      tone: 'success',
    },
    {
      label: 'Verified',
      value: String(users.filter((user) => user.isVerified).length),
      detail: 'Accounts with verified email status',
      tone: 'success',
    },
    {
      label: 'Suspended',
      value: String(users.filter((user) => user.isSuspended).length),
      detail: 'Accounts requiring attention',
      tone: 'danger',
    },
  ];

  function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsTableTransitioning(true);
    setAppliedFilters(draftFilters);
    setPage(1);
    writeUrlState(draftFilters, 1, pageSize);
  }

  function handleClear() {
    setIsTableTransitioning(true);
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(1);
    writeUrlState(EMPTY_FILTERS, 1, pageSize);
  }

  function handlePageChange(nextPage: number) {
    const safePage = Math.max(1, Math.min(nextPage, totalPages));
    setIsTableTransitioning(true);
    setPage(safePage);
    writeUrlState(appliedFilters, safePage, pageSize);
  }

  function handlePageSizeChange(nextPageSize: number) {
    setIsTableTransitioning(true);
    setPageSize(nextPageSize);
    setPage(1);
    writeUrlState(appliedFilters, 1, nextPageSize);
  }

  async function handleRefresh() {
    setIsTableTransitioning(true);

    try {
      await usersQuery.refetch();
    } finally {
      setIsTableTransitioning(false);
    }
  }

  return (
    <ManagementListPage
      dataSource="live"
      description="All user accounts returned by the backend, with safe role, verification, and account status details."
      metrics={metrics}
      title="Users"
      totalLabel={isTableLoading ? 'Loading users' : `${filteredUsers.length} users`}
    >
      <form aria-label="User filters" className={styles.filterToolbar} onSubmit={handleApply}>
        <div className={styles.filterFields}>
          <Input
            className={styles.searchInput}
            disabled={isTableLoading}
            label="Search users"
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, search: event.target.value }))
            }
            placeholder="Email, phone, or public ID"
            type="search"
            value={draftFilters.search}
          />
          <Select
            label="Role"
            disabled={isTableLoading}
            onChange={(event) =>
              setDraftFilters((current) => ({
                ...current,
                role: event.target.value as PublicUserRole | '',
              }))
            }
            options={ROLE_OPTIONS}
            placeholder="All roles"
            value={draftFilters.role}
          />
          <Select
            label="Account status"
            disabled={isTableLoading}
            onChange={(event) =>
              setDraftFilters((current) => ({
                ...current,
                status: event.target.value as UserAccountStatus | '',
              }))
            }
            options={STATUS_OPTIONS}
            placeholder="All statuses"
            value={draftFilters.status}
          />
          <Select
            label="Verification status"
            disabled={isTableLoading}
            onChange={(event) =>
              setDraftFilters((current) => ({
                ...current,
                verification: event.target.value as VerificationFilter,
              }))
            }
            options={VERIFICATION_OPTIONS}
            placeholder="All verification"
            value={draftFilters.verification}
          />
          <Input
            disabled={isTableLoading}
            label="From date"
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, fromDate: event.target.value }))
            }
            type="date"
            value={draftFilters.fromDate}
          />
          <Input
            disabled={isTableLoading}
            label="To date"
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, toDate: event.target.value }))
            }
            type="date"
            value={draftFilters.toDate}
          />
        </div>
        <div className={styles.filterActions}>
          <Button disabled={isTableLoading} loading={isTableTransitioning} type="submit">
            Apply filters
          </Button>
          <Button disabled={isTableLoading} onClick={handleClear} type="button" variant="secondary">
            Clear filters
          </Button>
          <Button
            disabled={isTableLoading}
            loading={usersQuery.isFetching}
            onClick={() => void handleRefresh()}
            type="button"
            variant="ghost"
          >
            Refresh
          </Button>
        </div>
      </form>

      {usersQuery.isError ? (
        <Alert title="Unable to load users" tone="danger">
          {getApiErrorMessage(usersQuery.error)}
        </Alert>
      ) : null}

      {!usersQuery.isError ? (
        <>
          <UsersTable
            emptyDescription="No users match the selected filters. Try clearing a filter or changing the date range."
            isLoading={isTableLoading}
            users={isTableLoading ? [] : visibleUsers}
          />
          <UserPagination
            currentPage={currentPage}
            disabled={isTableLoading}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            totalPages={totalPages}
            totalResults={filteredUsers.length}
          />
        </>
      ) : null}
    </ManagementListPage>
  );
}

interface UserPaginationProps {
  currentPage: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
  totalPages: number;
  totalResults: number;
}

function UserPagination({
  currentPage,
  disabled = false,
  onPageChange,
  onPageSizeChange,
  pageSize,
  totalPages,
  totalResults,
}: UserPaginationProps) {
  return (
    <nav aria-label="User table pagination" className={styles.pagination}>
      <div className={styles.paginationSummary}>
        <span className={styles.paginationTotal}>{totalResults} total results</span>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className={styles.pageSizeControl}>
          <span id="users-page-size-label">Items per page</span>
          <Select
            aria-labelledby="users-page-size-label"
            className={styles.pageSizeSelect}
            disabled={disabled}
            fullWidth={false}
            id="users-page-size"
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            options={PAGE_SIZE_OPTIONS.map((option) => ({
              label: String(option),
              value: String(option),
            }))}
            value={String(pageSize)}
          />
        </div>
      </div>

      <div className={styles.paginationControls}>
        <Button
          disabled={disabled || currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="sm"
          variant="secondary"
        >
          Previous
        </Button>
        <span aria-current="page" className={styles.pageIndicator}>
          {currentPage}
        </span>
        <Button
          disabled={disabled || currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          size="sm"
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
