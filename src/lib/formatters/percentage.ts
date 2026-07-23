// src/lib/formatters/percentage.ts

/**
 * File purpose:
 * Provides safe percentage formatting helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises percentage display for dashboard metrics, completion
 * scores, AI confidence scores, matching snapshots, review progress, API usage,
 * conversion rates, and operational reports.
 *
 * Key exports:
 * - PercentageInputScale defines whether values are decimal or percent-based.
 * - formatPercentage formats a value as a percentage label.
 * - formatPercentageChange formats signed percentage movement.
 *
 * Business relevance:
 * Percentages can influence operational review decisions. The frontend must
 * display them clearly without implying guaranteed financial, legal, AI,
 * verification, or investment outcomes.
 *
 * Security note:
 * Percentage formatting is display-only. Backend-calculated scores, AI
 * confidence levels, matching decisions, verification outcomes, and payment
 * rules remain the source of truth.
 */

export type PercentageInputScale = 'decimal' | 'percent';

export interface FormatPercentageOptions {
  locale?: string;
  fallback?: string;
  inputScale?: PercentageInputScale;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showPositiveSign?: boolean;
}

const DEFAULT_LOCALE = 'en-GB';
const DEFAULT_FALLBACK = '—';

function normalisePercentageValue(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string') {
    const cleanedValue = value.replace('%', '').replace(/,/g, '').trim();

    if (cleanedValue.length === 0) {
      return null;
    }

    const parsedValue = Number(cleanedValue);

    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
}

export function formatPercentage(value: unknown, options: FormatPercentageOptions = {}): string {
  const parsedValue = normalisePercentageValue(value);

  if (parsedValue === null) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const inputScale = options.inputScale ?? 'decimal';
  const decimalValue = inputScale === 'percent' ? parsedValue / 100 : parsedValue;

  return new Intl.NumberFormat(options.locale ?? DEFAULT_LOCALE, {
    style: 'percent',
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    signDisplay: options.showPositiveSign ? 'exceptZero' : 'auto',
  }).format(decimalValue);
}

export function formatPercentageFromPercentValue(
  value: unknown,
  options: FormatPercentageOptions = {},
): string {
  return formatPercentage(value, {
    ...options,
    inputScale: 'percent',
  });
}

export function formatPercentageChange(
  value: unknown,
  options: FormatPercentageOptions = {},
): string {
  return formatPercentage(value, {
    ...options,
    showPositiveSign: true,
  });
}

export function formatCompletionPercentage(
  value: unknown,
  options: FormatPercentageOptions = {},
): string {
  const parsedValue = normalisePercentageValue(value);

  if (parsedValue === null) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const inputScale = options.inputScale ?? 'decimal';
  const decimalValue = inputScale === 'percent' ? parsedValue / 100 : parsedValue;
  const clampedValue = Math.min(Math.max(decimalValue, 0), 1);

  return formatPercentage(clampedValue, {
    ...options,
    inputScale: 'decimal',
  });
}

export function normalisePercentageForProgress(
  value: unknown,
  inputScale: PercentageInputScale = 'decimal',
): number {
  const parsedValue = normalisePercentageValue(value);

  if (parsedValue === null) {
    return 0;
  }

  const decimalValue = inputScale === 'percent' ? parsedValue / 100 : parsedValue;

  return Math.min(Math.max(decimalValue, 0), 1);
}
