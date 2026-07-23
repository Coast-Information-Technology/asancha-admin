// src/features/verification-reviews/api/verification-reviews.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin verification review management.
 *
 * Role in the project:
 * This file centralises verification review list, verification review detail,
 * and verification review action requests with safe fallback responses for
 * early implementation.
 *
 * Key exports:
 * - getVerificationReviewsList loads paginated verification review records.
 * - getVerificationReviewDetail loads safe verification review detail data.
 * - submitVerificationReviewAction submits permission-aware review actions.
 *
 * Business relevance:
 * Verification review management supports KYC/AML readiness, profile approval,
 * company approval, property approval, API partner readiness, document review,
 * payment review context, and sensitive action unlocks.
 *
 * Security note:
 * API helpers do not authorize access. Backend permissions, allowed action
 * transitions, private KYC/risk handling, internal note handling, safe user
 * messaging, document visibility, redaction, and audit logging remain final.
 */

import {
  FALLBACK_VERIFICATION_REVIEWS_LIST_RESPONSE,
  VERIFICATION_REVIEWS_API_PATHS,
} from '../constants/verification-reviews.constants';
import type {
  VerificationReviewActionInput,
  VerificationReviewAuditSummary,
  VerificationReviewDetail,
  VerificationReviewDocumentSummary,
  VerificationReviewListItem,
  VerificationReviewMessageSummary,
  VerificationReviewMutationResponse,
  VerificationReviewPriority,
  VerificationReviewStatus,
  VerificationReviewTargetSummary,
  VerificationReviewTargetType,
  VerificationReviewsListResponse,
  VerificationReviewsQuery,
  VerificationRiskRating,
} from '../types/verification-reviews.types';

type JsonRecord = Record<string, unknown>;

function createFallbackVerificationReviewDetail(
  verificationReviewPublicId: string,
): VerificationReviewDetail {
  return {
    verificationReviewPublicId,
    title: 'Verification review detail pending',
    status: 'pending',
    riskRating: 'unknown',
    priority: 'normal',
    targetSummary: {
      targetPublicId: 'pending_target_public_id',
      targetType: 'general_profile',
      targetLabel: 'Verification target pending',
    },
    submittedAtLabel: 'Pending API connection',
    safeSummary: 'Live verification review details will appear after backend integration.',
    documentSummary: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      replacementRequired: 0,
    },
    messageSummary: {
      openThreads: 0,
      assignedThreads: 0,
      unreadThreads: 0,
    },
    auditSummary: {
      highImpactActionsCount: 0,
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

function isVerificationReviewStatus(value: unknown): value is VerificationReviewStatus {
  return (
    value === 'pending' ||
    value === 'in_review' ||
    value === 'correction_required' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'on_hold' ||
    value === 'expired' ||
    value === 'archived'
  );
}

function isVerificationReviewTargetType(value: unknown): value is VerificationReviewTargetType {
  return (
    value === 'general_profile' ||
    value === 'investor_profile' ||
    value === 'property_owner_profile' ||
    value === 'property_agent_profile' ||
    value === 'property_sourcer_profile' ||
    value === 'service_provider_profile' ||
    value === 'api_partner_profile' ||
    value === 'company' ||
    value === 'property' ||
    value === 'document' ||
    value === 'payment' ||
    value === 'api_client'
  );
}

function isVerificationRiskRating(value: unknown): value is VerificationRiskRating {
  return (
    value === 'unknown' ||
    value === 'low' ||
    value === 'medium' ||
    value === 'high' ||
    value === 'critical'
  );
}

function isVerificationReviewPriority(value: unknown): value is VerificationReviewPriority {
  return value === 'low' || value === 'normal' || value === 'high' || value === 'critical';
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

function createVerificationReviewsQuery(query: VerificationReviewsQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.targetType) {
    params.set('targetType', query.targetType);
  }

  if (query.riskRating) {
    params.set('riskRating', query.riskRating);
  }

  if (query.priority) {
    params.set('priority', query.priority);
  }

  if (query.assignedToMe !== undefined) {
    params.set('assignedToMe', String(query.assignedToMe));
  }

  if (query.search) {
    params.set('search', query.search);
  }

  params.set('page', String(query.page ?? 1));
  params.set('pageSize', String(query.pageSize ?? 20));

  return params;
}

function parseTargetSummary(value: unknown): VerificationReviewTargetSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const targetPublicId = getString(value.targetPublicId);
  const targetType = isVerificationReviewTargetType(value.targetType) ? value.targetType : null;
  const targetLabel = getString(value.targetLabel);

  if (!targetPublicId || !targetType || !targetLabel) {
    return null;
  }

  return {
    targetPublicId,
    targetType,
    targetLabel,
    relatedUserLabel: getString(value.relatedUserLabel) ?? undefined,
    relatedCompanyLabel: getString(value.relatedCompanyLabel) ?? undefined,
  };
}

function parseVerificationReviewListItem(value: unknown): VerificationReviewListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const verificationReviewPublicId = getString(value.verificationReviewPublicId);
  const title = getString(value.title);
  const targetSummary = parseTargetSummary(value.targetSummary);
  const status = isVerificationReviewStatus(value.status) ? value.status : null;
  const riskRating = isVerificationRiskRating(value.riskRating) ? value.riskRating : null;
  const priority = isVerificationReviewPriority(value.priority) ? value.priority : null;
  const submittedAtLabel = getString(value.submittedAtLabel);
  const href = getString(value.href);

  if (
    !verificationReviewPublicId ||
    !title ||
    !targetSummary ||
    !status ||
    !riskRating ||
    !priority ||
    !submittedAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    verificationReviewPublicId,
    title,
    targetSummary,
    status,
    riskRating,
    priority,
    submittedAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    assignedToLabel: getString(value.assignedToLabel) ?? undefined,
    href,
  };
}

