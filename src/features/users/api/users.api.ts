// src/features/users/api/users.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin user management.
 *
 * Role in the project:
 * This file centralises user list, user detail, user status update, and user
 * role update requests with safe fallback responses for early implementation.
 *
 * Key exports:
 * - getUsers loads paginated users.
 * - getUserDetail loads a safe user detail payload.
 * - updateUserStatus updates a user's account status.
 * - updateUserRole updates a user's public platform role.
 *
 * Business relevance:
 * Users are central to admin support, status review, onboarding checks,
 * documents, verification, messages, bookings, payments, and audit workflows.
 *
 * Security note:
 * API helpers do not authorize access. Backend authentication, authorization,
 * permissions, redaction, allowed status/role transitions, and audit logging
 * remain final.
 */

import type {
  PublicUserRole,
  SetUserRoleInput,
  SetUserStatusInput,
  UserAccountStatus,
  UserDetail,
  UserListItem,
  UserMutationResponse,
  UserQuery,
  UserVerificationStatus,
  UsersResponse,
} from '../types/users.types';

const USERS_API_PATHS = {
  list: '/api/v1/admin/users',
  detail: (userPublicId: string) => `/api/v1/admin/users/${encodeURIComponent(userPublicId)}`,
  updateStatus: (userPublicId: string) =>
    `/api/v1/admin/users/${encodeURIComponent(userPublicId)}/status`,
  updateRole: (userPublicId: string) => `/api/v1/admin/users/${encodeURIComponent(userPublicId)}/role`,
} as const;

const FALLBACK_USERS_RESPONSE: UsersResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};

function createFallbackUserDetail(userPublicId: string): UserDetail {
  return {
    userPublicId,
    displayName: 'User detail pending',
    emailLabel: 'Email hidden until API connection',
    role: 'guest',
    status: 'pending',
    verificationStatus: 'not_started',
    createdAtLabel: 'Pending API connection',
    relatedCounts: {
      profiles: 0,
      companies: 0,
      properties: 0,
      listings: 0,
      dealReservations: 0,
      bookings: 0,
      payments: 0,
      documents: 0,
      verificationReviews: 0,
      messages: 0,
      notifications: 0,
    },
  };
}

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

function isPublicUserRole(value: unknown): value is PublicUserRole {
  return (
    value === 'guest' ||
    value === 'investor' ||
    value === 'property_owner' ||
    value === 'property_agent' ||
    value === 'property_sourcer' ||
    value === 'service_provider' ||
    value === 'api_partner'
  );
}

function isUserAccountStatus(value: unknown): value is UserAccountStatus {
  return (
    value === 'active' ||
    value === 'pending' ||
    value === 'email_unverified' ||
    value === 'profile_incomplete' ||
    value === 'under_review' ||
    value === 'suspended' ||
    value === 'restricted' ||
    value === 'locked' ||
    value === 'disabled'
  );
}

