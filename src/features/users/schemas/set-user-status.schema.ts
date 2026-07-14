// src/features/users/schemas/set-user-status.schema.ts

/**
 * File purpose:
 * Defines Zod validation for updating a public user's account status.
 *
 * Role in the project:
 * This schema validates status mutation payloads before sending them through the
 * users feature API helper.
 *
 * Key exports:
 * - setUserStatusSchema validates user status update input.
 * - SetUserStatusSchemaInput defines input type.
 * - SetUserStatusSchemaOutput defines parsed output type.
 *
 * Business relevance:
 * Staff may need to update or review user account status for support, safety,
 * verification, and operational workflows.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permissions, allowed status
 * transitions, audit logging, and user visibility remain final.
 */

import { z } from 'zod';

import { userAccountStatusSchema } from './user-query.schema';

export const setUserStatusSchema = z.object({
  userPublicId: z
    .string()
    .trim()
    .min(6, 'User public ID is required.')
    .max(120, 'User public ID is too long.'),
  status: userAccountStatusSchema,
  reason: z
    .string()
    .trim()
    .min(5, 'Reason must be at least 5 characters.')
    .max(500, 'Reason must not exceed 500 characters.')
    .optional(),
});

export type SetUserStatusSchemaInput = z.input<typeof setUserStatusSchema>;
export type SetUserStatusSchemaOutput = z.output<typeof setUserStatusSchema>;
