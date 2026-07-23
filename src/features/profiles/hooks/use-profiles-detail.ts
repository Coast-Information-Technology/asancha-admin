// src/features/profiles/hooks/use-profiles-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin profile detail pages.
 *
 * Role in the project:
 * This hook loads safe profile detail data by public profile ID.
 *
 * Key exports:
 * - useProfilesDetail returns profile detail query state.
 *
 * Business relevance:
 * Profile detail supports onboarding review, related user/company context,
 * verification status, and permission-aware review actions.
 *
 * Security note:
 * This hook must use public IDs only. Backend permissions, redaction, review
 * action access, and audit logging remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getProfileDetail } from '../api/profiles.api';
import { PROFILES_QUERY_KEYS, PROFILES_STALE_TIME_MS } from '../constants/profiles.constants';
import type { ProfileDetail } from '../types/profiles.types';

export function useProfilesDetail(profilePublicId: string) {
  return useQuery<ProfileDetail>({
    queryKey: PROFILES_QUERY_KEYS.detail(profilePublicId),
    queryFn: () => getProfileDetail(profilePublicId),
    enabled: profilePublicId.trim().length > 0,
    staleTime: PROFILES_STALE_TIME_MS,
  });
}
