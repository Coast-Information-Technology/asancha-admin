/**
 * File purpose:
 * Provides a typed, accessible DataTable primitive for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * Used as the base for users, staff, queues, payments, documents, bookings,
 * messages, API access, AI, audit logs, and settings tables.
 *
 * Security note:
 * DataTable action visibility is UI guidance only. Backend permissions remain
 * the final authority.
 */

'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { Button } from '../button/button';
import { EmptyState } from '../empty-state/empty-state';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table/table';

import styles from './data-table.module.css';

export type DataTableSortDirection = 'asc' | 'desc';

export interface DataTableSortState {
  columnKey: string;
  direction: DataTableSortDirection;
}

export interface DataTableColumn<TItem> {
  key: string;
  header: string;
  render: (item: TItem) => ReactNode;
  hideOnMobile?: boolean;
  sortable?: boolean;
  sortValue?: (item: TItem) => string | number | Date | null | undefined;
}

export interface DataTableAction<TItem> {
  key: string;
  label: string;
  onSelect: (item: TItem) => void;
  hidden?: (item: TItem) => boolean;
  disabled?: (item: TItem) => boolean;
}

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableFilter<TItem> {
  key: string;
  label: string;
  options: readonly DataTableFilterOption[];
  getValue: (item: TItem) => string;
  initialValue?: string;
}

export interface DataTableSearchOptions<TItem> {
  label?: string;
  placeholder?: string;
  initialValue?: string;
  value?: string;
  getSearchText?: (item: TItem) => string;
  onChange?: (value: string) => void;
}

