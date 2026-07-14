// src/features/review-queues/api/review-queues.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin review queues.
 *
 * Role in the project:
 * This file centralises review-queue summary and item loading with safe fallback
 * data while live backend endpoints are connected.
 *
 * Key exports:
 * - getReviewQueues loads role-aware review queue summaries.
 * - getReviewQueueItems loads paginated review queue items.
 *
 * Business relevance:
 * Review queues are used by staff to prioritise operational review work across
 * profiles, companies, properties, listings, documents, verification reviews,
 * payments, deal reservations, bookings, API partners, and AI review.
 *
 * Security note:
 * Frontend fetch helpers do not authorize access. Backend authentication,
 * authorization, permission checks, redaction, resource visibility, and audit
 * logging remain final.
 */

import {
  FALLBACK_REVIEW_QUEUE_ITEMS,
  FALLBACK_REVIEW_QUEUE_SUMMARIES,
  REVIEW_QUEUES_API_PATHS,
} from '../constants/review-queues.constants';
import type {
  ReviewQueueItem,
  ReviewQueueItemsResponse,
  ReviewQueuePriority,
  ReviewQueueQuery,
  ReviewQueueStaffRole,
  ReviewQueueStatus,
  ReviewQueueSummary,
  ReviewQueueType,
} from '../types/review-queues.types';

type JsonRecord = Record<string, unknown>;

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

function isReviewQueueType(value: unknown): value is ReviewQueueType {
  return (
    value === 'profiles' ||
    value === 'companies' ||
    value === 'properties' ||
    value === 'listings' ||
    value === 'documents' ||
    value === 'verification_reviews' ||
    value === 'payments' ||
    value === 'deal_reservations' ||
    value === 'bookings' ||
    value === 'api_partners' ||
    value === 'ai'
  );
}

function isReviewQueueStatus(value: unknown): value is ReviewQueueStatus {
  return (
    value === 'pending' ||
    value === 'in_review' ||
    value === 'under_review' ||
    value === 'on_hold' ||
    value === 'correction_requested' ||
    value === 'replacement_required' ||
    value === 'submitted' ||
    value === 'submitted_for_review' ||
    value === 'payment_pending' ||
    value === 'flagged' ||
    value === 'approved' ||
    value === 'published' ||
    value === 'reserved' ||
    value === 'paid' ||
    value === 'completed' ||
    value === 'rejected' ||
    value === 'failed' ||
    value === 'expired' ||
    value === 'cancelled'
  );
}

function isReviewQueuePriority(value: unknown): value is ReviewQueuePriority {
  return value === 'low' || value === 'normal' || value === 'high' || value === 'urgent';
}

function isReviewQueueStaffRole(value: unknown): value is ReviewQueueStaffRole {
  return value === 'super_admin' || value === 'admin' || value === 'customer_care_rep';
}

function getAllowedRoles(value: unknown): readonly ReviewQueueStaffRole[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const roles = value.filter(isReviewQueueStaffRole);

  return roles.length === value.length ? roles : null;
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

function parseReviewQueueSummary(value: unknown): ReviewQueueSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const queueType = isReviewQueueType(value.queueType) ? value.queueType : null;
  const label = getString(value.label);
  const description = getString(value.description);
  const href = getString(value.href);
  const pendingCount = getNumber(value.pendingCount);
  const urgentCount = getNumber(value.urgentCount);
  const oldestItemAgeLabel = getString(value.oldestItemAgeLabel);
  const allowedRoles = getAllowedRoles(value.allowedRoles);

  if (
    !queueType ||
    !label ||
    !description ||
    !href ||
    pendingCount === null ||
    urgentCount === null ||
    !oldestItemAgeLabel ||
    !allowedRoles
  ) {
    return null;
  }

  return {
    queueType,
    label,
    description,
    href,
    pendingCount,
    urgentCount,
    oldestItemAgeLabel,
    allowedRoles,
  };
}

function parseReviewQueueItem(value: unknown): ReviewQueueItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const itemPublicId = getString(value.itemPublicId);
  const queueType = isReviewQueueType(value.queueType) ? value.queueType : null;
  const title = getString(value.title);
  const summary = getString(value.summary);
  const status = isReviewQueueStatus(value.status) ? value.status : null;
  const priority = isReviewQueuePriority(value.priority) ? value.priority : null;
  const ageLabel = getString(value.ageLabel);
  const submittedAtLabel = getString(value.submittedAtLabel);
  const href = getString(value.href);

  if (
    !itemPublicId ||
    !queueType ||
    !title ||
    !summary ||
    !status ||
    !priority ||
    !ageLabel ||
    !submittedAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    itemPublicId,
    queueType,
    title,
    summary,
    status,
    priority,
    ageLabel,
    submittedAtLabel,
    assignedStaffName: getString(value.assignedStaffName) ?? undefined,
    relatedUserLabel: getString(value.relatedUserLabel) ?? undefined,
    relatedResourceLabel: getString(value.relatedResourceLabel) ?? undefined,
    href,
  };
}

function parseReviewQueueSummaries(value: unknown): readonly ReviewQueueSummary[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const parsed = value.map(parseReviewQueueSummary);

  if (parsed.some((item) => item === null)) {
    return null;
  }

  return parsed.filter((item): item is ReviewQueueSummary => item !== null);
}

function parseReviewQueueItemsResponse(value: unknown): ReviewQueueItemsResponse | null {
  if (!isRecord(value)) {
    return null;
  }

  const rawItems = value.items;
  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);

  if (!Array.isArray(rawItems) || total === null || page === null || pageSize === null || hasNextPage === null) {
    return null;
  }

  const items = rawItems.map(parseReviewQueueItem);

  if (items.some((item) => item === null)) {
    return null;
  }

  return {
    items: items.filter((item): item is ReviewQueueItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function createItemsQuery(query: ReviewQueueQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.queueType) {
    params.set('queueType', query.queueType);
  }

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.priority) {
    params.set('priority', query.priority);
  }

  if (query.search) {
    params.set('search', query.search);
  }

  params.set('page', String(query.page ?? 1));
  params.set('pageSize', String(query.pageSize ?? 20));

  return params;
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

export async function getReviewQueues(
  role?: ReviewQueueStaffRole,
): Promise<readonly ReviewQueueSummary[]> {
  const query = new URLSearchParams();

  if (role) {
    query.set('role', role);
  }

  const payload = await getJsonFromApi(REVIEW_QUEUES_API_PATHS.summaries, query);
  const data = unwrapEnvelopeData(payload);
  const parsed = parseReviewQueueSummaries(data);

  const summaries = parsed ?? FALLBACK_REVIEW_QUEUE_SUMMARIES;

  if (!role) {
    return summaries;
  }

  return summaries.filter((queue) => queue.allowedRoles.includes(role));
}

export async function getReviewQueueItems(
  query: ReviewQueueQuery = {},
): Promise<ReviewQueueItemsResponse> {
  const payload = await getJsonFromApi(REVIEW_QUEUES_API_PATHS.items, createItemsQuery(query));
  const data = unwrapEnvelopeData(payload);
  const parsed = parseReviewQueueItemsResponse(data);

  if (parsed) {
    return parsed;
  }

  const queueType = query.queueType;
  const items = queueType
    ? FALLBACK_REVIEW_QUEUE_ITEMS.filter((item) => item.queueType === queueType)
    : FALLBACK_REVIEW_QUEUE_ITEMS;

  return {
    items,
    total: items.length,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 20,
    hasNextPage: false,
  };
}
