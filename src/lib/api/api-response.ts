// src/lib/api/api-response.ts

/**
 * File purpose:
 * Defines shared API response types and parsing helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file keeps the frontend aligned with the backend response-envelope
 * pattern. It helps API callers read successful data, safe error messages, and
 * response metadata consistently.
 *
 * Key exports:
 * - ApiResponseMeta describes backend response metadata.
 * - ApiResponseEnvelope describes the standard API envelope.
 * - parseApiEnvelope safely parses unknown backend responses.
 * - isApiResponseEnvelope checks whether a value looks like an API envelope.
 *
 * Business relevance:
 * Admin screens must not make unsafe assumptions about backend responses.
 * Consistent response parsing reduces accidental exposure of backend internals
 * and keeps admin error handling predictable.
 */

import { ApiError, ApiFieldError, statusCodeToApiErrorCode } from './api-error';

export interface ApiResponseMeta {
  requestId?: string;
  timestamp?: string;
  path?: string;
  statusCode?: number;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiResponseErrorBody {
  message?: string;
  code?: string;
  fieldErrors?: ApiFieldError[];
}

export interface ApiResponseEnvelope<TData> {
  success: boolean;
  message: string;
  data: TData;
  error: ApiResponseErrorBody | null;
  meta?: ApiResponseMeta;
}

export interface PaginatedApiData<TItem> {
  items: TItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isApiResponseEnvelope<TData = unknown>(
  value: unknown,
): value is ApiResponseEnvelope<TData> {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.success === 'boolean' &&
    typeof value.message === 'string' &&
    'data' in value &&
    'error' in value
  );
}

export function parseApiEnvelope<TData>(value: unknown): ApiResponseEnvelope<TData> {
  if (isApiResponseEnvelope<TData>(value)) {
    return value;
  }

  return {
    success: true,
    message: 'OK',
    data: value as TData,
    error: null,
    meta: undefined,
  };
}

export function createApiErrorFromEnvelope(
  envelope: ApiResponseEnvelope<unknown>,
  fallbackStatusCode?: number,
): ApiError {
  const statusCode = envelope.meta?.statusCode ?? fallbackStatusCode;
  const message =
    envelope.error?.message ??
    envelope.message ??
    'The request could not be completed. Please try again.';

  return new ApiError({
    code: statusCode ? statusCodeToApiErrorCode(statusCode) : 'UNKNOWN_ERROR',
    message,
    statusCode,
    requestId: envelope.meta?.requestId,
    path: envelope.meta?.path,
    fieldErrors: envelope.error?.fieldErrors,
  });
}

export function createApiErrorFromRawResponse(
  responseBody: unknown,
  statusCode: number,
  path?: string,
): ApiError {
  if (isApiResponseEnvelope(responseBody)) {
    return createApiErrorFromEnvelope(responseBody, statusCode);
  }

  if (isRecord(responseBody)) {
    const messageValue = responseBody.message;
    const errorValue = responseBody.error;

    const message =
      typeof messageValue === 'string'
        ? messageValue
        : typeof errorValue === 'string'
          ? errorValue
          : 'The request could not be completed. Please try again.';

    return new ApiError({
      code: statusCodeToApiErrorCode(statusCode),
      message,
      statusCode,
      path,
    });
  }

  return new ApiError({
    code: statusCodeToApiErrorCode(statusCode),
    message: 'The request could not be completed. Please try again.',
    statusCode,
    path,
  });
}
