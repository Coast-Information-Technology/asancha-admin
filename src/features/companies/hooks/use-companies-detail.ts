// src/features/companies/hooks/use-companies-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin company detail pages.
 *
 * Role in the project:
 * This hook loads safe company detail data by public company ID.
 *
 * Key exports:
 * - useCompaniesDetail returns company detail query state.
 *
 * Business relevance:
 * Company detail supports onboarding review, member management, document review,
 * verification status, and permission-aware review actions.
 *
 * Security note:
 * This hook must use public IDs only. Backend permissions, redaction, review
 * action access, and audit logging remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getCompanyDetail } from '../api/companies.api';
import {
  COMPANIES_QUERY_KEYS,
  COMPANIES_STALE_TIME_MS,
} from '../constants/companies.constants';
import type { CompanyDetail } from '../types/companies.types';

export function useCompaniesDetail(companyPublicId: string) {
  return useQuery<CompanyDetail>({
    queryKey: COMPANIES_QUERY_KEYS.detail(companyPublicId),
    queryFn: () => getCompanyDetail(companyPublicId),
    enabled: companyPublicId.trim().length > 0,
    staleTime: COMPANIES_STALE_TIME_MS,
  });
}
