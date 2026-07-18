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
import { usePathname, useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';

import { signOutStaff } from '../../../features/auth/api/auth.api';
import type {
  AdminNavigationItem,
  StaffNavigationRole,
} from '../../../lib/navigation/admin-top-bar-navigation';
import { getAdminSidebarNavigation } from '../../../lib/navigation/admin-sidebar-navigation';
import { getCustomerCareSidebarNavigation } from '../../../lib/navigation/customer-care-sidebar-navigation';
import { getSuperAdminSidebarNavigation } from '../../../lib/navigation/super-admin-sidebar-navigation';
import { useAdminNavigationStore } from '../../../store/admin-navigation.store';
import { useAdminSearchStore } from '../../../store/admin-search.store';
import { useStaffAuthStore } from '../../../store/staff-auth.store';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { AdminTopBar } from '../admin-top-bar/admin-top-bar';
import { MobileAdminDrawer } from '../mobile-admin-drawer/mobile-admin-drawer';
import { MobileAdminTopBar } from '../mobile-admin-top-bar/mobile-admin-top-bar';
import { CommandMenu, type CommandMenuItem } from '../../ui/command-menu/command-menu';

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
  const router = useRouter();
  const sidebarCollapsed = useAdminNavigationStore((state) => state.sidebarCollapsed);
  const mobileDrawerOpen = useAdminNavigationStore((state) => state.mobileDrawerOpen);
  const setActivePathname = useAdminNavigationStore((state) => state.setActivePathname);
  const closeMobileDrawer = useAdminNavigationStore((state) => state.closeMobileDrawer);
  const commandMenuOpen = useAdminSearchStore((state) => state.commandMenuOpen);
  const commandQuery = useAdminSearchStore((state) => state.query);
  const setCommandQuery = useAdminSearchStore((state) => state.setQuery);
  const closeCommandMenu = useAdminSearchStore((state) => state.closeCommandMenu);
  const clearSession = useStaffAuthStore((state) => state.clearSession);

  const handleLogout = useCallback(() => {
    void signOutStaff().catch(() => undefined).finally(() => {
      clearSession();
      router.replace('/auth/sign-in');
    });
  }, [clearSession, router]);

  const effectiveLogout = onLogout ?? handleLogout;
  const commandItems = useMemo<CommandMenuItem[]>(() => {
    const seenHrefs = new Set<string>();

    return flattenNavigation(getSidebarNavigation(staff.role))
      .filter((item) => {
        if (seenHrefs.has(item.href)) {
          return false;
        }

        seenHrefs.add(item.href);
        return true;
      })
      .map((item) => {
        const Icon = getNavigationIcon(item.iconName);

        return {
          key: item.href,
          label: item.label,
          description: item.description,
          icon: <Icon aria-hidden size={17} strokeWidth={2} />,
          onSelect: () => {
            closeCommandMenu();
            setCommandQuery('');
            router.push(item.href);
          },
        };
      });
  }, [closeCommandMenu, router, setCommandQuery, staff.role]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        useAdminSearchStore.getState().openCommandMenu();
      }
    };

    window.addEventListener('keydown', handleShortcut);

    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  useEffect(() => {
    setActivePathname(pathname);
    closeMobileDrawer();
  }, [closeMobileDrawer, pathname, setActivePathname]);

  if (pathname === '/auth' || pathname.startsWith('/auth/')) {
    return children;
  }

  return (
    <div className={styles.root}>
      <a className="asancha-skip-link" href="#asancha-admin-main">
        Skip to main content
      </a>

      <div className={styles.desktopSidebar}>
        <AdminSidebar collapsed={sidebarCollapsed} role={staff.role} />
      </div>

      <AdminTopBar staff={staff} onLogout={effectiveLogout} />
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

      {commandMenuOpen ? (
        <div
          aria-label="Search admin records"
          className={styles.commandMenu}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCommandMenu();
            }
          }}
          role="dialog"
        >
          <div className={styles.commandMenuPanel}>
            <div className={styles.commandMenuHeader}>
              <p>Search admin records</p>
              <button onClick={closeCommandMenu} type="button">
                Close
              </button>
            </div>
            <CommandMenu
              items={commandItems}
              onQueryChange={setCommandQuery}
              query={commandQuery}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
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

function getNavigationIcon(iconName: string): LucideIcon {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];

  return icon ?? LucideIcons.Circle;
}
