// src/lib/constants/app.constants.ts

/**
 * File purpose:
 * Defines application-level constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises safe app metadata, environment labels, storage keys,
 * cookie names, accessibility labels, and UI defaults used across the internal
 * admin/staff frontend.
 *
 * Key exports:
 * - APP_METADATA defines safe application identity values.
 * - APP_ENVIRONMENT_LABELS defines environment display labels.
 * - APP_STORAGE_KEYS defines frontend-safe local/session storage keys.
 * - APP_COOKIE_NAMES defines staff/admin cookie names.
 *
 * Business relevance:
 * asancha-admin is an internal staff-only frontend for super_admin, admin, and
 * customer_care_rep users. It must remain separate from the public/user
 * frontend and must not expose live private service URLs, secrets, API keys,
 * webhook secrets, private document URLs, MongoDB ObjectIds, or internal notes.
 *
 * Security note:
 * These constants are safe frontend values only. Backend authentication,
 * authorization, account status, staff permissions, audit logging, and resource
 * visibility remain the final enforcement authority.
 */

import { env } from '../env/env';

export const APP_METADATA = {
  name: env.NEXT_PUBLIC_APP_NAME || 'Asancha Admin',
  shortName: 'Admin',
  productName: 'Asancha',
  repositoryName: 'asancha-admin',
  description: 'Internal admin and staff frontend for Asancha operations.',
} as const;

export const APP_ENVIRONMENT = env.NEXT_PUBLIC_ENVIRONMENT;

export const APP_ENVIRONMENT_LABELS = {
  development: 'Development',
  test: 'Test',
  staging: 'Staging',
  production: 'Production',
} as const;

export const APP_URLS = {
  adminApp: env.NEXT_PUBLIC_APP_URL,
  apiBase: env.NEXT_PUBLIC_API_BASE_URL,
  publicApp: env.NEXT_PUBLIC_PUBLIC_APP_URL,
} as const;

export const APP_STORAGE_KEYS = {
  sidebarCollapsed: 'asancha_admin_sidebar_collapsed',
  mobileDrawerOpen: 'asancha_admin_mobile_drawer_open',
  preferredTheme: 'asancha_admin_preferred_theme',
  tableDensity: 'asancha_admin_table_density',
  lastVisitedDashboard: 'asancha_admin_last_visited_dashboard',
} as const;

export const APP_COOKIE_NAMES = {
  accessToken: 'asancha_admin_access_token',
  refreshToken: 'asancha_admin_refresh_token',
  role: 'asancha_admin_role',
  accountStatus: 'asancha_admin_account_status',
  staffPublicId: 'asancha_admin_staff_public_id',
} as const;

export const APP_HTTP_HEADERS = {
  requestId: 'x-request-id',
  correlationId: 'x-correlation-id',
  csrfToken: 'x-csrf-token',
} as const;

export const APP_DEFAULTS = {
  pageSize: 20,
  maxPageSize: 100,
  debounceMs: 350,
  toastDurationMs: 5000,
  drawerBreakpointPx: 1024,
  dateLocale: 'en-GB',
  currencyLocale: 'en-GB',
  currencyCode: 'GBP',
} as const;

export const APP_ACCESSIBILITY_LABELS = {
  skipToContent: 'Skip to main content',
  openNavigation: 'Open navigation menu',
  closeNavigation: 'Close navigation menu',
  openNotifications: 'Open notifications',
  openMessages: 'Open messages',
  openStaffMenu: 'Open staff account menu',
  searchAdmin: 'Search admin records',
} as const;

export const APP_ROUTE_GROUPS = {
  auth: 'auth',
  dashboard: 'dashboard',
  reviewQueues: 'review-queues',
  users: 'users',
  staff: 'staff',
  profiles: 'profiles',
  companies: 'companies',
  properties: 'properties',
  listings: 'listings',
  documents: 'documents',
  verificationReviews: 'verification-reviews',
  dealReservations: 'deal-reservations',
  dealActivities: 'deal-activities',
  payments: 'payments',
  bookings: 'bookings',
  messages: 'messages',
  notifications: 'notifications',
  apiAccess: 'api-access',
  ai: 'ai',
  auditLogs: 'audit-logs',
  settings: 'settings',
  myProfile: 'my-profile',
  system: 'system',
} as const;

export type AppEnvironment = keyof typeof APP_ENVIRONMENT_LABELS;
export type AppRouteGroup = keyof typeof APP_ROUTE_GROUPS;
