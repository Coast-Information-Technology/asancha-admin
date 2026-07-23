// src/lib/auth/staff-session.ts

/**
 * File purpose:
 * Defines staff session types and session helper functions for the Asancha
 * Admin frontend.
 *
 * Role in the project:
 * This file provides a typed representation of the current staff session used
 * by admin layouts, guards, navigation, dashboards, and permission-aware UI.
 *
 * Key exports:
 * - StaffRole defines the only staff roles supported by asancha-admin.
 * - StaffSession defines the frontend-safe staff session shape.
 * - createEmptyStaffSession creates a safe unauthenticated session state.
 * - normaliseStaffSession safely converts unknown API data into a StaffSession.
 *
 * Business relevance:
 * asancha-admin is a staff-only frontend. It must only allow super_admin,
 * admin, and customer_care_rep users into admin workflows. Public users,
 * guests, investors, property owners, property agents, property sourcers,
 * service providers, and API partners must not access admin screens.
 *
 * Security note:
 * This file does not prove authentication. It only shapes frontend state.
 * The backend API remains the final authority for authentication,
 * authorization, permissions, account status, staff visibility, audit-sensitive
 * actions, and super_admin restrictions.
 */

import { isStaffRole, type StaffRole } from './staff-role-guards';

export type StaffAccountStatus =
  'active' | 'pending' | 'invited' | 'locked' | 'suspended' | 'disabled' | 'unknown';

export interface StaffUserSummary {
  publicId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  role: StaffRole;
  accountStatus: StaffAccountStatus;
}

export interface StaffSession {
  isAuthenticated: boolean;
  user: StaffUserSummary | null;
  role: StaffRole | null;
  accountStatus: StaffAccountStatus;
  permissions: string[];
  loadedAt: string | null;
}

export interface RawStaffSessionLike {
  isAuthenticated?: unknown;
  user?: unknown;
  role?: unknown;
  accountStatus?: unknown;
  permissions?: unknown;
  loadedAt?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normaliseString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

export function isStaffAccountStatus(value: unknown): value is StaffAccountStatus {
  return (
    value === 'active' ||
    value === 'pending' ||
    value === 'invited' ||
    value === 'locked' ||
    value === 'suspended' ||
    value === 'disabled' ||
    value === 'unknown'
  );
}

export function createEmptyStaffSession(): StaffSession {
  return {
    isAuthenticated: false,
    user: null,
    role: null,
    accountStatus: 'unknown',
    permissions: [],
    loadedAt: null,
  };
}

export function isLockedStaffAccountStatus(status: StaffAccountStatus): boolean {
  return status === 'locked' || status === 'suspended' || status === 'disabled';
}

export function getStaffDisplayName(user: StaffUserSummary | null): string {
  if (!user) {
    return 'Staff User';
  }

  if (user.displayName && user.displayName.trim().length > 0) {
    return user.displayName;
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();

  if (fullName.length > 0) {
    return fullName;
  }

  return user.email;
}

export function normaliseStaffPermissions(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function normaliseStaffSession(value: unknown): StaffSession {
  if (!isRecord(value)) {
    return createEmptyStaffSession();
  }

  const rawSession = value as RawStaffSessionLike;
  const rawUser = isRecord(rawSession.user) ? rawSession.user : null;

  const roleFromRoot = rawSession.role;
  const roleFromUser = rawUser?.role;
  const role = isStaffRole(roleFromRoot)
    ? roleFromRoot
    : isStaffRole(roleFromUser)
      ? roleFromUser
      : null;

  const accountStatusFromRoot = rawSession.accountStatus;
  const accountStatusFromUser = rawUser?.accountStatus;
  const accountStatus = isStaffAccountStatus(accountStatusFromRoot)
    ? accountStatusFromRoot
    : isStaffAccountStatus(accountStatusFromUser)
      ? accountStatusFromUser
      : 'unknown';

  const publicId = normaliseString(rawUser?.publicId);
  const email = normaliseString(rawUser?.email);

  if (!publicId || !email || !role) {
    return createEmptyStaffSession();
  }

  const user: StaffUserSummary = {
    publicId,
    email,
    firstName: normaliseString(rawUser?.firstName),
    lastName: normaliseString(rawUser?.lastName),
    displayName: normaliseString(rawUser?.displayName),
    role,
    accountStatus,
  };

  return {
    isAuthenticated: rawSession.isAuthenticated === true || Boolean(publicId && email && role),
    user,
    role,
    accountStatus,
    permissions: normaliseStaffPermissions(rawSession.permissions),
    loadedAt: normaliseString(rawSession.loadedAt) ?? new Date().toISOString(),
  };
}

export function hasStaffSession(session: StaffSession | null | undefined): session is StaffSession {
  return Boolean(session?.isAuthenticated && session.user && session.role);
}

export type { StaffRole };
