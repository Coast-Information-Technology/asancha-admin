// src/hooks/use-table-state.ts

/**
 * File purpose:
 * Provides table state management for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook centralises table page, limit, search, sorting, and filters for
 * reusable admin tables.
 *
 * Key exports:
 * - useTableState manages table query state.
 *
 * Business relevance:
 * Admin modules rely on consistent table behaviour for users, staff, profiles,
 * companies, properties, listings, documents, verification reviews, payments,
 * bookings, messages, API access, AI, audit logs, and settings.
 *
 * Security note:
 * Frontend table state does not authorize data access. Backend list endpoints
 * must enforce staff permissions, resource visibility, pagination limits,
 * sorting allow-lists, filter allow-lists, and redaction.
 */

'use client';

import { useCallback, useMemo, useState } from 'react';

import {
  createDefaultTableQueryState,
  normaliseTableQuery,
  tableQueryToQueryString,
  type SortDirection,
  type TableQueryOptions,
  type TableQueryState,
  type TableSortState,
} from '../lib/utils/table-query';

export interface UseTableStateOptions extends TableQueryOptions {
  initialState?: Partial<TableQueryState>;
}

export interface UseTableStateResult {
  state: TableQueryState;
  queryString: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  setSort: (sortBy: string, sortDirection?: SortDirection) => void;
  clearSort: () => void;
  setFilter: (key: string, value: string) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  resetTable: () => void;
}

export function useTableState(options: UseTableStateOptions = {}): UseTableStateResult {
  const initialState = useMemo(() => {
    return normaliseTableQuery(
      {
        ...createDefaultTableQueryState(options),
        ...options.initialState,
      },
      options,
    );
  }, [options]);

  const [state, setState] = useState<TableQueryState>(initialState);

  const updateState = useCallback(
    (updater: (currentState: TableQueryState) => Partial<TableQueryState>) => {
      setState((currentState) => {
        return normaliseTableQuery(
          {
            ...currentState,
            ...updater(currentState),
          },
          options,
        );
      });
    },
    [options],
  );

  const setPage = useCallback(
    (page: number) => {
      updateState(() => ({ page }));
    },
    [updateState],
  );

  const setLimit = useCallback(
    (limit: number) => {
      updateState(() => ({
        page: 1,
        limit,
      }));
    },
    [updateState],
  );

  const setSearch = useCallback(
    (search: string) => {
      updateState(() => ({
        page: 1,
        search,
      }));
    },
    [updateState],
  );

  const setSort = useCallback(
    (sortBy: string, sortDirection: SortDirection = 'desc') => {
      const sort: TableSortState = {
        sortBy,
        sortDirection,
      };

      updateState(() => ({
        page: 1,
        sort,
      }));
    },
    [updateState],
  );

  const clearSort = useCallback(() => {
    updateState(() => ({
      page: 1,
      sort: null,
    }));
  }, [updateState]);

  const setFilter = useCallback(
    (key: string, value: string) => {
      updateState((currentState) => ({
        page: 1,
        filters: {
          ...currentState.filters,
          [key]: value,
        },
      }));
    },
    [updateState],
  );

  const removeFilter = useCallback(
    (key: string) => {
      updateState((currentState) => {
        const nextFilters = { ...currentState.filters };

        delete nextFilters[key];

        return {
          page: 1,
          filters: nextFilters,
        };
      });
    },
    [updateState],
  );

  const clearFilters = useCallback(() => {
    updateState(() => ({
      page: 1,
      filters: {},
    }));
  }, [updateState]);

  const resetTable = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const queryString = useMemo(() => {
    return tableQueryToQueryString(state, options);
  }, [options, state]);

  return {
    state,
    queryString,
    setPage,
    setLimit,
    setSearch,
    setSort,
    clearSort,
    setFilter,
    removeFilter,
    clearFilters,
    resetTable,
  };
}
