// src/features/dashboard/constants/dashboard.mock.ts

/**
 * Clearly labelled dashboard preview data for frontend implementation work.
 * Replace the hook's data source with the API loader when backend metrics are ready.
 */

import { FALLBACK_REVIEW_QUEUE_SUMMARY } from './dashboard.constants';
import type {
  AdminDashboardState,
  CustomerCareDashboardState,
  DashboardStaffRole,
  ReviewQueueSummaryItem,
  StaffDashboardState,
  SuperAdminDashboardState,
} from '../types/dashboard.types';

export const MOCK_REVIEW_QUEUE_SUMMARY: readonly ReviewQueueSummaryItem[] =
  FALLBACK_REVIEW_QUEUE_SUMMARY.map((queue, index) => ({
    ...queue,
    pendingCount: [12, 7, 9, 16, 11, 5, 4, 6, 8, 3, 2][index] ?? 1,
    urgentCount: [2, 1, 1, 3, 2, 1, 1, 1, 2, 0, 1][index] ?? 0,
    oldestItemAgeLabel: `${index + 1}h 20m`,
  }));

export const MOCK_SUPER_ADMIN_DASHBOARD_STATE: SuperAdminDashboardState = {
  role: 'super_admin',
  generatedAtLabel: 'Demo data - backend not connected',
  metrics: [
    {
      key: 'review_queues',
      label: 'Review queues',
      value: 42,
      description: 'Demo records waiting across the operational review queues.',
      href: '/review-queues',
      tone: 'info',
    },
    {
      key: 'pending_payments',
      label: 'Pending payments',
      value: 7,
      description: 'Demo payment proofs awaiting authorised review.',
      href: '/review-queues/payments',
      tone: 'warning',
    },
    {
      key: 'staff_activity',
      label: 'Staff activity',
      value: 18,
      description: 'Demo staff activity events for layout preview.',
      href: '/audit-logs/staff',
      tone: 'neutral',
    },
    {
      key: 'audit_alerts',
      label: 'High-risk alerts',
      value: 3,
      description: 'Demo alerts requiring operational attention.',
      href: '/audit-logs/high-risk',
      tone: 'danger',
    },
  ],
  reviewQueues: MOCK_REVIEW_QUEUE_SUMMARY,
  quickLinks: [
    {
      label: 'Operational review',
      description: 'Open the demo review queue overview.',
      href: '/review-queues',
    },
    {
      label: 'Staff governance',
      description: 'Open the demo staff management workspace.',
      href: '/staff',
    },
    {
      label: 'Platform controls',
      description: 'Open demo settings and system control screens.',
      href: '/settings',
    },
  ],
  staffActivity: [
    {
      staffPublicId: 'demo-staff-001',
      staffName: 'Demo Staff Member',
      staffRole: 'admin',
      summary: 'Reviewed a demo property submission.',
      lastActivityAtLabel: '12 minutes ago',
      href: '/audit-logs/staff',
    },
    {
      staffPublicId: 'demo-staff-002',
      staffName: 'Demo Operations Lead',
      staffRole: 'super_admin',
      summary: 'Updated a demo review queue assignment.',
      lastActivityAtLabel: '38 minutes ago',
      href: '/audit-logs/staff',
    },
  ],
  operationalAlerts: [
    {
      alertPublicId: 'demo-alert-001',
      title: 'Demo verification backlog',
      description: 'Three demo verification items have been waiting for more than one hour.',
      severity: 'high',
      createdAtLabel: '18 minutes ago',
      href: '/audit-logs/high-risk',
    },
  ],
};

