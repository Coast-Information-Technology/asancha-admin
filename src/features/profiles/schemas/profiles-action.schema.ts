// src/features/profiles/schemas/profiles-action.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin profile review actions.
 *
 * Role in the project:
 * This schema validates profile action payloads such as approve, reject, hold,
 * correction request, suspend, and restore before submission.
 *
 * Key exports:
 * - profileActionTypeSchema validates supported profile actions.
 * - profilesActionSchema validates action payloads.
 *
 * Business relevance:
 * Profile review actions affect onboarding, role readiness, property/listing
 * workflows, and service-provider platform access.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, redaction, and audit
 * logging remain final.
 */

import { z } from 'zod';

export const profileActionTypeSchema = z.enum([
  'approve',
  'reject',
  'place_on_hold',
  'request_correction',
  'suspend',
  'restore',
]);

export const profilesActionSchema = z.object({
  profilePublicId: z
    .string()
    .trim()
    .min(6, 'Profile public ID is required.')
    .max(120, 'Profile public ID is too long.'),
  action: profileActionTypeSchema,
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

export type ProfilesActionSchemaInput = z.input<typeof profilesActionSchema>;
export type ProfilesActionSchemaOutput = z.output<typeof profilesActionSchema>;
