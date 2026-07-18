// src/features/verification-reviews/constants/verification-reviews.constants.ts

/**
 * File purpose:
 * Defines constants, labels, routes, query keys, and safe fallback data for
 * Asancha Admin verification review management.
 *
 * Role in the project:
 * This file centralises verification review labels, API paths, query keys,
 * status labels, target labels, risk labels, priority labels, action labels,
 * and safe fallback responses.
 *
 * Key exports:
 * - VERIFICATION_REVIEWS_API_PATHS defines backend endpoint paths.
 * - VERIFICATION_REVIEWS_QUERY_KEYS defines TanStack Query keys.
 * - VERIFICATION_REVIEW_STATUS_LABELS defines readable status labels.
 * - VERIFICATION_REVIEW_ACTION_LABELS defines readable action labels.
 * - FALLBACK_VERIFICATION_REVIEWS_LIST_RESPONSE provides safe empty fallback.
 *
 * Business relevance:
 * Verification review constants keep review, documents, messages, status, and
 * audit-aware screens consistent across the admin/staff frontend.
 *
 * Security note:
 * Fallback data must not contain private KYC notes, internal notes, restricted
 * document URLs, ObjectIds, raw files, secrets, raw risk payloads, or audit
 * sensitive values.
 */

import type {
  VerificationReviewActionType,
  VerificationReviewPriority,
  VerificationReviewStatus,
  VerificationReviewTargetType,
  VerificationReviewsListResponse,
  VerificationReviewsQuery,
  VerificationRiskRating,
} from '../types/verification-reviews.types';

export const VERIFICATION_REVIEWS_API_PATHS = {
  list: '/api/v1/admin/verification-reviews',
  detail: (verificationReviewPublicId: string) =>
    `/api/v1/admin/verification-reviews/${encodeURIComponent(verificationReviewPublicId)}`,
  action: (verificationReviewPublicId: string) =>
    `/api/v1/admin/verification-reviews/${encodeURIComponent(verificationReviewPublicId)}/actions`,
} as const;

export const VERIFICATION_REVIEWS_QUERY_KEYS = {
  all: ['verification-reviews'] as const,
  list: (query: VerificationReviewsQuery) =>
    [
      'verification-reviews',
      'list',
      query.status ?? 'all',
      query.targetType ?? 'all',
      query.riskRating ?? 'all',
      query.priority ?? 'all',
      query.assignedToMe === undefined ? 'all' : String(query.assignedToMe),
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
  detail: (verificationReviewPublicId: string) =>
    ['verification-reviews', 'detail', verificationReviewPublicId] as const,
} as const;

export const VERIFICATION_REVIEWS_STALE_TIME_MS = 60_000;

export const VERIFICATION_REVIEW_STATUS_LABELS: Record<VerificationReviewStatus, string> = {
  pending: 'Pending',
  in_review: 'In review',
  correction_required: 'Correction required',
  approved: 'Approved',
  rejected: 'Rejected',
  on_hold: 'On hold',
  expired: 'Expired',
  archived: 'Archived',
};

export const VERIFICATION_REVIEW_TARGET_TYPE_LABELS: Record<
  VerificationReviewTargetType,
  string
> = {
  general_profile: 'General profile',
  investor_profile: 'Investor profile',
  property_owner_profile: 'Property owner profile',
  property_agent_profile: 'Property agent profile',
  property_sourcer_profile: 'Property sourcer profile',
  service_provider_profile: 'Service provider profile',
  api_partner_profile: 'API partner profile',
  company: 'Company',
  property: 'Property',
  document: 'Document',
  payment: 'Payment',
  api_client: 'API client',
};

export const VERIFICATION_RISK_RATING_LABELS: Record<VerificationRiskRating, string> = {
  unknown: 'Unknown',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const VERIFICATION_REVIEW_PRIORITY_LABELS: Record<VerificationReviewPriority, string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  critical: 'Critical',
};

export const VERIFICATION_REVIEW_ACTION_LABELS: Record<VerificationReviewActionType, string> = {
  mark_in_review: 'Mark in review',
  approve: 'Approve',
  reject: 'Reject',
  place_on_hold: 'Place on hold',
  request_correction: 'Request correction',
  request_documents: 'Request documents',
  update_risk: 'Update risk',
  archive: 'Archive',
  restore: 'Restore',
};

export const FALLBACK_VERIFICATION_REVIEWS_LIST_RESPONSE: VerificationReviewsListResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};
