// src/features/profiles/api/profiles.api.ts

/**
 * File purpose:
 * Provides API helpers for the confirmed Asancha Admin profile read endpoints.
 *
 * Role in the project:
 * This file translates the backend profile response envelope into the safe,
 * display-ready shapes consumed by the Profiles list and detail experiences.
 *
 * Business relevance:
 * The admin profile list contains both general profiles and role-specific
 * business profiles. The UI must preserve the distinction between profile
 * completion state and business-profile verification state.
 *
 * Security note:
 * Only public IDs and backend-supplied safe profile fields are normalized here.
 * Backend authorization, redaction, and audit logging remain final.
 */

import { adminGet, adminPost } from '../../../lib/api/admin-fetch';
import { formatDateTime } from '../../../lib/formatters/date';

import { PROFILES_API_PATHS } from '../constants/profiles.constants';
import type {
  ProfileActionInput,
  ProfileCompletionStatus,
  ProfileDetail,
  ProfileListItem,
  ProfileMutationResponse,
  ProfileRelatedSummary,
  ProfileStatus,
  ProfileSummary,
  ProfileType,
  ProfileVerificationStatus,
  ProfilesListResponse,
  ProfilesQuery,
} from '../types/profiles.types';

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
}

function getBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function isProfileType(value: unknown): value is ProfileType {
  return (
    value === 'general' ||
    value === 'investor' ||
    value === 'property_owner' ||
    value === 'property_agent' ||
    value === 'property_sourcer' ||
    value === 'service_provider'
  );
}

function isProfileCompletionStatus(value: unknown): value is ProfileCompletionStatus {
  return value === 'not_started' || value === 'in_progress' || value === 'completed';
}

function isProfileVerificationStatus(value: unknown): value is ProfileVerificationStatus {
  return (
    value === 'not_started' ||
    value === 'pending' ||
    value === 'in_review' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'flagged' ||
    value === 'not_available'
  );
}

function getStringArray(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const values = value.filter((item): item is string => typeof item === 'string');

  return values.length > 0 ? values : [];
}

function parseProfileSummary(value: unknown): ProfileSummary | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  return {
    type: getString(value.type) ?? undefined,
    category: getString(value.category) ?? undefined,
    fundingMethod: getString(value.fundingMethod) ?? undefined,
    serviceCategories: getStringArray(value.serviceCategories),
  };
}

function parseRelatedSummary(value: unknown): ProfileRelatedSummary | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const relatedUserLabel = getString(value.relatedUserLabel);
  const relatedPropertiesCount = value.relatedPropertiesCount;
  const relatedListingsCount = value.relatedListingsCount;
  const relatedDocumentsCount = value.relatedDocumentsCount;
  const relatedVerificationReviewsCount = value.relatedVerificationReviewsCount;

  if (
    !relatedUserLabel ||
    typeof relatedPropertiesCount !== 'number' ||
    typeof relatedListingsCount !== 'number' ||
    typeof relatedDocumentsCount !== 'number' ||
    typeof relatedVerificationReviewsCount !== 'number'
  ) {
    return undefined;
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

function getProfileStatus(
  profileType: ProfileType,
  completionStatus: ProfileCompletionStatus | undefined,
  verificationStatus: ProfileVerificationStatus,
): ProfileStatus {
  if (profileType === 'general') {
    if (completionStatus === 'completed') return 'completed';
    if (completionStatus === 'in_progress') return 'pending';
    return 'draft';
  }

  if (verificationStatus === 'approved') return 'approved';
  if (verificationStatus === 'rejected') return 'rejected';
  if (verificationStatus === 'flagged') return 'on_hold';

  return 'pending';
}

function getDisplayName(record: JsonRecord, email: string): string {
  const displayName = getString(record.displayName);

  if (displayName) {
    return displayName;
  }

  const name = [getString(record.firstName), getString(record.lastName)].filter(Boolean).join(' ');

  return name || email;
}

function parseProfileListItem(value: unknown): ProfileListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const profilePublicId = getString(value.publicId) ?? getString(value.profilePublicId);
  const userPublicId = getString(value.userPublicId);
  const email = getString(value.email);
  const profileType = isProfileType(value.profileType) ? value.profileType : null;
  const createdAt = getString(value.createdAt);
  const updatedAt = getString(value.updatedAt);
  const isActive = getBoolean(value.isActive);
  const completionStatus = isProfileCompletionStatus(value.profileCompletionStatus)
    ? value.profileCompletionStatus
    : undefined;
  const verificationStatus = isProfileVerificationStatus(value.verificationStatus)
    ? value.verificationStatus
    : profileType === 'general'
      ? 'not_available'
      : 'not_started';

  if (
    !profilePublicId ||
    !userPublicId ||
    !email ||
    !profileType ||
    !createdAt ||
    !updatedAt ||
    isActive === null
  ) {
    return null;
  }

  return {
    profilePublicId,
    userPublicId,
    displayName: getDisplayName(value, email),
    emailLabel: email,
    firstName: getString(value.firstName) ?? undefined,
    lastName: getString(value.lastName) ?? undefined,
    phoneNumber: getString(value.phoneNumber) ?? undefined,
    preferredContactMethod: getString(value.preferredContactMethod) ?? undefined,
    profileType,
    status: getProfileStatus(profileType, completionStatus, verificationStatus),
    verificationStatus,
    profileCompletionStatus: completionStatus,
    isVerified: getBoolean(value.isVerified) ?? undefined,
    isActive,
    summary: parseProfileSummary(value.summary),
    createdAt,
    createdAtLabel: formatDateTime(createdAt),
    updatedAt,
    updatedAtLabel: formatDateTime(updatedAt),
    href: `/profiles/${encodeURIComponent(profilePublicId)}`,
  };
}

