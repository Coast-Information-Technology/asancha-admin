// src/features/dashboard/hooks/use-review-queue-summary.ts

/**
 * File purpose:
 * Provides a React Query hook for role-aware review queue summaries.
 *
 * Role in the project:
 * This hook loads review queue count summaries used by dashboards and queue
 * overview screens.
 *
 * Key exports:
 * - useReviewQueueSummary returns role-filtered review queue summaries.
 *
 * Business relevance:
 * Review queues are the primary operational entry point for profiles,
 * companies, properties, listings, documents, verification reviews, payments,
 * deal reservations, bookings, API partners, and AI review.
 *
 * Security note:
 * Frontend filtering is not authorization. Backend permissions must still
 * enforce role access and data visibility.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getReviewQueueSummary } from '../api/dashboard.api';
import {
  DASHBOARD_QUERY_KEYS,
  DASHBOARD_STALE_TIME_MS,
} from '../constants/dashboard.constants';
import type { DashboardStaffRole, ReviewQueueSummaryItem } from '../types/dashboard.types';

export function useReviewQueueSummary(role: DashboardStaffRole) {
  return useQuery<readonly ReviewQueueSummaryItem[]>({
    queryKey: DASHBOARD_QUERY_KEYS.reviewQueueSummary(role),
    queryFn: () => getReviewQueueSummary(role),
    staleTime: DASHBOARD_STALE_TIME_MS,
  });
}
