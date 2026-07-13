// src/store/admin-search.store.ts

/**
 * File purpose:
 * Provides global admin search state for the Asancha Admin frontend.
 *
 * Role in the project:
 * This Zustand store manages global search query, search scope, recent search
 * items, loading state, and search result previews for the admin top bar,
 * command menu, and search screens.
 *
 * Key exports:
 * - useAdminSearchStore exposes global search state and safe update actions.
 *
 * Business relevance:
 * Staff search must use safe public IDs and approved scopes. Customer care must
 * only receive support-safe results where backend permissions allow.
 *
 * Security note:
 * Search state is frontend-only. Backend search endpoints must enforce staff
 * permissions, resource visibility, redaction, query allow-lists, and must not
 * return MongoDB ObjectIds, secrets, private document URLs, or internal notes to
 * unauthorised staff.
 */

'use client';

import { create } from 'zustand';

export type AdminSearchScope =
  | 'all'
  | 'users'
  | 'staff'
  | 'profiles'
  | 'companies'
  | 'properties'
  | 'listings'
  | 'documents'
  | 'verification_reviews'
  | 'payments'
  | 'bookings'
  | 'messages'
  | 'api_access'
  | 'audit_logs';

export type AdminSearchResultType =
  | 'user'
  | 'staff'
  | 'profile'
  | 'company'
  | 'property'
  | 'listing'
  | 'document'
  | 'verification_review'
  | 'payment'
  | 'booking'
  | 'conversation'
  | 'api_client'
  | 'audit_log';

export interface AdminSearchResult {
  publicId: string;
  type: AdminSearchResultType;
  title: string;
  subtitle?: string;
  href: string;
  status?: string;
}

export interface RecentAdminSearch {
  query: string;
  scope: AdminSearchScope;
  createdAt: string;
}

export interface AdminSearchState {
  query: string;
  scope: AdminSearchScope;
  results: readonly AdminSearchResult[];
  recentSearches: readonly RecentAdminSearch[];
  commandMenuOpen: boolean;
  loading: boolean;
  errorMessage: string | null;
  setQuery: (query: string) => void;
  setScope: (scope: AdminSearchScope) => void;
  setResults: (results: readonly AdminSearchResult[]) => void;
  addRecentSearch: (query: string, scope?: AdminSearchScope) => void;
  clearRecentSearches: () => void;
  setCommandMenuOpen: (commandMenuOpen: boolean) => void;
  openCommandMenu: () => void;
  closeCommandMenu: () => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  resetSearch: () => void;
}

const MAX_RECENT_SEARCHES = 8;

function normaliseSearchQuery(query: string): string {
  return query.trim().slice(0, 200);
}

export const useAdminSearchStore = create<AdminSearchState>((set, get) => ({
  query: '',
  scope: 'all',
  results: [],
  recentSearches: [],
  commandMenuOpen: false,
  loading: false,
  errorMessage: null,

  setQuery: (query) => {
    set({
      query: normaliseSearchQuery(query),
    });
  },

  setScope: (scope) => {
    set({
      scope,
    });
  },

  setResults: (results) => {
    set({
      results: [...results],
      errorMessage: null,
    });
  },

  addRecentSearch: (query, scope) => {
    const normalisedQuery = normaliseSearchQuery(query);

    if (normalisedQuery.length === 0) {
      return;
    }

    const searchScope = scope ?? get().scope;
    const nextSearch: RecentAdminSearch = {
      query: normalisedQuery,
      scope: searchScope,
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const dedupedSearches = state.recentSearches.filter((item) => {
        return item.query !== normalisedQuery || item.scope !== searchScope;
      });

      return {
        recentSearches: [nextSearch, ...dedupedSearches].slice(0, MAX_RECENT_SEARCHES),
      };
    });
  },

  clearRecentSearches: () => {
    set({
      recentSearches: [],
    });
  },

  setCommandMenuOpen: (commandMenuOpen) => {
    set({
      commandMenuOpen,
    });
  },

  openCommandMenu: () => {
    set({
      commandMenuOpen: true,
    });
  },

  closeCommandMenu: () => {
    set({
      commandMenuOpen: false,
    });
  },

  setLoading: (loading) => {
    set({
      loading,
    });
  },

  setErrorMessage: (errorMessage) => {
    set({
      errorMessage,
    });
  },

  resetSearch: () => {
    set({
      query: '',
      scope: 'all',
      results: [],
      loading: false,
      errorMessage: null,
    });
  },
}));
