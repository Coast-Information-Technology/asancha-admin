// src/lib/api/admin-fetch.ts

/**
 * File purpose:
 * Provides admin-authenticated API request helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file wraps the base API client for staff/admin operations. Admin screens
 * should use these helpers when calling protected admin endpoints.
 *
 * Key exports:
 * - adminFetch performs a protected admin API request.
 * - adminGet, adminPost, adminPut, adminPatch, and adminDelete provide typed
 *   method shortcuts.
 *
 * Business relevance:
 * asancha-admin is a staff-only frontend. This file keeps admin API calls
 * consistent while remembering that frontend route protection is only UX
 * guidance. The backend remains the final authority for staff permissions,
 * super_admin restrictions, review decisions, and audit-sensitive actions.
 */

import { apiClient, type ApiClientOptions, type ApiClientResult } from './api-client';

export type AdminFetchOptions<TBody = unknown> = Omit<ApiClientOptions<TBody>, 'method'>;

export function adminFetch<TData, TBody = unknown>(
  path: string,
  options: ApiClientOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  return apiClient<TData, TBody>(path, {
    ...options,
    credentials: options.credentials ?? 'include',
  });
}

export function adminGet<TData>(
  path: string,
  options: AdminFetchOptions<never> = {},
): Promise<ApiClientResult<TData>> {
  return adminFetch<TData, never>(path, {
    ...options,
    method: 'GET',
  });
}

export function adminPost<TData, TBody = unknown>(
  path: string,
  body?: TBody,
  options: AdminFetchOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  return adminFetch<TData, TBody>(path, {
    ...options,
    method: 'POST',
    body,
  });
}

export function adminPut<TData, TBody = unknown>(
  path: string,
  body?: TBody,
  options: AdminFetchOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  return adminFetch<TData, TBody>(path, {
    ...options,
    method: 'PUT',
    body,
  });
}

export function adminPatch<TData, TBody = unknown>(
  path: string,
  body?: TBody,
  options: AdminFetchOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  return adminFetch<TData, TBody>(path, {
    ...options,
    method: 'PATCH',
    body,
  });
}

export function adminDelete<TData>(
  path: string,
  options: AdminFetchOptions<never> = {},
): Promise<ApiClientResult<TData>> {
  return adminFetch<TData, never>(path, {
    ...options,
    method: 'DELETE',
  });
}
