// src/hooks/use-pagination.ts

/**
 * File purpose:
 * Provides pagination state helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook supports admin tables and list screens including users, staff,
 * review queues, documents, payments, bookings, messages, API access, AI,
 * audit logs, and settings.
 *
 * Key exports:
 * - usePagination manages page, limit, total, and navigation helpers.
 *
 * Business relevance:
 * Consistent pagination keeps admin list screens predictable and usable.
 * Frontend pagination does not replace backend pagination, resource visibility,
 * or permission checks.
 *
 * Security note:
 * Backend endpoints must still enforce pagination limits, filter allow-lists,
 * sort allow-lists, staff permissions, and resource visibility.
 */

'use client';

import { useCallback, useMemo, useState } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  initialTotal?: number;
  maxLimit?: number;
}

export interface UsePaginationResult {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetPagination: () => void;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const DEFAULT_MAX_LIMIT = 100;

function clampPositiveInteger(value: number, fallback: number): number {
  if (!Number.isFinite(value) || value < 1) {
    return fallback;
  }

  return Math.floor(value);
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationResult {
  const maxLimit = options.maxLimit ?? DEFAULT_MAX_LIMIT;
  const initialPage = clampPositiveInteger(options.initialPage ?? DEFAULT_PAGE, DEFAULT_PAGE);
  const initialLimit = Math.min(
    clampPositiveInteger(options.initialLimit ?? DEFAULT_LIMIT, DEFAULT_LIMIT),
    maxLimit,
  );

  const [page, setPageState] = useState<number>(initialPage);
  const [limit, setLimitState] = useState<number>(initialLimit);
  const [total, setTotalState] = useState<number>(
    Math.max(0, Math.floor(options.initialTotal ?? 0)),
  );

  const totalPages = useMemo(() => {
    if (total <= 0) {
      return 1;
    }

    return Math.max(1, Math.ceil(total / limit));
  }, [limit, total]);

  const setPage = useCallback(
    (nextPageValue: number) => {
      const safePage = clampPositiveInteger(nextPageValue, DEFAULT_PAGE);

      setPageState(Math.min(safePage, totalPages));
    },
    [totalPages],
  );

  const setLimit = useCallback(
    (nextLimitValue: number) => {
      const safeLimit = Math.min(
        clampPositiveInteger(nextLimitValue, DEFAULT_LIMIT),
        maxLimit,
      );

      setLimitState(safeLimit);
      setPageState(DEFAULT_PAGE);
    },
    [maxLimit],
  );

  const setTotal = useCallback((nextTotalValue: number) => {
    const safeTotal = Number.isFinite(nextTotalValue) ? Math.max(0, Math.floor(nextTotalValue)) : 0;

    setTotalState(safeTotal);
  }, []);

  const nextPage = useCallback(() => {
    setPageState((currentPage) => Math.min(currentPage + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setPageState((currentPage) => Math.max(currentPage - 1, DEFAULT_PAGE));
  }, []);

  const resetPagination = useCallback(() => {
    setPageState(initialPage);
    setLimitState(initialLimit);
    setTotalState(Math.max(0, Math.floor(options.initialTotal ?? 0)));
  }, [initialLimit, initialPage, options.initialTotal]);

  return {
    page,
    limit,
    total,
    totalPages,
    hasPreviousPage: page > DEFAULT_PAGE,
    hasNextPage: page < totalPages,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    previousPage,
    resetPagination,
  };
}
