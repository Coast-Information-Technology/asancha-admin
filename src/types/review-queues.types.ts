// src/types/review-queues.types.ts

/**
 * File purpose:
 * Defines shared review queue types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises queue cards, queue rows, queue priorities, queue item
 * metadata, and review queue table contracts used by dashboard and review queue
 * screens.
 *
 * Key exports:
 * - ReviewQueueKey defines supported queue identifiers.
 * - ReviewQueueItem defines a frontend-safe queue row.
 * - ReviewQueueSummary defines dashboard queue counts.
 *
 * Business relevance:
 * Review queues guide staff through pending operational work. Queue rows should
 * open relevant detail pages; detail pages must not appear as sidebar items.
 *
 * Security note:
 * Review queue items must use public IDs and safe summaries. Backend endpoints
 * must enforce staff permissions, resource visibility, redaction, and review
 * decision rules.
 */

import type { StaffRole, StaffSummary } from './staff.types';

export type ReviewQueueKey =
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

export type ReviewQueueItemStatus =
  | 'pending'
  | 'in_review'
  | 'under_review'
  | 'on_hold'
  | 'correction_requested'
  | 'approved'
  | 'rejected'
  | 'unknown';

export interface ReviewQueueDefinition {
  key: ReviewQueueKey;
  label: string;
  description: string;
  href: string;
  iconName: string;
  allowedRoles: readonly StaffRole[];
}

export interface ReviewQueueSummary {
  key: ReviewQueueKey;
  label: string;
  pendingCount: number;
  oldestItemAgeHours?: number;
  highPriorityCount?: number;
  href: string;
}

export interface ReviewQueueItem {
  itemPublicId: string;
  queueKey: ReviewQueueKey;
  targetPublicId: string;
  targetType: string;
  title: string;
  subtitle?: string;
  status: ReviewQueueItemStatus;
  priority: ReviewQueuePriority;
  href: string;
  assignedStaff?: StaffSummary | null;
  createdAt: string;
  updatedAt?: string;
  dueAt?: string | null;
}

export interface ReviewQueueFilters {
  queueKey?: ReviewQueueKey;
  status?: ReviewQueueItemStatus;
  priority?: ReviewQueuePriority;
  assignedStaffPublicId?: string;
  search?: string;
}
