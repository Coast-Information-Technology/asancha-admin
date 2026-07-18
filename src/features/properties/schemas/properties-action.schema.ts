// src/features/properties/schemas/properties-action.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin property review actions.
 *
 * Role in the project:
 * This schema validates property action payloads such as approve, reject,
 * review, correction request, document request, archive, restore, and suspend
 * before submission.
 *
 * Key exports:
 * - propertyActionTypeSchema validates supported property actions.
 * - propertiesActionSchema validates action payloads.
 *
 * Business relevance:
 * Property review actions affect listing readiness, document review, deal
 * reservation confidence, user trust, and platform inventory quality.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, redaction, and audit
 * logging remain final.
 */

import { z } from 'zod';

export const propertyActionTypeSchema = z.enum([
  'approve',
  'reject',
  'place_under_review',
  'request_correction',
  'request_documents',
  'archive',
  'restore',
  'suspend',
]);

export const propertiesActionSchema = z.object({
  propertyPublicId: z
    .string()
    .trim()
    .min(6, 'Property public ID is required.')
    .max(120, 'Property public ID is too long.'),
  action: propertyActionTypeSchema,
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

export type PropertiesActionSchemaInput = z.input<typeof propertiesActionSchema>;
export type PropertiesActionSchemaOutput = z.output<typeof propertiesActionSchema>;
