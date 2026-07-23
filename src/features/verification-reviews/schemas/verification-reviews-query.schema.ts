// src/features/verification-reviews/schemas/verification-reviews-query.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin verification review list and search
 * queries.
 *
 * Role in the project:
 * This schema validates filters used by verification review overview, status,
 * review, documents, messages, and audit-aware screens.
 *
 * Key exports:
 * - verificationReviewStatusSchema validates verification review statuses.
 * - verificationReviewTargetTypeSchema validates target types.
 * - verificationRiskRatingSchema validates risk labels.
 * - verificationReviewsQuerySchema validates list filters and pagination.
 *
 * Business relevance:
 * Safe filtering helps staff locate verification reviews by lifecycle state,
 * target type, risk rating, priority, assignment, and support-safe search terms.
 *
 * Security note:
 * Query validation does not authorize access. Backend permissions, result
 * visibility, document visibility, risk redaction, and audit access remain
 * final.
 */

import { z } from 'zod';

export const verificationReviewStatusSchema = z.enum([
  'pending',
  'in_review',
  'correction_required',
  'approved',
  'rejected',
  'on_hold',
  'expired',
  'archived',
]);

export const verificationReviewTargetTypeSchema = z.enum([
  'general_profile',
  'investor_profile',
  'property_owner_profile',
  'property_agent_profile',
  'property_sourcer_profile',
  'service_provider_profile',
  'api_partner_profile',
  'company',
  'property',
  'document',
  'payment',
  'api_client',
]);

export const verificationRiskRatingSchema = z.enum([
  'unknown',
  'low',
  'medium',
  'high',
  'critical',
]);

export const verificationReviewPrioritySchema = z.enum(['low', 'normal', 'high', 'critical']);

export const verificationReviewsQuerySchema = z.object({
  status: verificationReviewStatusSchema.optional(),
  targetType: verificationReviewTargetTypeSchema.optional(),
  riskRating: verificationRiskRatingSchema.optional(),
  priority: verificationReviewPrioritySchema.optional(),
  assignedToMe: z.coerce.boolean().optional(),
  search: z
    .string()
    .trim()
    .min(2, 'Search must be at least 2 characters.')
    .max(120, 'Search must not exceed 120 characters.')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type VerificationReviewsQuerySchemaInput = z.input<typeof verificationReviewsQuerySchema>;

export type VerificationReviewsQuerySchemaOutput = z.output<typeof verificationReviewsQuerySchema>;
