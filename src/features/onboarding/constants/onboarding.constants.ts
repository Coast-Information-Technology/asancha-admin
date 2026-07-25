// src/features/onboarding/constants/onboarding.constants.ts

/**
 * File purpose:
 * Defines Admin Onboarding API paths, labels, and query keys.
 *
 * Role in the project:
 * These constants keep onboarding routes and display language consistent
 * across list, detail, filter, and related-user links.
 *
 * Business relevance:
 * Onboarding is an internal review workspace, not a public onboarding flow.
 *
 * Security note:
 * Route constants use public IDs only and never contain private record keys.
 */

import type {
  OnboardingProfileType,
  OnboardingQuery,
  OnboardingStatus,
  OnboardingVerificationStatus,
} from '../types/onboarding.types';

export const ONBOARDING_API_PATHS = {
  list: '/admin/onboarding',
  detail: (onboardingPublicId: string) =>
    `/admin/onboarding/${encodeURIComponent(onboardingPublicId)}`,
} as const;

export const ONBOARDING_QUERY_KEYS = {
  all: ['admin-onboarding'] as const,
  list: (query: OnboardingQuery) =>
    [
      'admin-onboarding',
      'list',
      query.profileType ?? 'all',
      query.email ?? '',
      query.status ?? 'all',
      query.verificationStatus ?? 'all',
    ] as const,
  detail: (onboardingPublicId: string) =>
    ['admin-onboarding', 'detail', onboardingPublicId] as const,
} as const;

export const ONBOARDING_PROFILE_TYPE_LABELS: Record<OnboardingProfileType, string> = {
  investor: 'Investor',
  property_owner: 'Property owner',
  property_agent: 'Property agent',
  property_sourcer: 'Property sourcer',
  service_provider: 'Service provider',
};

export const ONBOARDING_STATUS_LABELS: Record<OnboardingStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  submitted: 'Submitted',
  completed: 'Completed',
  rejected: 'Rejected',
  on_hold: 'On hold',
  unknown: 'Unknown',
};

export const ONBOARDING_VERIFICATION_LABELS: Record<OnboardingVerificationStatus, string> = {
  not_started: 'Not started',
  pending: 'Pending',
  in_review: 'In review',
  approved: 'Approved',
  rejected: 'Rejected',
  flagged: 'Flagged',
  unknown: 'Unknown',
};
