// src/lib/utils/redaction.ts

/**
 * File purpose:
 * Provides safe redaction helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file helps UI components and logs mask sensitive values before display,
 * including emails, phone numbers, public IDs, API keys, payment references,
 * tokens, private URLs, and secret-like strings.
 *
 * Key exports:
 * - redactValue masks a generic sensitive value.
 * - redactEmail masks email addresses.
 * - redactPhoneNumber masks phone numbers.
 * - redactObject recursively redacts sensitive object keys.
 *
 * Business relevance:
 * asancha-admin handles staff operations, documents, verification reviews,
 * payment references, API access, audit logs, and private user context. UI must
 * avoid exposing secrets, full tokens, API keys, private document URLs, or
 * unnecessary sensitive values.
 *
 * Security note:
 * Redaction helpers reduce accidental frontend exposure. Backend responses must
 * still avoid sending secrets, full API keys, private document URLs, API key
 * hashes, private KYC notes, internal admin notes, and audit-sensitive secrets.
 */

export type RedactablePrimitive = string | number | boolean | null | undefined;
export type RedactableValue =
  | RedactablePrimitive
  | readonly RedactableValue[]
  | {
      readonly [key: string]: RedactableValue;
    };

export interface RedactionOptions {
  visibleStart?: number;
  visibleEnd?: number;
  mask?: string;
}

const DEFAULT_MASK = '••••';
const SENSITIVE_KEY_PATTERNS = [
  /password/i,
  /token/i,
  /secret/i,
  /api[_-]?key/i,
  /authorization/i,
  /cookie/i,
  /session/i,
  /private/i,
  /document[_-]?url/i,
  /kyc/i,
  /hash/i,
  /webhook/i,
  /signature/i,
] as const;

function toDisplayString(value: RedactablePrimitive): string {
  if (value === null || value === undefined) {
    return '—';
  }

  return String(value);
}

function shouldRedactKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key));
}

export function redactValue(
  value: RedactablePrimitive,
  options: RedactionOptions = {},
): string {
  const displayValue = toDisplayString(value);

  if (displayValue === '—') {
    return displayValue;
  }

  const visibleStart = options.visibleStart ?? 4;
  const visibleEnd = options.visibleEnd ?? 4;
  const mask = options.mask ?? DEFAULT_MASK;

  if (displayValue.length <= visibleStart + visibleEnd) {
    return mask;
  }

  return `${displayValue.slice(0, visibleStart)}${mask}${displayValue.slice(-visibleEnd)}`;
}

export function redactEmail(value: RedactablePrimitive): string {
  const email = toDisplayString(value);

  if (email === '—' || !email.includes('@')) {
    return redactValue(value, {
      visibleStart: 2,
      visibleEnd: 2,
    });
  }

  const [localPart = '', domain = ''] = email.split('@');

  if (!domain) {
    return redactValue(email, {
      visibleStart: 2,
      visibleEnd: 2,
    });
  }

  const redactedLocalPart =
    localPart.length <= 2 ? DEFAULT_MASK : `${localPart.slice(0, 2)}${DEFAULT_MASK}`;

  return `${redactedLocalPart}@${domain}`;
}

export function redactPhoneNumber(value: RedactablePrimitive): string {
  const phoneNumber = toDisplayString(value);

  if (phoneNumber === '—') {
    return phoneNumber;
  }

  return redactValue(phoneNumber, {
    visibleStart: 3,
    visibleEnd: 3,
  });
}

export function redactApiKey(value: RedactablePrimitive): string {
  return redactValue(value, {
    visibleStart: 6,
    visibleEnd: 4,
  });
}

export function redactUrl(value: RedactablePrimitive): string {
  const url = toDisplayString(value);

  if (url === '—') {
    return url;
  }

  try {
    const parsedUrl = new URL(url);

    return `${parsedUrl.origin}/••••`;
  } catch {
    return redactValue(url);
  }
}

export function redactObject<TValue extends RedactableValue>(value: TValue): RedactableValue {
  if (Array.isArray(value)) {
    return value.map((item) => redactObject(item));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce<Record<string, RedactableValue>>((redactedObject, [key, item]) => {
      if (shouldRedactKey(key)) {
        redactedObject[key] = redactValue(
          typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean'
            ? item
            : '[redacted]',
        );

        return redactedObject;
      }

      redactedObject[key] = redactObject(item);

      return redactedObject;
    }, {});
  }

  return value;
}

export function redactSearchParamValue(key: string, value: string): string {
  if (shouldRedactKey(key)) {
    return redactValue(value);
  }

  return value;
}

export function redactSearchParams(searchParams: URLSearchParams): URLSearchParams {
  const redactedParams = new URLSearchParams();

  searchParams.forEach((value, key) => {
    redactedParams.append(key, redactSearchParamValue(key, value));
  });

  return redactedParams;
}
