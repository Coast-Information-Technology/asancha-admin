// src/features/staff/hooks/use-staff-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin staff detail pages.
 *
 * Role in the project:
 * This hook loads safe staff detail data by public staff ID.
 *
 * Key exports:
 * - useStaffDetail returns staff detail query state.
 *
 * Business relevance:
 * Staff detail supports profile, security, permissions, and staff governance
 * workflows.
 *
 * Security note:
 * This hook must use public IDs only. Backend permissions, super_admin
 * visibility restrictions, redaction, and audit access remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getStaffDetail } from '../api/staff.api';
import type { StaffDetail } from '../types/staff.types';

export const STAFF_DETAIL_QUERY_KEYS = {
  detail: (staffPublicId: string) => ['staff', 'detail', staffPublicId] as const,
} as const;

export function useStaffDetail(staffPublicId: string) {
  return useQuery<StaffDetail>({
    queryKey: STAFF_DETAIL_QUERY_KEYS.detail(staffPublicId),
    queryFn: () => getStaffDetail(staffPublicId),
    enabled: staffPublicId.trim().length > 0,
    staleTime: 60_000,
  });
}
