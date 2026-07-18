/**
 * Clearly labelled demo records for routes whose backend list/detail endpoints
 * are not connected yet. The shape mirrors the fields the admin API is expected
 * to return, so this file can later be replaced by query results.
 */

import type { BadgeTone } from '../../ui/badge/badge';

export interface RoutePreviewRecord {
  publicId: string;
  primary: string;
  secondary: string;
  status: string;
  statusTone: BadgeTone;
  owner: string;
  updatedAt: string;
  detailHref: string;
}

export interface RoutePreviewStat {
  label: string;
  value: string;
  detail: string;
  tone: BadgeTone;
}

export interface RoutePreviewData {
  recordLabel: string;
  primaryColumn: string;
  secondaryColumn: string;
  ownerColumn: string;
  stats: readonly RoutePreviewStat[];
  records: readonly RoutePreviewRecord[];
}

const messagePreview: RoutePreviewData = {
  recordLabel: 'assigned conversations',
  primaryColumn: 'Conversation',
  secondaryColumn: 'Latest message',
  ownerColumn: 'Assigned to',
  stats: [
    { label: 'Total conversations', value: '24', detail: 'Demo records in this view', tone: 'info' },
    { label: 'Open', value: '8', detail: 'Awaiting a staff reply', tone: 'warning' },
    { label: 'Assigned', value: '6', detail: 'Currently owned by staff', tone: 'neutral' },
    { label: 'Overdue', value: '2', detail: 'Past the response target', tone: 'danger' },
  ],
  records: [
    {
      publicId: 'msg_demo_001',
      primary: 'Document review follow-up',
      secondary: 'User asked for an update on proof of address review.',
      status: 'Open',
      statusTone: 'warning',
      owner: 'Demo Admin',
      updatedAt: '18 Jul 2026, 09:42',
      detailHref: '/messages/assigned?messagePublicId=msg_demo_001',
    },
    {
      publicId: 'msg_demo_002',
      primary: 'Booking confirmation question',
      secondary: 'Customer needs help confirming a viewing appointment.',
      status: 'In progress',
      statusTone: 'info',
      owner: 'Demo Support Rep',
      updatedAt: '18 Jul 2026, 09:18',
      detailHref: '/messages/assigned?messagePublicId=msg_demo_002',
    },
    {
      publicId: 'msg_demo_003',
      primary: 'Verification status request',
      secondary: 'Customer asked why verification remains pending.',
      status: 'Waiting on staff',
      statusTone: 'danger',
      owner: 'Demo Operations Lead',
      updatedAt: '18 Jul 2026, 08:56',
      detailHref: '/messages/assigned?messagePublicId=msg_demo_003',
    },
  ],
};

const auditPreview: RoutePreviewData = {
  recordLabel: 'audit events',
  primaryColumn: 'Event',
  secondaryColumn: 'Resource',
  ownerColumn: 'Actor',
  stats: [
    { label: 'Total events', value: '112', detail: 'Demo events in the current period', tone: 'info' },
    { label: 'High risk', value: '3', detail: 'Require operational attention', tone: 'danger' },
    { label: 'Today', value: '26', detail: 'Events recorded today', tone: 'neutral' },
    { label: 'Staff actions', value: '18', detail: 'Actions by internal staff', tone: 'warning' },
  ],
  records: [
    {
      publicId: 'audit_demo_001',
      primary: 'Verification review opened',
      secondary: 'Resource vr_demo_1001 - investor verification',
      status: 'High risk',
      statusTone: 'danger',
      owner: 'Demo Admin',
      updatedAt: '18 Jul 2026, 09:31',
      detailHref: '/audit-logs/high-risk?eventPublicId=audit_demo_001',
    },
    {
      publicId: 'audit_demo_002',
      primary: 'Document review assigned',
      secondary: 'Resource doc_demo_2004 - proof of address',
      status: 'Recorded',
      statusTone: 'success',
      owner: 'Demo Operations Lead',
      updatedAt: '18 Jul 2026, 09:16',
      detailHref: '/audit-logs?eventPublicId=audit_demo_002',
    },
    {
      publicId: 'audit_demo_003',
      primary: 'Staff role updated',
      secondary: 'Resource staff_demo_003 - permissions profile',
      status: 'Recorded',
      statusTone: 'neutral',
      owner: 'Demo Super Admin',
      updatedAt: '18 Jul 2026, 08:44',
      detailHref: '/audit-logs/staff?eventPublicId=audit_demo_003',
    },
  ],
};

