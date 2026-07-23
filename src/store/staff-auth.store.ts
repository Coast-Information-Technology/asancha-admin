// src/store/staff-auth.store.ts

/**
 * File purpose:
 * Provides lightweight client-side staff authentication/session state for the
 * Asancha Admin frontend.
 *
 * Role in the project:
 * This Zustand store keeps the current staff session snapshot available to
 * client components such as the admin shell, top bar, staff avatar menu,
 * permission-aware components, and dashboard resolver UI.
 *
 * Key exports:
 * - useStaffAuthStore exposes staff session state and safe session actions.
 *
 * Business relevance:
 * asancha-admin is staff-only and supports super_admin, admin, and
 * customer_care_rep. Public users must not be treated as valid admin users.
 *
 * Security note:
 * This store must never store JWT secrets, refresh tokens, raw cookies, API
 * keys, password values, private document URLs, or backend-only permission
 * truth. Backend authentication, authorization, account status, permissions,
 * resource visibility, and audit logging remain the final authority.
 */

'use client';

import { create } from 'zustand';

import type { StaffAccountStatus, StaffSession } from '../lib/auth/staff-session';
import type { StaffRole } from '../lib/auth/staff-role-guards';

export interface StaffAuthUser {
  staffPublicId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  role: StaffRole;
  accountStatus: StaffAccountStatus;
  avatarUrl?: string;
}

export interface StaffAuthState {
  user: StaffAuthUser | null;
  session: StaffSession | null;
  hydrated: boolean;
  loading: boolean;
  errorMessage: string | null;
  setSession: (session: StaffSession | null) => void;
  setUser: (user: StaffAuthUser | null) => void;
  setHydrated: (hydrated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  clearSession: () => void;
}

type SessionRecord = Record<string, unknown>;

interface SessionUserCandidate {
  staffPublicId?: unknown;
  publicId?: unknown;
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  displayName?: unknown;
  role?: unknown;
  accountStatus?: unknown;
  avatarUrl?: unknown;
}

function isRecord(value: unknown): value is SessionRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStaffRoleValue(value: unknown): value is StaffRole {
  return value === 'super_admin' || value === 'admin' || value === 'customer_care_rep';
}

function isStaffAccountStatusValue(value: unknown): value is StaffAccountStatus {
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

function getStringValue(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function getSessionUserCandidate(session: StaffSession): SessionUserCandidate {
  const sessionRecord = session as unknown as SessionRecord;

  const nestedUser = sessionRecord.user;
  const nestedStaffUser = sessionRecord.staffUser;

  if (isRecord(nestedUser)) {
    return nestedUser;
  }

  if (isRecord(nestedStaffUser)) {
    return nestedStaffUser;
  }

  return sessionRecord;
}

function createUserFromSession(session: StaffSession | null): StaffAuthUser | null {
  if (!session?.isAuthenticated) {
    return null;
  }

  const candidate = getSessionUserCandidate(session);

  const staffPublicId =
    getStringValue(candidate.staffPublicId) ?? getStringValue(candidate.publicId);
  const email = getStringValue(candidate.email);
  const firstName = getStringValue(candidate.firstName) ?? undefined;
  const lastName = getStringValue(candidate.lastName) ?? undefined;
  const displayName = getStringValue(candidate.displayName) ?? email;
  const role = candidate.role;
  const accountStatus = candidate.accountStatus;
  const avatarUrl = getStringValue(candidate.avatarUrl) ?? undefined;

  if (
    !staffPublicId ||
    !email ||
    !displayName ||
    !isStaffRoleValue(role) ||
    !isStaffAccountStatusValue(accountStatus)
  ) {
    return null;
  }

  return {
    staffPublicId,
    email,
    firstName,
    lastName,
    displayName,
    role,
    accountStatus,
    avatarUrl,
  };
}

export const useStaffAuthStore = create<StaffAuthState>((set) => ({
  user: null,
  session: null,
  hydrated: false,
  loading: false,
  errorMessage: null,

  setSession: (session) => {
    set({
      session,
      user: createUserFromSession(session),
      errorMessage: null,
    });
  },

  setUser: (user) => {
    set({
      user,
    });
  },

  setHydrated: (hydrated) => {
    set({
      hydrated,
    });
  },

  setLoading: (loading) => {
    set({
      loading,
    });
  },

  setErrorMessage: (errorMessage) => {
    set({
      errorMessage,
    });
  },

  clearSession: () => {
    set({
      user: null,
      session: null,
      loading: false,
      errorMessage: null,
    });
  },
}));
