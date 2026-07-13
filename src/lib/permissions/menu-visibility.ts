// src/lib/permissions/menu-visibility.ts

/**
 * File purpose:
 * Provides menu and navigation visibility helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file filters top-bar, sidebar, mobile drawer, and account navigation
 * items according to staff role, route permission rules, and detail-page
 * restrictions.
 *
 * Key exports:
 * - canShowNavigationItem checks whether one menu item should be visible.
 * - filterVisibleNavigationItems filters navigation trees safely.
 * - getVisibleNavigationForRole returns a permission-aware navigation tree.
 *
 * Business relevance:
 * Customer care representatives must not see restricted menus. Detail pages
 * must not be shown as sidebar menu items. Messages must remain visible as the
 * frontend label for staff communication.
 *
 * Security note:
 * Hidden menus are not security. Backend permissions and policies must still
 * enforce every sensitive action and resource access.
 */

import type {
  AdminNavigationItem,
  StaffNavigationRole,
} from '../navigation/admin-top-bar-navigation';
import type { StaffRole } from '../auth/staff-role-guards';
import {
  canStaffRoleAccessRoute,
  findRoutePermissionRule,
  isRouteDetailPage,
} from './route-permissions';

export interface MenuVisibilityOptions {
  includeChildren?: boolean;
  hideDetailRoutes?: boolean;
  requireRouteRule?: boolean;
}

const DEFAULT_MENU_VISIBILITY_OPTIONS: Required<MenuVisibilityOptions> = {
  includeChildren: true,
  hideDetailRoutes: true,
  requireRouteRule: false,
};

function normaliseVisibilityOptions(
  options: MenuVisibilityOptions = {},
): Required<MenuVisibilityOptions> {
  return {
    ...DEFAULT_MENU_VISIBILITY_OPTIONS,
    ...options,
  };
}

function toStaffRole(role: StaffNavigationRole | StaffRole | null | undefined): StaffRole | null {
  if (role === 'super_admin' || role === 'admin' || role === 'customer_care_rep') {
    return role;
  }

  return null;
}

export function canShowNavigationItem(
  item: AdminNavigationItem,
  role: StaffNavigationRole | StaffRole | null | undefined,
  options: MenuVisibilityOptions = {},
): boolean {
  const visibilityOptions = normaliseVisibilityOptions(options);
  const staffRole = toStaffRole(role);

  if (!staffRole) {
    return false;
  }

  if (!item.allowedRoles.includes(staffRole)) {
    return false;
  }

  if (visibilityOptions.hideDetailRoutes && isRouteDetailPage(item.href)) {
    return false;
  }

  const routeRule = findRoutePermissionRule(item.href);

  if (visibilityOptions.requireRouteRule && !routeRule) {
    return false;
  }

  if (routeRule && !canStaffRoleAccessRoute(staffRole, item.href)) {
    return false;
  }

  return true;
}

export function filterVisibleNavigationItems(
  items: readonly AdminNavigationItem[],
  role: StaffNavigationRole | StaffRole | null | undefined,
  options: MenuVisibilityOptions = {},
): AdminNavigationItem[] {
  const visibilityOptions = normaliseVisibilityOptions(options);

  return items.reduce<AdminNavigationItem[]>((visibleItems, item) => {
    if (!canShowNavigationItem(item, role, visibilityOptions)) {
      return visibleItems;
    }

    const visibleChildren =
      visibilityOptions.includeChildren && item.children
        ? filterVisibleNavigationItems(item.children, role, visibilityOptions)
        : undefined;

    visibleItems.push({
      ...item,
      children: visibleChildren && visibleChildren.length > 0 ? visibleChildren : undefined,
    });

    return visibleItems;
  }, []);
}

export function getVisibleNavigationForRole(
  items: readonly AdminNavigationItem[],
  role: StaffNavigationRole | StaffRole | null | undefined,
): AdminNavigationItem[] {
  return filterVisibleNavigationItems(items, role, {
    includeChildren: true,
    hideDetailRoutes: true,
    requireRouteRule: false,
  });
}

export function hasVisibleNavigationItems(
  items: readonly AdminNavigationItem[],
  role: StaffNavigationRole | StaffRole | null | undefined,
): boolean {
  return getVisibleNavigationForRole(items, role).length > 0;
}

export function shouldShowSidebarItem(
  item: AdminNavigationItem,
  role: StaffNavigationRole | StaffRole | null | undefined,
): boolean {
  return canShowNavigationItem(item, role, {
    includeChildren: true,
    hideDetailRoutes: true,
    requireRouteRule: false,
  });
}

export function shouldShowTopBarItem(
  item: AdminNavigationItem,
  role: StaffNavigationRole | StaffRole | null | undefined,
): boolean {
  return canShowNavigationItem(item, role, {
    includeChildren: false,
    hideDetailRoutes: true,
    requireRouteRule: false,
  });
}

export function shouldShowMobileDrawerItem(
  item: AdminNavigationItem,
  role: StaffNavigationRole | StaffRole | null | undefined,
): boolean {
  return canShowNavigationItem(item, role, {
    includeChildren: true,
    hideDetailRoutes: true,
    requireRouteRule: false,
  });
}
