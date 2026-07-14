// src/features/users/schemas/user-query.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin user list/search queries.
 *
 * Role in the project:
 * This schema validates filters used by users list, public users, suspended
 * users, and user search screens.
 *
 * Key exports:
 * - userQuerySchema validates user filter and pagination input.
 * - UserQuerySchemaInput defines input type.
 * - UserQuerySchemaOutput defines parsed output type.
 *
 * Business relevance:
 * Safe user filtering helps staff locate users by role, status, verification
 * state, and support-safe search terms.
 *
 * Security note:
 * Query validation does not authorize access. Backend permissions, result
 * visibility, redaction, and audit logging remain final.
 */

import { z } from 'zod';

export const publicUserRoleSchema = z.enum([
  'guest',
  'investor',
  'property_owner',
  'property_agent',
  'property_sourcer',
  'service_provider',
  'api_partner',
]);

export const userAccountStatusSchema = z.enum([
  'active',
  'pending',
  'email_unverified',
  'profile_incomplete',
  'under_review',
  'suspended',
  'restricted',
  'locked',
  'disabled',
]);

export const userVerificationStatusSchema = z.enum([
  'not_started',
  'pending',
  'in_review',
  'correction_requested',
  'approved',
  'rejected',
  'flagged',
]);

export const userQuerySchema = z.object({
  role: publicUserRoleSchema.optional(),
  status: userAccountStatusSchema.optional(),
  verificationStatus: userVerificationStatusSchema.optional(),
  search: z
    .string()
    .trim()
    .min(2, 'Search must be at least 2 characters.')
    .max(120, 'Search must not exceed 120 characters.')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type UserQuerySchemaInput = z.input<typeof userQuerySchema>;
export type UserQuerySchemaOutput = z.output<typeof userQuerySchema>;
