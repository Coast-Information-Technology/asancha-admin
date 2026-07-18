// src/features/profiles/api/profiles.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin profile management.
 *
 * Role in the project:
 * This file centralises profile list, profile detail, and profile review action
 * requests with safe fallback responses for early implementation.
 *
 * Key exports:
 * - getProfilesList loads paginated profile records.
 * - getProfileDetail loads safe profile detail data by public ID.
 * - submitProfileAction submits permission-aware profile review actions.
 *
 * Business relevance:
 * Profile management supports onboarding review, user role readiness, related
 * company/property/listing workflows, documents, verification, and support.
 *
 * Security note:
 * API helpers do not authorize access. Backend permissions, allowed action
 * transitions, private note handling, safe user messaging, redaction, visibility,
 * and audit logging remain final.
 */

import {
  FALLBACK_PROFILES_LIST_RESPONSE,
  PROFILES_API_PATHS,
} from '../constants/profiles.constants';
import type {
  ProfileActionInput,
  ProfileDetail,
  ProfileListItem,
  ProfileMutationResponse,
  ProfileRelatedSummary,
  ProfileStatus,
  ProfileType,
  ProfileVerificationStatus,
  ProfilesListResponse,
  ProfilesQuery,
} from '../types/profiles.types';

type JsonRecord = Record<string, unknown>;

function createFallbackProfileDetail(profilePublicId: string): ProfileDetail {
  return {
    profilePublicId,
    userPublicId: 'pending_user_public_id',
    displayName: 'Profile detail pending',
    emailLabel: 'Email hidden until API connection',
    profileType: 'investor',
    status: 'pending',
    verificationStatus: 'not_started',
    createdAtLabel: 'Pending API connection',
    summary: 'Live profile details will appear after backend integration.',
    relatedSummary: {
      relatedUserLabel: 'Pending user connection',
      relatedPropertiesCount: 0,
      relatedListingsCount: 0,
      relatedDocumentsCount: 0,
      relatedVerificationReviewsCount: 0,
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

function isProfileType(value: unknown): value is ProfileType {
  return (
    value === 'investor' ||
    value === 'property_owner' ||
    value === 'property_agent' ||
    value === 'property_sourcer' ||
    value === 'service_provider'
  );
}

function isProfileStatus(value: unknown): value is ProfileStatus {
  return (
    value === 'draft' ||
    value === 'pending' ||
    value === 'under_review' ||
    value === 'correction_requested' ||
    value === 'on_hold' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'suspended'
  );
}

function isProfileVerificationStatus(value: unknown): value is ProfileVerificationStatus {
  return (
    value === 'not_started' ||
    value === 'pending' ||
    value === 'in_review' ||
    value === 'approved' ||
    value === 'rejected' ||
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

function createProfilesQuery(query: ProfilesQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.profileType) {
    params.set('profileType', query.profileType);
  }

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

function parseProfileListItem(value: unknown): ProfileListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const profilePublicId = getString(value.profilePublicId);
  const userPublicId = getString(value.userPublicId);
  const displayName = getString(value.displayName);
  const emailLabel = getString(value.emailLabel);
  const profileType = isProfileType(value.profileType) ? value.profileType : null;
  const status = isProfileStatus(value.status) ? value.status : null;
  const verificationStatus = isProfileVerificationStatus(value.verificationStatus)
    ? value.verificationStatus
    : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const href = getString(value.href);

  if (
    !profilePublicId ||
    !userPublicId ||
    !displayName ||
    !emailLabel ||
    !profileType ||
    !status ||
    !verificationStatus ||
    !createdAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    profilePublicId,
    userPublicId,
    displayName,
    emailLabel,
    profileType,
    status,
    verificationStatus,
    companyLabel: getString(value.companyLabel) ?? undefined,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    href,
  };
}

function parseProfilesListResponse(value: unknown): ProfilesListResponse | null {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parseProfileListItem);

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
    items: items.filter((item): item is ProfileListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parseRelatedSummary(value: unknown): ProfileRelatedSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const relatedUserLabel = getString(value.relatedUserLabel);
  const relatedPropertiesCount = getNumber(value.relatedPropertiesCount);
  const relatedListingsCount = getNumber(value.relatedListingsCount);
  const relatedDocumentsCount = getNumber(value.relatedDocumentsCount);
  const relatedVerificationReviewsCount = getNumber(value.relatedVerificationReviewsCount);

  if (
    !relatedUserLabel ||
    relatedPropertiesCount === null ||
    relatedListingsCount === null ||
    relatedDocumentsCount === null ||
    relatedVerificationReviewsCount === null
  ) {
    return null;
  }

  return {
    relatedUserLabel,
    relatedCompanyLabel: getString(value.relatedCompanyLabel) ?? undefined,
    relatedPropertiesCount,
    relatedListingsCount,
    relatedDocumentsCount,
    relatedVerificationReviewsCount,
  };
}

function parseProfileDetail(value: unknown): ProfileDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const profilePublicId = getString(value.profilePublicId);
  const userPublicId = getString(value.userPublicId);
  const displayName = getString(value.displayName);
  const emailLabel = getString(value.emailLabel);
  const profileType = isProfileType(value.profileType) ? value.profileType : null;
  const status = isProfileStatus(value.status) ? value.status : null;
  const verificationStatus = isProfileVerificationStatus(value.verificationStatus)
    ? value.verificationStatus
    : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const summary = getString(value.summary);
  const relatedSummary = parseRelatedSummary(value.relatedSummary);

  if (
    !profilePublicId ||
    !userPublicId ||
    !displayName ||
    !emailLabel ||
    !profileType ||
    !status ||
    !verificationStatus ||
    !createdAtLabel ||
    !summary ||
    !relatedSummary
  ) {
    return null;
  }

  return {
    profilePublicId,
    userPublicId,
    displayName,
    emailLabel,
    profileType,
    status,
    verificationStatus,
    createdAtLabel,
    updatedAtLabel: getString(value.updatedAtLabel) ?? undefined,
    summary,
    relatedSummary,
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

export async function getProfilesList(query: ProfilesQuery = {}): Promise<ProfilesListResponse> {
  const payload = await getJsonFromApi(PROFILES_API_PATHS.list, createProfilesQuery(query));
  const parsed = parseProfilesListResponse(unwrapEnvelopeData(payload));

  return parsed ?? {
    ...FALLBACK_PROFILES_LIST_RESPONSE,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 20,
  };
}

export async function getProfileDetail(profilePublicId: string): Promise<ProfileDetail> {
  const payload = await getJsonFromApi(PROFILES_API_PATHS.detail(profilePublicId));
  const parsed = parseProfileDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackProfileDetail(profilePublicId);
}

export async function submitProfileAction(
  input: ProfileActionInput,
): Promise<ProfileMutationResponse> {
  const payload = await sendJsonToApi(PROFILES_API_PATHS.action(input.profilePublicId), {
    action: input.action,
    reason: input.reason,
    safeUserMessage: input.safeUserMessage,
    internalNote: input.internalNote,
  });

  const data = unwrapEnvelopeData(payload);

  if (!isRecord(data)) {
    return {
      profilePublicId: input.profilePublicId,
      message: 'Profile action submitted.',
    };
  }

  return {
    profilePublicId: getString(data.profilePublicId) ?? input.profilePublicId,
    message: getString(data.message) ?? 'Profile action submitted.',
  };
}
