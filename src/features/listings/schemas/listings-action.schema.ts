// src/features/listings/schemas/listings-action.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin listing lifecycle actions.
 *
 * Role in the project:
 * This schema validates listing action payloads such as approve, reject,
 * review, correction request, publish, unpublish, visibility changes, archive,
 * restore, and suspend before submission.
 *
 * Key exports:
 * - listingActionTypeSchema validates supported listing actions.
 * - listingsActionSchema validates action payloads.
 *
 * Business relevance:
 * Listing lifecycle actions affect marketplace visibility, reservation
 * readiness, investor access, property exposure, and platform trust.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permissions, allowed action
 * transitions, high-impact confirmation, internal note handling, safe user
 * messaging, redaction, and audit logging remain final.
 */

import { z } from 'zod';

export const listingActionTypeSchema = z.enum([
  'approve',
  'reject',
  'place_under_review',
  'request_correction',
  'publish',
  'unpublish',
  'pause_visibility',
  'restore_visibility',
  'archive',
  'restore',
  'suspend',
]);

export const listingsActionSchema = z.object({
  listingPublicId: z
    .string()
    .trim()
    .min(6, 'Listing public ID is required.')
    .max(120, 'Listing public ID is too long.'),
  action: listingActionTypeSchema,
  reason: z
    .string()
    .trim()
    .min(5, 'Reason must be at least 5 characters.')
    .max(500, 'Reason must not exceed 500 characters.')
    .optional(),
  safeUserMessage: z
    .string()
    .trim()
    .min(5, 'User message must be at least 5 characters.')
    .max(800, 'User message must not exceed 800 characters.')
    .optional(),
  internalNote: z
    .string()
    .trim()
    .min(5, 'Internal note must be at least 5 characters.')
    .max(1000, 'Internal note must not exceed 1000 characters.')
    .optional(),
});

export type ListingsActionSchemaInput = z.input<typeof listingsActionSchema>;
export type ListingsActionSchemaOutput = z.output<typeof listingsActionSchema>;
