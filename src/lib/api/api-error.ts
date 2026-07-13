// src/lib/api/api-error.ts

/**
 * File purpose:
 * Defines typed API error utilities for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file standardises how frontend API failures are represented after a
 * backend request fails. It prevents random error shapes from spreading across
 * admin screens, forms, tables, review panels, and dashboards.
 *
 * Key exports:
 * - ApiErrorPayload describes a safe frontend API error shape.
 * - ApiError wraps backend or network failures in a predictable Error class.
 * - isApiError checks whether an unknown error is an ApiError.
 *
 * Business relevance:
 * asancha-admin is an internal staff application. API errors must be displayed
 * safely without exposing stack traces, secrets, internal service details,
 * private KYC notes, private document URLs, API key hashes, or backend internals.
 */

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

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorPayload {
  message: string;
  code: ApiErrorCode;
  statusCode?: number;
  requestId?: string;
  path?: string;
  fieldErrors?: ApiFieldError[];
  cause?: unknown;
}

export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly statusCode?: number;
  public readonly requestId?: string;
  public readonly path?: string;
  public readonly fieldErrors?: ApiFieldError[];
  public readonly cause?: unknown;

  public constructor(payload: ApiErrorPayload) {
    super(payload.message);

    this.name = 'ApiError';
    this.code = payload.code;
    this.statusCode = payload.statusCode;
    this.requestId = payload.requestId;
    this.path = payload.path;
    this.fieldErrors = payload.fieldErrors;
    this.cause = payload.cause;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}

export function createNetworkApiError(cause?: unknown): ApiError {
  return new ApiError({
    code: 'NETWORK_ERROR',
    message: 'Unable to connect. Please check your connection and try again.',
    cause,
  });
}

export function createUnknownApiError(cause?: unknown): ApiError {
  return new ApiError({
    code: 'UNKNOWN_ERROR',
    message: 'Something went wrong. Please try again.',
    cause,
  });
}

export function statusCodeToApiErrorCode(statusCode: number): ApiErrorCode {
  if (statusCode === 400) return 'BAD_REQUEST';
  if (statusCode === 401) return 'UNAUTHORIZED';
  if (statusCode === 403) return 'FORBIDDEN';
  if (statusCode === 404) return 'NOT_FOUND';
  if (statusCode === 409) return 'CONFLICT';
  if (statusCode === 422) return 'VALIDATION_ERROR';
  if (statusCode === 429) return 'RATE_LIMITED';
  if (statusCode >= 500) return 'SERVER_ERROR';

  return 'UNKNOWN_ERROR';
}
