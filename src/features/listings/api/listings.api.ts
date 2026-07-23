// src/features/listings/api/listings.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin listing management.
 *
 * Role in the project:
 * This file centralises listing list, listing detail, and listing lifecycle
 * action requests with safe fallback responses for early implementation.
 *
 * Key exports:
 * - getListingsList loads paginated listing records.
 * - getListingDetail loads safe listing detail data by public ID.
 * - submitListingAction submits permission-aware listing lifecycle actions.
 *
 * Business relevance:
 * Listing management supports listing review, publication, visibility,
 * reservation readiness, property exposure, marketplace quality, and platform
 * trust.
 *
 * Security note:
 * API helpers do not authorize access. Backend permissions, allowed action
 * transitions, private note handling, safe user messaging, redaction, audit
 * visibility, publication rules, and lifecycle enforcement remain final.
 */

import {
  FALLBACK_LISTINGS_LIST_RESPONSE,
  LISTINGS_API_PATHS,
} from '../constants/listings.constants';
import type {
  ListingActionInput,
  ListingActivitySummary,
  ListingAuditSummary,
  ListingDetail,
  ListingListItem,
  ListingMutationResponse,
  ListingPropertySummary,
  ListingReservationStatus,
  ListingReviewStatus,
  ListingReviewSummary,
  ListingStatus,
  ListingVisibilityStatus,
  ListingVisibilitySummary,
  ListingsListResponse,
  ListingsQuery,
} from '../types/listings.types';

type JsonRecord = Record<string, unknown>;

function createFallbackListingDetail(listingPublicId: string): ListingDetail {
  return {
    listingPublicId,
    title: 'Listing detail pending',
    status: 'submitted',
    reviewStatus: 'pending',
    visibilityStatus: 'hidden',
    reservationStatus: 'not_reserved',
    createdAtLabel: 'Pending API connection',
    summary: 'Live listing details will appear after backend integration.',
    propertySummary: {
      propertyPublicId: 'pending_property_public_id',
      propertyTitleLabel: 'Property connection pending',
      locationLabel: 'Location pending',
      propertyStatusLabel: 'Status pending',
    },
    reviewSummary: {
      reviewStatus: 'pending',
    },
    visibilitySummary: {
      visibilityStatus: 'hidden',
      isPubliclyVisible: false,
    },
    activitySummary: {
      total: 0,
    },
    auditSummary: {
      highRiskActionsCount: 0,
    },
  };
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function getNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function isListingStatus(value: unknown): value is ListingStatus {
  return (
    value === 'draft' ||
    value === 'submitted' ||
    value === 'under_review' ||
    value === 'published' ||
    value === 'reserved' ||
    value === 'rejected' ||
    value === 'archived' ||
    value === 'suspended'
  );
}

function isListingReviewStatus(value: unknown): value is ListingReviewStatus {
  return (
    value === 'not_started' ||
    value === 'pending' ||
    value === 'in_review' ||
    value === 'correction_requested' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'on_hold'
  );
}

function isListingVisibilityStatus(value: unknown): value is ListingVisibilityStatus {
  return (
    value === 'hidden' ||
    value === 'private' ||
    value === 'public' ||
    value === 'restricted' ||
    value === 'paused' ||
    value === 'archived'
  );
}

function isListingReservationStatus(value: unknown): value is ListingReservationStatus {
  return (
    value === 'not_reserved' ||
    value === 'reservation_pending' ||
    value === 'reserved' ||
    value === 'expired' ||
    value === 'cancelled' ||
    value === 'completed'
  );
}

function getApiBaseUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!value) {
    return null;
  }

  return value.replace(/\/+$/, '');
}

function createApiUrl(path: string, query?: URLSearchParams): string | null {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return null;
  }

  const safePath = path.startsWith('/') ? path : `/${path}`;
  const queryString = query?.toString();

  return queryString ? `${baseUrl}${safePath}?${queryString}` : `${baseUrl}${safePath}`;
}

