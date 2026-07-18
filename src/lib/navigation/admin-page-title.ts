// src/lib/navigation/admin-page-title.ts

/** Resolves the visible page title used in the authenticated admin top bars. */

import type {
  AdminNavigationItem,
  StaffNavigationRole,
} from './admin-top-bar-navigation';
import { getAdminSidebarNavigation } from './admin-sidebar-navigation';
import { getCustomerCareSidebarNavigation } from './customer-care-sidebar-navigation';
import { getSuperAdminSidebarNavigation } from './super-admin-sidebar-navigation';
import { normaliseRoutePath } from '../utils/routes';

const PAGE_TITLE_OVERRIDES: readonly { prefix: string; title: string }[] = [
  { prefix: '/dashboard/super-admin', title: 'Super Admin Dashboard' },
  { prefix: '/dashboard/customer-care', title: 'Customer Care Dashboard' },
  { prefix: '/dashboard/admin', title: 'Admin Dashboard' },
  { prefix: '/my-profile/security', title: 'Account Security' },
  { prefix: '/my-profile/notifications', title: 'Notification Preferences' },
  { prefix: '/my-profile/activity', title: 'My Activity' },
  { prefix: '/my-profile', title: 'My Profile' },
  { prefix: '/dashboard', title: 'Dashboard' },
];

export function getAdminPageTitle(pathname: string, role: StaffNavigationRole): string {
  const path = normaliseRoutePath(pathname);
  const override = PAGE_TITLE_OVERRIDES.find(({ prefix }) => {
    return path === prefix || path.startsWith(`${prefix}/`);
  });

  if (override) {
    return override.title;
  }

  const navigationItems = flattenNavigation(getSidebarNavigation(role));
  const matchingItem = navigationItems
    .filter((item) => path === item.href || path.startsWith(`${item.href}/`))
    .sort((first, second) => second.href.length - first.href.length)[0];

  if (matchingItem) {
    return matchingItem.label;
  }

  return humanisePathSegment(path);
}

function getSidebarNavigation(role: StaffNavigationRole): AdminNavigationItem[] {
  if (role === 'super_admin') {
    return getSuperAdminSidebarNavigation();
  }

  if (role === 'admin') {
    return getAdminSidebarNavigation();
  }

  return getCustomerCareSidebarNavigation();
}

function flattenNavigation(items: readonly AdminNavigationItem[]): AdminNavigationItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenNavigation(item.children) : [])]);
}

function humanisePathSegment(path: string): string {
  const segment = path.split('/').filter(Boolean).pop() ?? 'dashboard';

  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
