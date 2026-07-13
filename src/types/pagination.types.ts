// src/types/pagination.types.ts

/**
 * File purpose:
 * Defines shared pagination types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises pagination query, pagination metadata, cursor metadata,
 * and page control contracts used by admin list screens and API features.
 *
 * Key exports:
 * - PaginationQuery defines page/limit query input.
 * - PaginationMeta defines paginated response metadata.
 * - PaginationControls defines UI control state.
 *
 * Business relevance:
 * Admin list screens must handle pagination consistently across users, staff,
 * reviews, documents, payments, bookings, messages, API access, AI, audit logs,
 * and settings.
 *
 * Security note:
 * Frontend pagination is not data security. Backend endpoints must enforce
 * maximum limits, staff permissions, resource visibility, filtering allow-lists,
 * and sorting allow-lists.
 */

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CursorPaginationQuery {
  cursor?: string;
  limit?: number;
}

export interface CursorPaginationMeta {
  nextCursor?: string | null;
  previousCursor?: string | null;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<TItem> {
  items: readonly TItem[];
  meta: PaginationMeta;
}

export interface CursorPaginatedResult<TItem> {
  items: readonly TItem[];
  meta: CursorPaginationMeta;
}

export interface PaginationControls {
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}