function unwrapEnvelopeData(payload: unknown): unknown {
  if (!isRecord(payload)) {
    return payload;
  }

  if ('data' in payload) {
    return payload.data;
  }

  return payload;
}

function createListingsQuery(query: ListingsQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.reviewStatus) {
    params.set('reviewStatus', query.reviewStatus);
  }

  if (query.visibilityStatus) {
    params.set('visibilityStatus', query.visibilityStatus);
  }

  if (query.reservationStatus) {
    params.set('reservationStatus', query.reservationStatus);
  }

  if (query.search) {
    params.set('search', query.search);
  }

  params.set('page', String(query.page ?? 1));
  params.set('pageSize', String(query.pageSize ?? 20));

  return params;
}

function parseListingListItem(value: unknown): ListingListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const listingPublicId = getString(value.listingPublicId);
  const propertyPublicId = getString(value.propertyPublicId);
  const title = getString(value.title);
  const propertyTitleLabel = getString(value.propertyTitleLabel);
  const locationLabel = getString(value.locationLabel);
  const status = isListingStatus(value.status) ? value.status : null;
  const reviewStatus = isListingReviewStatus(value.reviewStatus) ? value.reviewStatus : null;
  const visibilityStatus = isListingVisibilityStatus(value.visibilityStatus)
    ? value.visibilityStatus
    : null;
  const reservationStatus = isListingReservationStatus(value.reservationStatus)
    ? value.reservationStatus
    : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const href = getString(value.href);

  if (
    !listingPublicId ||
    !propertyPublicId ||
    !title ||
    !propertyTitleLabel ||
    !locationLabel ||
    !status ||
    !reviewStatus ||
    !visibilityStatus ||
    !reservationStatus ||
    !createdAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    listingPublicId,
    propertyPublicId,
    title,
    propertyTitleLabel,
    locationLabel,
    status,
    reviewStatus,
    visibilityStatus,
    reservationStatus,
    priceLabel: getString(value.priceLabel) ?? undefined,
    yieldLabel: getString(value.yieldLabel) ?? undefined,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    href,
  };
}

function parseListingsListResponse(value: unknown): ListingsListResponse | null {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parseListingListItem);

  if (
    total === null ||
    page === null ||
    pageSize === null ||
    hasNextPage === null ||
    items.some((item) => item === null)
  ) {
    return null;
  }

  return {
    items: items.filter((item): item is ListingListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parsePropertySummary(value: unknown): ListingPropertySummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const propertyPublicId = getString(value.propertyPublicId);
  const propertyTitleLabel = getString(value.propertyTitleLabel);
  const locationLabel = getString(value.locationLabel);
  const propertyStatusLabel = getString(value.propertyStatusLabel);

  if (!propertyPublicId || !propertyTitleLabel || !locationLabel || !propertyStatusLabel) {
    return null;
  }

  return {
    propertyPublicId,
    propertyTitleLabel,
    locationLabel,
    propertyStatusLabel,
  };
}

function parseReviewSummary(value: unknown): ListingReviewSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const reviewStatus = isListingReviewStatus(value.reviewStatus) ? value.reviewStatus : null;

  if (!reviewStatus) {
    return null;
  }

  return {
    reviewStatus,
    reviewedByLabel: getString(value.reviewedByLabel) ?? undefined,
    reviewedAtLabel: getString(value.reviewedAtLabel) ?? undefined,
    latestReviewNoteLabel: getString(value.latestReviewNoteLabel) ?? undefined,
  };
}

function parseVisibilitySummary(value: unknown): ListingVisibilitySummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const visibilityStatus = isListingVisibilityStatus(value.visibilityStatus)
    ? value.visibilityStatus
    : null;
  const isPubliclyVisible = getBoolean(value.isPubliclyVisible);

  if (!visibilityStatus || isPubliclyVisible === null) {
    return null;
  }

  return {
    visibilityStatus,
    isPubliclyVisible,
    visibleFromLabel: getString(value.visibleFromLabel) ?? undefined,
    visibleUntilLabel: getString(value.visibleUntilLabel) ?? undefined,
  };
}

