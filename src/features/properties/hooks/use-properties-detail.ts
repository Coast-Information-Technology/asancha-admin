// src/features/properties/hooks/use-properties-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin property detail pages.
 *
 * Role in the project:
 * This hook loads safe property detail data by public property ID.
 *
 * Key exports:
 * - usePropertiesDetail returns property detail query state.
 *
 * Business relevance:
 * Property detail supports ownership/source context, document review, listing
 * readiness, activities, and permission-aware review actions.
 *
 * Security note:
 * This hook must use public IDs only. Backend permissions, redaction, review
 * action access, and audit logging remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getPropertyDetail } from '../api/properties.api';
import { PROPERTIES_QUERY_KEYS, PROPERTIES_STALE_TIME_MS } from '../constants/properties.constants';
import type { PropertyDetail } from '../types/properties.types';

export function usePropertiesDetail(propertyPublicId: string) {
  return useQuery<PropertyDetail>({
    queryKey: PROPERTIES_QUERY_KEYS.detail(propertyPublicId),
    queryFn: () => getPropertyDetail(propertyPublicId),
    enabled: propertyPublicId.trim().length > 0,
    staleTime: PROPERTIES_STALE_TIME_MS,
  });
}
