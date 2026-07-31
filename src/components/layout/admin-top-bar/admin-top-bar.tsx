// src/components/layout/admin-top-bar/admin-top-bar.tsx

/**
 * File purpose:
 * Provides the desktop top bar for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component renders the global search placeholder, current page title,
 * message and notification shortcuts, and staff avatar menu.
 *
 * Key exports:
 * - AdminTopBar renders the desktop admin top navigation.
 *
 * Business relevance:
 * The page title keeps staff oriented while the notification shortcut provides
 * a compact entry point to operational alerts.
 *
 * Security note:
 * Top-bar links are UX guidance only. Backend permission checks remain final.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
  getAdminTopBarNavigation,
  type AdminNavigationItem,
  type StaffNavigationRole,
} from '../../../lib/navigation/admin-top-bar-navigation';
import { getAdminPageTitle } from '../../../lib/navigation/admin-page-title';
import { getNavigationBadgeCount } from '../../../lib/navigation/navigation-badges';
import { useAdminSearchStore } from '../../../store/admin-search.store';
import { useNotificationsStore } from '../../../store/notifications.store';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';
import type { AdminShellStaff } from '../admin-shell/admin-shell';
import { StaffAvatarMenu } from '../staff-avatar-menu/staff-avatar-menu';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

import styles from './admin-top-bar.module.css';

export interface AdminTopBarProps {
  staff: AdminShellStaff;
  onLogout?: () => void;
}

function getNavigationIcon(iconName: string): LucideIcon {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];

  return icon ?? LucideIcons.Circle;
}

function getShortcutLabel(item: AdminNavigationItem, badgeCount: number): string {
  if (badgeCount > 0) {
    return `${item.label}, ${badgeCount} unread`;
  }

  return item.label;
}

export function AdminTopBar({ staff, onLogout }: AdminTopBarProps) {
  const pathname = usePathname();
  const openCommandMenu = useAdminSearchStore((state) => state.openCommandMenu);
  const unreadNotifications = useNotificationsStore((state) => state.unreadCount);
  const sidebarCollapsed = useAdminNavigationStore((state) => state.sidebarCollapsed);
  const staffRole = staff.role as StaffNavigationRole;
  const pageTitle = getAdminPageTitle(pathname, staffRole);
  const topBarNavigation = getAdminTopBarNavigation(staffRole);

  return (
    <header className={styles.topBar} data-sidebar-collapsed={sidebarCollapsed}>
      <div className={styles.searchArea}>
        <button className={styles.searchButton} onClick={openCommandMenu} type="button">
          <span>Search admin records</span>
          <kbd>Cmd K</kbd>
        </button>
      </div>

      <p className={styles.pageTitle}>{pageTitle}</p>

      <div className={styles.actions}>
        <ThemeToggle />

        <nav aria-label="Admin communication shortcuts" className={styles.nav}>
          {topBarNavigation.map((item) => {
            const Icon = getNavigationIcon(item.iconName);
            const badgeCount = getNavigationBadgeCount(item, unreadNotifications);

            return (
              <Link
                aria-label={getShortcutLabel(item, badgeCount)}
                className={styles.shortcutButton}
                href={item.href}
                key={item.href}
                title={item.label}
              >
                <Icon aria-hidden size={19} strokeWidth={2} />
                {badgeCount > 0 ? (
                  <span className={styles.badge}>
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <StaffAvatarMenu staff={staff} onLogout={onLogout} />
      </div>
    </header>
  );
}
