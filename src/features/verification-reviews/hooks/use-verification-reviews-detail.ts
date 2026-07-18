// src/features/verification-reviews/hooks/use-verification-reviews-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin verification review detail pages.
 *
 * Role in the project:
 * This hook loads safe verification review detail data by public verification
 * review ID.
 *
 * Key exports:
 * - useVerificationReviewsDetail returns verification review detail query state.
 *
 * Business relevance:
 * Verification review detail supports review decisions, document context,
 * messages, correction workflow, risk labels, and permission-aware audit context.
 *
 * Security note:
 * This hook must use public IDs only. Backend permissions, document access,
 * risk redaction, review action access, internal note access, and audit access
 * remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getVerificationReviewDetail } from '../api/verification-reviews.api';
import {
  VERIFICATION_REVIEWS_QUERY_KEYS,
  VERIFICATION_REVIEWS_STALE_TIME_MS,
} from '../constants/verification-reviews.constants';
import type { VerificationReviewDetail } from '../types/verification-reviews.types';

export function useVerificationReviewsDetail(verificationReviewPublicId: string) {
  return useQuery<VerificationReviewDetail>({
    queryKey: VERIFICATION_REVIEWS_QUERY_KEYS.detail(verificationReviewPublicId),
    queryFn: () => getVerificationReviewDetail(verificationReviewPublicId),
    enabled: verificationReviewPublicId.trim().length > 0,
    staleTime: VERIFICATION_REVIEWS_STALE_TIME_MS,
  });
}
