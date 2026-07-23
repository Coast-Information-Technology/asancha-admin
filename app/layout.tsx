// app/layout.tsx

/**
 * File purpose:
 * Provides the root application layout for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file is required by Next.js App Router and wraps every route in the
 * admin frontend with global metadata, global styles, and shared app providers.
 *
 * Key exports:
 * - RootLayout renders the required html/body structure.
 *
 * Business relevance:
 * asancha-admin is a staff-only internal operations frontend for super_admin,
 * admin, and customer_care_rep users.
 *
 * Security note:
 * The root layout is not an authorization boundary. Middleware/proxy, backend
 * authentication, backend authorization, staff permissions, account status
 * checks, resource visibility, and audit logging remain the final authority.
 */

import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { AppProviders } from './providers';
import { AdminShell, type AdminShellStaff } from '../src/components/layout/admin-shell/admin-shell';
import type { StaffNavigationRole } from '../src/lib/navigation/admin-top-bar-navigation';

import '../src/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Asancha Admin',
    template: '%s | Asancha Admin',
  },
  description: 'Staff-only internal operations frontend for Asancha Admin.',
  applicationName: 'Asancha Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: '#1e3a8a',
};

export interface RootLayoutProps {
  children: ReactNode;
}

const STAFF_ROLE_COOKIE = 'asancha_admin_role';

const THEME_INIT_SCRIPT = `(() => {
  try {
    const storedTheme = window.localStorage.getItem('asancha_admin_preferred_theme');
    const theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch {}
})();`;

function isStaffNavigationRole(value: string | undefined): value is StaffNavigationRole {
  return value === 'super_admin' || value === 'admin' || value === 'customer_care_rep';
}

function getFallbackStaff(role: StaffNavigationRole): AdminShellStaff {
  return {
    displayName: 'Asancha Staff',
    email: 'Current staff session',
    role,
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(STAFF_ROLE_COOKIE)?.value;
  const role: StaffNavigationRole = isStaffNavigationRole(roleCookie)
    ? roleCookie
    : 'customer_care_rep';

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="asancha-theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <AppProviders>
          <AdminShell staff={getFallbackStaff(role)}>{children}</AdminShell>
        </AppProviders>
      </body>
    </html>
  );
}
