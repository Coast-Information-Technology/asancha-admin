// src/components/layout/admin-top-bar/admin-top-bar.tsx

/**
 * File purpose:
 * Provides the desktop top bar for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component renders the admin brand area, global search placeholder,
 * review queue shortcut, Messages, Notifications, and staff avatar menu.
 *
 * Key exports:
 * - AdminTopBar renders the desktop admin top navigation.
 *
 * Business relevance:
 * The approved route/navigation rules require Messages in the desktop top bar
 * and intentionally exclude Help/Support from the admin/staff top bar.
 *
 * Security note:
 * Top-bar links are UX guidance only. Backend permission checks remain final.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { StaffNavigationRole } from '../../../lib/navigation/admin-top-bar-navigation';
import { getAdminTopBarNavigation } from '../../../lib/navigation/admin-top-bar-navigation';
import { isRouteActive } from '../../../lib/utils/routes';
import { useAdminSearchStore } from '../../../store/admin-search.store';
import { useNotificationsStore } from '../../../store/notifications.store';
import type { AdminShellStaff } from '../admin-shell/admin-shell';
import { StaffAvatarMenu } from '../staff-avatar-menu/staff-avatar-menu';

import styles from './admin-top-bar.module.css';

export interface AdminTopBarProps {
  staff: AdminShellStaff;
  onLogout?: () => void;
}

function getBadgeCount(label: string, unreadNotifications: number): number {
  if (label === 'Notifications') {
    return unreadNotifications;
  }

  return 0;
}

export function AdminTopBar({ staff, onLogout }: AdminTopBarProps) {
  const pathname = usePathname();
  const openCommandMenu = useAdminSearchStore((state) => state.openCommandMenu);
  const unreadNotifications = useNotificationsStore((state) => state.unreadCount);
  const navigation = getAdminTopBarNavigation(staff.role as StaffNavigationRole);

  return (
    <header className={styles.topBar}>
      <div className={styles.brandArea}>
        <Link className={styles.brand} href="/dashboard">
          <Image
            alt="Asancha Properties"
            height={249}
            priority
            src="/logo.png"
            style={{ height: 32, width: 'auto' }}
            width={400}
          />
          <span className={styles.brandText}>Asancha Admin</span>
        </Link>
      </div>

      <div className={styles.searchArea}>
        <button className={styles.searchButton} onClick={openCommandMenu} type="button">
          <span>Search admin records</span>
          <kbd>⌘K</kbd>
        </button>
      </div>

      <nav aria-label="Admin top navigation" className={styles.nav}>
        {navigation.map((item) => {
          const badgeCount = getBadgeCount(item.label, unreadNotifications);

          return (
            <Link
              aria-current={isRouteActive(pathname, item.href) ? 'page' : undefined}
              className={styles.navLink}
              data-active={isRouteActive(pathname, item.href)}
              href={item.href}
              key={item.href}
            >
              <span>{item.label}</span>
              {badgeCount > 0 ? <span className={styles.badge}>{badgeCount}</span> : null}
            </Link>
          );
        })}
      </nav>

      <StaffAvatarMenu staff={staff} onLogout={onLogout} />
    </header>
  );
}
