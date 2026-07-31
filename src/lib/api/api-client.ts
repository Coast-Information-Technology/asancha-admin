// src/lib/api/api-client.ts

/**
 * File purpose:
 * Provides the base typed API client used by the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises fetch behaviour, JSON parsing, request headers,
 * credential handling, error conversion, and response-envelope parsing.
 *
 * Key exports:
 * - ApiClientOptions defines safe request options.
 * - apiClient performs typed API requests.
 * - getApiBaseUrl reads the browser-safe API base URL from environment config.
 *
 * Business relevance:
 * asancha-admin must call the backend through a predictable and safe API layer.
 * The frontend must not expose secrets, hardcode live service URLs in docs, or
 * treat frontend checks as final security enforcement.
 */

import {
  createApiErrorFromRawResponse,
  parseApiEnvelope,
  type ApiResponseEnvelope,
} from './api-response';
import { createNetworkApiError, createUnknownApiError, isApiError } from './api-error';
import { env } from '../env/env';
import { notifySessionExpired } from '../auth/session-expiry';

export type ApiClientMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiClientOptions<TBody = unknown> {
  method?: ApiClientMethod;
  body?: TBody;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
}

export interface ApiClientResult<TData> {
  data: TData;
  message: string;
  meta?: ApiResponseEnvelope<TData>['meta'];
}

function normaliseApiBaseUrl(value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    return '';
  }

  return value.replace(/\/+$/g, '');
}

export function getApiBaseUrl(): string {
  return normaliseApiBaseUrl(env.NEXT_PUBLIC_API_BASE_URL);
}

function isFormDataBody(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function createRequestHeaders(body: unknown, headers?: HeadersInit): Headers {
  const requestHeaders = new Headers(headers);

  requestHeaders.set('Accept', 'application/json');

  if (!isFormDataBody(body) && body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  return requestHeaders;
}

function createRequestBody(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (isFormDataBody(body)) {
    return body;
  }

  if (typeof body === 'string') {
    return body;
  }

  return JSON.stringify(body);
}

function createRequestUrl(path: string): string {
  const apiBaseUrl = getApiBaseUrl();

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalisedPath = path.startsWith('/') ? path : `/${path}`;

  if (typeof window !== 'undefined') {
    return `/api/backend${normalisedPath}`;
  }

  if (!apiBaseUrl) {
    return normalisedPath;
  }

  return `${apiBaseUrl}${normalisedPath}`;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type');

  if (response.status === 204) {
    return null;
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return text;
}

export async function apiClient<TData, TBody = unknown>(
  path: string,
  options: ApiClientOptions<TBody> = {},
): Promise<ApiClientResult<TData>> {
  const method = options.method ?? 'GET';
  const url = createRequestUrl(path);

  try {
    const response = await fetch(url, {
      method,
      headers: createRequestHeaders(options.body, options.headers),
      body: createRequestBody(options.body),
      cache: options.cache ?? 'no-store',
      next: options.next,
      credentials: options.credentials ?? 'include',
      signal: options.signal,
    });

    const responseBody = await parseResponseBody(response);

    if (response.status === 401) {
      notifySessionExpired();
    }

    if (!response.ok) {
      throw createApiErrorFromRawResponse(responseBody, response.status, path);
    }

    const envelope = parseApiEnvelope<TData>(responseBody);

    if (!envelope.success) {
      throw createApiErrorFromRawResponse(envelope, response.status, path);
    }

    return {
      data: envelope.data,
      message: envelope.message,
      meta: envelope.meta,
    };
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw createNetworkApiError(error);
    }

    throw createUnknownApiError(error);
  }
}
