// src/features/companies/schemas/companies-action.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin company review actions.
 *
 * Role in the project:
 * This schema validates company action payloads such as approve, reject, hold,
 * document request, correction request, suspend, and restore before submission.
 *
 * Key exports:
 * - companyActionTypeSchema validates supported company actions.
 * - companiesActionSchema validates action payloads.
 *
 * Business relevance:
 * Company review actions affect company onboarding, document review,
 * verification, member relationships, API partner readiness, and platform trust.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, redaction, and audit
 * logging remain final.
 */

import { z } from 'zod';

export const companyActionTypeSchema = z.enum([
  'approve',
  'reject',
  'place_on_hold',
  'request_documents',
  'request_correction',
  'suspend',
  'restore',
]);

export const companiesActionSchema = z.object({
  companyPublicId: z
    .string()
    .trim()
    .min(6, 'Company public ID is required.')
    .max(120, 'Company public ID is too long.'),
  action: companyActionTypeSchema,
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

export type CompaniesActionSchemaInput = z.input<typeof companiesActionSchema>;
export type CompaniesActionSchemaOutput = z.output<typeof companiesActionSchema>;
