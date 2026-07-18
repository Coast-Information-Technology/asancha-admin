// src/components/layout/admin-top-bar/admin-top-bar.tsx

/**
 * File purpose:
 * Provides the desktop top bar for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component renders the global search placeholder, current page title,
 * notification shortcut, and staff avatar menu.
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
import { Bell } from 'lucide-react';

import type { StaffNavigationRole } from '../../../lib/navigation/admin-top-bar-navigation';
import { getAdminPageTitle } from '../../../lib/navigation/admin-page-title';
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

export function AdminTopBar({ staff, onLogout }: AdminTopBarProps) {
  const pathname = usePathname();
  const openCommandMenu = useAdminSearchStore((state) => state.openCommandMenu);
  const unreadNotifications = useNotificationsStore((state) => state.unreadCount);
  const sidebarCollapsed = useAdminNavigationStore((state) => state.sidebarCollapsed);
  const pageTitle = getAdminPageTitle(pathname, staff.role as StaffNavigationRole);

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

        <nav aria-label="Admin notifications" className={styles.nav}>
          <Link
            aria-label={
              unreadNotifications > 0
                ? `Notifications, ${unreadNotifications} unread`
                : 'Notifications'
            }
            className={styles.notificationButton}
            href="/notifications"
            title="Notifications"
          >
            <Bell aria-hidden size={19} strokeWidth={2} />
            {unreadNotifications > 0 ? (
              <span className={styles.badge}>
                {unreadNotifications > 99 ? '99+' : unreadNotifications}
              </span>
            ) : null}
          </Link>
        </nav>

        <StaffAvatarMenu staff={staff} onLogout={onLogout} />
      </div>
    </header>
  );
}
