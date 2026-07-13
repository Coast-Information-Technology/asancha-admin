// src/lib/api/auth-fetch.ts

/**
 * File purpose:
 * Provides staff authentication API helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file wraps auth-related API requests such as sign-in, logout,
 * password reset, staff invite verification, and current staff session lookup.
 *
 * Key exports:
 * - authFetch performs an auth API request.
 * - authGet, authPost, and authPatch provide typed shortcuts.
 *
 * Business relevance:
 * Staff authentication must remain separate from public signup and public
 * onboarding. asancha-admin must never expose public-user registration flows
 * or create super_admin accounts from frontend routes, forms, modals, or
 * actions.
 */

import { apiClient, type ApiClientOptions, type ApiClientResult } from './api-client';

export type AuthFetchOptions<TBody = unknown> = Omit<ApiClientOptions<TBody>, 'method'>;

export function authFetch<TData, TBody = unknown>(
  path: string,
  options: ApiClientOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  return apiClient<TData, TBody>(path, {
    ...options,
    credentials: options.credentials ?? 'include',
  });
}

export function authGet<TData>(
  path: string,
  options: AuthFetchOptions<never> = {},
): Promise<ApiClientResult<TData>> {
  return authFetch<TData, never>(path, {
    ...options,
    method: 'GET',
  });
}

export function authPost<TData, TBody = unknown>(
  path: string,
  body?: TBody,
  options: AuthFetchOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  return authFetch<TData, TBody>(path, {
    ...options,
    method: 'POST',
    body,
  });
}

export function authPatch<TData, TBody = unknown>(
  path: string,
  body?: TBody,
  options: AuthFetchOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  return authFetch<TData, TBody>(path, {
    ...options,
    method: 'PATCH',
    body,
  });
}
