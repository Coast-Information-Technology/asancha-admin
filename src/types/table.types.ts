// src/types/table.types.ts

/**
 * File purpose:
 * Defines shared table types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises table column, table action, sorting, filtering, row
 * selection, and empty/error state types used by reusable admin table
 * components and feature modules.
 *
 * Key exports:
 * - TableColumn defines reusable table columns.
 * - TableAction defines row/header actions.
 * - TableState defines safe table UI state.
 *
 * Business relevance:
 * Admin tables are used heavily across operational modules. They must support
 * safe filtering, pagination, sorting, row actions, empty states, and permission
 * awareness.
 *
 * Security note:
 * Table visibility and disabled actions are frontend guidance only. Backend
 * endpoints must still enforce permissions, redaction, resource visibility, and
 * mutation rules.
 */

import type { PaginationMeta } from './pagination.types';

export type TableSortDirection = 'asc' | 'desc';

export type TableDensity = 'comfortable' | 'compact';

export type TableColumnAlign = 'left' | 'center' | 'right';

export interface TableColumn<TItem> {
  key: string;
  header: string;
  accessor?: keyof TItem;
  sortable?: boolean;
  align?: TableColumnAlign;
  width?: string;
  hideOnMobile?: boolean;
}

export interface TableSortState {
  sortBy: string;
  sortDirection: TableSortDirection;
}

export interface TableFilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TableFilterDefinition {
  key: string;
  label: string;
  options?: readonly TableFilterOption[];
  placeholder?: string;
}

export interface TableAction<TItem> {
  key: string;
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  href?: (item: TItem) => string;
  onSelect?: (item: TItem) => void | Promise<void>;
  disabled?: (item: TItem) => boolean;
  hidden?: (item: TItem) => boolean;
}

export interface TableState {
  page: number;
  limit: number;
  search: string;
  sort: TableSortState | null;
  filters: Record<string, string>;
  density: TableDensity;
}

export interface TableDataState<TItem> {
  items: readonly TItem[];
  meta: PaginationMeta;
  loading: boolean;
  errorMessage: string | null;
}

export interface TableEmptyState {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface TableSelectionState {
  selectedPublicIds: readonly string[];
  allSelected: boolean;
}
