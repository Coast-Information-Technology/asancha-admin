// src/features/staff/hooks/use-staff-list.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin staff lists.
 *
 * Role in the project:
 * This hook loads paginated staff records with safe role, status, and search
 * filters.
 *
 * Key exports:
 * - useStaffList returns staff list query state.
 *
 * Business relevance:
 * Staff lists support internal governance, account status review, and safe staff
 * management.
 *
 * Security note:
 * Frontend filters are not authorization. Backend visibility, role restrictions,
 * super_admin protection, and redaction remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getStaffList } from '../api/staff.api';
import type { StaffListResponse, StaffQuery } from '../types/staff.types';

export const STAFF_QUERY_KEYS = {
  all: ['staff'] as const,
  list: (query: StaffQuery) =>
    [
      'staff',
      'list',
      query.role ?? 'all',
      query.status ?? 'all',
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
} as const;

export function useStaffList(query: StaffQuery = {}) {
  return useQuery<StaffListResponse>({
    queryKey: STAFF_QUERY_KEYS.list(query),
    queryFn: () => getStaffList(query),
    staleTime: 60_000,
  });
}
