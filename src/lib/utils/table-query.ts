// src/lib/utils/table-query.ts

/**
 * File purpose:
 * Provides table query parsing and serialisation helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file centralises pagination, search, sorting, and filter query handling
 * for admin tables such as users, staff, reviews, documents, payments, bookings,
 * messages, API access, audit logs, and settings lists.
 *
 * Key exports:
 * - TableQueryState defines a safe frontend table query shape.
 * - parseTableQueryFromSearchParams parses URLSearchParams into table state.
 * - serialiseTableQueryToSearchParams converts table state into query params.
 * - normaliseTableQuery clamps unsafe values.
 *
 * Business relevance:
 * Admin list screens must behave consistently and safely. Query helpers must not
 * expose private IDs, internal backend fields, private notes, or sensitive audit
 * filters without explicit backend support.
 *
 * Security note:
 * Table query helpers are client-side convenience utilities. Backend list
 * endpoints must still enforce staff permissions, resource visibility,
 * pagination limits, sorting allow-lists, and filter allow-lists.
 */

export type SortDirection = 'asc' | 'desc';

export interface TableSortState {
  sortBy: string;
  sortDirection: SortDirection;
}

export interface TableQueryState {
  page: number;
  limit: number;
  search: string;
  sort: TableSortState | null;
  filters: Record<string, string>;
}

export interface TableQueryOptions {
  defaultPage?: number;
  defaultLimit?: number;
  maxLimit?: number;
  allowedSortFields?: readonly string[];
  allowedFilterKeys?: readonly string[];
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const DEFAULT_MAX_LIMIT = 100;

function parsePositiveInteger(value: string | null, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

function normaliseLimit(limit: number, maxLimit: number): number {
  return Math.min(Math.max(limit, 1), maxLimit);
}

function normaliseSearch(value: string | null): string {
  if (!value) {
    return '';
  }

  return value.trim().slice(0, 200);
}

function normaliseSortDirection(value: string | null): SortDirection {
  return value === 'asc' ? 'asc' : 'desc';
}

function isAllowedValue(value: string, allowedValues?: readonly string[]): boolean {
  if (!allowedValues || allowedValues.length === 0) {
    return true;
  }

  return allowedValues.includes(value);
}

export function createDefaultTableQueryState(
  options: TableQueryOptions = {},
): TableQueryState {
  return {
    page: options.defaultPage ?? DEFAULT_PAGE,
    limit: options.defaultLimit ?? DEFAULT_LIMIT,
    search: '',
    sort: null,
    filters: {},
  };
}

export function parseTableQueryFromSearchParams(
  searchParams: URLSearchParams,
  options: TableQueryOptions = {},
): TableQueryState {
  const maxLimit = options.maxLimit ?? DEFAULT_MAX_LIMIT;
  const page = parsePositiveInteger(searchParams.get('page'), options.defaultPage ?? DEFAULT_PAGE);
  const limit = normaliseLimit(
    parsePositiveInteger(searchParams.get('limit'), options.defaultLimit ?? DEFAULT_LIMIT),
    maxLimit,
  );

  const search = normaliseSearch(searchParams.get('search'));
  const sortBy = searchParams.get('sortBy')?.trim() ?? '';
  const sortDirection = normaliseSortDirection(searchParams.get('sortDirection'));

  const filters: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (!key.startsWith('filter.')) {
      return;
    }

    const filterKey = key.replace(/^filter\./, '');

    if (!filterKey || !isAllowedValue(filterKey, options.allowedFilterKeys)) {
      return;
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length > 0) {
      filters[filterKey] = trimmedValue;
    }
  });

  return {
    page,
    limit,
    search,
    sort:
      sortBy.length > 0 && isAllowedValue(sortBy, options.allowedSortFields)
        ? {
            sortBy,
            sortDirection,
          }
        : null,
    filters,
  };
}

export function serialiseTableQueryToSearchParams(
  query: TableQueryState,
  options: TableQueryOptions = {},
): URLSearchParams {
  const normalisedQuery = normaliseTableQuery(query, options);
  const searchParams = new URLSearchParams();

  searchParams.set('page', String(normalisedQuery.page));
  searchParams.set('limit', String(normalisedQuery.limit));

  if (normalisedQuery.search.length > 0) {
    searchParams.set('search', normalisedQuery.search);
  }

  if (normalisedQuery.sort) {
    searchParams.set('sortBy', normalisedQuery.sort.sortBy);
    searchParams.set('sortDirection', normalisedQuery.sort.sortDirection);
  }

  Object.entries(normalisedQuery.filters).forEach(([key, value]) => {
    if (value.trim().length > 0) {
      searchParams.set(`filter.${key}`, value);
    }
  });

  return searchParams;
}

export function normaliseTableQuery(
  query: Partial<TableQueryState>,
  options: TableQueryOptions = {},
): TableQueryState {
  const defaultState = createDefaultTableQueryState(options);
  const maxLimit = options.maxLimit ?? DEFAULT_MAX_LIMIT;

  const page = Number.isFinite(query.page) && query.page && query.page > 0 ? query.page : defaultState.page;
  const limit =
    Number.isFinite(query.limit) && query.limit && query.limit > 0
      ? normaliseLimit(query.limit, maxLimit)
      : defaultState.limit;

  const search = typeof query.search === 'string' ? normaliseSearch(query.search) : '';

  const sort: TableSortState | null =
    query.sort && isAllowedValue(query.sort.sortBy, options.allowedSortFields)
      ? {
          sortBy: query.sort.sortBy,
          sortDirection: query.sort.sortDirection === 'asc' ? 'asc' : 'desc',
        }
      : null;

  const filters: Record<string, string> = {};

  Object.entries(query.filters ?? {}).forEach(([key, value]) => {
    if (!isAllowedValue(key, options.allowedFilterKeys)) {
      return;
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length > 0) {
      filters[key] = trimmedValue;
    }
  });

  return {
    page,
    limit,
    search,
    sort,
    filters,
  };
}

export function tableQueryToQueryString(
  query: TableQueryState,
  options: TableQueryOptions = {},
): string {
  return serialiseTableQueryToSearchParams(query, options).toString();
}
