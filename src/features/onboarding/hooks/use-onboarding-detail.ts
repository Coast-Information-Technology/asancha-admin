// src/features/onboarding/hooks/use-onboarding-detail.ts

/**
 * File purpose:
 * Provides React Query state for an Admin Onboarding detail record.
 *
 * Role in the project:
 * This hook loads one onboarding record by its public ID for staff review.
 *
 * Security note:
 * Only public IDs are accepted by the frontend route. Backend permissions and
 * redaction remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getOnboardingDetail } from '../api/onboarding.api';
import { ONBOARDING_QUERY_KEYS } from '../constants/onboarding.constants';
import type { OnboardingDetail } from '../types/onboarding.types';

export function useOnboardingDetail(onboardingPublicId: string) {
  return useQuery<OnboardingDetail>({
    queryKey: ONBOARDING_QUERY_KEYS.detail(onboardingPublicId),
    queryFn: () => getOnboardingDetail(onboardingPublicId),
    enabled: onboardingPublicId.trim().length > 0,
    staleTime: 60_000,
  });
}