const bookingPreview: RoutePreviewData = {
  recordLabel: 'booking records',
  primaryColumn: 'Booking',
  secondaryColumn: 'Property and appointment',
  ownerColumn: 'Customer',
  stats: [
    { label: 'Total bookings', value: '18', detail: 'Demo bookings in this workspace', tone: 'info' },
    { label: 'Pending', value: '6', detail: 'Awaiting confirmation', tone: 'warning' },
    { label: 'Confirmed', value: '9', detail: 'Appointments scheduled', tone: 'success' },
    { label: 'Support cases', value: '3', detail: 'Need customer care follow-up', tone: 'danger' },
  ],
  records: [
    {
      publicId: 'booking_demo_001',
      primary: 'Viewing request BK-10021',
      secondary: '14 Kingsway Road - 19 Jul 2026, 11:00',
      status: 'Pending confirmation',
      statusTone: 'warning',
      owner: 'Olivia Harris',
      updatedAt: '18 Jul 2026, 09:20',
      detailHref: '/bookings?bookingPublicId=booking_demo_001',
    },
    {
      publicId: 'booking_demo_002',
      primary: 'Viewing request BK-10018',
      secondary: '8 Brookfield Avenue - 20 Jul 2026, 14:30',
      status: 'Confirmed',
      statusTone: 'success',
      owner: 'Noah Williams',
      updatedAt: '18 Jul 2026, 08:52',
      detailHref: '/bookings?bookingPublicId=booking_demo_002',
    },
    {
      publicId: 'booking_demo_003',
      primary: 'Viewing request BK-10014',
      secondary: '22 Mill Lane - customer requested a new time',
      status: 'Support required',
      statusTone: 'danger',
      owner: 'Amelia Thompson',
      updatedAt: '17 Jul 2026, 16:40',
      detailHref: '/bookings/support?bookingPublicId=booking_demo_003',
    },
  ],
};

const paymentPreview: RoutePreviewData = {
  recordLabel: 'payment records',
  primaryColumn: 'Payment',
  secondaryColumn: 'Reservation and reference',
  ownerColumn: 'Payer',
  stats: [
    { label: 'Total payments', value: '17', detail: 'Demo payment records', tone: 'info' },
    { label: 'Submitted proof', value: '5', detail: 'Waiting for review', tone: 'warning' },
    { label: 'Paid', value: '9', detail: 'Successfully confirmed', tone: 'success' },
    { label: 'Failed', value: '1', detail: 'Needs investigation', tone: 'danger' },
  ],
  records: [
    {
      publicId: 'payment_demo_001',
      primary: 'Payment PMT-20041',
      secondary: 'Reservation RES-3008 - bank transfer reference ending 4821',
      status: 'Submitted for review',
      statusTone: 'warning',
      owner: 'Daniel Wright',
      updatedAt: '18 Jul 2026, 09:04',
      detailHref: '/payments?paymentPublicId=payment_demo_001',
    },
    {
      publicId: 'payment_demo_002',
      primary: 'Payment PMT-20037',
      secondary: 'Reservation RES-3004 - provider confirmation received',
      status: 'Paid',
      statusTone: 'success',
      owner: 'Sophie Bennett',
      updatedAt: '18 Jul 2026, 08:38',
      detailHref: '/payments?paymentPublicId=payment_demo_002',
    },
    {
      publicId: 'payment_demo_003',
      primary: 'Payment PMT-20032',
      secondary: 'Reservation RES-2999 - reference could not be matched',
      status: 'Failed',
      statusTone: 'danger',
      owner: 'James Carter',
      updatedAt: '17 Jul 2026, 17:12',
      detailHref: '/payments?paymentPublicId=payment_demo_003',
    },
  ],
};

const reservationPreview: RoutePreviewData = {
  recordLabel: 'deal reservations',
  primaryColumn: 'Reservation',
  secondaryColumn: 'Listing and payment state',
  ownerColumn: 'Investor',
  stats: [
    { label: 'Total reservations', value: '12', detail: 'Demo reservation records', tone: 'info' },
    { label: 'Pending payment', value: '3', detail: 'Payment action is outstanding', tone: 'warning' },
    { label: 'Active', value: '6', detail: 'Reservation workflow in progress', tone: 'success' },
    { label: 'Needs review', value: '2', detail: 'Requires staff attention', tone: 'danger' },
  ],
  records: [
    {
      publicId: 'reservation_demo_001',
      primary: 'Reservation RES-3008',
      secondary: '18 Park View - payment proof submitted',
      status: 'Awaiting review',
      statusTone: 'warning',
      owner: 'Daniel Wright',
      updatedAt: '18 Jul 2026, 09:04',
      detailHref: '/deal-reservations/reservation_demo_001',
    },
    {
      publicId: 'reservation_demo_002',
      primary: 'Reservation RES-3004',
      secondary: '42 Wellington Street - seller confirmation pending',
      status: 'Active',
      statusTone: 'info',
      owner: 'Sophie Bennett',
      updatedAt: '18 Jul 2026, 08:26',
      detailHref: '/deal-reservations/reservation_demo_002',
    },
    {
      publicId: 'reservation_demo_003',
      primary: 'Reservation RES-2999',
      secondary: '7 Oak Crescent - payment deadline approaching',
      status: 'Needs attention',
      statusTone: 'danger',
      owner: 'James Carter',
      updatedAt: '17 Jul 2026, 16:55',
      detailHref: '/deal-reservations/reservation_demo_003',
    },
  ],
};

