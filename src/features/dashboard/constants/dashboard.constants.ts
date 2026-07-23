// src/features/dashboard/constants/dashboard.constants.ts

/**
 * File purpose:
 * Defines constants and safe fallback dashboard data for Asancha Admin.
 *
 * Role in the project:
 * This file centralises dashboard query keys, endpoint paths, route links, and
 * static fallback values used before live backend dashboard endpoints are fully
 * connected.
 *
 * Key exports:
 * - DASHBOARD_API_PATHS defines backend dashboard endpoint paths.
 * - DASHBOARD_QUERY_KEYS defines TanStack Query keys.
 * - fallback dashboard states provide build-safe role dashboards.
 *
 * Business relevance:
 * The admin dashboard must remain role-aware and operationally useful even while
 * live metrics are being connected.
 *
 * Security note:
 * Fallback data must not contain real private data, secrets, internal ObjectIds,
 * private document URLs, private KYC notes, or sensitive audit details.
 */

import type {
  AdminDashboardState,
  CustomerCareDashboardState,
  DashboardStaffRole,
  ReviewQueueSummaryItem,
  SuperAdminDashboardState,
} from '../types/dashboard.types';
import { API_ROUTES } from '../../../lib/api/api-routes';

export const DASHBOARD_API_PATHS = {
  superAdmin: API_ROUTES.dashboard.superAdmin,
  admin: API_ROUTES.dashboard.admin,
  customerCare: API_ROUTES.dashboard.customerCare,
  reviewQueueSummary: `${API_ROUTES.dashboard.root}/review-queues`,
} as const;

export const DASHBOARD_QUERY_KEYS = {
  all: ['dashboard'] as const,
  staffState: (role: DashboardStaffRole) => ['dashboard', 'staff-state', role] as const,
  adminState: (role: Extract<DashboardStaffRole, 'super_admin' | 'admin'>) =>
    ['dashboard', 'admin-state', role] as const,
  reviewQueueSummary: (role: DashboardStaffRole) =>
    ['dashboard', 'review-queue-summary', role] as const,
} as const;

export const DASHBOARD_STALE_TIME_MS = 60_000;

/** Keep dashboard rendering deterministic while the UI is being designed. */
export const DASHBOARD_DATA_SOURCE: 'mock' | 'api' = 'mock';

