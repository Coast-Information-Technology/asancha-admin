// src/features/listings/schemas/listings-query.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin listing list and search queries.
 *
 * Role in the project:
 * This schema validates filters used by listing overview, review, visibility,
 * activities, reservation, and audit-aware listing screens.
 *
 * Key exports:
 * - listingStatusSchema validates listing lifecycle statuses.
 * - listingReviewStatusSchema validates listing review statuses.
 * - listingVisibilityStatusSchema validates listing visibility states.
 * - listingReservationStatusSchema validates reservation states.
 * - listingsQuerySchema validates listing list filters and pagination.
 *
 * Business relevance:
 * Safe filtering helps staff locate listing records by lifecycle state, review
 * state, visibility state, reservation state, and support-safe search terms.
 *
 * Security note:
 * Query validation does not authorize access. Backend permissions, result
 * visibility, redaction, audit visibility, and lifecycle rules remain final.
 */

import { z } from 'zod';

export const listingStatusSchema = z.enum([
  'draft',
  'submitted',
  'under_review',
  'published',
  'reserved',
  'rejected',
  'archived',
  'suspended',
]);

export const listingReviewStatusSchema = z.enum([
  'not_started',
  'pending',
  'in_review',
  'correction_requested',
  'approved',
  'rejected',
  'on_hold',
]);

export const listingVisibilityStatusSchema = z.enum([
  'hidden',
  'private',
  'public',
  'restricted',
  'paused',
  'archived',
]);

export const listingReservationStatusSchema = z.enum([
  'not_reserved',
  'reservation_pending',
  'reserved',
  'expired',
  'cancelled',
  'completed',
]);

export const listingsQuerySchema = z.object({
  status: listingStatusSchema.optional(),
  reviewStatus: listingReviewStatusSchema.optional(),
  visibilityStatus: listingVisibilityStatusSchema.optional(),
  reservationStatus: listingReservationStatusSchema.optional(),
  search: z
    .string()
    .trim()
    .min(2, 'Search must be at least 2 characters.')
    .max(120, 'Search must not exceed 120 characters.')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type ListingsQuerySchemaInput = z.input<typeof listingsQuerySchema>;
export type ListingsQuerySchemaOutput = z.output<typeof listingsQuerySchema>;
