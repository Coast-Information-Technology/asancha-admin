// src/features/review-queues/constants/review-queues.constants.ts

/**
 * File purpose:
 * Defines constants, route mappings, query keys, and fallback data for Asancha
 * Admin review queues.
 *
 * Role in the project:
 * This file centralises review queue labels, endpoint paths, safe fallback queue
 * summaries, and empty row data used while live backend endpoints are connected.
 *
 * Key exports:
 * - REVIEW_QUEUES_API_PATHS defines backend endpoint paths.
 * - REVIEW_QUEUES_QUERY_KEYS defines TanStack Query keys.
 * - REVIEW_QUEUE_ROUTE_BY_TYPE maps queue types to admin routes.
 * - FALLBACK_REVIEW_QUEUE_SUMMARIES provides safe build-time queue summaries.
 *
 * Business relevance:
 * Review queues help staff find work quickly without placing detail pages in the
 * sidebar menu.
 *
 * Security note:
 * Fallback data must not contain private KYC notes, internal admin notes,
 * restricted document URLs, ObjectIds, secrets, full API keys, API key hashes,
 * webhook secrets, or raw provider payloads.
 */

import type {
  ReviewQueueItem,
  ReviewQueuePriority,
  ReviewQueueQuery,
  ReviewQueueStaffRole,
  ReviewQueueStatus,
  ReviewQueueSummary,
  ReviewQueueType,
} from '../types/review-queues.types';

export const REVIEW_QUEUES_API_PATHS = {
  summaries: '/admin/review-queues',
  items: '/admin/review-queues/items',
} as const;

export const REVIEW_QUEUES_QUERY_KEYS = {
  all: ['review-queues'] as const,
  summaries: (role?: ReviewQueueStaffRole) => ['review-queues', 'summaries', role ?? 'all'] as const,
  items: (query: ReviewQueueQuery) =>
    [
      'review-queues',
      'items',
      query.queueType ?? 'all',
      query.status ?? 'all',
      query.priority ?? 'all',
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
} as const;

export const REVIEW_QUEUES_STALE_TIME_MS = 60_000;

export const REVIEW_QUEUE_ROUTE_BY_TYPE: Record<ReviewQueueType, string> = {
  profiles: '/review-queues/profiles',
  companies: '/review-queues/companies',
  properties: '/review-queues/properties',
  listings: '/review-queues/listings',
  documents: '/review-queues/documents',
  verification_reviews: '/review-queues/verification-reviews',
  payments: '/review-queues/payments',
  deal_reservations: '/review-queues/deal-reservations',
  bookings: '/review-queues/bookings',
  api_partners: '/review-queues/api-partners',
  ai: '/review-queues/ai',
};

export const REVIEW_QUEUE_LABEL_BY_TYPE: Record<ReviewQueueType, string> = {
  profiles: 'Profiles',
  companies: 'Companies',
  properties: 'Properties',
  listings: 'Listings',
  documents: 'Documents',
  verification_reviews: 'Verification reviews',
  payments: 'Payments',
  deal_reservations: 'Deal reservations',
  bookings: 'Bookings',
  api_partners: 'API partners',
  ai: 'AI review',
};

export const REVIEW_QUEUE_STATUS_LABELS: Record<ReviewQueueStatus, string> = {
  pending: 'Pending',
  in_review: 'In review',
  under_review: 'Under review',
  on_hold: 'On hold',
  correction_requested: 'Correction requested',
  replacement_required: 'Replacement required',
  submitted: 'Submitted',
  submitted_for_review: 'Submitted for review',
  payment_pending: 'Payment pending',
  flagged: 'Flagged',
  approved: 'Approved',
  published: 'Published',
  reserved: 'Reserved',
  paid: 'Paid',
  completed: 'Completed',
  rejected: 'Rejected',
  failed: 'Failed',
  expired: 'Expired',
  cancelled: 'Cancelled',
};

export const REVIEW_QUEUE_PRIORITY_LABELS: Record<ReviewQueuePriority, string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  urgent: 'Urgent',
};

export const FALLBACK_REVIEW_QUEUE_SUMMARIES: readonly ReviewQueueSummary[] = [
  {
    queueType: 'profiles',
    label: 'Profiles',
    description:
      'Investor, property owner, property agent, property sourcer, and service provider profile reviews.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.profiles,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'companies',
    label: 'Companies',
    description: 'Company onboarding, member, document, and verification review queue.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.companies,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'properties',
    label: 'Properties',
    description: 'Submitted property records awaiting operational review.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.properties,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'listings',
    label: 'Listings',
    description: 'Listing submission, publication readiness, visibility, and lifecycle review.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.listings,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'documents',
    label: 'Documents',
    description: 'Document review, replacement request, hold, approval, and rejection workflow.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.documents,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'verification_reviews',
    label: 'Verification reviews',
    description: 'Verification, correction, document, message, risk, and audit-aware review queue.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.verification_reviews,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'payments',
    label: 'Payments',
    description: 'Payment proof, reference, status, and trace review queue.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.payments,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'deal_reservations',
    label: 'Deal reservations',
    description: 'Reservation lifecycle, related payment, messages, and activity queue.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.deal_reservations,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'bookings',
    label: 'Bookings',
    description: 'Booking management and support queue.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.bookings,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin', 'customer_care_rep'],
  },
  {
    queueType: 'api_partners',
    label: 'API partners',
    description: 'API partner application, client, plan, subscription, webhook, and billing review.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.api_partners,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
  {
    queueType: 'ai',
    label: 'AI review',
    description: 'AI recommendations, matching snapshots, analysis runs, and feedback review.',
    href: REVIEW_QUEUE_ROUTE_BY_TYPE.ai,
    pendingCount: 0,
    urgentCount: 0,
    oldestItemAgeLabel: 'No pending items',
    allowedRoles: ['super_admin', 'admin'],
  },
];

export const FALLBACK_REVIEW_QUEUE_ITEMS: readonly ReviewQueueItem[] = [];
