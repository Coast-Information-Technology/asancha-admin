// app/dashboard/layout.tsx

/**
 * File purpose:
 * Provides the shared dashboard layout for the Asancha Admin frontend.
 *
 * Role in the project:
 * This layout wraps all dashboard routes with the authenticated admin shell,
 * including desktop sidebar, desktop top bar, mobile top bar, mobile drawer,
 * and staff avatar menu.
 *
 * Key exports:
 * - DashboardLayout renders the dashboard route frame.
 *
 * Business relevance:
 * asancha-admin supports only super_admin, admin, and customer_care_rep staff
 * roles. Dashboard routes must remain staff-only and role-aware.
 *
 * Security note:
 * This layout reads lightweight cookie hints only for frontend shell rendering.
 * Backend authentication, authorization, account status, permission checks,
 * resource visibility, review decisions, and audit logging remain the final
 * authority.
 */

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import {
  AdminShell,
  type AdminShellStaff,
} from '../../src/components/layout/admin-shell/admin-shell';
import type { StaffNavigationRole } from '../../src/lib/navigation/admin-top-bar-navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Role-aware staff dashboard for Asancha Admin.',
  robots: {
    index: false,
    follow: false,
  },
};

export interface DashboardLayoutProps {
  children: ReactNode;
}

const STAFF_COOKIE_NAMES = {
  role: 'asancha_admin_role',
} as const;

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

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(STAFF_COOKIE_NAMES.role)?.value;
  const role: StaffNavigationRole = isStaffNavigationRole(roleCookie) ? roleCookie : 'customer_care_rep';

  return <AdminShell staff={getFallbackStaff(role)}>{children}</AdminShell>;
}