export const FALLBACK_REVIEW_QUEUE_SUMMARY: readonly ReviewQueueSummaryItem[] = [
  {
    queueType: 'profiles',
    label: 'Profiles',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/profiles',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'companies',
    label: 'Companies',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/companies',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'properties',
    label: 'Properties',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/properties',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'listings',
    label: 'Listings',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/listings',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'documents',
    label: 'Documents',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/documents',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'verification_reviews',
    label: 'Verification reviews',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/verification-reviews',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'payments',
    label: 'Payments',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/payments',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'deal_reservations',
    label: 'Deal reservations',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/deal-reservations',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'bookings',
    label: 'Bookings',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/bookings',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
  {
    queueType: 'api_partners',
    label: 'API partners',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/api-partners',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'ai',
    label: 'AI review',
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    href: '/review-queues/ai',
    allowedRoles: ['super_admin', 'admin'],
  },
];

export const FALLBACK_SUPER_ADMIN_DASHBOARD_STATE: SuperAdminDashboardState = {
  role: 'super_admin',
  generatedAtLabel: 'Live metrics pending',
  metrics: [
    {
      key: 'review_queues',
      label: 'Review queues',
      value: 0,
      description:
        'Profiles, companies, properties, listings, documents, payments, and API partners.',
      href: '/review-queues',
      tone: 'info',
    },
    {
      key: 'pending_payments',
      label: 'Pending payments',
      value: 0,
      description: 'Payment proofs and references awaiting authorised review.',
      href: '/review-queues/payments',
      tone: 'warning',
    },
    {
      key: 'staff_activity',
      label: 'Staff activity',
      value: 0,
      description: 'Recent staff actions requiring operational awareness.',
      href: '/audit-logs/staff',
      tone: 'neutral',
    },
    {
      key: 'audit_alerts',
      label: 'High-risk alerts',
      value: 0,
      description: 'Sensitive audit and verification events requiring attention.',
      href: '/audit-logs/high-risk',
      tone: 'danger',
    },
  ],
  reviewQueues: FALLBACK_REVIEW_QUEUE_SUMMARY,
  quickLinks: [
    {
      label: 'Operational review',
      description: 'Open the central review queue overview.',
      href: '/review-queues',
    },
    {
      label: 'Staff governance',
      description: 'Manage authorised admin and customer care accounts.',
      href: '/staff',
    },
    {
      label: 'Platform controls',
      description: 'Open settings and system controls where permitted.',
      href: '/settings',
    },
  ],
  staffActivity: [],
  operationalAlerts: [],
};

export const FALLBACK_ADMIN_DASHBOARD_STATE: AdminDashboardState = {
  role: 'admin',
  generatedAtLabel: 'Live metrics pending',
  metrics: [
    {
      key: 'review_queues',
      label: 'Review queues',
      value: 0,
      description: 'Operational queues requiring admin review or assignment.',
      href: '/review-queues',
      tone: 'info',
    },
    {
      key: 'assigned_messages',
      label: 'Assigned messages',
      value: 0,
      description: 'Messages assigned to admin operations and support workflows.',
      href: '/messages/assigned',
      tone: 'neutral',
    },
    {
      key: 'pending_bookings',
      label: 'Booking queue',
      value: 0,
      description: 'Upcoming or pending bookings needing admin coordination.',
      href: '/bookings',
      tone: 'warning',
    },
    {
      key: 'system_notifications',
      label: 'System notifications',
      value: 0,
      description: 'Recent operational notifications relevant to admin staff.',
      href: '/notifications',
      tone: 'success',
    },
  ],
  reviewQueues: FALLBACK_REVIEW_QUEUE_SUMMARY,
  quickLinks: [
    {
      label: 'Review submitted records',
      description: 'Work through submitted operational records where permitted.',
      href: '/review-queues',
    },
    {
      label: 'Support users safely',
      description: 'Search users and view safe support context.',
      href: '/users/search',
    },
    {
      label: 'Coordinate operations',
      description: 'Track messages, bookings, notifications, reservations, and payment statuses.',
      href: '/messages',
    },
  ],
  staffActivity: [],
  operationalAlerts: [],
};

export const FALLBACK_CUSTOMER_CARE_DASHBOARD_STATE: CustomerCareDashboardState = {
  role: 'customer_care_rep',
  generatedAtLabel: 'Live metrics pending',
  metrics: [
    {
      key: 'assigned_messages',
      label: 'Assigned messages',
      value: 0,
      description: 'Support conversations assigned to you or your support queue.',
      href: '/messages/assigned',
      tone: 'info',
    },
    {
      key: 'booking_support',
      label: 'Booking support',
      value: 0,
      description: 'Booking-related support items needing follow-up.',
      href: '/bookings/support',
      tone: 'warning',
    },
    {
      key: 'status_inquiries',
      label: 'Status inquiries',
      value: 0,
      description: 'Document, verification, and payment status questions.',
      href: '/documents/status',
      tone: 'neutral',
    },
    {
      key: 'system_notifications',
      label: 'Notifications',
      value: 0,
      description: 'Recent support-safe notifications for your role.',
      href: '/notifications',
      tone: 'success',
    },
  ],
  reviewQueues: FALLBACK_REVIEW_QUEUE_SUMMARY.filter((queue) =>
    queue.allowedRoles.includes('customer_care_rep'),
  ),
  quickLinks: [
    {
      label: 'Search user safely',
      description: 'Find a user using safe public account details.',
      href: '/users/search',
    },
    {
      label: 'Handle assigned messages',
      description: 'Respond to support messages assigned to you.',
      href: '/messages/assigned',
    },
    {
      label: 'Check support statuses',
      description: 'Review support-safe document, verification, payment, and booking statuses.',
      href: '/bookings/support',
    },
  ],
  supportSummaries: [
    {
      type: 'assigned_messages',
      label: 'Assigned messages',
      count: 0,
      description: 'Support conversations assigned to your queue.',
      href: '/messages/assigned',
    },
    {
      type: 'booking_support',
      label: 'Booking support',
      count: 0,
      description: 'Booking support items needing follow-up.',
      href: '/bookings/support',
    },
    {
      type: 'document_status',
      label: 'Document status',
      count: 0,
      description: 'Support-safe document status inquiries.',
      href: '/documents/status',
    },
    {
      type: 'verification_status',
      label: 'Verification status',
      count: 0,
      description: 'Support-safe verification status inquiries.',
      href: '/verification-reviews/status',
    },
    {
      type: 'payment_status',
      label: 'Payment status',
      count: 0,
      description: 'Support-safe payment status inquiries.',
      href: '/payments/status',
    },
  ],
};
