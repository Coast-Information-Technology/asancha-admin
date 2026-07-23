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

import { createApiErrorFromRawResponse } from '../../../lib/api/api-response';
import { authGet, authPost } from '../../../lib/api/auth-fetch';
import { parseApiEnvelope } from '../../../lib/api/api-response';

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

async function requestLocalAuth<TData, TBody>(
  path: string,
  options: { method?: 'GET' | 'POST'; body?: TBody } = {},
): Promise<TData> {
  const method = options.method ?? 'POST';
  let response: Response;

  try {
    response = await fetch(path, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: 'include',
      cache: 'no-store',
    });
  } catch (error) {
    throw createApiErrorFromRawResponse(error, 503, path);
  }

  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw createApiErrorFromRawResponse(responseBody, response.status, path);
  }

  const envelope = parseApiEnvelope<TData>(responseBody);

  if (!envelope.success) {
    throw createApiErrorFromRawResponse(envelope, response.status, path);
  }

  return envelope.data;
}

export async function signInStaff(payload: StaffSignInRequest): Promise<StaffAuthSessionResponse> {
  return requestLocalAuth<StaffAuthSessionResponse, StaffSignInRequest>('/api/auth/sign-in', {
    body: payload,
  });
}

export async function signOutStaff(): Promise<StaffSignOutResponse> {
  return requestLocalAuth<StaffSignOutResponse, Record<string, never>>('/api/auth/sign-out', {
    body: {},
  });
}

export async function getCurrentStaffSession(): Promise<StaffAuthSessionResponse> {
  return requestLocalAuth<StaffAuthSessionResponse, Record<string, never>>('/api/auth/session', {
    method: 'GET',
  });
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

export async function verifyStaffInvite(inviteToken: string): Promise<VerifyStaffInviteResponse> {
  const searchParams = new URLSearchParams({
    inviteToken,
  });

  const response = await authGet<VerifyStaffInviteResponse>(
    `${AUTH_API_PATHS.verifyStaffInvite}?${searchParams.toString()}`,
  );

  return response.data;
}
