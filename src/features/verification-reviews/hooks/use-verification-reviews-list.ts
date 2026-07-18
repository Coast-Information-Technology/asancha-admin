// src/features/verification-reviews/hooks/use-verification-reviews-list.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin verification review lists.
 *
 * Role in the project:
 * This hook loads paginated verification review records with safe status,
 * target type, risk rating, priority, assignment, and search filters.
 *
 * Key exports:
 * - useVerificationReviewsList returns verification review list query state.
 *
 * Business relevance:
 * Verification review lists power review queues, KYC/AML readiness checks,
 * document correction workflows, support-safe status views, and admin review
 * operations.
 *
 * Security note:
 * Frontend filters are not authorization. Backend result visibility, document
 * access, risk redaction, audit access, and review permissions remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getVerificationReviewsList } from '../api/verification-reviews.api';
import {
  VERIFICATION_REVIEWS_QUERY_KEYS,
  VERIFICATION_REVIEWS_STALE_TIME_MS,
} from '../constants/verification-reviews.constants';
import type {
  VerificationReviewsListResponse,
  VerificationReviewsQuery,
} from '../types/verification-reviews.types';

export function useVerificationReviewsList(query: VerificationReviewsQuery = {}) {
  return useQuery<VerificationReviewsListResponse>({
    queryKey: VERIFICATION_REVIEWS_QUERY_KEYS.list(query),
    queryFn: () => getVerificationReviewsList(query),
    staleTime: VERIFICATION_REVIEWS_STALE_TIME_MS,
  });
}