const notificationPreview: RoutePreviewData = {
  recordLabel: 'notifications',
  primaryColumn: 'Notification',
  secondaryColumn: 'Context',
  ownerColumn: 'Recipient',
  stats: [
    { label: 'Total notifications', value: '18', detail: 'Demo notifications in your feed', tone: 'info' },
    { label: 'Unread', value: '6', detail: 'Need acknowledgement', tone: 'warning' },
    { label: 'Critical', value: '1', detail: 'Requires immediate review', tone: 'danger' },
    { label: 'Today', value: '7', detail: 'Created since midnight', tone: 'neutral' },
  ],
  records: [
    {
      publicId: 'notification_demo_001',
      primary: 'Verification backlog threshold reached',
      secondary: 'Verification review queue exceeded the demo operational threshold.',
      status: 'Unread',
      statusTone: 'danger',
      owner: 'Current staff user',
      updatedAt: '18 Jul 2026, 09:31',
      detailHref: '/notifications?notificationPublicId=notification_demo_001',
    },
    {
      publicId: 'notification_demo_002',
      primary: 'New payment proof submitted',
      secondary: 'PMT-20041 was submitted for authorised review.',
      status: 'Unread',
      statusTone: 'warning',
      owner: 'Current staff user',
      updatedAt: '18 Jul 2026, 09:04',
      detailHref: '/notifications?notificationPublicId=notification_demo_002',
    },
    {
      publicId: 'notification_demo_003',
      primary: 'Queue assignment completed',
      secondary: 'A demo document review was assigned to your team.',
      status: 'Read',
      statusTone: 'success',
      owner: 'Current staff user',
      updatedAt: '18 Jul 2026, 08:44',
      detailHref: '/notifications?notificationPublicId=notification_demo_003',
    },
  ],
};

const platformPreview: RoutePreviewData = {
  recordLabel: 'platform records',
  primaryColumn: 'Record',
  secondaryColumn: 'Details',
  ownerColumn: 'Owner',
  stats: [
    { label: 'Total records', value: '16', detail: 'Demo records in this view', tone: 'info' },
    { label: 'Pending', value: '4', detail: 'Awaiting an operational decision', tone: 'warning' },
    { label: 'Active', value: '10', detail: 'Currently available or in use', tone: 'success' },
    { label: 'Attention', value: '2', detail: 'Requires staff follow-up', tone: 'danger' },
  ],
  records: [
    {
      publicId: 'record_demo_001',
      primary: 'Demo verification review',
      secondary: 'Investor profile - manual review requested',
      status: 'Pending',
      statusTone: 'warning',
      owner: 'Demo Operations Lead',
      updatedAt: '18 Jul 2026, 09:31',
      detailHref: '/verification-reviews/verification_demo_001',
    },
    {
      publicId: 'record_demo_002',
      primary: 'Demo property listing',
      secondary: '18 Park View - publication checks complete',
      status: 'Active',
      statusTone: 'success',
      owner: 'Demo Admin',
      updatedAt: '18 Jul 2026, 08:58',
      detailHref: '/listings/listing_demo_001',
    },
    {
      publicId: 'record_demo_003',
      primary: 'Demo profile record',
      secondary: 'Service provider - company details require review',
      status: 'Needs attention',
      statusTone: 'danger',
      owner: 'Demo Admin',
      updatedAt: '17 Jul 2026, 16:18',
      detailHref: '/profiles/profile_demo_001',
    },
  ],
};

const previewDataByCategory: Record<string, RoutePreviewData> = {
  messages: messagePreview,
  audit: auditPreview,
  bookings: bookingPreview,
  payments: paymentPreview,
  reservations: reservationPreview,
  notifications: notificationPreview,
  platform: platformPreview,
};

export function getRoutePreviewData(title: string): RoutePreviewData {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('message')) return previewDataByCategory.messages;
  if (normalizedTitle.includes('audit') || normalizedTitle.includes('activity')) return previewDataByCategory.audit;
  if (normalizedTitle.includes('booking')) return previewDataByCategory.bookings;
  if (normalizedTitle.includes('payment')) return previewDataByCategory.payments;
  if (normalizedTitle.includes('reservation')) return previewDataByCategory.reservations;
  if (normalizedTitle.includes('notification')) return previewDataByCategory.notifications;

  return previewDataByCategory.platform;
}
