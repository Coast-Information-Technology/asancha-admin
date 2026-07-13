// src/components/layout/mobile-admin-top-bar/mobile-admin-top-bar.tsx

/**
 * File purpose:
 * Provides the mobile top bar for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component renders mobile shortcuts for dashboard, review queues,
 * Messages, Notifications, and the drawer menu button.
 *
 * Key exports:
 * - MobileAdminTopBar renders mobile admin navigation.
 *
 * Business relevance:
 * Messages must appear in mobile admin navigation. Help/Support must not be a
 * separate admin top-bar item.
 *
 * Security note:
 * Mobile navigation is UX only. Backend permissions remain final.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { StaffNavigationRole } from '../../../lib/navigation/admin-top-bar-navigation';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';
import { useNotificationsStore } from '../../../store/notifications.store';

import styles from './mobile-admin-top-bar.module.css';

export interface MobileAdminTopBarProps {
  role: StaffNavigationRole;
}

export function MobileAdminTopBar({ role }: MobileAdminTopBarProps) {
  const openMobileDrawer = useAdminNavigationStore((state) => state.openMobileDrawer);
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const canSeeReviewQueues = role === 'super_admin' || role === 'admin';

  return (
    <header className={styles.topBar}>
      <Link className={styles.brand} href="/dashboard">
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

      <nav aria-label="Mobile admin shortcuts" className={styles.shortcuts}>
        {canSeeReviewQueues ? (
          <Link className={styles.shortcut} href="/review-queues">
            Queues
          </Link>
        ) : null}

        <Link className={styles.shortcut} href="/messages">
          Messages
        </Link>

        <Link className={styles.shortcut} href="/notifications">
          Notifications
          {unreadCount > 0 ? <span className={styles.badge}>{unreadCount}</span> : null}
        </Link>

        <button
          aria-label="Open admin navigation"
          className={styles.menuButton}
          onClick={openMobileDrawer}
          type="button"
        >
          Menu
        </button>
      </nav>
    </header>
  );
}
