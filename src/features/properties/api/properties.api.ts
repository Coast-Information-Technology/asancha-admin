// src/features/properties/api/properties.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin property management.
 *
 * Role in the project:
 * This file centralises property list, property detail, and property review
 * action requests with safe fallback responses for early implementation.
 *
 * Key exports:
 * - getPropertiesList loads paginated property records.
 * - getPropertyDetail loads safe property detail data by public ID.
 * - submitPropertyAction submits permission-aware property review actions.
 *
 * Business relevance:
 * Property management supports property review, document status, listing
 * readiness, deal reservations, user trust, and operational inventory quality.
 *
 * Security note:
 * API helpers do not authorize access. Backend permissions, allowed action
 * transitions, private note handling, safe user messaging, redaction, visibility,
 * and audit logging remain final.
 */

import {
  FALLBACK_PROPERTIES_LIST_RESPONSE,
  PROPERTIES_API_PATHS,
} from '../constants/properties.constants';
import type {
  PropertiesListResponse,
  PropertiesQuery,
  PropertyActionInput,
  PropertyActivitySummary,
  PropertyDetail,
  PropertyDocumentStatus,
  PropertyDocumentSummary,
  PropertyListItem,
  PropertyListingStatus,
  PropertyListingSummary,
  PropertyMutationResponse,
  PropertyRelatedSummary,
  PropertySourceType,
  PropertyStatus,
} from '../types/properties.types';

type JsonRecord = Record<string, unknown>;

function createFallbackPropertyDetail(propertyPublicId: string): PropertyDetail {
  return {
    propertyPublicId,
    title: 'Property detail pending',
    locationLabel: 'Location pending',
    sourceLabel: 'Source pending',
    sourceType: 'admin',
    status: 'submitted',
    documentStatus: 'not_started',
    listingStatus: 'not_listed',
    createdAtLabel: 'Pending API connection',
    summary: 'Live property details will appear after backend integration.',
    relatedSummary: {
      documentsCount: 0,
      listingsCount: 0,
      reservationsCount: 0,
      activitiesCount: 0,
    },
    documentSummary: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      replacementRequired: 0,
    },
    listingSummary: {
      total: 0,
      submitted: 0,
      underReview: 0,
      published: 0,
      reserved: 0,
      rejected: 0,
      archived: 0,
    },
    activitySummary: {
      total: 0,
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

function isPropertyStatus(value: unknown): value is PropertyStatus {
  return (
    value === 'draft' ||
    value === 'submitted' ||
    value === 'under_review' ||
    value === 'correction_requested' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'archived' ||
    value === 'suspended'
  );
}

function isPropertyDocumentStatus(value: unknown): value is PropertyDocumentStatus {
  return (
    value === 'not_started' ||
    value === 'pending' ||
    value === 'in_review' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'replacement_required' ||
    value === 'on_hold'
  );
}

function isPropertyListingStatus(value: unknown): value is PropertyListingStatus {
  return (
    value === 'not_listed' ||
    value === 'submitted' ||
    value === 'under_review' ||
    value === 'published' ||
    value === 'reserved' ||
    value === 'rejected' ||
    value === 'archived'
  );
}

function isPropertySourceType(value: unknown): value is PropertySourceType {
  return (
    value === 'property_owner' ||
    value === 'property_agent' ||
    value === 'property_sourcer' ||
    value === 'company' ||
    value === 'admin'
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

function createPropertiesQuery(query: PropertiesQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.documentStatus) {
    params.set('documentStatus', query.documentStatus);
  }

  if (query.listingStatus) {
    params.set('listingStatus', query.listingStatus);
  }

  if (query.sourceType) {
    params.set('sourceType', query.sourceType);
  }

  if (query.search) {
    params.set('search', query.search);
  }

  params.set('page', String(query.page ?? 1));
  params.set('pageSize', String(query.pageSize ?? 20));

  return params;
}

function parsePropertyListItem(value: unknown): PropertyListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const propertyPublicId = getString(value.propertyPublicId);
  const title = getString(value.title);
  const locationLabel = getString(value.locationLabel);
  const sourceLabel = getString(value.sourceLabel);
  const sourceType = isPropertySourceType(value.sourceType) ? value.sourceType : null;
  const status = isPropertyStatus(value.status) ? value.status : null;
  const documentStatus = isPropertyDocumentStatus(value.documentStatus)
    ? value.documentStatus
    : null;
  const listingStatus = isPropertyListingStatus(value.listingStatus) ? value.listingStatus : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const href = getString(value.href);

  if (
    !propertyPublicId ||
    !title ||
    !locationLabel ||
    !sourceLabel ||
    !sourceType ||
    !status ||
    !documentStatus ||
    !listingStatus ||
    !createdAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    propertyPublicId,
    title,
    locationLabel,
    sourceLabel,
    sourceType,
    status,
    documentStatus,
    listingStatus,
    companyLabel: getString(value.companyLabel) ?? undefined,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    href,
  };
}

function parsePropertiesListResponse(value: unknown): PropertiesListResponse | null {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parsePropertyListItem);

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
    items: items.filter((item): item is PropertyListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parseRelatedSummary(value: unknown): PropertyRelatedSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const documentsCount = getNumber(value.documentsCount);
  const listingsCount = getNumber(value.listingsCount);
  const reservationsCount = getNumber(value.reservationsCount);
  const activitiesCount = getNumber(value.activitiesCount);

  if (
    documentsCount === null ||
    listingsCount === null ||
    reservationsCount === null ||
    activitiesCount === null
  ) {
    return null;
  }

  return {
    relatedCompanyLabel: getString(value.relatedCompanyLabel) ?? undefined,
    relatedProfileLabel: getString(value.relatedProfileLabel) ?? undefined,
    relatedUserLabel: getString(value.relatedUserLabel) ?? undefined,
    documentsCount,
    listingsCount,
    reservationsCount,
    activitiesCount,
  };
}

function parseDocumentSummary(value: unknown): PropertyDocumentSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const total = getNumber(value.total);
  const pending = getNumber(value.pending);
  const approved = getNumber(value.approved);
  const rejected = getNumber(value.rejected);
  const replacementRequired = getNumber(value.replacementRequired);

  if (
    total === null ||
    pending === null ||
    approved === null ||
    rejected === null ||
    replacementRequired === null
  ) {
    return null;
  }

  return {
    total,
    pending,
    approved,
    rejected,
    replacementRequired,
  };
}

function parseListingSummary(value: unknown): PropertyListingSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const total = getNumber(value.total);
  const submitted = getNumber(value.submitted);
  const underReview = getNumber(value.underReview);
  const published = getNumber(value.published);
  const reserved = getNumber(value.reserved);
  const rejected = getNumber(value.rejected);
  const archived = getNumber(value.archived);

  if (
    total === null ||
    submitted === null ||
    underReview === null ||
    published === null ||
    reserved === null ||
    rejected === null ||
    archived === null
  ) {
    return null;
  }

  return {
    total,
    submitted,
    underReview,
    published,
    reserved,
    rejected,
    archived,
  };
}

