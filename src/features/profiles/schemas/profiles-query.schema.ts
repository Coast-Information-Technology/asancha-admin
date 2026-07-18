// src/features/profiles/schemas/profiles-query.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin profile list and search queries.
 *
 * Role in the project:
 * This schema validates filters used by profile overview and role-specific
 * profile list screens.
 *
 * Key exports:
 * - profileTypeSchema validates supported profile types.
 * - profileStatusSchema validates profile lifecycle statuses.
 * - profileVerificationStatusSchema validates verification statuses.
 * - profilesQuerySchema validates profile list filters and pagination.
 *
 * Business relevance:
 * Safe filtering helps staff locate profile records by role, status,
 * verification state, and support-safe search terms.
 *
 * Security note:
 * Query validation does not authorize access. Backend permissions, result
 * visibility, redaction, and audit logging remain final.
 */

import { z } from 'zod';

export const profileTypeSchema = z.enum([
  'investor',
  'property_owner',
  'property_agent',
  'property_sourcer',
  'service_provider',
]);

export const profileStatusSchema = z.enum([
  'draft',
  'pending',
  'under_review',
  'correction_requested',
  'on_hold',
  'approved',
  'rejected',
  'suspended',
]);

export const profileVerificationStatusSchema = z.enum([
  'not_started',
  'pending',
  'in_review',
  'approved',
  'rejected',
  'flagged',
]);

export const profilesQuerySchema = z.object({
  profileType: profileTypeSchema.optional(),
  status: profileStatusSchema.optional(),
  verificationStatus: profileVerificationStatusSchema.optional(),
  search: z
    .string()
    .trim()
    .min(2, 'Search must be at least 2 characters.')
    .max(120, 'Search must not exceed 120 characters.')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type ProfilesQuerySchemaInput = z.input<typeof profilesQuerySchema>;
export type ProfilesQuerySchemaOutput = z.output<typeof profilesQuerySchema>;
