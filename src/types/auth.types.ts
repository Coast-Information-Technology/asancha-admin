// src/types/auth.types.ts

/**
 * File purpose:
 * Defines shared authentication types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises staff auth form payloads, safe auth responses, session
 * summaries, and auth UI state types used by auth features and admin shell.
 *
 * Key exports:
 * - StaffSignInInput defines staff sign-in form input.
 * - StaffAuthSessionSummary defines safe current staff session data.
 * - StaffAuthRedirectReason defines safe auth redirect reasons.
 *
 * Business relevance:
 * asancha-admin is staff-only. Public signup, public onboarding, marketplace,
 * and public user dashboard auth flows must not be created in this frontend.
 *
 * Security note:
 * These types must not store passwords beyond form payloads, JWT secrets,
 * refresh tokens, raw cookies, reset tokens, invite secrets, or private backend
 * permission truth in client state.
 */

import type { StaffRole, StaffAccountStatus } from './staff.types';

export interface StaffSignInInput {
  email: string;
  password: string;
  rememberDevice?: boolean;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface SetPasswordInput {
  inviteToken: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyStaffInviteInput {
  inviteToken: string;
}

export interface StaffAuthSessionSummary {
  isAuthenticated: boolean;
  staffPublicId: string | null;
  email: string | null;
  displayName: string | null;
  role: StaffRole | null;
  accountStatus: StaffAccountStatus;
  avatarUrl?: string;
}

export interface StaffAuthUserSummary {
  staffPublicId: string;
  email: string;
  displayName: string;
  role: StaffRole;
  accountStatus: StaffAccountStatus;
  avatarUrl?: string;
}

export type StaffAuthRedirectReason =
  | 'unauthenticated'
  | 'authenticated'
  | 'unauthorized'
  | 'locked'
  | 'suspended'
  | 'disabled'
  | 'session_expired'
  | 'insufficient_permission';

export interface StaffAuthResult {
  session: StaffAuthSessionSummary;
  redirectTo?: string;
  message?: string;
}

export interface StaffPasswordPolicyHint {
  minLength: number;
  requiresUppercase: boolean;
  requiresLowercase: boolean;
  requiresNumber: boolean;
  requiresSymbol: boolean;
}

export interface AuthPageState {
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface SafeAuthMessage {
  title: string;
  description: string;
  tone: 'info' | 'success' | 'warning' | 'danger';
}
