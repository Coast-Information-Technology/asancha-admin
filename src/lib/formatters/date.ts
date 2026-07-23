// src/lib/formatters/date.ts

/**
 * File purpose:
 * Provides safe date and time formatting helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file centralises how dates are displayed across bookings, payments,
 * audit logs, review queues, documents, verification reviews, messages,
 * notifications, API access, dashboards, and staff activity screens.
 *
 * Key exports:
 * - DateInput defines accepted date input values.
 * - formatDate formats calendar dates.
 * - formatDateTime formats full date/time values.
 * - formatRelativeTime formats relative time labels.
 *
 * Business relevance:
 * Admin users need accurate and readable timestamps for operational decisions.
 * Date formatting must not change backend truth, workflow state, audit meaning,
 * payment validity, verification status, or booking status.
 *
 * Security note:
 * Date formatting is display-only. Backend timestamps, audit trails, payment
 * expiry rules, booking lifecycle rules, and verification deadlines remain the
 * source of truth.
 */

export type DateInput = string | number | Date | null | undefined;

export interface FormatDateOptions {
  locale?: string;
  fallback?: string;
  timeZone?: string;
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
}

export interface FormatDateTimeOptions extends FormatDateOptions {
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
}

export interface FormatRelativeTimeOptions {
  locale?: string;
  fallback?: string;
  now?: DateInput;
  numeric?: Intl.RelativeTimeFormatOptions['numeric'];
  style?: Intl.RelativeTimeFormatOptions['style'];
}

const DEFAULT_LOCALE = 'en-GB';
const DEFAULT_FALLBACK = '—';

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
const YEAR_IN_MS = 365 * DAY_IN_MS;

export function parseDateInput(value: DateInput): Date | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function isValidDateInput(value: DateInput): boolean {
  return parseDateInput(value) !== null;
}

export function formatDate(value: DateInput, options: FormatDateOptions = {}): string {
  const date = parseDateInput(value);

  if (!date) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  return new Intl.DateTimeFormat(options.locale ?? DEFAULT_LOCALE, {
    dateStyle: options.dateStyle ?? 'medium',
    timeZone: options.timeZone,
  }).format(date);
}

export function formatShortDate(value: DateInput, options: FormatDateOptions = {}): string {
  return formatDate(value, {
    ...options,
    dateStyle: 'short',
  });
}

export function formatLongDate(value: DateInput, options: FormatDateOptions = {}): string {
  return formatDate(value, {
    ...options,
    dateStyle: 'long',
  });
}

export function formatDateTime(value: DateInput, options: FormatDateTimeOptions = {}): string {
  const date = parseDateInput(value);

  if (!date) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  return new Intl.DateTimeFormat(options.locale ?? DEFAULT_LOCALE, {
    dateStyle: options.dateStyle ?? 'medium',
    timeStyle: options.timeStyle ?? 'short',
    timeZone: options.timeZone,
  }).format(date);
}

export function formatTime(value: DateInput, options: FormatDateTimeOptions = {}): string {
  const date = parseDateInput(value);

  if (!date) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  return new Intl.DateTimeFormat(options.locale ?? DEFAULT_LOCALE, {
    timeStyle: options.timeStyle ?? 'short',
    timeZone: options.timeZone,
  }).format(date);
}

function getRelativeTimeUnit(diffInMs: number): {
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
} {
  const absoluteDiff = Math.abs(diffInMs);

  if (absoluteDiff < MINUTE_IN_MS) {
    return {
      value: Math.round(diffInMs / SECOND_IN_MS),
      unit: 'second',
    };
  }

  if (absoluteDiff < HOUR_IN_MS) {
    return {
      value: Math.round(diffInMs / MINUTE_IN_MS),
      unit: 'minute',
    };
  }

  if (absoluteDiff < DAY_IN_MS) {
    return {
      value: Math.round(diffInMs / HOUR_IN_MS),
      unit: 'hour',
    };
  }

  if (absoluteDiff < MONTH_IN_MS) {
    return {
      value: Math.round(diffInMs / DAY_IN_MS),
      unit: 'day',
    };
  }

  if (absoluteDiff < YEAR_IN_MS) {
    return {
      value: Math.round(diffInMs / MONTH_IN_MS),
      unit: 'month',
    };
  }

  return {
    value: Math.round(diffInMs / YEAR_IN_MS),
    unit: 'year',
  };
}

export function formatRelativeTime(
  value: DateInput,
  options: FormatRelativeTimeOptions = {},
): string {
  const date = parseDateInput(value);
  const now = parseDateInput(options.now) ?? new Date();

  if (!date) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const diffInMs = date.getTime() - now.getTime();
  const relativeTime = getRelativeTimeUnit(diffInMs);

  return new Intl.RelativeTimeFormat(options.locale ?? DEFAULT_LOCALE, {
    numeric: options.numeric ?? 'auto',
    style: options.style ?? 'long',
  }).format(relativeTime.value, relativeTime.unit);
}

export function formatDateRange(
  startValue: DateInput,
  endValue: DateInput,
  options: FormatDateOptions = {},
): string {
  const startDate = parseDateInput(startValue);
  const endDate = parseDateInput(endValue);
  const fallback = options.fallback ?? DEFAULT_FALLBACK;

  if (!startDate && !endDate) {
    return fallback;
  }

  if (startDate && !endDate) {
    return `${formatDate(startDate, options)} onward`;
  }

  if (!startDate && endDate) {
    return `Until ${formatDate(endDate, options)}`;
  }

  return `${formatDate(startDate, options)} – ${formatDate(endDate, options)}`;
}

export function toIsoDateString(value: DateInput): string | null {
  const date = parseDateInput(value);

  if (!date) {
    return null;
  }

  return date.toISOString().split('T')[0] ?? null;
}
