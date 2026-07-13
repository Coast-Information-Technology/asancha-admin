// src/components/layout/admin-shell/admin-shell.tsx

/**
 * File purpose:
 * Provides the authenticated admin layout shell for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component composes the desktop sidebar, desktop top bar, mobile top bar,
 * mobile drawer, staff avatar menu context, and page content region.
 *
 * Key exports:
 * - AdminShell renders the main staff-only admin frame.
 *
 * Business relevance:
 * asancha-admin is an internal staff frontend for super_admin, admin, and
 * customer_care_rep users. Sidebar and navigation must remain role-aware, and
 * detail pages must not be placed in sidebar menus.
 *
 * Security note:
 * The shell is not an authorization boundary. Backend authentication,
 * authorization, staff permissions, account status checks, resource visibility,
 * audit logging, and sensitive action enforcement remain the final authority.
 */

'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import type { StaffNavigationRole } from '../../../lib/navigation/admin-top-bar-navigation';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { AdminTopBar } from '../admin-top-bar/admin-top-bar';
import { MobileAdminDrawer } from '../mobile-admin-drawer/mobile-admin-drawer';
import { MobileAdminTopBar } from '../mobile-admin-top-bar/mobile-admin-top-bar';

import styles from './admin-shell.module.css';

export interface AdminShellStaff {
  displayName: string;
  email: string;
  role: StaffNavigationRole;
  avatarUrl?: string;
}

export interface AdminShellProps {
  children: ReactNode;
  staff: AdminShellStaff;
  onLogout?: () => void;
}

export function AdminShell({ children, staff, onLogout }: AdminShellProps) {
  const pathname = usePathname();
  const sidebarCollapsed = useAdminNavigationStore((state) => state.sidebarCollapsed);
  const mobileDrawerOpen = useAdminNavigationStore((state) => state.mobileDrawerOpen);
  const setActivePathname = useAdminNavigationStore((state) => state.setActivePathname);
  const closeMobileDrawer = useAdminNavigationStore((state) => state.closeMobileDrawer);

  useEffect(() => {
    setActivePathname(pathname);
    closeMobileDrawer();
  }, [closeMobileDrawer, pathname, setActivePathname]);

  return (
    <div className={styles.root}>
      <a className="asancha-skip-link" href="#asancha-admin-main">
        Skip to main content
      </a>

      <div className={styles.desktopSidebar}>
        <AdminSidebar collapsed={sidebarCollapsed} role={staff.role} />
      </div>

      <AdminTopBar staff={staff} onLogout={onLogout} />
      <MobileAdminTopBar role={staff.role} />

      <MobileAdminDrawer
        onClose={closeMobileDrawer}
        open={mobileDrawerOpen}
        role={staff.role}
      />

      <main
        className={styles.main}
        data-sidebar-collapsed={sidebarCollapsed}
        id="asancha-admin-main"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}
