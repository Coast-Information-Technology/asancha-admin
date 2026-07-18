// src/features/auth/constants/auth.constants.ts

/**
 * File purpose:
 * Defines feature-level auth constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises auth endpoint paths, query keys, redirect paths, safe
 * messages, password policy hints, and auth storage-safe constants used by the
 * auth feature.
 *
 * Key exports:
 * - AUTH_API_PATHS defines backend route paths without exposing a live base URL.
 * - AUTH_QUERY_KEYS defines React Query cache keys.
 * - AUTH_REDIRECT_PATHS defines safe frontend auth redirect paths.
 *
 * Business relevance:
 * asancha-admin is staff-only. Auth flows here are for super_admin, admin, and
 * customer_care_rep users only. This frontend must not introduce public signup,
 * public onboarding, marketplace login, or super_admin creation flows.
 *
 * Security note:
 * These constants must not contain secrets, live backend URLs, reset tokens,
 * invite tokens, JWTs, refresh tokens, API keys, webhook secrets, or raw cookie
 * values. Backend auth remains the final authority.
 */

export const AUTH_API_PATHS = {
  staffSignIn: '/auth/login',
  staffSignOut: '/auth/logout',
  currentStaffSession: '/auth/me',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  setPassword: '/auth/set-password',
  verifyStaffInvite: '/auth/verify-staff-invite',
} as const;

export const AUTH_QUERY_KEYS = {
  staffSession: ['auth', 'staff-session'],
  verifyStaffInvite: (inviteToken: string) => ['auth', 'verify-staff-invite', inviteToken],
} as const;

export const AUTH_REDIRECT_PATHS = {
  signIn: '/auth/sign-in',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  setPassword: '/auth/set-password',
  verifyStaffInvite: '/auth/verify-staff-invite',
  locked: '/auth/locked',
  unauthorized: '/auth/unauthorized',
  dashboard: '/dashboard',
} as const;

export const AUTH_SAFE_MESSAGES = {
  signInFailed: 'We could not sign you in. Please check your details and try again.',
  sessionExpired: 'Your session has expired. Please sign in again.',
  forgotPasswordSuccess:
    'If this staff email can receive password reset instructions, the next step will be sent securely.',
  resetPasswordSuccess: 'Your password has been reset. You can now sign in.',
  setPasswordSuccess: 'Your staff password has been set. You can now sign in.',
  inviteInvalid: 'This staff invitation is invalid, expired, or no longer available.',
  unauthorized: 'You do not have access to this admin area.',
} as const;

export const STAFF_PASSWORD_POLICY_HINT = {
  minLength: 10,
  requiresUppercase: true,
  requiresLowercase: true,
  requiresNumber: true,
  requiresSymbol: true,
} as const;

export const AUTH_FORM_LIMITS = {
  emailMaxLength: 254,
  passwordMinLength: 10,
  passwordMaxLength: 128,
  tokenMinLength: 16,
  tokenMaxLength: 512,
} as const;
