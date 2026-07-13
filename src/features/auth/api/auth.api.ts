// src/features/auth/api/auth.api.ts

/**
 * File purpose:
 * Provides auth API functions for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file wraps staff auth endpoints using the shared auth fetch layer. It is
 * used by auth feature hooks and route components.
 *
 * Key exports:
 * - signInStaff signs in an authorised staff user.
 * - getCurrentStaffSession fetches the current staff session.
 * - requestStaffPasswordReset starts the forgot-password flow.
 * - resetStaffPassword completes reset-password flow.
 * - setInvitedStaffPassword completes invited staff password setup.
 *
 * Business relevance:
 * asancha-admin is a staff-only frontend. These API functions must not support
 * public signup, public onboarding, public dashboard access, or super_admin
 * creation.
 *
 * Security note:
 * API functions must not log passwords, tokens, reset secrets, invite secrets,
 * raw cookies, JWTs, API keys, or webhook secrets. Backend auth remains final.
 */

import { authGet, authPost } from '../../../lib/api/auth-fetch';

import { AUTH_API_PATHS } from '../constants/auth.constants';
import type {
  AuthActionResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SetPasswordRequest,
  StaffAuthSessionResponse,
  StaffSignInRequest,
  StaffSignOutResponse,
  VerifyStaffInviteResponse,
} from '../types/auth.types';

export async function signInStaff(
  payload: StaffSignInRequest,
): Promise<StaffAuthSessionResponse> {
  const response = await authPost<StaffAuthSessionResponse, StaffSignInRequest>(
    AUTH_API_PATHS.staffSignIn,
    payload,
  );

  return response.data;
}

export async function signOutStaff(): Promise<StaffSignOutResponse> {
  const response = await authPost<StaffSignOutResponse, Record<string, never>>(
    AUTH_API_PATHS.staffSignOut,
    {},
  );

  return response.data;
}

export async function getCurrentStaffSession(): Promise<StaffAuthSessionResponse> {
  const response = await authGet<StaffAuthSessionResponse>(AUTH_API_PATHS.currentStaffSession);

  return response.data;
}

export async function requestStaffPasswordReset(
  payload: ForgotPasswordRequest,
): Promise<AuthActionResponse> {
  const response = await authPost<AuthActionResponse, ForgotPasswordRequest>(
    AUTH_API_PATHS.forgotPassword,
    payload,
  );

  return response.data;
}

export async function resetStaffPassword(
  payload: ResetPasswordRequest,
): Promise<AuthActionResponse> {
  const response = await authPost<AuthActionResponse, ResetPasswordRequest>(
    AUTH_API_PATHS.resetPassword,
    payload,
  );

  return response.data;
}

export async function setInvitedStaffPassword(
  payload: SetPasswordRequest,
): Promise<AuthActionResponse> {
  const response = await authPost<AuthActionResponse, SetPasswordRequest>(
    AUTH_API_PATHS.setPassword,
    payload,
  );

  return response.data;
}

export async function verifyStaffInvite(
  inviteToken: string,
): Promise<VerifyStaffInviteResponse> {
  const searchParams = new URLSearchParams({
    inviteToken,
  });

  const response = await authGet<VerifyStaffInviteResponse>(
    `${AUTH_API_PATHS.verifyStaffInvite}?${searchParams.toString()}`,
  );

  return response.data;
}
