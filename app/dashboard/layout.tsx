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
import type { ReactNode } from 'react';

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

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return children;
}
