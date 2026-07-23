// src/components/layout/admin-sidebar/admin-sidebar.tsx

/** Role-aware desktop navigation for the authenticated staff shell. */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
  getNavigationSection,
  getNavigationSectionLabel,
  type AdminNavigationItem,
  type StaffNavigationRole,
} from '../../../lib/navigation/admin-top-bar-navigation';
import { getAdminSidebarNavigation } from '../../../lib/navigation/admin-sidebar-navigation';
import { getCustomerCareSidebarNavigation } from '../../../lib/navigation/customer-care-sidebar-navigation';
import { getNavigationBadgeCount } from '../../../lib/navigation/navigation-badges';
import { getSuperAdminSidebarNavigation } from '../../../lib/navigation/super-admin-sidebar-navigation';
import { isRouteActive } from '../../../lib/utils/routes';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';
import { useNotificationsStore } from '../../../store/notifications.store';

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

function getNavigationIcon(iconName: string): LucideIcon {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];

  return icon ?? LucideIcons.Circle;
}

export function AdminSidebar({ role, collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const toggleSidebarCollapsed = useAdminNavigationStore((state) => state.toggleSidebarCollapsed);
  const setSidebarCollapsed = useAdminNavigationStore((state) => state.setSidebarCollapsed);
  const expandedGroups = useAdminNavigationStore((state) => state.expandedGroups);
  const toggleExpandedGroup = useAdminNavigationStore((state) => state.toggleExpandedGroup);
  const unreadNotifications = useNotificationsStore((state) => state.unreadCount);
  const navigation = getSidebarNavigation(role).filter(
    (item) => item.label !== 'Notifications' && item.label !== 'My Staff Account',
  );

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
        {navigation.map((item, index) => {
          const hasChildren = Boolean(item.children?.length);
          const expanded = expandedGroups.includes(item.href);
          const childActive = Boolean(
            item.children?.some((child) => isRouteActive(pathname, child.href)),
          );
          const active = isRouteActive(pathname, item.href) || childActive;
          const renderAsSectionGroup = Boolean(item.renderAsSectionGroup);
          const section = getNavigationSection(item);
          const previousItem = index > 0 ? navigation[index - 1] : undefined;
          const previousSection = previousItem ? getNavigationSection(previousItem) : null;
          const Icon = getNavigationIcon(item.iconName);
          const badgeCount = getNavigationBadgeCount(item, unreadNotifications);

          return (
            <div
              className={styles.sectionGroup}
              data-section={section}
              data-section-start={section !== previousSection}
              key={item.href}
            >
              {section !== previousSection && !collapsed && !renderAsSectionGroup ? (
                <p className={styles.sectionLabel}>{getNavigationSectionLabel(section)}</p>
              ) : null}

              <div className={styles.navGroup}>
                {hasChildren ? (
                  <button
                    aria-expanded={expanded}
                    aria-label={collapsed ? item.label : undefined}
                    className={
                      renderAsSectionGroup && !collapsed ? styles.sectionToggle : styles.navItem
                    }
                    data-active={active}
                    onClick={() => {
                      if (collapsed) {
                        setSidebarCollapsed(false);
                      }

                      toggleExpandedGroup(item.href);
                    }}
                    title={collapsed ? item.label : undefined}
                    type="button"
                  >
                    {!renderAsSectionGroup || collapsed ? (
                      <span className={styles.iconBox}>
                        <Icon aria-hidden size={17} strokeWidth={2} />
                      </span>
                    ) : null}
                    {!collapsed ? <span className={styles.navLabel}>{item.label}</span> : null}
                    {!collapsed ? (
                      <span className={styles.chevron}>
                        {expanded ? (
                          <LucideIcons.ChevronDown aria-hidden size={15} />
                        ) : (
                          <LucideIcons.ChevronRight aria-hidden size={15} />
                        )}
                      </span>
                    ) : null}
                    {badgeCount > 0 ? <span className={styles.badge}>{badgeCount}</span> : null}
                  </button>
                ) : (
                  <Link
                    aria-current={active ? 'page' : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    className={styles.navItem}
                    data-active={active}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={styles.iconBox}>
                      <Icon aria-hidden size={17} strokeWidth={2} />
                    </span>
                    {!collapsed ? <span className={styles.navLabel}>{item.label}</span> : null}
                    {badgeCount > 0 ? <span className={styles.badge}>{badgeCount}</span> : null}
                  </Link>
                )}

                {hasChildren && expanded && !collapsed ? (
                  <div className={styles.children}>
                    {item.children?.map((child) => {
                      const childActive = isRouteActive(pathname, child.href);
                      const childBadgeCount = getNavigationBadgeCount(child, unreadNotifications);
                      const ChildIcon = getNavigationIcon(child.iconName);

                      return (
                        <Link
                          aria-current={childActive ? 'page' : undefined}
                          className={styles.navItem}
                          data-active={childActive}
                          href={child.href}
                          key={child.href}
                        >
                          <span className={styles.iconBox}>
                            <ChildIcon aria-hidden size={17} strokeWidth={2} />
                          </span>
                          <span className={styles.navLabel}>{child.label}</span>
                          {childBadgeCount > 0 ? (
                            <span className={styles.badge}>{childBadgeCount}</span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