function parseProfilesListResponse(value: unknown): ProfilesListResponse | null {
  const rawItems = Array.isArray(value) ? value : isRecord(value) ? value.items : null;

  if (!Array.isArray(rawItems)) {
    return null;
  }

  const items = rawItems.map(parseProfileListItem);

  if (items.some((item) => item === null)) {
    return null;
  }

  const parsedItems = items.filter((item): item is ProfileListItem => item !== null);

  return {
    items: parsedItems,
    total: parsedItems.length,
    page: 1,
    pageSize: parsedItems.length || 20,
    hasNextPage: false,
  };
}

function parseProfileDetail(value: unknown): ProfileDetail | null {
  const parsed = parseProfileListItem(value);

  if (!parsed) {
    return null;
  }

  return {
    ...parsed,
    profileSummary: parsed.summary,
    summary: `${parsed.displayName}'s ${parsed.profileType.replace(/_/g, ' ')} profile record from the Asancha backend.`,
    relatedSummary: parseRelatedSummary(isRecord(value) ? value.relatedSummary : undefined),
  };
}

function matchesSearch(profile: ProfileListItem, search: string): boolean {
  if (!search) {
    return true;
  }

  return [
    profile.displayName,
    profile.emailLabel,
    profile.profilePublicId,
    profile.userPublicId,
    profile.phoneNumber,
  ]
    .filter(Boolean)
    .some((value) => value?.toLowerCase().includes(search));
}

function applyLocalQuery(
  response: ProfilesListResponse,
  query: ProfilesQuery,
): ProfilesListResponse {
  const search = query.search?.trim().toLowerCase() ?? '';
  const filteredItems = response.items.filter((profile) => {
    return (
      (!query.profileType || profile.profileType === query.profileType) &&
      (!query.status || profile.status === query.status) &&
      (!query.verificationStatus || profile.verificationStatus === query.verificationStatus) &&
      matchesSearch(profile, search)
    );
  });
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.max(1, query.pageSize ?? response.pageSize);
  const start = (page - 1) * pageSize;

  return {
    items: filteredItems.slice(start, start + pageSize),
    total: filteredItems.length,
    page,
    pageSize,
    hasNextPage: start + pageSize < filteredItems.length,
  };
}

export async function getProfilesList(query: ProfilesQuery = {}): Promise<ProfilesListResponse> {
  const response = await adminGet<unknown>(PROFILES_API_PATHS.list);
  const parsed = parseProfilesListResponse(response.data);

  if (!parsed) {
    throw new Error('The profiles list response did not match the confirmed API structure.');
  }

  return applyLocalQuery(parsed, query);
}

export async function getProfileDetail(profilePublicId: string): Promise<ProfileDetail> {
  const response = await adminGet<unknown>(PROFILES_API_PATHS.detail(profilePublicId));
  const parsed = parseProfileDetail(response.data);

  if (!parsed) {
    throw new Error('The profile detail response did not match the confirmed API structure.');
  }

  return parsed;
}

/** Profile actions remain a foundation until their backend contract is confirmed. */
export async function submitProfileAction(
  input: ProfileActionInput,
): Promise<ProfileMutationResponse> {
  const response = await adminPost<unknown>(PROFILES_API_PATHS.action(input.profilePublicId), {
    action: input.action,
    reason: input.reason,
    safeUserMessage: input.safeUserMessage,
    internalNote: input.internalNote,
  });
  const data = response.data;

  return {
    profilePublicId:
      isRecord(data) && getString(data.profilePublicId)
        ? getString(data.profilePublicId)!
        : input.profilePublicId,
    message:
      isRecord(data) && getString(data.message) ? getString(data.message)! : response.message,
  };
}