export interface DataTablePaginationOptions {
  mode?: 'client' | 'server';
  initialPage?: number;
  initialPageSize?: number;
  page?: number;
  pageSize?: number;
  total?: number;
  pageSizeOptions?: readonly number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface DataTableProps<TItem> {
  items: readonly TItem[];
  columns: readonly DataTableColumn<TItem>[];
  getRowKey: (item: TItem) => string;
  actions?: readonly DataTableAction<TItem>[];
  search?: DataTableSearchOptions<TItem>;
  filters?: readonly DataTableFilter<TItem>[];
  initialSort?: DataTableSortState | null;
  sort?: DataTableSortState | null;
  onSortChange?: (sort: DataTableSortState | null) => void;
  pagination?: DataTablePaginationOptions;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

type SortValue = string | number | Date | null | undefined;

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

function compareSortValues(first: SortValue, second: SortValue): number {
  if (first === null || first === undefined) {
    return second === null || second === undefined ? 0 : 1;
  }

  if (second === null || second === undefined) {
    return -1;
  }

  if (first instanceof Date && second instanceof Date) {
    return first.getTime() - second.getTime();
  }

  if (typeof first === 'number' && typeof second === 'number') {
    return first - second;
  }

  return String(first).localeCompare(String(second), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function getNextSortState(
  currentSort: DataTableSortState | null,
  columnKey: string,
): DataTableSortState {
  if (!currentSort || currentSort.columnKey !== columnKey) {
    return { columnKey, direction: 'asc' };
  }

  return {
    columnKey,
    direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
  };
}

function getPageSize(value: number | undefined): number {
  return Number.isFinite(value) && value && value > 0 ? Math.floor(value) : DEFAULT_PAGE_SIZE;
}

export function DataTable<TItem>({
  items,
  columns,
  getRowKey,
  actions = [],
  search,
  filters = [],
  initialSort = null,
  sort,
  onSortChange,
  pagination,
  loading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your filters or search terms.',
}: DataTableProps<TItem>) {
  const [internalSearch, setInternalSearch] = useState(search?.initialValue ?? '');
  const [internalFilters, setInternalFilters] = useState<Record<string, string>>(() => {
    return Object.fromEntries(
      filters
        .filter((filter) => filter.initialValue)
        .map((filter) => [filter.key, filter.initialValue as string]),
    );
  });
  const [internalSort, setInternalSort] = useState<DataTableSortState | null>(initialSort);
  const [internalPage, setInternalPage] = useState(pagination?.initialPage ?? 1);
  const [internalPageSize, setInternalPageSize] = useState(
    getPageSize(pagination?.initialPageSize ?? pagination?.pageSize),
  );

  const searchValue = search?.value ?? internalSearch;
  const activeSort = sort === undefined ? internalSort : sort;
  const pageSize = getPageSize(pagination?.pageSize ?? internalPageSize);
  const currentPage = Math.max(1, pagination?.page ?? internalPage);
  const isServerPagination = pagination?.mode === 'server';

  const filteredItems = useMemo(() => {
    const query = searchValue.trim().toLocaleLowerCase();
    const getSearchText = search?.getSearchText ?? ((item: TItem) => String(item));

    return items.filter((item) => {
      const matchesSearch =
        query.length === 0 || getSearchText(item).toLocaleLowerCase().includes(query);
      const matchesFilters = filters.every((filter) => {
        const selectedValue = internalFilters[filter.key];

        return !selectedValue || filter.getValue(item) === selectedValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [filters, internalFilters, items, search?.getSearchText, searchValue]);

  const sortedItems = useMemo(() => {
    if (!activeSort) {
      return filteredItems;
    }

    const column = columns.find((candidate) => candidate.key === activeSort.columnKey);

    if (!column?.sortValue || column.sortable === false) {
      return filteredItems;
    }

    return [...filteredItems].sort((firstItem, secondItem) => {
      const comparison = compareSortValues(
        column.sortValue?.(firstItem),
        column.sortValue?.(secondItem),
      );

      return activeSort.direction === 'asc' ? comparison : comparison * -1;
    });
  }, [activeSort, columns, filteredItems]);

  const totalItems = isServerPagination ? (pagination?.total ?? items.length) : sortedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const visibleItems = isServerPagination
    ? sortedItems
    : sortedItems.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);
  const firstVisibleItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const lastVisibleItem = isServerPagination
    ? Math.min(safeCurrentPage * pageSize, totalItems)
    : Math.min(safeCurrentPage * pageSize, totalItems);

  const updatePage = (nextPage: number) => {
    const safePage = Math.min(Math.max(1, nextPage), totalPages);

    if (pagination?.page === undefined) {
      setInternalPage(safePage);
    }

    pagination?.onPageChange?.(safePage);
  };

  const updatePageSize = (nextPageSize: number) => {
    const safePageSize = getPageSize(nextPageSize);

    if (pagination?.pageSize === undefined) {
      setInternalPageSize(safePageSize);
    }

    if (pagination?.page === undefined) {
      setInternalPage(1);
    }

    pagination?.onPageSizeChange?.(safePageSize);
    pagination?.onPageChange?.(1);
  };

  const updateSearch = (value: string) => {
    if (search?.value === undefined) {
      setInternalSearch(value);
    }

    search?.onChange?.(value);
    updatePage(1);
  };

  const updateFilter = (key: string, value: string) => {
    setInternalFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
    updatePage(1);
  };

  const updateSort = (columnKey: string) => {
    const nextSort = getNextSortState(activeSort, columnKey);

    if (sort === undefined) {
      setInternalSort(nextSort);
    }

    onSortChange?.(nextSort);
  };

  if (loading) {
    return (
      <div className={styles.state} role="status">
        Loading records…
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState description={emptyDescription} title={emptyTitle} />;
  }

  const pageSizeOptions = pagination?.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS;
  const hasToolbar = Boolean(search || filters.length > 0);
  const hasPagination = Boolean(pagination);

  return (
    <div className={styles.root}>
      {hasToolbar ? (
        <div aria-label="Table filters" className={styles.toolbar}>
          {search ? (
            <Input
              aria-label={search.label ?? 'Search records'}
              label={search.label ?? 'Search'}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder={search.placeholder ?? 'Search records'}
              type="search"
              value={searchValue}
            />
          ) : null}

          {filters.map((filter) => (
            <Select
              aria-label={filter.label}
              key={filter.key}
              label={filter.label}
              onChange={(event) => updateFilter(filter.key, event.target.value)}
              options={filter.options}
              value={internalFilters[filter.key] ?? ''}
            />
          ))}
        </div>
      ) : null}

      {visibleItems.length === 0 ? (
        <EmptyState
          description="No records match the current search or filters. Try adjusting them."
          title="No matching records"
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const sortable = Boolean(column.sortValue) && column.sortable !== false;
                const isActiveSort = activeSort?.columnKey === column.key;
                const ariaSort = isActiveSort
                  ? activeSort?.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : sortable
                    ? 'none'
                    : undefined;

                return (
                  <TableHead
                    aria-sort={ariaSort}
                    className={column.hideOnMobile ? styles.hideOnMobile : undefined}
                    key={column.key}
                  >
                    {sortable ? (
                      <button
                        aria-label={`Sort by ${column.header}`}
                        className={styles.sortButton}
                        onClick={() => updateSort(column.key)}
                        type="button"
                      >
                        <span>{column.header}</span>
                        <span aria-hidden="true" className={styles.sortIndicator}>
                          {isActiveSort ? (activeSort?.direction === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                );
              })}
              {actions.length > 0 ? <TableHead>Actions</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleItems.map((item) => (
              <TableRow key={getRowKey(item)}>
                {columns.map((column) => (
                  <TableCell
                    className={column.hideOnMobile ? styles.hideOnMobile : undefined}
                    key={column.key}
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
                {actions.length > 0 ? (
                  <TableCell>
                    <div className={styles.actions}>
                      {actions
                        .filter((action) => !action.hidden?.(item))
                        .map((action) => (
                          <Button
                            disabled={action.disabled?.(item)}
                            key={action.key}
                            onClick={() => action.onSelect(item)}
                            size="sm"
                            variant="secondary"
                          >
                            {action.label}
                          </Button>
                        ))}
                    </div>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {hasPagination ? (
        <div className={styles.pagination}>
          <span aria-live="polite" className={styles.paginationSummary}>
            Showing {firstVisibleItem}–{lastVisibleItem} of {totalItems}
          </span>
          <div className={styles.paginationControls}>
            <Select
              aria-label="Rows per page"
              className={styles.pageSizeSelect}
              label="Rows per page"
              onChange={(event) => updatePageSize(Number(event.target.value))}
              options={pageSizeOptions.map((option) => ({
                label: String(option),
                value: String(option),
              }))}
              value={String(pageSize)}
            />
            <Button
              disabled={safeCurrentPage <= 1}
              onClick={() => updatePage(safeCurrentPage - 1)}
              size="sm"
              variant="secondary"
            >
              Previous
            </Button>
            <span
              aria-label={`Page ${safeCurrentPage} of ${totalPages}`}
              className={styles.pageLabel}
            >
              Page {safeCurrentPage} of {totalPages}
            </span>
            <Button
              disabled={safeCurrentPage >= totalPages}
              onClick={() => updatePage(safeCurrentPage + 1)}
              size="sm"
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
