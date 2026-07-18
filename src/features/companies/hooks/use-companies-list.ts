// src/features/companies/hooks/use-companies-list.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin company lists.
 *
 * Role in the project:
 * This hook loads paginated company records with safe status, verification, and
 * search filters.
 *
 * Key exports:
 * - useCompaniesList returns company list query state.
 *
 * Business relevance:
 * Company lists power company review, company support, members, documents, and
 * verification workflows.
 *
 * Security note:
 * Frontend filters are not authorization. Backend result visibility and
 * redaction remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getCompaniesList } from '../api/companies.api';
import {
  COMPANIES_QUERY_KEYS,
  COMPANIES_STALE_TIME_MS,
} from '../constants/companies.constants';
import type { CompaniesListResponse, CompaniesQuery } from '../types/companies.types';

export function useCompaniesList(query: CompaniesQuery = {}) {
  return useQuery<CompaniesListResponse>({
    queryKey: COMPANIES_QUERY_KEYS.list(query),
    queryFn: () => getCompaniesList(query),
    staleTime: COMPANIES_STALE_TIME_MS,
  });
}
