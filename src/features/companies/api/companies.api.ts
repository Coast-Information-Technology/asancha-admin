// src/features/companies/api/companies.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin company management.
 *
 * Role in the project:
 * This file centralises company list, company detail, and company review action
 * requests with safe fallback responses for early implementation.
 *
 * Key exports:
 * - getCompaniesList loads paginated company records.
 * - getCompanyDetail loads safe company detail data by public ID.
 * - submitCompanyAction submits permission-aware company review actions.
 *
 * Business relevance:
 * Company management supports onboarding review, member relationships,
 * documents, verification, property/listing flows, service provider workflows,
 * API partner readiness, and operational trust.
 *
 * Security note:
 * API helpers do not authorize access. Backend permissions, allowed action
 * transitions, private note handling, safe user messaging, redaction, visibility,
 * and audit logging remain final.
 */

import {
  COMPANIES_API_PATHS,
  FALLBACK_COMPANIES_LIST_RESPONSE,
} from '../constants/companies.constants';
import type {
  CompaniesListResponse,
  CompaniesQuery,
  CompanyActionInput,
  CompanyDetail,
  CompanyDocumentSummary,
  CompanyListItem,
  CompanyMember,
  CompanyMemberRole,
  CompanyMemberStatus,
  CompanyMutationResponse,
  CompanyRelatedSummary,
  CompanyStatus,
  CompanyVerificationStatus,
} from '../types/companies.types';

type JsonRecord = Record<string, unknown>;

function createFallbackCompanyDetail(companyPublicId: string): CompanyDetail {
  return {
    companyPublicId,
    companyName: 'Company detail pending',
    companyTypeLabel: 'Company type pending',
    status: 'pending',
    verificationStatus: 'not_started',
    createdAtLabel: 'Pending API connection',
    summary: 'Live company details will appear after backend integration.',
    relatedSummary: {
      membersCount: 0,
      documentsCount: 0,
      propertiesCount: 0,
      listingsCount: 0,
      verificationReviewsCount: 0,
    },
    documentSummary: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      replacementRequired: 0,
    },
    members: [],
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

function isCompanyStatus(value: unknown): value is CompanyStatus {
  return (
    value === 'draft' ||
    value === 'pending' ||
    value === 'under_review' ||
    value === 'on_hold' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'suspended'
  );
}

function isCompanyVerificationStatus(value: unknown): value is CompanyVerificationStatus {
  return (
    value === 'not_started' ||
    value === 'pending' ||
    value === 'in_review' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'flagged'
  );
}

function isCompanyMemberRole(value: unknown): value is CompanyMemberRole {
  return (
    value === 'owner' ||
    value === 'director' ||
    value === 'manager' ||
    value === 'agent' ||
    value === 'sourcer' ||
    value === 'service_provider' ||
    value === 'api_contact' ||
    value === 'member'
  );
}

function isCompanyMemberStatus(value: unknown): value is CompanyMemberStatus {
  return value === 'invited' || value === 'active' || value === 'removed' || value === 'suspended';
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

function createCompaniesQuery(query: CompaniesQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.verificationStatus) {
    params.set('verificationStatus', query.verificationStatus);
  }

  if (query.search) {
    params.set('search', query.search);
  }

  params.set('page', String(query.page ?? 1));
  params.set('pageSize', String(query.pageSize ?? 20));

  return params;
}

function parseCompanyListItem(value: unknown): CompanyListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const companyPublicId = getString(value.companyPublicId);
  const companyName = getString(value.companyName);
  const companyTypeLabel = getString(value.companyTypeLabel);
  const status = isCompanyStatus(value.status) ? value.status : null;
  const verificationStatus = isCompanyVerificationStatus(value.verificationStatus)
    ? value.verificationStatus
    : null;
  const membersCount = getNumber(value.membersCount);
  const documentsCount = getNumber(value.documentsCount);
  const createdAtLabel = getString(value.createdAtLabel);
  const href = getString(value.href);

  if (
    !companyPublicId ||
    !companyName ||
    !companyTypeLabel ||
    !status ||
    !verificationStatus ||
    membersCount === null ||
    documentsCount === null ||
    !createdAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    companyPublicId,
    companyName,
    companyTypeLabel,
    primaryContactLabel: getString(value.primaryContactLabel) ?? undefined,
    status,
    verificationStatus,
    membersCount,
    documentsCount,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    href,
  };
}

