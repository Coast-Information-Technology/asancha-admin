// src/features/users/api/users.api.ts

/**
 * API helpers for the confirmed admin user read endpoints.
 *
 * The current backend contract returns a plain array for the list endpoint and
 * one user object for the detail endpoint. Pagination, filtering, and status
 * mutations remain intentionally disconnected until their contracts are
 * confirmed by the backend team.
 */

import { adminGet } from '../../../lib/api/admin-fetch';
import { formatDateTime } from '../../../lib/formatters/date';

import type {
  PublicUserRole,
  SetUserRoleInput,
  SetUserStatusInput,
  UserAccountStatus,
  UserDetail,
  UserListItem,
  UserMutationResponse,
  UserVerificationStatus,
  UsersResponse,
} from '../types/users.types';

const USERS_API_PATHS = {
  list: '/admin/users',
  detail: (userPublicId: string) => `/admin/users/${encodeURIComponent(userPublicId)}`,
} as const;

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

function isUserRole(value: unknown): value is PublicUserRole {
  return (
    value === 'guest' ||
    value === 'investor' ||
    value === 'property_owner' ||
    value === 'property_agent' ||
    value === 'property_sourcer' ||
    value === 'service_provider' ||
    value === 'api_partner' ||
    value === 'admin' ||
    value === 'super_admin'
  );
}

function getStatus(isActive: boolean, isSuspended: boolean): UserAccountStatus {
  if (isSuspended) {
    return 'suspended';
  }

  return isActive ? 'active' : 'disabled';
}

function getVerificationStatus(isVerified: boolean): UserVerificationStatus {
  return isVerified ? 'approved' : 'not_started';
}

function getRequiredString(record: JsonRecord, key: string): string | null {
  return getString(record[key]);
}

function parseUserListItem(value: unknown): UserListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const userPublicId = getRequiredString(value, 'publicId');
  const email = getRequiredString(value, 'email');
  const role = isUserRole(value.role) ? value.role : null;
  const isVerified = getBoolean(value.isVerified);
  const isActive = getBoolean(value.isActive);
  const isSuspended = getBoolean(value.isSuspended);
  const mustChangePassword = getBoolean(value.mustChangePassword);
  const createdAt = getRequiredString(value, 'createdAt');
  const updatedAt = getRequiredString(value, 'updatedAt');

  if (
    !userPublicId ||
    !email ||
    !role ||
    isVerified === null ||
    isActive === null ||
    isSuspended === null ||
    mustChangePassword === null ||
    !createdAt ||
    !updatedAt
  ) {
    return null;
  }

  return {
    userPublicId,
    displayName: email,
    emailLabel: email,
    phoneLabel: getString(value.phoneNumber) ?? undefined,
    role,
    status: getStatus(isActive, isSuspended),
    verificationStatus: getVerificationStatus(isVerified),
    createdAtLabel: formatDateTime(createdAt),
    createdAt,
    updatedAtLabel: formatDateTime(updatedAt),
    isVerified,
    isActive,
    isSuspended,
    mustChangePassword,
    href: `/users/${encodeURIComponent(userPublicId)}`,
  };
}

function parseUsersResponse(value: unknown): UsersResponse | null {
  const rawItems = Array.isArray(value) ? value : isRecord(value) ? value.items : null;

  if (!Array.isArray(rawItems)) {
    return null;
  }

  const items = rawItems.map(parseUserListItem);

  if (items.some((item) => item === null)) {
    return null;
  }

  const parsedItems = items.filter((item): item is UserListItem => item !== null);

  return {
    items: parsedItems,
    total: parsedItems.length,
    page: 1,
    pageSize: parsedItems.length,
    hasNextPage: false,
  };
}

function parseUserDetail(value: unknown): UserDetail | null {
  const parsed = parseUserListItem(value);

  if (!parsed) {
    return null;
  }

  return {
    ...parsed,
    updatedAtLabel: parsed.updatedAtLabel,
    relatedCounts: undefined,
  };
}

export async function getUsers(): Promise<UsersResponse> {
  const response = await adminGet<unknown>(USERS_API_PATHS.list);
  const parsed = parseUsersResponse(response.data);

  if (!parsed) {
    throw new Error('The users list response did not match the confirmed API structure.');
  }

  return parsed;
}

export async function getUserDetail(userPublicId: string): Promise<UserDetail> {
  const response = await adminGet<unknown>(USERS_API_PATHS.detail(userPublicId));
  const parsed = parseUserDetail(response.data);

  if (!parsed) {
    throw new Error('The user detail response did not match the confirmed API structure.');
  }

  return parsed;
}

/** Status mutation remains blocked until the backend contract is confirmed. */
export async function updateUserStatus(input: SetUserStatusInput): Promise<UserMutationResponse> {
  void input;
  throw new Error('User status actions are temporarily unavailable.');
}

/** Role mutation is not part of the confirmed Users API contract. */
export async function updateUserRole(input: SetUserRoleInput): Promise<UserMutationResponse> {
  void input;
  throw new Error('User role actions are temporarily unavailable.');
}
