// src/features/listings/hooks/use-listings-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin listing detail pages.
 *
 * Role in the project:
 * This hook loads safe listing detail data by public listing ID.
 *
 * Key exports:
 * - useListingsDetail returns listing detail query state.
 *
 * Business relevance:
 * Listing detail supports review, property connection, visibility controls,
 * activities, reservation status, and permission-aware audit context.
 *
 * Security note:
 * This hook must use public IDs only. Backend permissions, redaction, lifecycle
 * action access, audit visibility, and review action access remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getListingDetail } from '../api/listings.api';
import {
  LISTINGS_QUERY_KEYS,
  LISTINGS_STALE_TIME_MS,
} from '../constants/listings.constants';
import type { ListingDetail } from '../types/listings.types';

export function useListingsDetail(listingPublicId: string) {
  return useQuery<ListingDetail>({
    queryKey: LISTINGS_QUERY_KEYS.detail(listingPublicId),
    queryFn: () => getListingDetail(listingPublicId),
    enabled: listingPublicId.trim().length > 0,
    staleTime: LISTINGS_STALE_TIME_MS,
  });
}
