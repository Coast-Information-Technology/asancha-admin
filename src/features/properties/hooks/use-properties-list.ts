// src/features/properties/hooks/use-properties-list.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin property lists.
 *
 * Role in the project:
 * This hook loads paginated property records with safe status, document status,
 * listing status, source type, and search filters.
 *
 * Key exports:
 * - usePropertiesList returns property list query state.
 *
 * Business relevance:
 * Property lists power property review, document review, listing readiness, and
 * operational support workflows.
 *
 * Security note:
 * Frontend filters are not authorization. Backend result visibility and
 * redaction remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getPropertiesList } from '../api/properties.api';
import {
  PROPERTIES_QUERY_KEYS,
  PROPERTIES_STALE_TIME_MS,
} from '../constants/properties.constants';
import type { PropertiesListResponse, PropertiesQuery } from '../types/properties.types';

export function usePropertiesList(query: PropertiesQuery = {}) {
  return useQuery<PropertiesListResponse>({
    queryKey: PROPERTIES_QUERY_KEYS.list(query),
    queryFn: () => getPropertiesList(query),
    staleTime: PROPERTIES_STALE_TIME_MS,
  });
}
