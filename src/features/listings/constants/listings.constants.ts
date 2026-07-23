// src/features/listings/constants/listings.constants.ts

/**
 * File purpose:
 * Defines constants, labels, routes, query keys, and safe fallback data for
 * Asancha Admin listing management.
 *
 * Role in the project:
 * This file centralises listing labels, listing routes, API paths, query keys,
 * status labels, action labels, and safe fallback responses.
 *
 * Key exports:
 * - LISTINGS_API_PATHS defines backend endpoint paths.
 * - LISTINGS_QUERY_KEYS defines TanStack Query keys.
 * - LISTING_STATUS_LABELS defines readable listing lifecycle labels.
 * - LISTING_ACTION_LABELS defines readable listing action labels.
 * - FALLBACK_LISTINGS_LIST_RESPONSE provides safe empty list fallback.
 *
 * Business relevance:
 * Listing constants keep review, visibility, activities, audit-aware views, and
 * lifecycle screens consistent across the admin/staff frontend.
 *
 * Security note:
 * Fallback data must not contain private KYC notes, internal notes, restricted
 * document URLs, ObjectIds, secrets, private audit payloads, or unauthorised
 * risk details.
 */

import type {
  ListingActionType,
  ListingReservationStatus,
  ListingReviewStatus,
  ListingStatus,
  ListingVisibilityStatus,
  ListingsListResponse,
  ListingsQuery,
} from '../types/listings.types';

export const LISTINGS_API_PATHS = {
  list: '/api/v1/admin/listings',
  detail: (listingPublicId: string) =>
    `/api/v1/admin/listings/${encodeURIComponent(listingPublicId)}`,
  action: (listingPublicId: string) =>
    `/api/v1/admin/listings/${encodeURIComponent(listingPublicId)}/actions`,
} as const;

export const LISTINGS_QUERY_KEYS = {
  all: ['listings'] as const,
  list: (query: ListingsQuery) =>
    [
      'listings',
      'list',
      query.status ?? 'all',
      query.reviewStatus ?? 'all',
      query.visibilityStatus ?? 'all',
      query.reservationStatus ?? 'all',
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
  detail: (listingPublicId: string) => ['listings', 'detail', listingPublicId] as const,
} as const;

export const LISTINGS_STALE_TIME_MS = 60_000;

export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under review',
  published: 'Published',
  reserved: 'Reserved',
  rejected: 'Rejected',
  archived: 'Archived',
  suspended: 'Suspended',
};

export const LISTING_REVIEW_STATUS_LABELS: Record<ListingReviewStatus, string> = {
  not_started: 'Not started',
  pending: 'Pending',
  in_review: 'In review',
  correction_requested: 'Correction requested',
  approved: 'Approved',
  rejected: 'Rejected',
  on_hold: 'On hold',
};

export const LISTING_VISIBILITY_STATUS_LABELS: Record<ListingVisibilityStatus, string> = {
  hidden: 'Hidden',
  private: 'Private',
  public: 'Public',
  restricted: 'Restricted',
  paused: 'Paused',
  archived: 'Archived',
};

export const LISTING_RESERVATION_STATUS_LABELS: Record<ListingReservationStatus, string> = {
  not_reserved: 'Not reserved',
  reservation_pending: 'Reservation pending',
  reserved: 'Reserved',
  expired: 'Expired',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

export const LISTING_ACTION_LABELS: Record<ListingActionType, string> = {
  approve: 'Approve',
  reject: 'Reject',
  place_under_review: 'Place under review',
  request_correction: 'Request correction',
  publish: 'Publish',
  unpublish: 'Unpublish',
  pause_visibility: 'Pause visibility',
  restore_visibility: 'Restore visibility',
  archive: 'Archive',
  restore: 'Restore',
  suspend: 'Suspend',
};

export const FALLBACK_LISTINGS_LIST_RESPONSE: ListingsListResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};
