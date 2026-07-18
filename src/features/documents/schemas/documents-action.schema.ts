// src/features/documents/schemas/documents-action.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin document review actions.
 *
 * Role in the project:
 * This schema validates document action payloads such as approve, reject, hold,
 * replacement request, correction request, review mark, archive, and restore
 * before submission.
 *
 * Key exports:
 * - documentActionTypeSchema validates supported document actions.
 * - documentsActionSchema validates action payloads.
 *
 * Business relevance:
 * Document review actions affect onboarding quality, profile approval, company
 * approval, property approval, verification workflows, API partner readiness,
 * and platform trust.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, private file access,
 * redaction, and audit logging remain final.
 */

import { z } from 'zod';

export const documentActionTypeSchema = z.enum([
  'approve',
  'reject',
  'place_on_hold',
  'request_replacement',
  'request_correction',
  'mark_in_review',
  'archive',
  'restore',
]);

export const documentsActionSchema = z.object({
  documentPublicId: z
    .string()
    .trim()
    .min(6, 'Document public ID is required.')
    .max(120, 'Document public ID is too long.'),
  action: documentActionTypeSchema,
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

export type DocumentsActionSchemaInput = z.input<typeof documentsActionSchema>;
export type DocumentsActionSchemaOutput = z.output<typeof documentsActionSchema>;
