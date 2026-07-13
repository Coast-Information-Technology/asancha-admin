// src/store/ui.store.ts

/**
 * File purpose:
 * Provides shared UI state for the Asancha Admin frontend.
 *
 * Role in the project:
 * This Zustand store manages global UI preferences and temporary UI state such
 * as theme, table density, page title, command palette state, and global loading
 * overlay state.
 *
 * Key exports:
 * - useUiStore exposes shared UI state and safe update helpers.
 *
 * Business relevance:
 * Internal admin screens must remain predictable, accessible, and operationally
 * usable across dense review, support, payment, verification, and audit flows.
 *
 * Security note:
 * UI state must not store secrets, tokens, full API keys, webhook secrets,
 * private document URLs, internal notes, raw KYC files, MongoDB ObjectIds, or
 * backend-only permission truth.
 */

'use client';

import { create } from 'zustand';

export type AdminThemePreference = 'system' | 'light' | 'dark';
export type AdminTableDensity = 'comfortable' | 'compact';

export interface GlobalLoadingState {
  active: boolean;
  label: string;
}

export interface UiState {
  theme: AdminThemePreference;
  tableDensity: AdminTableDensity;
  pageTitle: string;
  pageDescription: string | null;
  globalLoading: GlobalLoadingState;
  setTheme: (theme: AdminThemePreference) => void;
  setTableDensity: (tableDensity: AdminTableDensity) => void;
  setPageMeta: (title: string, description?: string | null) => void;
  clearPageMeta: () => void;
  setGlobalLoading: (active: boolean, label?: string) => void;
  resetUi: () => void;
}

const DEFAULT_PAGE_TITLE = 'Asancha Admin';

export const useUiStore = create<UiState>((set) => ({
  theme: 'system',
  tableDensity: 'comfortable',
  pageTitle: DEFAULT_PAGE_TITLE,
  pageDescription: null,
  globalLoading: {
    active: false,
    label: 'Loading',
  },

  setTheme: (theme) => {
    set({
      theme,
    });
  },

  setTableDensity: (tableDensity) => {
    set({
      tableDensity,
    });
  },

  setPageMeta: (title, description = null) => {
    set({
      pageTitle: title.trim().length > 0 ? title : DEFAULT_PAGE_TITLE,
      pageDescription: description,
    });
  },

  clearPageMeta: () => {
    set({
      pageTitle: DEFAULT_PAGE_TITLE,
      pageDescription: null,
    });
  },

  setGlobalLoading: (active, label = 'Loading') => {
    set({
      globalLoading: {
        active,
        label,
      },
    });
  },

  resetUi: () => {
    set({
      theme: 'system',
      tableDensity: 'comfortable',
      pageTitle: DEFAULT_PAGE_TITLE,
      pageDescription: null,
      globalLoading: {
        active: false,
        label: 'Loading',
      },
    });
  },
}));
