// src/features/listings/types/listings.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin listing management.
 *
 * Role in the project:
 * This file provides shared listing list, listing detail, visibility, review,
 * activity, audit summary, query, action, lifecycle status, and mutation
 * response types for the listings feature layer.
 *
 * Key exports:
 * - ListingStatus defines listing lifecycle states.
 * - ListingVisibilityStatus defines listing visibility states.
 * - ListingReviewStatus defines review workflow states.
 * - ListingListItem defines safe listing table rows.
 * - ListingDetail defines safe listing detail payloads.
 * - ListingsQuery defines list and filter inputs.
 * - ListingActionInput defines listing lifecycle/action payloads.
 *
 * Business relevance:
 * Listings are the marketplace-facing layer of approved properties. They connect
 * properties, investors, deal reservations, payments, messages, visibility
 * controls, lifecycle actions, and operational review queues.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Do not expose
 * MongoDB ObjectIds, private KYC notes, internal admin notes, restricted
 * document URLs, secrets, raw provider payloads, private audit payloads, or
 * unauthorised risk data.
 */

export type ListingStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'published'
  | 'reserved'
  | 'rejected'
  | 'archived'
  | 'suspended';

export type ListingReviewStatus =
  | 'not_started'
  | 'pending'
  | 'in_review'
  | 'correction_requested'
  | 'approved'
  | 'rejected'
  | 'on_hold';

export type ListingVisibilityStatus =
  | 'hidden'
  | 'private'
  | 'public'
  | 'restricted'
  | 'paused'
  | 'archived';

export type ListingReservationStatus =
  | 'not_reserved'
  | 'reservation_pending'
  | 'reserved'
  | 'expired'
  | 'cancelled'
  | 'completed';

export type ListingActionType =
  | 'approve'
  | 'reject'
  | 'place_under_review'
  | 'request_correction'
  | 'publish'
  | 'unpublish'
  | 'pause_visibility'
  | 'restore_visibility'
  | 'archive'
  | 'restore'
  | 'suspend';

export interface ListingListItem {
  listingPublicId: string;
  propertyPublicId: string;
  title: string;
  propertyTitleLabel: string;
  locationLabel: string;
  status: ListingStatus;
  reviewStatus: ListingReviewStatus;
  visibilityStatus: ListingVisibilityStatus;
  reservationStatus: ListingReservationStatus;
  priceLabel?: string;
  yieldLabel?: string;
  createdAtLabel: string;
  updatedAtLabel?: string;
  href: string;
}

export interface ListingPropertySummary {
  propertyPublicId: string;
  propertyTitleLabel: string;
  locationLabel: string;
  propertyStatusLabel: string;
}

export interface ListingReviewSummary {
  reviewStatus: ListingReviewStatus;
  reviewedByLabel?: string;
  reviewedAtLabel?: string;
  latestReviewNoteLabel?: string;
}

export interface ListingVisibilitySummary {
  visibilityStatus: ListingVisibilityStatus;
  isPubliclyVisible: boolean;
  visibleFromLabel?: string;
  visibleUntilLabel?: string;
}

export interface ListingActivitySummary {
  total: number;
  latestActivityLabel?: string;
}

export interface ListingAuditSummary {
  highRiskActionsCount: number;
  latestAuditLabel?: string;
}

export interface ListingDetail {
  listingPublicId: string;
  title: string;
  status: ListingStatus;
  reviewStatus: ListingReviewStatus;
  visibilityStatus: ListingVisibilityStatus;
  reservationStatus: ListingReservationStatus;
  priceLabel?: string;
  yieldLabel?: string;
  createdAtLabel: string;
  updatedAtLabel?: string;
  summary: string;
  propertySummary: ListingPropertySummary;
  reviewSummary: ListingReviewSummary;
  visibilitySummary: ListingVisibilitySummary;
  activitySummary: ListingActivitySummary;
  auditSummary: ListingAuditSummary;
}

export interface ListingsQuery {
  status?: ListingStatus;
  reviewStatus?: ListingReviewStatus;
  visibilityStatus?: ListingVisibilityStatus;
  reservationStatus?: ListingReservationStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface ListingsListResponse {
  items: readonly ListingListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface ListingActionInput {
  listingPublicId: string;
  action: ListingActionType;
  reason?: string;
  safeUserMessage?: string;
  internalNote?: string;
}

export interface ListingMutationResponse {
  listingPublicId: string;
  message: string;
}
