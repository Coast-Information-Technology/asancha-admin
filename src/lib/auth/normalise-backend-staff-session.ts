// src/lib/auth/normalise-backend-staff-session.ts

/** Converts the backend login/session shape into the frontend staff session shape. */

import {
  createEmptyStaffSession,
  type StaffAccountStatus,
  type StaffSession,
} from './staff-session';
import { isStaffRole, type StaffRole } from './staff-role-guards';

type JsonRecord = Record<string, unknown>;

export interface BackendStaffAuthResult {
  session: StaffSession;
  accessToken: string;
  refreshToken: string | null;
  sessionId: string | null;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function getBoolean(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined;
}

function getFirstString(...values: unknown[]): string | null {
  for (const value of values) {
    const stringValue = getString(value);

    if (stringValue) {
      return stringValue;
    }
  }

  return null;
}

function getNestedRecord(record: JsonRecord, key: string): JsonRecord | null {
  const value = record[key];

  return isRecord(value) ? value : null;
}

function getAccountStatus(user: JsonRecord, source: JsonRecord): StaffAccountStatus {
  const explicitStatus = getFirstString(user.accountStatus, source.accountStatus);

  if (
    explicitStatus === 'active' ||
    explicitStatus === 'pending' ||
    explicitStatus === 'invited' ||
    explicitStatus === 'locked' ||
    explicitStatus === 'suspended' ||
    explicitStatus === 'disabled'
  ) {
    return explicitStatus;
  }

  if (user.isSuspended === true || source.isSuspended === true) {
    return 'suspended';
  }

  if (user.isActive === false || source.isActive === false) {
    return 'disabled';
  }

  return 'active';
}

function getPermissions(user: JsonRecord, source: JsonRecord): string[] {
  const permissions = source.permissions ?? user.permissions;

  if (!Array.isArray(permissions)) {
    return [];
  }

  return permissions.filter((permission): permission is string => {
    return typeof permission === 'string' && permission.trim().length > 0;
  });
}

function getBackendData(payload: unknown): JsonRecord | null {
  if (!isRecord(payload)) {
    return null;
  }

  const nestedData = getNestedRecord(payload, 'data');

  return nestedData ?? payload;
}

export function normaliseBackendStaffAuth(
  payload: unknown,
  options: { requireAccessToken?: boolean } = {},
): BackendStaffAuthResult | null {
  const source = getBackendData(payload);

  if (!source) {
    return null;
  }

  const user = getNestedRecord(source, 'user') ?? source;
  const roleValue = getFirstString(user.role, source.role);
  const role: StaffRole | null = isStaffRole(roleValue) ? roleValue : null;
  const publicId = getFirstString(user.publicId, user.staffPublicId, source.publicId);
  const email = getFirstString(user.email, source.email);
  const accessToken = getFirstString(
    source.accessToken,
    source.access_token,
    source.token,
    getNestedRecord(source, 'tokens')?.accessToken,
    getNestedRecord(source, 'tokens')?.access_token,
  );

  if (!role || !publicId || !email || (options.requireAccessToken !== false && !accessToken)) {
    return null;
  }

  const firstName = getFirstString(user.firstName, user.first_name);
  const lastName = getFirstString(user.lastName, user.last_name);
  const displayName =
    getFirstString(
      user.displayName,
      user.name,
      [firstName, lastName].filter(Boolean).join(' '),
      email,
    ) ?? email;
  const accountStatus = getAccountStatus(user, source);
  const session: StaffSession = {
    isAuthenticated: true,
    user: {
      publicId,
      email,
      phoneNumber: getFirstString(user.phoneNumber) ?? undefined,
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      displayName,
      role,
      accountStatus,
      isVerified: getBoolean(user.isVerified),
      emailVerifiedAt: getFirstString(user.emailVerifiedAt) ?? undefined,
      onboardingStatus: getFirstString(user.onboardingStatus) ?? undefined,
      isActive: getBoolean(user.isActive),
      isSuspended: getBoolean(user.isSuspended),
      createdAt: getFirstString(user.createdAt) ?? undefined,
      updatedAt: getFirstString(user.updatedAt) ?? undefined,
    },
    role,
    accountStatus,
    permissions: getPermissions(user, source),
    loadedAt: new Date().toISOString(),
  };

  return {
    session,
    accessToken: accessToken ?? '',
    refreshToken: getFirstString(
      source.refreshToken,
      source.refresh_token,
      getNestedRecord(source, 'tokens')?.refreshToken,
      getNestedRecord(source, 'tokens')?.refresh_token,
    ),
    sessionId: getFirstString(source.sessionId, source.session_id),
  };
}

export function createUnauthenticatedStaffSession(): StaffSession {
  return createEmptyStaffSession();
}
