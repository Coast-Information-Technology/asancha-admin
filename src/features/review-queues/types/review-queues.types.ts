// src/features/review-queues/types/review-queues.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin review queues.
 *
 * Role in the project:
 * This file provides shared review-queue types for queue summaries, queue items,
 * query filters, API payloads, and reusable queue UI components.
 *
 * Key exports:
 * - ReviewQueueType defines supported operational queue categories.
 * - ReviewQueuePriority defines queue urgency levels.
 * - ReviewQueueStatus defines safe review item states.
 * - ReviewQueueSummary defines queue-level overview data.
 * - ReviewQueueItem defines row-level queue item data.
 * - ReviewQueueQuery defines filter/pagination inputs.
 *
 * Business relevance:
 * Review queues are the operational control centre for profiles, companies,
 * properties, listings, documents, verification reviews, payments, deal
 * reservations, bookings, API partners, and AI review.
 *
 * Security note:
 * These types use safe public IDs and safe summaries only. Backend permissions,
 * record visibility, redaction, mutation rules, and audit logging remain final.
 */

export type ReviewQueueStaffRole = 'super_admin' | 'admin' | 'customer_care_rep';

export type ReviewQueueType =
  | 'profiles'
  | 'companies'
  | 'properties'
  | 'listings'
  | 'documents'
  | 'verification_reviews'
  | 'payments'
  | 'deal_reservations'
  | 'bookings'
  | 'api_partners'
  | 'ai';

export type ReviewQueuePriority = 'low' | 'normal' | 'high' | 'urgent';

export type ReviewQueueStatus =
  | 'pending'
  | 'in_review'
  | 'under_review'
  | 'on_hold'
  | 'correction_requested'
  | 'replacement_required'
  | 'submitted'
  | 'submitted_for_review'
  | 'payment_pending'
  | 'flagged'
  | 'approved'
  | 'published'
  | 'reserved'
  | 'paid'
  | 'completed'
  | 'rejected'
  | 'failed'
  | 'expired'
  | 'cancelled';

export interface ReviewQueueSummary {
  queueType: ReviewQueueType;
  label: string;
  description: string;
  href: string;
  pendingCount: number;
  urgentCount: number;
  oldestItemAgeLabel: string;
  allowedRoles: readonly ReviewQueueStaffRole[];
}

export interface ReviewQueueItem {
  itemPublicId: string;
  queueType: ReviewQueueType;
  title: string;
  summary: string;
  status: ReviewQueueStatus;
  priority: ReviewQueuePriority;
  ageLabel: string;
  submittedAtLabel: string;
  assignedStaffName?: string;
  relatedUserLabel?: string;
  relatedResourceLabel?: string;
  href: string;
}

export interface ReviewQueueQuery {
  queueType?: ReviewQueueType;
  status?: ReviewQueueStatus;
  priority?: ReviewQueuePriority;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface ReviewQueueItemsResponse {
  items: readonly ReviewQueueItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface ReviewQueueApiEnvelope<TData> {
  success: boolean;
  message?: string;
  data: TData;
}
