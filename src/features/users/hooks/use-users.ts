// src/features/users/hooks/use-users.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin user lists.
 *
 * Role in the project:
 * This hook loads paginated users with safe role, status, verification, and
 * search filters.
 *
 * Key exports:
 * - useUsers returns user list query state.
 *
 * Business relevance:
 * User lists power admin lookup, public user views, suspended user views, and
 * support workflows.
 *
 * Security note:
 * Frontend filters are not authorization. Backend result visibility and
 * redaction remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../api/users.api';
import type { UserQuery, UsersResponse } from '../types/users.types';

export const USERS_QUERY_KEYS = {
  all: ['users'] as const,
  list: (query: UserQuery) =>
    [
      'users',
      'list',
      query.role ?? 'all',
      query.status ?? 'all',
      query.verificationStatus ?? 'all',
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
} as const;

export function useUsers(query: UserQuery = {}) {
  return useQuery<UsersResponse>({
    queryKey: USERS_QUERY_KEYS.list(query),
    queryFn: () => getUsers(),
    staleTime: 60_000,
  });
}
