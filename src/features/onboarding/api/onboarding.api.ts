// src/features/onboarding/api/onboarding.api.ts

/**
 * File purpose:
 * Provides API helpers for the confirmed Admin Onboarding read endpoints.
 *
 * Role in the project:
 * This file calls GET /admin/onboarding and its public-ID detail endpoint,
 * normalizes the standard Asancha response envelope, and sanitizes nested
 * onboarding data for staff display.
 *
 * Business relevance:
 * Staff need progress, verification, current-step, account, and safe workflow
 * details while reviewing public-user onboarding records.
 *
 * Security note:
 * Document URLs, bank details, passwords, tokens, secrets, and other sensitive
 * values are intentionally excluded from the normalized data sections.
 */

import { adminGet } from '../../../lib/api/admin-fetch';
import { formatDateTime } from '../../../lib/formatters/date';

import { ONBOARDING_API_PATHS } from '../constants/onboarding.constants';
import type {
  OnboardingDataField,
  OnboardingDataSection,
  OnboardingDetail,
  OnboardingListItem,
  OnboardingListResponse,
  OnboardingProfileType,
  OnboardingQuery,
  OnboardingStatus,
  OnboardingVerificationStatus,
} from '../types/onboarding.types';

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
}

function isProfileType(value: unknown): value is OnboardingProfileType {
  return (
    value === 'investor' ||
    value === 'property_owner' ||
    value === 'property_agent' ||
    value === 'property_sourcer' ||
    value === 'service_provider'
  );
}

function getStatus(value: unknown): OnboardingStatus {
  if (
    value === 'not_started' ||
    value === 'in_progress' ||
    value === 'submitted' ||
    value === 'completed' ||
    value === 'rejected' ||
    value === 'on_hold'
  ) {
    return value;
  }

  return 'unknown';
}

function getVerificationStatus(value: unknown): OnboardingVerificationStatus {
  if (
    value === 'not_started' ||
    value === 'pending' ||
    value === 'in_review' ||
    value === 'approved' ||
    value === 'rejected' ||
    value === 'flagged'
  ) {
    return value;
  }

  return 'unknown';
}

function getValueLabel(value: unknown): string | null {
  if (typeof value === 'string' && value.trim().length > 0) return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);

  return null;
}

function toLabel(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function isSensitiveKey(key: string): boolean {
  return /document|secret|token|password|sortcode|accountnumber|apikey|webhook|privatekey|payout|bank|billing|payment/i.test(
    key,
  );
}

function isPrivateUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function flattenValue(value: unknown, path: readonly string[], fields: OnboardingDataField[]) {
  const key = path[path.length - 1];

  if (key && isSensitiveKey(key)) {
    return;
  }

  const scalar = getValueLabel(value);
  if (scalar !== null) {
    if (!isPrivateUrl(scalar)) {
      fields.push({ label: toLabel(path.join(' · ')), value: scalar });
    }
    return;
  }

  if (Array.isArray(value)) {
    const values = value.map(getValueLabel).filter((item): item is string => item !== null);

    if (values.length === value.length && values.length > 0) {
      fields.push({ label: toLabel(path.join(' · ')), value: values.join(', ') });
      return;
    }

    value.forEach((item, index) => flattenValue(item, [...path, String(index + 1)], fields));
    return;
  }

  if (isRecord(value)) {
    Object.entries(value).forEach(([childKey, childValue]) => {
      flattenValue(childValue, [...path, childKey], fields);
    });
  }
}

function parseDataSections(value: unknown): readonly OnboardingDataSection[] {
  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, sectionValue]) => {
    const fields: OnboardingDataField[] = [];
    flattenValue(sectionValue, [key], fields);

    return fields.length > 0 ? [{ key, label: toLabel(key), fields }] : [];
  });
}

function parseListItem(value: unknown): OnboardingListItem | null {
  if (!isRecord(value)) return null;

  const onboardingPublicId = getString(value.publicId);
  const profileType = isProfileType(value.profileType) ? value.profileType : null;
  const businessProfileType = isProfileType(value.businessProfileType)
    ? value.businessProfileType
    : profileType;
  const userPublicId = getString(value.userPublicId);
  const email = getString(value.email);
  const createdAt = getString(value.createdAt);
  const updatedAt = getString(value.updatedAt);

  if (!onboardingPublicId || !profileType || !businessProfileType || !userPublicId || !email) {
    return null;
  }

  if (!createdAt || !updatedAt) return null;

  const dataSections = parseDataSections(value.data);
  const submittedAt = getString(value.submittedAt) ?? undefined;
  const completedAt = getString(value.completedAt) ?? undefined;

  return {
    onboardingPublicId,
    profileType,
    businessProfileType,
    status: getStatus(value.status),
    verificationStatus: getVerificationStatus(value.verificationStatus),
    currentStep: getString(value.currentStep) ?? undefined,
    userPublicId,
    email,
    createdAt,
    createdAtLabel: formatDateTime(createdAt),
    updatedAt,
    updatedAtLabel: formatDateTime(updatedAt),
    submittedAt,
    submittedAtLabel: submittedAt ? formatDateTime(submittedAt) : undefined,
    completedAt,
    completedAtLabel: completedAt ? formatDateTime(completedAt) : undefined,
    dataSectionCount: dataSections.length,
    href: `/onboarding/${encodeURIComponent(onboardingPublicId)}`,
  };
}

function parseListResponse(value: unknown): OnboardingListResponse | null {
  if (!Array.isArray(value)) return null;

  const items = value.map(parseListItem);
  if (items.some((item) => item === null)) return null;

  return {
    items: items.filter((item): item is OnboardingListItem => item !== null),
    total: items.length,
  };
}

function applyLocalFilters(
  response: OnboardingListResponse,
  query: OnboardingQuery,
): OnboardingListResponse {
  const email = query.email?.trim().toLowerCase();
  const items = response.items.filter((item) => {
    return (
      (!query.profileType || item.profileType === query.profileType) &&
      (!email || item.email.toLowerCase().includes(email)) &&
      (!query.status || item.status === query.status) &&
      (!query.verificationStatus || item.verificationStatus === query.verificationStatus)
    );
  });

  return { items, total: items.length };
}

export async function getOnboardingList(
  query: OnboardingQuery = {},
): Promise<OnboardingListResponse> {
  const params = new URLSearchParams();

  if (query.profileType) params.set('profileType', query.profileType);
  if (query.email?.trim()) params.set('email', query.email.trim());

  const queryString = params.toString();
  const path = queryString
    ? `${ONBOARDING_API_PATHS.list}?${queryString}`
    : ONBOARDING_API_PATHS.list;
  const response = await adminGet<unknown>(path);
  const parsed = parseListResponse(response.data);

  if (!parsed) {
    throw new Error('The onboarding list response did not match the confirmed API structure.');
  }

  return applyLocalFilters(parsed, query);
}

export async function getOnboardingDetail(onboardingPublicId: string): Promise<OnboardingDetail> {
  const response = await adminGet<unknown>(ONBOARDING_API_PATHS.detail(onboardingPublicId));
  const value = response.data;
  const item = parseListItem(value);

  if (!item) {
    throw new Error('The onboarding detail response did not match the confirmed API structure.');
  }

  return {
    ...item,
    dataSections: parseDataSections(isRecord(value) ? value.data : undefined),
  };
}
