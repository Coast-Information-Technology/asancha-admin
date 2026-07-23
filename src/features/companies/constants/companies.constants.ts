// src/features/companies/constants/companies.constants.ts

/**
 * File purpose:
 * Defines constants, labels, routes, query keys, and safe fallback data for
 * Asancha Admin company management.
 *
 * Role in the project:
 * This file centralises company labels, company routes, API paths, query keys,
 * status labels, member role labels, and safe fallback responses.
 *
 * Key exports:
 * - COMPANIES_API_PATHS defines backend endpoint paths.
 * - COMPANIES_QUERY_KEYS defines TanStack Query keys.
 * - COMPANY_STATUS_LABELS defines readable company status labels.
 * - COMPANY_MEMBER_ROLE_LABELS defines readable member role labels.
 * - FALLBACK_COMPANIES_LIST_RESPONSE provides safe empty list fallback.
 *
 * Business relevance:
 * Company constants keep company management, company review, members,
 * documents, and verification screens consistent.
 *
 * Security note:
 * Fallback data must not contain private KYC notes, internal notes, restricted
 * document URLs, ObjectIds, secrets, webhook secrets, API key hashes, or
 * audit-sensitive values.
 */

import type {
  CompaniesListResponse,
  CompaniesQuery,
  CompanyActionType,
  CompanyMemberRole,
  CompanyMemberStatus,
  CompanyStatus,
  CompanyVerificationStatus,
} from '../types/companies.types';

export const COMPANIES_API_PATHS = {
  list: '/api/v1/admin/companies',
  detail: (companyPublicId: string) =>
    `/api/v1/admin/companies/${encodeURIComponent(companyPublicId)}`,
  action: (companyPublicId: string) =>
    `/api/v1/admin/companies/${encodeURIComponent(companyPublicId)}/actions`,
} as const;

export const COMPANIES_QUERY_KEYS = {
  all: ['companies'] as const,
  list: (query: CompaniesQuery) =>
    [
      'companies',
      'list',
      query.status ?? 'all',
      query.verificationStatus ?? 'all',
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
  detail: (companyPublicId: string) => ['companies', 'detail', companyPublicId] as const,
} as const;

export const COMPANIES_STALE_TIME_MS = 60_000;

export const COMPANY_STATUS_LABELS: Record<CompanyStatus, string> = {
  draft: 'Draft',
  pending: 'Pending',
  under_review: 'Under review',
  on_hold: 'On hold',
  approved: 'Approved',
  rejected: 'Rejected',
  suspended: 'Suspended',
};

export const COMPANY_VERIFICATION_STATUS_LABELS: Record<CompanyVerificationStatus, string> = {
  not_started: 'Not started',
  pending: 'Pending',
  in_review: 'In review',
  approved: 'Approved',
  rejected: 'Rejected',
  flagged: 'Flagged',
};

export const COMPANY_MEMBER_ROLE_LABELS: Record<CompanyMemberRole, string> = {
  owner: 'Owner',
  director: 'Director',
  manager: 'Manager',
  agent: 'Agent',
  sourcer: 'Sourcer',
  service_provider: 'Service provider',
  api_contact: 'API contact',
  member: 'Member',
};

export const COMPANY_MEMBER_STATUS_LABELS: Record<CompanyMemberStatus, string> = {
  invited: 'Invited',
  active: 'Active',
  removed: 'Removed',
  suspended: 'Suspended',
};

export const COMPANY_ACTION_LABELS: Record<CompanyActionType, string> = {
  approve: 'Approve',
  reject: 'Reject',
  place_on_hold: 'Place on hold',
  request_documents: 'Request documents',
  request_correction: 'Request correction',
  suspend: 'Suspend',
  restore: 'Restore',
};

export const FALLBACK_COMPANIES_LIST_RESPONSE: CompaniesListResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};
