// src/features/users/schemas/set-user-role.schema.ts

/**
 * File purpose:
 * Defines Zod validation for updating a public user's platform role.
 *
 * Role in the project:
 * This schema validates role mutation payloads before sending them through the
 * users feature API helper.
 *
 * Key exports:
 * - setUserRoleSchema validates user role update input.
 * - SetUserRoleSchemaInput defines input type.
 * - SetUserRoleSchemaOutput defines parsed output type.
 *
 * Business relevance:
 * User role changes affect access to onboarding, profiles, companies,
 * properties, listings, service provider workflows, and API partner flows.
 *
 * Security note:
 * Role updates are high-impact actions. Backend permissions, allowed role
 * transitions, audit logging, and data visibility remain final.
 */

import { z } from 'zod';

import { publicUserRoleSchema } from './user-query.schema';

export const setUserRoleSchema = z.object({
  userPublicId: z
    .string()
    .trim()
    .min(6, 'User public ID is required.')
    .max(120, 'User public ID is too long.'),
  role: publicUserRoleSchema,
  reason: z
    .string()
    .trim()
    .min(5, 'Reason must be at least 5 characters.')
    .max(500, 'Reason must not exceed 500 characters.')
    .optional(),
});

export type SetUserRoleSchemaInput = z.input<typeof setUserRoleSchema>;
export type SetUserRoleSchemaOutput = z.output<typeof setUserRoleSchema>;
