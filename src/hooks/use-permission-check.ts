// src/hooks/use-permission-check.ts

/**
 * File purpose:
 * Provides permission-check helper hooks for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook gives components a simple way to check route access, menu
 * visibility, and frontend action visibility based on the current staff role.
 *
 * Key exports:
 * - usePermissionCheck provides route, menu, and action permission helpers.
 *
 * Business relevance:
 * asancha-admin is staff-only. Customer care representatives must only see safe
 * support views. Admin users must not create admin or super_admin accounts. No
 * frontend route, form, modal, or action may create a super_admin.
 *
 * Security note:
 * These checks are frontend guidance only. Backend authorization, staff
 * permissions, account status, resource visibility, audit logging, and sensitive
 * action enforcement remain final.
 */

'use client';

import { useCallback, useMemo } from 'react';

import type { StaffRole } from '../lib/auth/staff-role-guards';
import type { StaffSession } from '../lib/auth/staff-session';
import type { AdminNavigationItem } from '../lib/navigation/admin-top-bar-navigation';
import {
  canPerformPermissionAction,
  getPermissionActionDeniedMessage,
  shouldDisablePermissionAction,
  shouldHidePermissionAction,
  type AdminPermissionAction,
} from '../lib/permissions/action-permissions';
import { canStaffRoleAccessRoute } from '../lib/permissions/route-permissions';
import {
  canShowNavigationItem,
  filterVisibleNavigationItems,
  type MenuVisibilityOptions,
} from '../lib/permissions/menu-visibility';

export interface UsePermissionCheckOptions {
  session?: StaffSession | null;
  role?: StaffRole | null;
}

export interface UsePermissionCheckResult {
  role: StaffRole | null;
  isAuthenticated: boolean;
  canAccessRoute: (pathname: string) => boolean;
  canShowMenuItem: (item: AdminNavigationItem, options?: MenuVisibilityOptions) => boolean;
  filterMenuItems: (
    items: readonly AdminNavigationItem[],
    options?: MenuVisibilityOptions,
  ) => AdminNavigationItem[];
  canPerformAction: (action: AdminPermissionAction, targetRole?: StaffRole) => boolean;
  shouldDisableAction: (action: AdminPermissionAction, targetRole?: StaffRole) => boolean;
  shouldHideAction: (action: AdminPermissionAction, targetRole?: StaffRole) => boolean;
  getDeniedMessage: (action: AdminPermissionAction) => string;
}

export function usePermissionCheck(
  options: UsePermissionCheckOptions = {},
): UsePermissionCheckResult {
  const role = useMemo<StaffRole | null>(() => {
    return options.role ?? options.session?.role ?? null;
  }, [options.role, options.session?.role]);

  const isAuthenticated = Boolean(options.session?.isAuthenticated ?? role);

  const canAccessRoute = useCallback(
    (pathname: string) => {
      return canStaffRoleAccessRoute(role, pathname);
    },
    [role],
  );

  const canShowMenuItem = useCallback(
    (item: AdminNavigationItem, visibilityOptions?: MenuVisibilityOptions) => {
      return canShowNavigationItem(item, role, visibilityOptions);
    },
    [role],
  );

  const filterMenuItems = useCallback(
    (items: readonly AdminNavigationItem[], visibilityOptions?: MenuVisibilityOptions) => {
      return filterVisibleNavigationItems(items, role, visibilityOptions);
    },
    [role],
  );

  const canPerformAction = useCallback(
    (action: AdminPermissionAction, targetRole?: StaffRole) => {
      return canPerformPermissionAction({
        role,
        action,
        targetRole,
      });
    },
    [role],
  );

  const shouldDisableAction = useCallback(
    (action: AdminPermissionAction, targetRole?: StaffRole) => {
      return shouldDisablePermissionAction({
        role,
        action,
        targetRole,
      });
    },
    [role],
  );

  const shouldHideAction = useCallback(
    (action: AdminPermissionAction, targetRole?: StaffRole) => {
      return shouldHidePermissionAction({
        role,
        action,
        targetRole,
      });
    },
    [role],
  );

  const getDeniedMessage = useCallback((action: AdminPermissionAction) => {
    return getPermissionActionDeniedMessage(action);
  }, []);

  return {
    role,
    isAuthenticated,
    canAccessRoute,
    canShowMenuItem,
    filterMenuItems,
    canPerformAction,
    shouldDisableAction,
    shouldHideAction,
    getDeniedMessage,
  };
}
