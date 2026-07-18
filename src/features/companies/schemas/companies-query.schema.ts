// src/features/companies/schemas/companies-query.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin company list and search queries.
 *
 * Role in the project:
 * This schema validates filters used by company overview, company review,
 * company documents, members, and verification entry screens.
 *
 * Key exports:
 * - companyStatusSchema validates company lifecycle statuses.
 * - companyVerificationStatusSchema validates company verification statuses.
 * - companiesQuerySchema validates company list filters and pagination.
 *
 * Business relevance:
 * Safe filtering helps staff locate company records by review status,
 * verification state, and support-safe search terms.
 *
 * Security note:
 * Query validation does not authorize access. Backend permissions, result
 * visibility, redaction, and audit logging remain final.
 */

import { z } from 'zod';

export const companyStatusSchema = z.enum([
  'draft',
  'pending',
  'under_review',
  'on_hold',
  'approved',
  'rejected',
  'suspended',
]);

export const companyVerificationStatusSchema = z.enum([
  'not_started',
  'pending',
  'in_review',
  'approved',
  'rejected',
  'flagged',
]);

export const companiesQuerySchema = z.object({
  status: companyStatusSchema.optional(),
  verificationStatus: companyVerificationStatusSchema.optional(),
  search: z
    .string()
    .trim()
    .min(2, 'Search must be at least 2 characters.')
    .max(120, 'Search must not exceed 120 characters.')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CompaniesQuerySchemaInput = z.input<typeof companiesQuerySchema>;
export type CompaniesQuerySchemaOutput = z.output<typeof companiesQuerySchema>;
