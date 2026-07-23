// src/features/documents/api/documents.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin document management.
 *
 * Role in the project:
 * This file centralises document list, document detail, and document review
 * action requests with safe fallback responses for early implementation.
 *
 * Key exports:
 * - getDocumentsList loads paginated document records.
 * - getDocumentDetail loads safe document detail data by public ID.
 * - submitDocumentAction submits permission-aware document review actions.
 *
 * Business relevance:
 * Document management supports onboarding, profile review, company review,
 * property review, verification workflows, API partner readiness, and platform
 * trust.
 *
 * Security note:
 * API helpers do not authorize access. Backend permissions, allowed action
 * transitions, private file access, internal note handling, safe user messaging,
 * redaction, visibility, and audit logging remain final.
 */

import {
  DOCUMENTS_API_PATHS,
  FALLBACK_DOCUMENTS_LIST_RESPONSE,
} from '../constants/documents.constants';
import type {
  DocumentActionInput,
  DocumentDetail,
  DocumentHistoryItem,
  DocumentListItem,
  DocumentMutationResponse,
  DocumentOwnerSummary,
  DocumentOwnerType,
  DocumentReviewRisk,
  DocumentReviewSummary,
  DocumentStatus,
  DocumentsListResponse,
  DocumentsQuery,
} from '../types/documents.types';

type JsonRecord = Record<string, unknown>;

function createFallbackDocumentDetail(documentPublicId: string): DocumentDetail {
  return {
    documentPublicId,
    documentLabel: 'Document detail pending',
    documentTypeLabel: 'Document type pending',
    status: 'pending',
    reviewRisk: 'none',
    ownerSummary: {
      ownerPublicId: 'pending_owner_public_id',
      ownerType: 'user',
      ownerLabel: 'Owner pending',
    },
    submittedAtLabel: 'Pending API connection',
    replacementRequired: false,
    summary: 'Live document details will appear after backend integration.',
    reviewSummary: {
      status: 'pending',
      reviewRisk: 'none',
    },
    history: [],
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

function isDocumentStatus(value: unknown): value is DocumentStatus {
  return (
    value === 'pending' ||
    value === 'in_review' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'on_hold' ||
    value === 'replacement_required' ||
    value === 'expired' ||
    value === 'archived'
  );
}

function isDocumentOwnerType(value: unknown): value is DocumentOwnerType {
  return (
    value === 'user' ||
    value === 'profile' ||
    value === 'company' ||
    value === 'property' ||
    value === 'listing' ||
    value === 'verification_review' ||
    value === 'api_partner'
  );
}

function isDocumentReviewRisk(value: unknown): value is DocumentReviewRisk {
  return (
    value === 'none' ||
    value === 'low' ||
    value === 'medium' ||
    value === 'high' ||
    value === 'flagged'
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

function createDocumentsQuery(query: DocumentsQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.ownerType) {
    params.set('ownerType', query.ownerType);
  }

  if (query.reviewRisk) {
    params.set('reviewRisk', query.reviewRisk);
  }

  if (query.replacementRequired !== undefined) {
    params.set('replacementRequired', String(query.replacementRequired));
  }

  if (query.search) {
    params.set('search', query.search);
  }

  params.set('page', String(query.page ?? 1));
  params.set('pageSize', String(query.pageSize ?? 20));

  return params;
}

function parseOwnerSummary(value: unknown): DocumentOwnerSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const ownerPublicId = getString(value.ownerPublicId);
  const ownerType = isDocumentOwnerType(value.ownerType) ? value.ownerType : null;
  const ownerLabel = getString(value.ownerLabel);

  if (!ownerPublicId || !ownerType || !ownerLabel) {
    return null;
  }

  return {
    ownerPublicId,
    ownerType,
    ownerLabel,
    relatedUserLabel: getString(value.relatedUserLabel) ?? undefined,
  };
}

function parseDocumentListItem(value: unknown): DocumentListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const documentPublicId = getString(value.documentPublicId);
  const documentLabel = getString(value.documentLabel);
  const documentTypeLabel = getString(value.documentTypeLabel);
  const ownerSummary = parseOwnerSummary(value.ownerSummary);
  const status = isDocumentStatus(value.status) ? value.status : null;
  const reviewRisk = isDocumentReviewRisk(value.reviewRisk) ? value.reviewRisk : null;
  const submittedAtLabel = getString(value.submittedAtLabel);
  const replacementRequired = getBoolean(value.replacementRequired);
  const href = getString(value.href);

  if (
    !documentPublicId ||
    !documentLabel ||
    !documentTypeLabel ||
    !ownerSummary ||
    !status ||
    !reviewRisk ||
    !submittedAtLabel ||
    replacementRequired === null ||
    !href
  ) {
    return null;
  }

  return {
    documentPublicId,
    documentLabel,
    documentTypeLabel,
    ownerSummary,
    status,
    reviewRisk,
    submittedAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    replacementRequired,
    href,
  };
}

function parseDocumentsListResponse(value: unknown): DocumentsListResponse | null {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parseDocumentListItem);

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
    items: items.filter((item): item is DocumentListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parseReviewSummary(value: unknown): DocumentReviewSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const status = isDocumentStatus(value.status) ? value.status : null;
  const reviewRisk = isDocumentReviewRisk(value.reviewRisk) ? value.reviewRisk : null;

  if (!status || !reviewRisk) {
    return null;
  }

  return {
    status,
    reviewRisk,
    reviewedByLabel: getString(value.reviewedByLabel) ?? undefined,
    reviewedAtLabel: getString(value.reviewedAtLabel) ?? undefined,
    latestSafeUserMessage: getString(value.latestSafeUserMessage) ?? undefined,
    latestInternalNoteLabel: getString(value.latestInternalNoteLabel) ?? undefined,
  };
}

function parseDocumentHistoryItem(value: unknown): DocumentHistoryItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const historyPublicId = getString(value.historyPublicId);
  const eventLabel = getString(value.eventLabel);
  const status = isDocumentStatus(value.status) ? value.status : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const safeSummary = getString(value.safeSummary);

  if (!historyPublicId || !eventLabel || !status || !createdAtLabel || !safeSummary) {
    return null;
  }

  return {
    historyPublicId,
    eventLabel,
    status,
    actorLabel: getString(value.actorLabel) ?? undefined,
    createdAtLabel,
    safeSummary,
  };
}

