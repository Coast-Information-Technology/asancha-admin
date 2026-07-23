// src/features/verification-reviews/schemas/verification-reviews-action.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin verification review actions.
 *
 * Role in the project:
 * This schema validates verification review action payloads such as approve,
 * reject, hold, correction request, document request, risk update, archive,
 * restore, and mark-in-review before submission.
 *
 * Key exports:
 * - verificationReviewActionTypeSchema validates supported review actions.
 * - verificationReviewsActionSchema validates action payloads.
 *
 * Business relevance:
 * Verification review actions affect KYC/AML readiness, onboarding quality,
 * sensitive action unlocking, API partner readiness, and platform trust.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permissions, allowed action
 * transitions, risk handling, internal note handling, safe user messaging,
 * document visibility, redaction, and audit logging remain final.
 */

import { z } from 'zod';

import { verificationRiskRatingSchema } from './verification-reviews-query.schema';

export const verificationReviewActionTypeSchema = z.enum([
  'mark_in_review',
  'approve',
  'reject',
  'place_on_hold',
  'request_correction',
  'request_documents',
  'update_risk',
  'archive',
  'restore',
]);

export const verificationReviewsActionSchema = z.object({
  verificationReviewPublicId: z
    .string()
    .trim()
    .min(6, 'Verification review public ID is required.')
    .max(120, 'Verification review public ID is too long.'),
  action: verificationReviewActionTypeSchema,
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
  riskRating: verificationRiskRatingSchema.optional(),
});

export type VerificationReviewsActionSchemaInput = z.input<typeof verificationReviewsActionSchema>;

export type VerificationReviewsActionSchemaOutput = z.output<
  typeof verificationReviewsActionSchema
>;
