// src/features/users/hooks/use-user-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin user detail pages.
 *
 * Role in the project:
 * This hook loads safe user detail data by public user ID.
 *
 * Key exports:
 * - useUserDetail returns user detail query state.
 *
 * Business relevance:
 * User detail centralises safe operational context across profiles, companies,
 * properties, listings, reservations, bookings, payments, documents,
 * verification, messages, notifications, and audit-aware views.
 *
 * Security note:
 * The hook must use public IDs only. Backend permissions, redaction, audit
 * access, and resource visibility remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserDetail } from '../api/users.api';
import type { UserDetail } from '../types/users.types';

export const USER_DETAIL_QUERY_KEYS = {
  detail: (userPublicId: string) => ['users', 'detail', userPublicId] as const,
} as const;

export function useUserDetail(userPublicId: string) {
  return useQuery<UserDetail>({
    queryKey: USER_DETAIL_QUERY_KEYS.detail(userPublicId),
    queryFn: () => getUserDetail(userPublicId),
    enabled: userPublicId.trim().length > 0,
    staleTime: 60_000,
  });
}
