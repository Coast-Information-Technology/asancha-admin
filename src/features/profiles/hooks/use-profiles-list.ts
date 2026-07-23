// src/features/profiles/hooks/use-profiles-list.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin profile lists.
 *
 * Role in the project:
 * This hook loads paginated profile records with safe profile type, status,
 * verification, and search filters.
 *
 * Key exports:
 * - useProfilesList returns profile list query state.
 *
 * Business relevance:
 * Profile lists power role-specific profile review and support workflows.
 *
 * Security note:
 * Frontend filters are not authorization. Backend result visibility and
 * redaction remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getProfilesList } from '../api/profiles.api';
import { PROFILES_QUERY_KEYS, PROFILES_STALE_TIME_MS } from '../constants/profiles.constants';
import type { ProfilesListResponse, ProfilesQuery } from '../types/profiles.types';

export function useProfilesList(query: ProfilesQuery = {}) {
  return useQuery<ProfilesListResponse>({
    queryKey: PROFILES_QUERY_KEYS.list(query),
    queryFn: () => getProfilesList(query),
    staleTime: PROFILES_STALE_TIME_MS,
  });
}
