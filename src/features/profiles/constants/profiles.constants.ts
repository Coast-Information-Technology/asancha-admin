// src/features/profiles/constants/profiles.constants.ts

/**
 * File purpose:
 * Defines constants, labels, routes, query keys, and safe fallback data for
 * Asancha Admin profile management.
 *
 * Role in the project:
 * This file centralises profile labels, profile routes, API paths, query keys,
 * and safe fallback responses used before live backend integration is complete.
 *
 * Key exports:
 * - PROFILES_API_PATHS defines backend endpoint paths.
 * - PROFILES_QUERY_KEYS defines TanStack Query keys.
 * - PROFILE_TYPE_LABELS defines readable profile type labels.
 * - PROFILE_STATUS_LABELS defines readable status labels.
 * - FALLBACK_PROFILES_LIST_RESPONSE provides safe empty list fallback.
 *
 * Business relevance:
 * Profile constants keep role-specific profile screens consistent across
 * investor, owner, agent, sourcer, and service provider workflows.
 *
 * Security note:
 * Fallback data must not contain private KYC notes, internal notes, restricted
 * document URLs, ObjectIds, secrets, or audit-sensitive values.
 */

import type {
  ProfileActionType,
  ProfileStatus,
  ProfileType,
  ProfileVerificationStatus,
  ProfilesListResponse,
  ProfilesQuery,
} from '../types/profiles.types';

export const PROFILES_API_PATHS = {
  list: '/api/v1/admin/profiles',
  detail: (profilePublicId: string) => `/api/v1/admin/profiles/${encodeURIComponent(profilePublicId)}`,
  action: (profilePublicId: string) =>
    `/api/v1/admin/profiles/${encodeURIComponent(profilePublicId)}/actions`,
} as const;

export const PROFILES_QUERY_KEYS = {
  all: ['profiles'] as const,
  list: (query: ProfilesQuery) =>
    [
      'profiles',
      'list',
      query.profileType ?? 'all',
      query.status ?? 'all',
      query.verificationStatus ?? 'all',
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
  detail: (profilePublicId: string) => ['profiles', 'detail', profilePublicId] as const,
} as const;

export const PROFILES_STALE_TIME_MS = 60_000;

export const PROFILE_TYPE_LABELS: Record<ProfileType, string> = {
  investor: 'Investor',
  property_owner: 'Property owner',
  property_agent: 'Property agent',
  property_sourcer: 'Property sourcer',
  service_provider: 'Service provider',
};

export const PROFILE_TYPE_ROUTES: Record<ProfileType, string> = {
  investor: '/profiles/investors',
  property_owner: '/profiles/property-owners',
  property_agent: '/profiles/property-agents',
  property_sourcer: '/profiles/property-sourcers',
  service_provider: '/profiles/service-providers',
};

export const PROFILE_STATUS_LABELS: Record<ProfileStatus, string> = {
  draft: 'Draft',
  pending: 'Pending',
  under_review: 'Under review',
  correction_requested: 'Correction requested',
  on_hold: 'On hold',
  approved: 'Approved',
  rejected: 'Rejected',
  suspended: 'Suspended',
};

export const PROFILE_VERIFICATION_STATUS_LABELS: Record<ProfileVerificationStatus, string> = {
  not_started: 'Not started',
  pending: 'Pending',
  in_review: 'In review',
  approved: 'Approved',
  rejected: 'Rejected',
  flagged: 'Flagged',
};

export const PROFILE_ACTION_LABELS: Record<ProfileActionType, string> = {
  approve: 'Approve',
  reject: 'Reject',
  place_on_hold: 'Place on hold',
  request_correction: 'Request correction',
  suspend: 'Suspend',
  restore: 'Restore',
};

export const FALLBACK_PROFILES_LIST_RESPONSE: ProfilesListResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};
