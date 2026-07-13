// src/components/layout/admin-sidebar/admin-sidebar.tsx

/**
 * File purpose:
 * Provides the desktop sidebar navigation for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component renders role-specific sidebar navigation for super_admin,
 * admin, and customer_care_rep users.
 *
 * Key exports:
 * - AdminSidebar renders the desktop sidebar.
 *
 * Business relevance:
 * Customer care must only see safe support views. Detail pages must not be
 * placed in sidebar menus. The frontend menu label must be Messages.
 *
 * Security note:
 * Sidebar visibility is not security. Backend route/resource/action checks
 * remain mandatory.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { AdminNavigationItem, StaffNavigationRole } from '../../../lib/navigation/admin-top-bar-navigation';
import { getAdminSidebarNavigation } from '../../../lib/navigation/admin-sidebar-navigation';
import { getCustomerCareSidebarNavigation } from '../../../lib/navigation/customer-care-sidebar-navigation';
import { getSuperAdminSidebarNavigation } from '../../../lib/navigation/super-admin-sidebar-navigation';
import { isRouteActive } from '../../../lib/utils/routes';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';

import styles from './admin-sidebar.module.css';

export interface AdminSidebarProps {
  role: StaffNavigationRole;
  collapsed?: boolean;
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

export function AdminSidebar({ role, collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const toggleSidebarCollapsed = useAdminNavigationStore((state) => state.toggleSidebarCollapsed);
  const expandedGroups = useAdminNavigationStore((state) => state.expandedGroups);
  const toggleExpandedGroup = useAdminNavigationStore((state) => state.toggleExpandedGroup);
  const navigation = getSidebarNavigation(role);

  return (
    <aside className={styles.sidebar} data-collapsed={collapsed}>
      <div className={styles.header}>
        <Link className={styles.brand} href="/dashboard">
          <Image
            alt="Asancha Properties"
            height={249}
            priority
            src="/logo.png"
            style={{ height: 32, width: 'auto' }}
            width={400}
          />
          {!collapsed ? <span className={styles.brandText}>Asancha Admin</span> : null}
        </Link>

        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={styles.collapseButton}
          onClick={toggleSidebarCollapsed}
          type="button"
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <nav aria-label="Admin sidebar navigation" className={styles.nav}>
        {navigation.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const expanded = expandedGroups.includes(item.href);
          const active = isRouteActive(pathname, item.href);

          return (
            <div className={styles.navGroup} key={item.href}>
              {hasChildren ? (
                <button
                  aria-expanded={expanded}
                  className={styles.navItem}
                  data-active={active}
                  onClick={() => toggleExpandedGroup(item.href)}
                  type="button"
                >
                  <span className={styles.iconBox}>{item.iconName.slice(0, 1)}</span>
                  {!collapsed ? <span className={styles.navLabel}>{item.label}</span> : null}
                  {!collapsed ? <span className={styles.chevron}>{expanded ? '⌃' : '⌄'}</span> : null}
                </button>
              ) : (
                <Link
                  aria-current={active ? 'page' : undefined}
                  className={styles.navItem}
                  data-active={active}
                  href={item.href}
                >
                  <span className={styles.iconBox}>{item.iconName.slice(0, 1)}</span>
                  {!collapsed ? <span className={styles.navLabel}>{item.label}</span> : null}
                </Link>
              )}

              {hasChildren && expanded && !collapsed ? (
                <div className={styles.children}>
                  {item.children?.map((child) => {
                    const childActive = isRouteActive(pathname, child.href, { exact: true });

                    return (
                      <Link
                        aria-current={childActive ? 'page' : undefined}
                        className={styles.childLink}
                        data-active={childActive}
                        href={child.href}
                        key={child.href}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