export const MOCK_ADMIN_DASHBOARD_STATE: AdminDashboardState = {
  role: 'admin',
  generatedAtLabel: 'Demo data - backend not connected',
  metrics: [
    {
      key: 'review_queues',
      label: 'Review queues',
      value: 28,
      description: 'Demo operational items requiring review or assignment.',
      href: '/review-queues',
      tone: 'info',
    },
    {
      key: 'assigned_messages',
      label: 'Assigned messages',
      value: 9,
      description: 'Demo support conversations assigned to admin operations.',
      href: '/messages/assigned',
      tone: 'neutral',
    },
    {
      key: 'pending_bookings',
      label: 'Booking queue',
      value: 6,
      description: 'Demo bookings needing coordination.',
      href: '/bookings',
      tone: 'warning',
    },
    {
      key: 'system_notifications',
      label: 'System notifications',
      value: 4,
      description: 'Demo operational notifications for admin staff.',
      href: '/notifications',
      tone: 'success',
    },
  ],
  reviewQueues: MOCK_REVIEW_QUEUE_SUMMARY,
  quickLinks: [
    {
      label: 'Review submitted records',
      description: 'Open the demo operational review workspace.',
      href: '/review-queues',
    },
    {
      label: 'Support users safely',
      description: 'Open the demo user support search screen.',
      href: '/users/search',
    },
    {
      label: 'Coordinate operations',
      description: 'Open demo messages, bookings, and payment status screens.',
      href: '/messages',
    },
  ],
  staffActivity: [
    {
      staffPublicId: 'demo-admin-001',
      staffName: 'Demo Admin',
      staffRole: 'admin',
      summary: 'Assigned a demo review item to the operations queue.',
      lastActivityAtLabel: '8 minutes ago',
      href: '/audit-logs/staff',
    },
  ],
  operationalAlerts: [],
};

export const MOCK_CUSTOMER_CARE_DASHBOARD_STATE: CustomerCareDashboardState = {
  role: 'customer_care_rep',
  generatedAtLabel: 'Demo data - backend not connected',
  metrics: [
    {
      key: 'assigned_messages',
      label: 'Assigned messages',
      value: 13,
      description: 'Demo support conversations assigned to your queue.',
      href: '/messages/assigned',
      tone: 'info',
    },
    {
      key: 'booking_support',
      label: 'Booking support',
      value: 5,
      description: 'Demo booking questions needing follow-up.',
      href: '/bookings/support',
      tone: 'warning',
    },
    {
      key: 'status_inquiries',
      label: 'Status inquiries',
      value: 8,
      description: 'Demo document, verification, and payment status questions.',
      href: '/documents/status',
      tone: 'neutral',
    },
    {
      key: 'system_notifications',
      label: 'Notifications',
      value: 6,
      description: 'Demo support-safe notifications for your role.',
      href: '/notifications',
      tone: 'success',
    },
  ],
  reviewQueues: MOCK_REVIEW_QUEUE_SUMMARY.filter((queue) =>
    queue.allowedRoles.includes('customer_care_rep'),
  ),
  quickLinks: [
    {
      label: 'Search user safely',
      description: 'Open the demo safe user lookup screen.',
      href: '/users/search',
    },
    {
      label: 'Handle assigned messages',
      description: 'Open the demo assigned messages workspace.',
      href: '/messages/assigned',
    },
    {
      label: 'Check support statuses',
      description: 'Open demo document, verification, payment, and booking statuses.',
      href: '/bookings/support',
    },
  ],
  supportSummaries: [
    {
      type: 'assigned_messages',
      label: 'Assigned messages',
      count: 13,
      description: 'Demo support conversations assigned to your queue.',
      href: '/messages/assigned',
    },
    {
      type: 'booking_support',
      label: 'Booking support',
      count: 5,
      description: 'Demo booking support items needing follow-up.',
      href: '/bookings/support',
    },
    {
      type: 'document_status',
      label: 'Document status',
      count: 4,
      description: 'Demo document status inquiries.',
      href: '/documents/status',
    },
    {
      type: 'verification_status',
      label: 'Verification status',
      count: 3,
      description: 'Demo verification status inquiries.',
      href: '/verification-reviews/status',
    },
    {
      type: 'payment_status',
      label: 'Payment status',
      count: 2,
      description: 'Demo payment status inquiries.',
      href: '/payments/status',
    },
  ],
};

export function getMockStaffDashboardState(role: DashboardStaffRole): StaffDashboardState {
  if (role === 'super_admin') {
    return MOCK_SUPER_ADMIN_DASHBOARD_STATE;
  }

  if (role === 'admin') {
    return MOCK_ADMIN_DASHBOARD_STATE;
  }

  return MOCK_CUSTOMER_CARE_DASHBOARD_STATE;
}
