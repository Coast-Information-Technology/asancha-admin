// src/lib/formatters/currency.ts

/**
 * File purpose:
 * Provides safe currency formatting helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises how monetary values are displayed across payments,
 * deal reservations, listings, API access billing, dashboards, review queues,
 * and admin tables.
 *
 * Key exports:
 * - CurrencyCode defines supported display currency codes.
 * - formatCurrency formats a numeric amount for UI display.
 * - formatCurrencyRange formats min/max monetary ranges.
 * - normaliseCurrencyAmount safely converts unknown numeric input.
 *
 * Business relevance:
 * Payment and deal values are sensitive operational data. The frontend must
 * display money consistently and safely without inventing payment truth,
 * bypassing backend payment verification, or exposing provider/internal
 * payment details.
 *
 * Security note:
 * Currency formatting is display-only. The backend remains the final authority
 * for payment references, expected amount, expected currency, payment status,
 * provider verification, audit logs, and paid-action access.
 */

export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'NGN';

export type CurrencyDisplayMode = 'symbol' | 'code' | 'name' | 'narrowSymbol';

export interface FormatCurrencyOptions {
  currency?: CurrencyCode;
  locale?: string;
  fallback?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: CurrencyDisplayMode;
  compact?: boolean;
  showPositiveSign?: boolean;
}

export interface FormatCurrencyRangeOptions extends FormatCurrencyOptions {
  separator?: string;
}

const DEFAULT_CURRENCY: CurrencyCode = 'GBP';
const DEFAULT_LOCALE = 'en-GB';
const DEFAULT_FALLBACK = '—';

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

export function normaliseCurrencyAmount(value: unknown): number | null {
  if (typeof value === 'number') {
    return isFiniteNumber(value) ? value : null;
  }

  if (typeof value === 'string') {
    const cleanedValue = value.replace(/,/g, '').trim();

    if (cleanedValue.length === 0) {
      return null;
    }

    const parsedValue = Number(cleanedValue);

    return isFiniteNumber(parsedValue) ? parsedValue : null;
  }

  return null;
}

export function formatCurrency(
  value: unknown,
  options: FormatCurrencyOptions = {},
): string {
  const amount = normaliseCurrencyAmount(value);

  if (amount === null) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  const formatter = new Intl.NumberFormat(options.locale ?? DEFAULT_LOCALE, {
    style: 'currency',
    currency: options.currency ?? DEFAULT_CURRENCY,
    currencyDisplay: options.currencyDisplay ?? 'symbol',
    notation: options.compact ? 'compact' : 'standard',
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits,
    signDisplay: options.showPositiveSign ? 'exceptZero' : 'auto',
  });

  return formatter.format(amount);
}

export function formatCurrencyRange(
  minValue: unknown,
  maxValue: unknown,
  options: FormatCurrencyRangeOptions = {},
): string {
  const fallback = options.fallback ?? DEFAULT_FALLBACK;
  const separator = options.separator ?? ' – ';

  const minAmount = normaliseCurrencyAmount(minValue);
  const maxAmount = normaliseCurrencyAmount(maxValue);

  if (minAmount === null && maxAmount === null) {
    return fallback;
  }

  if (minAmount !== null && maxAmount === null) {
    return `${formatCurrency(minAmount, options)}+`;
  }

  if (minAmount === null && maxAmount !== null) {
    return `Up to ${formatCurrency(maxAmount, options)}`;
  }

  return `${formatCurrency(minAmount, options)}${separator}${formatCurrency(maxAmount, options)}`;
}

export function formatCompactCurrency(
  value: unknown,
  options: FormatCurrencyOptions = {},
): string {
  return formatCurrency(value, {
    ...options,
    compact: true,
    maximumFractionDigits: options.maximumFractionDigits ?? 1,
  });
}

export function formatSignedCurrency(
  value: unknown,
  options: FormatCurrencyOptions = {},
): string {
  return formatCurrency(value, {
    ...options,
    showPositiveSign: true,
  });
}

export function formatPenceAsCurrency(
  valueInPence: unknown,
  options: FormatCurrencyOptions = {},
): string {
  const amount = normaliseCurrencyAmount(valueInPence);

  if (amount === null) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  return formatCurrency(amount / 100, options);
}

export function formatKoboAsCurrency(
  valueInKobo: unknown,
  options: FormatCurrencyOptions = {},
): string {
  const amount = normaliseCurrencyAmount(valueInKobo);

  if (amount === null) {
    return options.fallback ?? DEFAULT_FALLBACK;
  }

  return formatCurrency(amount / 100, {
    ...options,
    currency: options.currency ?? 'NGN',
    locale: options.locale ?? 'en-NG',
  });
}