function isUserVerificationStatus(value: unknown): value is UserVerificationStatus {
  return (
    value === 'not_started' ||
    value === 'pending' ||
    value === 'in_review' ||
    value === 'correction_requested' ||
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

function createUsersQuery(query: UserQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.role) {
    params.set('role', query.role);
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

function parseUserListItem(value: unknown): UserListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const userPublicId = getString(value.userPublicId);
  const displayName = getString(value.displayName);
  const emailLabel = getString(value.emailLabel);
  const role = isPublicUserRole(value.role) ? value.role : null;
  const status = isUserAccountStatus(value.status) ? value.status : null;
  const verificationStatus = isUserVerificationStatus(value.verificationStatus)
    ? value.verificationStatus
    : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const href = getString(value.href);

  if (
    !userPublicId ||
    !displayName ||
    !emailLabel ||
    !role ||
    !status ||
    !verificationStatus ||
    !createdAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    userPublicId,
    displayName,
    emailLabel,
    phoneLabel: getString(value.phoneLabel) ?? undefined,
    role,
    status,
    verificationStatus,
    createdAtLabel,
    lastSeenAtLabel: getString(value.lastSeenAtLabel) ?? undefined,
    href,
  };
}

function parseUsersResponse(value: unknown): UsersResponse | null {
  if (!isRecord(value)) {
    return null;
  }

  if (!Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parseUserListItem);

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
    items: items.filter((item): item is UserListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parseRelatedCounts(value: unknown): UserDetail['relatedCounts'] | null {
  if (!isRecord(value)) {
    return null;
  }

  const profiles = getNumber(value.profiles);
  const companies = getNumber(value.companies);
  const properties = getNumber(value.properties);
  const listings = getNumber(value.listings);
  const dealReservations = getNumber(value.dealReservations);
  const bookings = getNumber(value.bookings);
  const payments = getNumber(value.payments);
  const documents = getNumber(value.documents);
  const verificationReviews = getNumber(value.verificationReviews);
  const messages = getNumber(value.messages);
  const notifications = getNumber(value.notifications);

  if (
    profiles === null ||
    companies === null ||
    properties === null ||
    listings === null ||
    dealReservations === null ||
    bookings === null ||
    payments === null ||
    documents === null ||
    verificationReviews === null ||
    messages === null ||
    notifications === null
  ) {
    return null;
  }

  return {
    profiles,
    companies,
    properties,
    listings,
    dealReservations,
    bookings,
    payments,
    documents,
    verificationReviews,
    messages,
    notifications,
  };
}

function parseUserDetail(value: unknown): UserDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const userPublicId = getString(value.userPublicId);
  const displayName = getString(value.displayName);
  const emailLabel = getString(value.emailLabel);
  const role = isPublicUserRole(value.role) ? value.role : null;
  const status = isUserAccountStatus(value.status) ? value.status : null;
  const verificationStatus = isUserVerificationStatus(value.verificationStatus)
    ? value.verificationStatus
    : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const relatedCounts = parseRelatedCounts(value.relatedCounts);

  if (
    !userPublicId ||
    !displayName ||
    !emailLabel ||
    !role ||
    !status ||
    !verificationStatus ||
    !createdAtLabel ||
    !relatedCounts
  ) {
    return null;
  }

  return {
    userPublicId,
    displayName,
    emailLabel,
    phoneLabel: getString(value.phoneLabel) ?? undefined,
    role,
    status,
    verificationStatus,
    createdAtLabel,
    lastSeenAtLabel: getString(value.lastSeenAtLabel) ?? undefined,
    relatedCounts,
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

async function sendJsonToApi(path: string, method: 'PATCH' | 'POST', body: unknown): Promise<unknown> {
  const url = createApiUrl(path);

  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    method,
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

export async function getUsers(query: UserQuery = {}): Promise<UsersResponse> {
  const payload = await getJsonFromApi(USERS_API_PATHS.list, createUsersQuery(query));
  const parsed = parseUsersResponse(unwrapEnvelopeData(payload));

  return parsed ?? {
    ...FALLBACK_USERS_RESPONSE,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 20,
  };
}

export async function getUserDetail(userPublicId: string): Promise<UserDetail> {
  const payload = await getJsonFromApi(USERS_API_PATHS.detail(userPublicId));
  const parsed = parseUserDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackUserDetail(userPublicId);
}

export async function updateUserStatus(input: SetUserStatusInput): Promise<UserMutationResponse> {
  const payload = await sendJsonToApi(
    USERS_API_PATHS.updateStatus(input.userPublicId),
    'PATCH',
    {
      status: input.status,
      reason: input.reason,
    },
  );

  const data = unwrapEnvelopeData(payload);

  if (isRecord(data) && getString(data.userPublicId) && getString(data.message)) {
    return {
      userPublicId: getString(data.userPublicId) ?? input.userPublicId,
      message: getString(data.message) ?? 'User status updated.',
    };
  }

  return {
    userPublicId: input.userPublicId,
    message: 'User status update submitted.',
  };
}

export async function updateUserRole(input: SetUserRoleInput): Promise<UserMutationResponse> {
  const payload = await sendJsonToApi(
    USERS_API_PATHS.updateRole(input.userPublicId),
    'PATCH',
    {
      role: input.role,
      reason: input.reason,
    },
  );

  const data = unwrapEnvelopeData(payload);

  if (isRecord(data) && getString(data.userPublicId) && getString(data.message)) {
    return {
      userPublicId: getString(data.userPublicId) ?? input.userPublicId,
      message: getString(data.message) ?? 'User role updated.',
    };
  }

  return {
    userPublicId: input.userPublicId,
    message: 'User role update submitted.',
  };
}
