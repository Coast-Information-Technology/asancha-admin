// src/features/listings/hooks/use-listings-list.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin listing lists.
 *
 * Role in the project:
 * This hook loads paginated listing records with safe lifecycle status, review,
 * visibility, reservation, and search filters.
 *
 * Key exports:
 * - useListingsList returns listing list query state.
 *
 * Business relevance:
 * Listing lists power listing review, publication, visibility, reservation
 * readiness, and operational support workflows.
 *
 * Security note:
 * Frontend filters are not authorization. Backend result visibility, lifecycle
 * rules, audit visibility, and redaction remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getListingsList } from '../api/listings.api';
import {
  LISTINGS_QUERY_KEYS,
  LISTINGS_STALE_TIME_MS,
} from '../constants/listings.constants';
import type { ListingsListResponse, ListingsQuery } from '../types/listings.types';

export function useListingsList(query: ListingsQuery = {}) {
  return useQuery<ListingsListResponse>({
    queryKey: LISTINGS_QUERY_KEYS.list(query),
    queryFn: () => getListingsList(query),
    staleTime: LISTINGS_STALE_TIME_MS,
  });
}
