// src/features/review-queues/hooks/use-review-queue-items.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin review queue items.
 *
 * Role in the project:
 * This hook loads paginated and filtered review queue row data for queue detail
 * screens.
 *
 * Key exports:
 * - useReviewQueueItems returns queue item query state.
 *
 * Business relevance:
 * Queue items represent actionable operational work and should navigate to the
 * correct resource detail page rather than creating sidebar detail routes.
 *
 * Security note:
 * Frontend filtering and pagination are not authorization. Backend permissions,
 * redaction, record visibility, and audit logging remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getReviewQueueItems } from '../api/review-queues.api';
import {
  REVIEW_QUEUES_QUERY_KEYS,
  REVIEW_QUEUES_STALE_TIME_MS,
} from '../constants/review-queues.constants';
import type { ReviewQueueItemsResponse, ReviewQueueQuery } from '../types/review-queues.types';

export function useReviewQueueItems(query: ReviewQueueQuery = {}) {
  return useQuery<ReviewQueueItemsResponse>({
    queryKey: REVIEW_QUEUES_QUERY_KEYS.items(query),
    queryFn: () => getReviewQueueItems(query),
    staleTime: REVIEW_QUEUES_STALE_TIME_MS,
  });
}
