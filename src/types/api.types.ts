// src/types/api.types.ts

/**
 * File purpose:
 * Defines shared API TypeScript contracts for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises common API response, error, pagination, request, and
 * resource reference types used across feature modules and admin screens.
 *
 * Key exports:
 * - ApiEnvelope defines the expected API response envelope.
 * - ApiErrorDetails defines safe API error display details.
 * - ApiPublicResource defines a frontend-safe resource reference.
 *
 * Business relevance:
 * asancha-admin consumes backend APIs for staff-only internal operations. The
 * frontend may display and guide actions, but backend endpoints remain the final
 * source of truth for data and permissions.
 *
 * Security note:
 * API types must not encourage MongoDB ObjectId exposure. Frontend records must
 * use public IDs and must not include secrets, full API keys, webhook secrets,
 * private document URLs, raw KYC files, or private admin notes.
 */

export type ApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface ApiErrorDetails {
  code: ApiErrorCode;
  message: string;
  statusCode?: number;
  requestId?: string;
  correlationId?: string;
  fieldErrors?: Record<string, readonly string[]>;
}

export interface ApiMeta {
  requestId?: string;
  correlationId?: string;
  timestamp?: string;
  path?: string;
}

export interface ApiEnvelope<TData> {
  success: boolean;
  message?: string;
  data: TData;
  meta?: ApiMeta;
}

export interface ApiErrorEnvelope {
  success: false;
  message: string;
  error: ApiErrorDetails;
  meta?: ApiMeta;
}

export interface ApiListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiPaginatedData<TItem> {
  items: readonly TItem[];
  meta: ApiListMeta;
}

export interface ApiPublicResource {
  publicId: string;
  label: string;
  href?: string;
  type?: string;
}

export interface ApiTimestampedResource {
  createdAt: string;
  updatedAt: string;
}

export interface ApiActorSummary {
  staffPublicId: string;
  displayName: string;
  role: string;
}

export interface ApiRequestState<TData> {
  data: TData | null;
  loading: boolean;
  error: ApiErrorDetails | null;
}

export interface ApiMutationState {
  loading: boolean;
  error: ApiErrorDetails | null;
  successMessage: string | null;
}

export type ApiSortDirection = 'asc' | 'desc';

export interface ApiSortInput {
  sortBy?: string;
  sortDirection?: ApiSortDirection;
}

export interface ApiPaginationInput {
  page?: number;
  limit?: number;
}

export interface ApiSearchInput {
  search?: string;
}

export type ApiFilterValue = string | number | boolean | null | undefined;

export interface ApiFilterInput {
  filters?: Record<string, ApiFilterValue>;
}

export type ApiListQueryInput = ApiPaginationInput & ApiSearchInput & ApiSortInput & ApiFilterInput;
