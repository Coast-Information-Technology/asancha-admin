// src/features/review-queues/hooks/use-review-queues.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin review queue summaries.
 *
 * Role in the project:
 * This hook loads role-aware review queue summary data for dashboard and review
 * queue overview screens.
 *
 * Key exports:
 * - useReviewQueues returns queue summaries for the supplied staff role.
 *
 * Business relevance:
 * Review queues help authorised staff quickly locate pending operational work.
 *
 * Security note:
 * Frontend role filtering is not authorization. Backend queue visibility and
 * action permissions remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getReviewQueues } from '../api/review-queues.api';
import {
  REVIEW_QUEUES_QUERY_KEYS,
  REVIEW_QUEUES_STALE_TIME_MS,
} from '../constants/review-queues.constants';
import type { ReviewQueueStaffRole, ReviewQueueSummary } from '../types/review-queues.types';

export function useReviewQueues(role?: ReviewQueueStaffRole) {
  return useQuery<readonly ReviewQueueSummary[]>({
    queryKey: REVIEW_QUEUES_QUERY_KEYS.summaries(role),
    queryFn: () => getReviewQueues(role),
    staleTime: REVIEW_QUEUES_STALE_TIME_MS,
  });
}
