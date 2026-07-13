// src/lib/constants/review-queues.constants.ts

/**
 * File purpose:
 * Defines review queue constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises review queue keys, labels, route paths, priorities, and
 * safe descriptions used by dashboards, review queue screens, badges, filters,
 * and navigation shortcuts.
 *
 * Key exports:
 * - REVIEW_QUEUE_KEYS defines supported queue keys.
 * - REVIEW_QUEUE_DEFINITIONS defines metadata for queue cards and tables.
 * - REVIEW_QUEUE_PRIORITY_VALUES defines priority filters.
 *
 * Business relevance:
 * Review queues help staff process pending operational work. Queue rows should
 * navigate to relevant detail pages; detail pages must not appear as sidebar
 * items.
 *
 * Security note:
 * Queue visibility is frontend guidance only. Backend permissions, resource
 * visibility, review decision rules, audit logs, and sensitive data redaction
 * remain mandatory.
 */

import type { StaffRole } from '../auth/staff-role-guards';

export const REVIEW_QUEUE_KEYS = [
  'profiles',
  'companies',
  'properties',
  'listings',
  'documents',
  'verification_reviews',
  'payments',
  'deal_reservations',
  'bookings',
  'api_partners',
  'ai',
] as const;

export type ReviewQueueKey = (typeof REVIEW_QUEUE_KEYS)[number];

export const REVIEW_QUEUE_PRIORITY_VALUES = ['low', 'normal', 'high', 'urgent'] as const;

export type ReviewQueuePriority = (typeof REVIEW_QUEUE_PRIORITY_VALUES)[number];

export interface ReviewQueueDefinition {
  key: ReviewQueueKey;
  label: string;
  description: string;
  href: string;
  iconName: string;
  allowedRoles: readonly StaffRole[];
  defaultPriority: ReviewQueuePriority;
  countBadgeKey:
    | 'reviewQueueCount'
    | 'documentReviewCount'
    | 'verificationReviewCount'
    | 'paymentReviewCount'
    | 'apiAccessReviewCount'
    | 'aiReviewCount';
}

const REVIEW_ROLES: readonly StaffRole[] = ['super_admin', 'admin'];
const SUPER_ADMIN_ONLY: readonly StaffRole[] = ['super_admin'];

export const REVIEW_QUEUE_DEFINITIONS: readonly ReviewQueueDefinition[] = [
  {
    key: 'profiles',
    label: 'Profiles',
    description: 'Review submitted role-specific profile records.',
    href: '/review-queues/profiles',
    iconName: 'UserRoundCheck',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'normal',
    countBadgeKey: 'reviewQueueCount',
  },
  {
    key: 'companies',
    label: 'Companies',
    description: 'Review submitted company records and verification readiness.',
    href: '/review-queues/companies',
    iconName: 'Building2',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'normal',
    countBadgeKey: 'reviewQueueCount',
  },
  {
    key: 'properties',
    label: 'Properties',
    description: 'Review submitted property records.',
    href: '/review-queues/properties',
    iconName: 'House',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'normal',
    countBadgeKey: 'reviewQueueCount',
  },
  {
    key: 'listings',
    label: 'Listings',
    description: 'Review listings before marketplace visibility changes.',
    href: '/review-queues/listings',
    iconName: 'ListTodo',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'normal',
    countBadgeKey: 'reviewQueueCount',
  },
  {
    key: 'documents',
    label: 'Documents',
    description: 'Review uploaded documents and correction requirements.',
    href: '/review-queues/documents',
    iconName: 'FileCheck2',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'high',
    countBadgeKey: 'documentReviewCount',
  },
  {
    key: 'verification_reviews',
    label: 'Verification Reviews',
    description: 'Review identity, company, role, and risk readiness.',
    href: '/review-queues/verification-reviews',
    iconName: 'ShieldCheck',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'high',
    countBadgeKey: 'verificationReviewCount',
  },
  {
    key: 'payments',
    label: 'Payments',
    description: 'Review payment references, submitted proofs, and payment status.',
    href: '/review-queues/payments',
    iconName: 'CreditCard',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'high',
    countBadgeKey: 'paymentReviewCount',
  },
  {
    key: 'deal_reservations',
    label: 'Deal Reservations',
    description: 'Review deal reservation lifecycle and related payment context.',
    href: '/review-queues/deal-reservations',
    iconName: 'Handshake',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'normal',
    countBadgeKey: 'reviewQueueCount',
  },
  {
    key: 'bookings',
    label: 'Bookings',
    description: 'Review booking-related operational items where relevant.',
    href: '/review-queues/bookings',
    iconName: 'CalendarClock',
    allowedRoles: REVIEW_ROLES,
    defaultPriority: 'normal',
    countBadgeKey: 'reviewQueueCount',
  },
  {
    key: 'api_partners',
    label: 'API Partners',
    description: 'Review API partner applications and access readiness.',
    href: '/review-queues/api-partners',
    iconName: 'KeyRound',
    allowedRoles: SUPER_ADMIN_ONLY,
    defaultPriority: 'high',
    countBadgeKey: 'apiAccessReviewCount',
  },
  {
    key: 'ai',
    label: 'AI',
    description: 'Review AI/admin insight items where human oversight is required.',
    href: '/review-queues/ai',
    iconName: 'Sparkles',
    allowedRoles: SUPER_ADMIN_ONLY,
    defaultPriority: 'normal',
    countBadgeKey: 'aiReviewCount',
  },
];

export function getReviewQueueDefinition(key: ReviewQueueKey): ReviewQueueDefinition {
  const queue = REVIEW_QUEUE_DEFINITIONS.find((item) => item.key === key);

  if (!queue) {
    throw new Error(`Unknown review queue: ${key}`);
  }

  return queue;
}

export function getReviewQueuesForRole(role: StaffRole): ReviewQueueDefinition[] {
  return REVIEW_QUEUE_DEFINITIONS.filter((queue) => queue.allowedRoles.includes(role));
}