function parseActivitySummary(value: unknown): PropertyActivitySummary | null {
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

function parsePropertyDetail(value: unknown): PropertyDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const propertyPublicId = getString(value.propertyPublicId);
  const title = getString(value.title);
  const locationLabel = getString(value.locationLabel);
  const sourceLabel = getString(value.sourceLabel);
  const sourceType = isPropertySourceType(value.sourceType) ? value.sourceType : null;
  const status = isPropertyStatus(value.status) ? value.status : null;
  const documentStatus = isPropertyDocumentStatus(value.documentStatus)
    ? value.documentStatus
    : null;
  const listingStatus = isPropertyListingStatus(value.listingStatus) ? value.listingStatus : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const summary = getString(value.summary);
  const relatedSummary = parseRelatedSummary(value.relatedSummary);
  const documentSummary = parseDocumentSummary(value.documentSummary);
  const listingSummary = parseListingSummary(value.listingSummary);
  const activitySummary = parseActivitySummary(value.activitySummary);

  if (
    !propertyPublicId ||
    !title ||
    !locationLabel ||
    !sourceLabel ||
    !sourceType ||
    !status ||
    !documentStatus ||
    !listingStatus ||
    !createdAtLabel ||
    !summary ||
    !relatedSummary ||
    !documentSummary ||
    !listingSummary ||
    !activitySummary
  ) {
    return null;
  }

  return {
    propertyPublicId,
    title,
    locationLabel,
    sourceLabel,
    sourceType,
    status,
    documentStatus,
    listingStatus,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    summary,
    relatedSummary,
    documentSummary,
    listingSummary,
    activitySummary,
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

export async function getPropertiesList(
  query: PropertiesQuery = {},
): Promise<PropertiesListResponse> {
  const payload = await getJsonFromApi(PROPERTIES_API_PATHS.list, createPropertiesQuery(query));
  const parsed = parsePropertiesListResponse(unwrapEnvelopeData(payload));

  return parsed ?? {
    ...FALLBACK_PROPERTIES_LIST_RESPONSE,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 20,
  };
}

export async function getPropertyDetail(propertyPublicId: string): Promise<PropertyDetail> {
  const payload = await getJsonFromApi(PROPERTIES_API_PATHS.detail(propertyPublicId));
  const parsed = parsePropertyDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackPropertyDetail(propertyPublicId);
}

export async function submitPropertyAction(
  input: PropertyActionInput,
): Promise<PropertyMutationResponse> {
  const payload = await sendJsonToApi(PROPERTIES_API_PATHS.action(input.propertyPublicId), {
    action: input.action,
    reason: input.reason,
    safeUserMessage: input.safeUserMessage,
    internalNote: input.internalNote,
  });

  const data = unwrapEnvelopeData(payload);

  if (!isRecord(data)) {
    return {
      propertyPublicId: input.propertyPublicId,
      message: 'Property action submitted.',
    };
  }

  return {
    propertyPublicId: getString(data.propertyPublicId) ?? input.propertyPublicId,
    message: getString(data.message) ?? 'Property action submitted.',
  };
}