function parseVerificationReviewsListResponse(
  value: unknown,
): VerificationReviewsListResponse | null {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parseVerificationReviewListItem);

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
    items: items.filter((item): item is VerificationReviewListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parseDocumentSummary(value: unknown): VerificationReviewDocumentSummary | null {
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

function parseMessageSummary(value: unknown): VerificationReviewMessageSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const openThreads = getNumber(value.openThreads);
  const assignedThreads = getNumber(value.assignedThreads);
  const unreadThreads = getNumber(value.unreadThreads);

  if (openThreads === null || assignedThreads === null || unreadThreads === null) {
    return null;
  }

  return {
    openThreads,
    assignedThreads,
    unreadThreads,
    latestMessageLabel: getString(value.latestMessageLabel) ?? undefined,
  };
}

function parseAuditSummary(value: unknown): VerificationReviewAuditSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const highImpactActionsCount = getNumber(value.highImpactActionsCount);

  if (highImpactActionsCount === null) {
    return null;
  }

  return {
    highImpactActionsCount,
    latestAuditLabel: getString(value.latestAuditLabel) ?? undefined,
  };
}

function parseVerificationReviewDetail(value: unknown): VerificationReviewDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const verificationReviewPublicId = getString(value.verificationReviewPublicId);
  const title = getString(value.title);
  const status = isVerificationReviewStatus(value.status) ? value.status : null;
  const riskRating = isVerificationRiskRating(value.riskRating) ? value.riskRating : null;
  const priority = isVerificationReviewPriority(value.priority) ? value.priority : null;
  const targetSummary = parseTargetSummary(value.targetSummary);
  const submittedAtLabel = getString(value.submittedAtLabel);
  const safeSummary = getString(value.safeSummary);
  const documentSummary = parseDocumentSummary(value.documentSummary);
  const messageSummary = parseMessageSummary(value.messageSummary);
  const auditSummary = parseAuditSummary(value.auditSummary);

  if (
    !verificationReviewPublicId ||
    !title ||
    !status ||
    !riskRating ||
    !priority ||
    !targetSummary ||
    !submittedAtLabel ||
    !safeSummary ||
    !documentSummary ||
    !messageSummary ||
    !auditSummary
  ) {
    return null;
  }

  return {
    verificationReviewPublicId,
    title,
    status,
    riskRating,
    priority,
    targetSummary,
    submittedAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    assignedToLabel: getString(value.assignedToLabel) ?? undefined,
    reviewedByLabel: getString(value.reviewedByLabel) ?? undefined,
    reviewedAtLabel: getString(value.reviewedAtLabel) ?? undefined,
    safeSummary,
    latestSafeUserMessage: getString(value.latestSafeUserMessage) ?? undefined,
    latestInternalNoteLabel: getString(value.latestInternalNoteLabel) ?? undefined,
    documentSummary,
    messageSummary,
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

export async function getVerificationReviewsList(
  query: VerificationReviewsQuery = {},
): Promise<VerificationReviewsListResponse> {
  const payload = await getJsonFromApi(
    VERIFICATION_REVIEWS_API_PATHS.list,
    createVerificationReviewsQuery(query),
  );
  const parsed = parseVerificationReviewsListResponse(unwrapEnvelopeData(payload));

  return (
    parsed ?? {
      ...FALLBACK_VERIFICATION_REVIEWS_LIST_RESPONSE,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
    }
  );
}

export async function getVerificationReviewDetail(
  verificationReviewPublicId: string,
): Promise<VerificationReviewDetail> {
  const payload = await getJsonFromApi(
    VERIFICATION_REVIEWS_API_PATHS.detail(verificationReviewPublicId),
  );
  const parsed = parseVerificationReviewDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackVerificationReviewDetail(verificationReviewPublicId);
}

export async function submitVerificationReviewAction(
  input: VerificationReviewActionInput,
): Promise<VerificationReviewMutationResponse> {
  const payload = await sendJsonToApi(
    VERIFICATION_REVIEWS_API_PATHS.action(input.verificationReviewPublicId),
    {
      action: input.action,
      reason: input.reason,
      safeUserMessage: input.safeUserMessage,
      internalNote: input.internalNote,
      riskRating: input.riskRating,
    },
  );

  const data = unwrapEnvelopeData(payload);

  if (!isRecord(data)) {
    return {
      verificationReviewPublicId: input.verificationReviewPublicId,
      message: 'Verification review action submitted.',
    };
  }

  return {
    verificationReviewPublicId:
      getString(data.verificationReviewPublicId) ?? input.verificationReviewPublicId,
    message: getString(data.message) ?? 'Verification review action submitted.',
  };
}