function parseDocumentDetail(value: unknown): DocumentDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const documentPublicId = getString(value.documentPublicId);
  const documentLabel = getString(value.documentLabel);
  const documentTypeLabel = getString(value.documentTypeLabel);
  const status = isDocumentStatus(value.status) ? value.status : null;
  const reviewRisk = isDocumentReviewRisk(value.reviewRisk) ? value.reviewRisk : null;
  const ownerSummary = parseOwnerSummary(value.ownerSummary);
  const submittedAtLabel = getString(value.submittedAtLabel);
  const replacementRequired = getBoolean(value.replacementRequired);
  const summary = getString(value.summary);
  const reviewSummary = parseReviewSummary(value.reviewSummary);
  const rawHistory = Array.isArray(value.history) ? value.history : [];
  const history = rawHistory.map(parseDocumentHistoryItem);

  if (
    !documentPublicId ||
    !documentLabel ||
    !documentTypeLabel ||
    !status ||
    !reviewRisk ||
    !ownerSummary ||
    !submittedAtLabel ||
    replacementRequired === null ||
    !summary ||
    !reviewSummary ||
    history.some((item) => item === null)
  ) {
    return null;
  }

  return {
    documentPublicId,
    documentLabel,
    documentTypeLabel,
    status,
    reviewRisk,
    ownerSummary,
    submittedAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    replacementRequired,
    summary,
    reviewSummary,
    history: history.filter((item): item is DocumentHistoryItem => item !== null),
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

export async function getDocumentsList(query: DocumentsQuery = {}): Promise<DocumentsListResponse> {
  const payload = await getJsonFromApi(DOCUMENTS_API_PATHS.list, createDocumentsQuery(query));
  const parsed = parseDocumentsListResponse(unwrapEnvelopeData(payload));

  return (
    parsed ?? {
      ...FALLBACK_DOCUMENTS_LIST_RESPONSE,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
    }
  );
}

export async function getDocumentDetail(documentPublicId: string): Promise<DocumentDetail> {
  const payload = await getJsonFromApi(DOCUMENTS_API_PATHS.detail(documentPublicId));
  const parsed = parseDocumentDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackDocumentDetail(documentPublicId);
}

export async function submitDocumentAction(
  input: DocumentActionInput,
): Promise<DocumentMutationResponse> {
  const payload = await sendJsonToApi(DOCUMENTS_API_PATHS.action(input.documentPublicId), {
    action: input.action,
    reason: input.reason,
    safeUserMessage: input.safeUserMessage,
    internalNote: input.internalNote,
  });

  const data = unwrapEnvelopeData(payload);

  if (!isRecord(data)) {
    return {
      documentPublicId: input.documentPublicId,
      message: 'Document action submitted.',
    };
  }

  return {
    documentPublicId: getString(data.documentPublicId) ?? input.documentPublicId,
    message: getString(data.message) ?? 'Document action submitted.',
  };
}
