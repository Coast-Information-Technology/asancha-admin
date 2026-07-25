// src/components/layout/mobile-admin-top-bar/mobile-admin-top-bar.tsx

/**
 * File purpose:
 * Provides the mobile top bar for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component renders the current page title, notification icon, and drawer
 * menu button for smaller screens.
 *
 * Security note:
 * Mobile navigation is UX only. Backend permissions remain final.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu } from 'lucide-react';

import type { StaffNavigationRole } from '../../../lib/navigation/admin-top-bar-navigation';
import { getAdminPageTitle } from '../../../lib/navigation/admin-page-title';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';
import { useNotificationsStore } from '../../../store/notifications.store';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

import styles from './mobile-admin-top-bar.module.css';

export interface MobileAdminTopBarProps {
  role: StaffNavigationRole;
}

export function MobileAdminTopBar({ role }: MobileAdminTopBarProps) {
  const pathname = usePathname();
  const openMobileDrawer = useAdminNavigationStore((state) => state.openMobileDrawer);
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const pageTitle = getAdminPageTitle(pathname, role);

  return (
    <header className={styles.topBar}>
      <Link aria-label="Go to dashboard" className={styles.brand} href="/dashboard">
        <Image
          alt="Asancha Properties"
          height={249}
          priority
          src="/logo.png"
          style={{ height: 24, width: 'auto' }}
          width={400}
        />
        <span>Admin</span>
      </Link>

      <p className={styles.pageTitle}>{pageTitle}</p>

      <nav aria-label="Mobile admin shortcuts" className={styles.shortcuts}>
        <ThemeToggle />

        <Link
          aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
          className={styles.notificationButton}
          href="/notifications"
          title="Notifications"
        >
          <Bell aria-hidden size={18} strokeWidth={2} />
          {unreadCount > 0 ? (
            <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
          ) : null}
        </Link>

        <button
          aria-label="Open admin navigation"
          className={styles.menuButton}
          onClick={openMobileDrawer}
          type="button"
        >
          <Menu aria-hidden size={18} strokeWidth={2} />
        </button>
      </nav>
    </header>
  );
}
