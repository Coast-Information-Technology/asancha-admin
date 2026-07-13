// src/lib/utils/public-id.ts

/**
 * File purpose:
 * Provides public ID validation and display helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file helps route builders, detail pages, tables, and action handlers
 * validate and display public-facing identifiers safely.
 *
 * Key exports:
 * - isLikelyMongoObjectId detects MongoDB ObjectId-like values.
 * - isSafePublicId checks whether a value is safe for frontend routes.
 * - assertSafePublicId validates route IDs before usage.
 * - maskPublicId formats IDs safely for compact UI display.
 *
 * Business relevance:
 * Frontend routes must use public IDs such as userPublicId, staffPublicId,
 * profilePublicId, companyPublicId, propertyPublicId, listingPublicId,
 * documentPublicId, bookingPublicId, conversationPublicId, apiClientPublicId,
 * and auditLogPublicId. MongoDB ObjectIds must not be exposed in frontend
 * routes, UI, logs, or public responses.
 *
 * Security note:
 * Public ID helpers reduce accidental ObjectId exposure in the frontend. The
 * backend must still prevent ObjectId leakage in API responses and enforce
 * resource visibility rules.
 */

export type PublicIdValidationResult =
  | {
      valid: true;
      value: string;
    }
  | {
      valid: false;
      reason: 'empty' | 'not_string' | 'object_id_like' | 'unsafe_characters' | 'too_short' | 'too_long';
    };

const MONGO_OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;
const SAFE_PUBLIC_ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const MIN_PUBLIC_ID_LENGTH = 6;
const MAX_PUBLIC_ID_LENGTH = 128;

export function isLikelyMongoObjectId(value: unknown): boolean {
  return typeof value === 'string' && MONGO_OBJECT_ID_PATTERN.test(value.trim());
}

export function normalisePublicId(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

export function validatePublicId(value: unknown): PublicIdValidationResult {
  const publicId = normalisePublicId(value);

  if (typeof value !== 'string') {
    return {
      valid: false,
      reason: 'not_string',
    };
  }

  if (!publicId) {
    return {
      valid: false,
      reason: 'empty',
    };
  }

  if (isLikelyMongoObjectId(publicId)) {
    return {
      valid: false,
      reason: 'object_id_like',
    };
  }

  if (publicId.length < MIN_PUBLIC_ID_LENGTH) {
    return {
      valid: false,
      reason: 'too_short',
    };
  }

  if (publicId.length > MAX_PUBLIC_ID_LENGTH) {
    return {
      valid: false,
      reason: 'too_long',
    };
  }

  if (!SAFE_PUBLIC_ID_PATTERN.test(publicId)) {
    return {
      valid: false,
      reason: 'unsafe_characters',
    };
  }

  return {
    valid: true,
    value: publicId,
  };
}

export function isSafePublicId(value: unknown): value is string {
  return validatePublicId(value).valid;
}

export function assertSafePublicId(value: unknown, label = 'publicId'): string {
  const result = validatePublicId(value);

  if (!result.valid) {
    throw new Error(`Invalid ${label}: ${result.reason}`);
  }

  return result.value;
}

export function maskPublicId(value: unknown, options: { visibleStart?: number; visibleEnd?: number } = {}): string {
  const publicId = normalisePublicId(value);

  if (!publicId) {
    return '—';
  }

  const visibleStart = options.visibleStart ?? 6;
  const visibleEnd = options.visibleEnd ?? 4;

  if (publicId.length <= visibleStart + visibleEnd + 1) {
    return publicId;
  }

  return `${publicId.slice(0, visibleStart)}…${publicId.slice(-visibleEnd)}`;
}

export function createPublicIdRouteSegment(value: unknown, label = 'publicId'): string {
  return encodeURIComponent(assertSafePublicId(value, label));
}

export function getPublicIdValidationMessage(result: PublicIdValidationResult): string {
  if (result.valid) {
    return 'Public ID is valid.';
  }

  if (result.reason === 'object_id_like') {
    return 'MongoDB ObjectIds must not be exposed in frontend routes.';
  }

  if (result.reason === 'unsafe_characters') {
    return 'Public ID contains unsupported characters.';
  }

  if (result.reason === 'too_short') {
    return 'Public ID is too short.';
  }

  if (result.reason === 'too_long') {
    return 'Public ID is too long.';
  }

  return 'Public ID is required.';
}
