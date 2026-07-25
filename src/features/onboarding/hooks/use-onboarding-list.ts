// src/features/onboarding/hooks/use-onboarding-list.ts

/**
 * File purpose:
 * Provides React Query state for the Admin Onboarding list endpoint.
 *
 * Role in the project:
 * This hook powers the staff onboarding queue and its confirmed profile-type
 * and email filters.
 *
 * Security note:
 * Query state does not replace backend authorization or resource visibility.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getOnboardingList } from '../api/onboarding.api';
import { ONBOARDING_QUERY_KEYS } from '../constants/onboarding.constants';
import type { OnboardingListResponse, OnboardingQuery } from '../types/onboarding.types';

export function useOnboardingList(query: OnboardingQuery = {}) {
  return useQuery<OnboardingListResponse>({
    queryKey: ONBOARDING_QUERY_KEYS.list(query),
    queryFn: () => getOnboardingList(query),
    staleTime: 60_000,
  });
}
