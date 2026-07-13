// src/store/admin-navigation.store.ts

/**
 * File purpose:
 * Provides admin navigation UI state for the Asancha Admin frontend.
 *
 * Role in the project:
 * This Zustand store manages sidebar collapsed state, mobile drawer state,
 * active route tracking, and expanded sidebar groups for the admin shell.
 *
 * Key exports:
 * - useAdminNavigationStore exposes admin navigation state and actions.
 *
 * Business relevance:
 * Navigation must remain role-aware and must not place detail pages in sidebar
 * menus. The frontend menu label must be Messages, while backend conversations
 * remain the thread/container concept.
 *
 * Security note:
 * Navigation state is UI-only. Hiding a link is not security. Middleware,
 * route guards, and backend permission enforcement remain required.
 */

'use client';

import { create } from 'zustand';

export interface AdminNavigationState {
  sidebarCollapsed: boolean;
  mobileDrawerOpen: boolean;
  activePathname: string;
  expandedGroups: readonly string[];
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setMobileDrawerOpen: (mobileDrawerOpen: boolean) => void;
  openMobileDrawer: () => void;
  closeMobileDrawer: () => void;
  setActivePathname: (activePathname: string) => void;
  toggleExpandedGroup: (groupHref: string) => void;
  setExpandedGroups: (expandedGroups: readonly string[]) => void;
  collapseAllGroups: () => void;
  resetNavigation: () => void;
}

function normalisePathname(pathname: string): string {
  if (!pathname || pathname.trim().length === 0) {
    return '/';
  }

  const normalisedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return normalisedPathname.replace(/\/+$/g, '') || '/';
}

export const useAdminNavigationStore = create<AdminNavigationState>((set) => ({
  sidebarCollapsed: false,
  mobileDrawerOpen: false,
  activePathname: '/',
  expandedGroups: [],

  setSidebarCollapsed: (sidebarCollapsed) => {
    set({
      sidebarCollapsed,
    });
  },

  toggleSidebarCollapsed: () => {
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    }));
  },

  setMobileDrawerOpen: (mobileDrawerOpen) => {
    set({
      mobileDrawerOpen,
    });
  },

  openMobileDrawer: () => {
    set({
      mobileDrawerOpen: true,
    });
  },

  closeMobileDrawer: () => {
    set({
      mobileDrawerOpen: false,
    });
  },

  setActivePathname: (activePathname) => {
    set({
      activePathname: normalisePathname(activePathname),
    });
  },

  toggleExpandedGroup: (groupHref) => {
    const normalisedGroupHref = normalisePathname(groupHref);

    set((state) => {
      const groupIsExpanded = state.expandedGroups.includes(normalisedGroupHref);

      return {
        expandedGroups: groupIsExpanded
          ? state.expandedGroups.filter((href) => href !== normalisedGroupHref)
          : [...state.expandedGroups, normalisedGroupHref],
      };
    });
  },

  setExpandedGroups: (expandedGroups) => {
    set({
      expandedGroups: expandedGroups.map(normalisePathname),
    });
  },

  collapseAllGroups: () => {
    set({
      expandedGroups: [],
    });
  },

  resetNavigation: () => {
    set({
      sidebarCollapsed: false,
      mobileDrawerOpen: false,
      activePathname: '/',
      expandedGroups: [],
    });
  },
}));