function parseActivitySummary(value: unknown): ListingActivitySummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const total = getNumber(value.total);

  if (total === null) {
    return null;
  }

  return {
    total,
    latestActivityLabel: getString(value.latestActivityLabel) ?? undefined,
  };
}

function parseAuditSummary(value: unknown): ListingAuditSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const highRiskActionsCount = getNumber(value.highRiskActionsCount);

  if (highRiskActionsCount === null) {
    return null;
  }

  return {
    highRiskActionsCount,
    latestAuditLabel: getString(value.latestAuditLabel) ?? undefined,
  };
}

function parseListingDetail(value: unknown): ListingDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const listingPublicId = getString(value.listingPublicId);
  const title = getString(value.title);
  const status = isListingStatus(value.status) ? value.status : null;
  const reviewStatus = isListingReviewStatus(value.reviewStatus) ? value.reviewStatus : null;
  const visibilityStatus = isListingVisibilityStatus(value.visibilityStatus)
    ? value.visibilityStatus
    : null;
  const reservationStatus = isListingReservationStatus(value.reservationStatus)
    ? value.reservationStatus
    : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const summary = getString(value.summary);
  const propertySummary = parsePropertySummary(value.propertySummary);
  const reviewSummary = parseReviewSummary(value.reviewSummary);
  const visibilitySummary = parseVisibilitySummary(value.visibilitySummary);
  const activitySummary = parseActivitySummary(value.activitySummary);
  const auditSummary = parseAuditSummary(value.auditSummary);

  if (
    !listingPublicId ||
    !title ||
    !status ||
    !reviewStatus ||
    !visibilityStatus ||
    !reservationStatus ||
    !createdAtLabel ||
    !summary ||
    !propertySummary ||
    !reviewSummary ||
    !visibilitySummary ||
    !activitySummary ||
    !auditSummary
  ) {
    return null;
  }

  return {
    listingPublicId,
    title,
    status,
    reviewStatus,
    visibilityStatus,
    reservationStatus,
    priceLabel: getString(value.priceLabel) ?? undefined,
    yieldLabel: getString(value.yieldLabel) ?? undefined,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    summary,
    propertySummary,
    reviewSummary,
    visibilitySummary,
    activitySummary,
    auditSummary,
  };
}

async function getJsonFromApi(path: string, query?: URLSearchParams): Promise<unknown> {
  const url = createApiUrl(path, query);

  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<unknown>;
}

async function sendJsonToApi(path: string, body: unknown): Promise<unknown> {
  const url = createApiUrl(path);

  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<unknown>;
}

export async function getListingsList(query: ListingsQuery = {}): Promise<ListingsListResponse> {
  const payload = await getJsonFromApi(LISTINGS_API_PATHS.list, createListingsQuery(query));
  const parsed = parseListingsListResponse(unwrapEnvelopeData(payload));

  return (
    parsed ?? {
      ...FALLBACK_LISTINGS_LIST_RESPONSE,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
    }
  );
}

export async function getListingDetail(listingPublicId: string): Promise<ListingDetail> {
  const payload = await getJsonFromApi(LISTINGS_API_PATHS.detail(listingPublicId));
  const parsed = parseListingDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackListingDetail(listingPublicId);
}

export async function submitListingAction(
  input: ListingActionInput,
): Promise<ListingMutationResponse> {
  const payload = await sendJsonToApi(LISTINGS_API_PATHS.action(input.listingPublicId), {
    action: input.action,
    reason: input.reason,
    safeUserMessage: input.safeUserMessage,
    internalNote: input.internalNote,
  });

  const data = unwrapEnvelopeData(payload);

  if (!isRecord(data)) {
    return {
      listingPublicId: input.listingPublicId,
      message: 'Listing action submitted.',
    };
  }

  return {
    listingPublicId: getString(data.listingPublicId) ?? input.listingPublicId,
    message: getString(data.message) ?? 'Listing action submitted.',
  };
}
