// app/dashboard/page.tsx

/**
 * File purpose:
 * Provides the dashboard resolver route for the Asancha Admin frontend.
 *
 * Role in the project:
 * This page resolves /dashboard to the correct role-specific dashboard route:
 * - super_admin -> /dashboard/super-admin
 * - admin -> /dashboard/admin
 * - customer_care_rep -> /dashboard/customer-care
 *
 * Key exports:
 * - DashboardResolverPage redirects staff to their role dashboard.
 *
 * Business relevance:
 * Staff dashboards must be role-aware. Customer care must only see safe support
 * widgets, while admin and super_admin dashboards may show broader operational
 * widgets where allowed.
 *
 * Security note:
 * This resolver uses frontend cookie hints only. Backend session validation,
 * account status, permissions, and resource visibility remain final.
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const STAFF_COOKIE_NAMES = {
  accessToken: 'asancha_admin_access_token',
  role: 'asancha_admin_role',
  accountStatus: 'asancha_admin_account_status',
} as const;

function isLockedStatus(value: string | undefined): boolean {
  return value === 'locked' || value === 'suspended' || value === 'disabled';
}

export default async function DashboardResolverPage() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(STAFF_COOKIE_NAMES.accessToken)?.value;
  const role = cookieStore.get(STAFF_COOKIE_NAMES.role)?.value;
  const accountStatus = cookieStore.get(STAFF_COOKIE_NAMES.accountStatus)?.value;

  if (!accessToken) {
    redirect('/auth/sign-in');
  }

  if (isLockedStatus(accountStatus)) {
    redirect('/auth/locked');
  }

  if (role === 'super_admin') {
    redirect('/dashboard/super-admin');
  }

  if (role === 'admin') {
    redirect('/dashboard/admin');
  }

  if (role === 'customer_care_rep') {
    redirect('/dashboard/customer-care');
  }

  redirect('/auth/unauthorized');
}
