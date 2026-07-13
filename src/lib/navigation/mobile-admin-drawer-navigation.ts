// src/lib/navigation/mobile-admin-drawer-navigation.ts

/**
 * File purpose:
 * Defines mobile drawer navigation for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file resolves the correct mobile drawer navigation for super_admin,
 * admin, and customer_care_rep staff roles.
 *
 * Key exports:
 * - MOBILE_ADMIN_DRAWER_FOOTER_NAVIGATION defines shared mobile footer links.
 * - getMobileAdminDrawerNavigation returns role-specific mobile navigation.
 *
 * Business relevance:
 * The mobile drawer must include Messages and Notifications where allowed.
 * Detail pages must not become mobile drawer menu items.
 *
 * Security note:
 * Mobile drawer filtering is not security. Backend guards and permission checks
 * remain mandatory for all sensitive routes and actions.
 */

import type { AdminNavigationItem, StaffNavigationRole } from './admin-top-bar-navigation';
import { ADMIN_TOP_BAR_NAVIGATION } from './admin-top-bar-navigation';
import { ADMIN_SIDEBAR_NAVIGATION } from './admin-sidebar-navigation';
import { CUSTOMER_CARE_SIDEBAR_NAVIGATION } from './customer-care-sidebar-navigation';
import { SUPER_ADMIN_SIDEBAR_NAVIGATION } from './super-admin-sidebar-navigation';

export const MOBILE_ADMIN_DRAWER_FOOTER_NAVIGATION: readonly AdminNavigationItem[] = [
  {
    label: 'Notifications',
    href: '/notifications',
    iconName: 'Bell',
    description: 'Open operational notifications.',
    badgeKey: 'notificationUnreadCount',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
  {
    label: 'My Staff Account',
    href: '/my-profile',
    iconName: 'UserCircle',
    description: 'Manage your staff account.',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
];

function getRoleSidebarNavigation(role: StaffNavigationRole): readonly AdminNavigationItem[] {
  if (role === 'super_admin') {
    return SUPER_ADMIN_SIDEBAR_NAVIGATION;
  }

  if (role === 'admin') {
    return ADMIN_SIDEBAR_NAVIGATION;
  }

  return CUSTOMER_CARE_SIDEBAR_NAVIGATION;
}

function cloneNavigationItem(item: AdminNavigationItem): AdminNavigationItem {
  return {
    ...item,
    children: item.children?.map(cloneNavigationItem),
  };
}

function mergeNavigationItems(
  primaryItems: readonly AdminNavigationItem[],
  secondaryItems: readonly AdminNavigationItem[],
): AdminNavigationItem[] {
  const seenHrefs = new Set<string>();
  const mergedItems: AdminNavigationItem[] = [];

  [...primaryItems, ...secondaryItems].forEach((item) => {
    if (seenHrefs.has(item.href)) {
      return;
    }

    seenHrefs.add(item.href);
    mergedItems.push(cloneNavigationItem(item));
  });

  return mergedItems;
}

export function getMobileAdminDrawerNavigation(role: StaffNavigationRole): AdminNavigationItem[] {
  const sidebarNavigation = getRoleSidebarNavigation(role);
  const topBarNavigation = ADMIN_TOP_BAR_NAVIGATION.filter((item) =>
    item.allowedRoles.includes(role),
  );
  const footerNavigation = MOBILE_ADMIN_DRAWER_FOOTER_NAVIGATION.filter((item) =>
    item.allowedRoles.includes(role),
  );

  return mergeNavigationItems(sidebarNavigation, [...topBarNavigation, ...footerNavigation]);
}
