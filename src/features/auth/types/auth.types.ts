// src/features/auth/types/auth.types.ts

/**
 * File purpose:
 * Defines feature-level auth types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises request and response contracts used by auth API calls,
 * schemas, hooks, and auth route components.
 *
 * Key exports:
 * - StaffSignInRequest defines the staff sign-in payload.
 * - StaffAuthSessionResponse defines the safe current-session response.
 * - PasswordResetRequest defines the reset-password payload.
 *
 * Business relevance:
 * Auth types must support staff-only workflows and must not introduce public
 * signup, public onboarding, public dashboard access, or super_admin creation.
 *
 * Security note:
 * These types must not encourage storing tokens, reset secrets, invite secrets,
 * passwords, or raw cookies in Zustand/localStorage. Backend auth remains final.
 */

import type { StaffSession } from '../../../lib/auth/staff-session';
import type { StaffRole } from '../../../lib/auth/staff-role-guards';

export interface StaffSignInRequest {
  email: string;
  password: string;
  rememberDevice: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface SetPasswordRequest {
  inviteToken: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyStaffInviteRequest {
  inviteToken: string;
}

export interface StaffAuthSessionResponse {
  session: StaffSession;
  redirectTo?: string;
  message?: string;
}

export interface StaffSignOutResponse {
  signedOut: boolean;
  redirectTo?: string;
  message?: string;
}

export interface AuthActionResponse {
  message: string;
  redirectTo?: string;
}

export interface VerifyStaffInviteResponse {
  valid: boolean;
  email?: string;
  displayName?: string;
  role?: Exclude<StaffRole, 'super_admin'>;
  message?: string;
}

export interface AuthHookOptions {
  redirectTo?: string;
  onSuccess?: (message?: string) => void;
  onError?: (message: string) => void;
}

export interface StaffSessionHookOptions {
  enabled?: boolean;
  redirectOnUnauthorized?: boolean;
}