function parseCompaniesListResponse(value: unknown): CompaniesListResponse | null {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parseCompanyListItem);

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
    items: items.filter((item): item is CompanyListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parseCompanyMember(value: unknown): CompanyMember | null {
  if (!isRecord(value)) {
    return null;
  }

  const memberPublicId = getString(value.memberPublicId);
  const userPublicId = getString(value.userPublicId);
  const displayName = getString(value.displayName);
  const emailLabel = getString(value.emailLabel);
  const role = isCompanyMemberRole(value.role) ? value.role : null;
  const status = isCompanyMemberStatus(value.status) ? value.status : null;

  if (!memberPublicId || !userPublicId || !displayName || !emailLabel || !role || !status) {
    return null;
  }

  return {
    memberPublicId,
    userPublicId,
    displayName,
    emailLabel,
    role,
    status,
    joinedAtLabel: getString(value.joinedAtLabel) ?? undefined,
  };
}

function parseRelatedSummary(value: unknown): CompanyRelatedSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const membersCount = getNumber(value.membersCount);
  const documentsCount = getNumber(value.documentsCount);
  const propertiesCount = getNumber(value.propertiesCount);
  const listingsCount = getNumber(value.listingsCount);
  const verificationReviewsCount = getNumber(value.verificationReviewsCount);

  if (
    membersCount === null ||
    documentsCount === null ||
    propertiesCount === null ||
    listingsCount === null ||
    verificationReviewsCount === null
  ) {
    return null;
  }

  return {
    membersCount,
    documentsCount,
    propertiesCount,
    listingsCount,
    verificationReviewsCount,
  };
}

function parseDocumentSummary(value: unknown): CompanyDocumentSummary | null {
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

function parseCompanyDetail(value: unknown): CompanyDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const companyPublicId = getString(value.companyPublicId);
  const companyName = getString(value.companyName);
  const companyTypeLabel = getString(value.companyTypeLabel);
  const status = isCompanyStatus(value.status) ? value.status : null;
  const verificationStatus = isCompanyVerificationStatus(value.verificationStatus)
    ? value.verificationStatus
    : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const summary = getString(value.summary);
  const relatedSummary = parseRelatedSummary(value.relatedSummary);
  const documentSummary = parseDocumentSummary(value.documentSummary);
  const rawMembers = Array.isArray(value.members) ? value.members : [];
  const members = rawMembers.map(parseCompanyMember);

  if (
    !companyPublicId ||
    !companyName ||
    !companyTypeLabel ||
    !status ||
    !verificationStatus ||
    !createdAtLabel ||
    !summary ||
    !relatedSummary ||
    !documentSummary ||
    members.some((member) => member === null)
  ) {
    return null;
  }

  return {
    companyPublicId,
    companyName,
    companyTypeLabel,
    status,
    verificationStatus,
    primaryContactLabel: getString(value.primaryContactLabel) ?? undefined,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    summary,
    relatedSummary,
    documentSummary,
    members: members.filter((member): member is CompanyMember => member !== null),
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

export async function getCompaniesList(query: CompaniesQuery = {}): Promise<CompaniesListResponse> {
  const payload = await getJsonFromApi(COMPANIES_API_PATHS.list, createCompaniesQuery(query));
  const parsed = parseCompaniesListResponse(unwrapEnvelopeData(payload));

  return (
    parsed ?? {
      ...FALLBACK_COMPANIES_LIST_RESPONSE,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
    }
  );
}

export async function getCompanyDetail(companyPublicId: string): Promise<CompanyDetail> {
  const payload = await getJsonFromApi(COMPANIES_API_PATHS.detail(companyPublicId));
  const parsed = parseCompanyDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackCompanyDetail(companyPublicId);
}

export async function submitCompanyAction(
  input: CompanyActionInput,
): Promise<CompanyMutationResponse> {
  const payload = await sendJsonToApi(COMPANIES_API_PATHS.action(input.companyPublicId), {
    action: input.action,
    reason: input.reason,
    safeUserMessage: input.safeUserMessage,
    internalNote: input.internalNote,
  });

  const data = unwrapEnvelopeData(payload);

  if (!isRecord(data)) {
    return {
      companyPublicId: input.companyPublicId,
      message: 'Company action submitted.',
    };
  }

  return {
    companyPublicId: getString(data.companyPublicId) ?? input.companyPublicId,
    message: getString(data.message) ?? 'Company action submitted.',
  };
}
