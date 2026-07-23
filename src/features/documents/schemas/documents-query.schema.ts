// src/features/documents/schemas/documents-query.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin document list and search queries.
 *
 * Role in the project:
 * This schema validates filters used by document overview, document status,
 * document review, replacement, correction, and history screens.
 *
 * Key exports:
 * - documentStatusSchema validates document lifecycle statuses.
 * - documentOwnerTypeSchema validates document owner types.
 * - documentReviewRiskSchema validates safe risk labels.
 * - documentsQuerySchema validates document list filters and pagination.
 *
 * Business relevance:
 * Safe filtering helps staff locate document records by status, owner type,
 * replacement requirement, risk level, and support-safe search terms.
 *
 * Security note:
 * Query validation does not authorize access. Backend permissions, result
 * visibility, file access, redaction, and audit logging remain final.
 */

import { z } from 'zod';

export const documentStatusSchema = z.enum([
  'pending',
  'in_review',
  'approved',
  'rejected',
  'on_hold',
  'replacement_required',
  'expired',
  'archived',
]);

export const documentOwnerTypeSchema = z.enum([
  'user',
  'profile',
  'company',
  'property',
  'listing',
  'verification_review',
  'api_partner',
]);

export const documentReviewRiskSchema = z.enum(['none', 'low', 'medium', 'high', 'flagged']);

export const documentsQuerySchema = z.object({
  status: documentStatusSchema.optional(),
  ownerType: documentOwnerTypeSchema.optional(),
  reviewRisk: documentReviewRiskSchema.optional(),
  replacementRequired: z.coerce.boolean().optional(),
  search: z
    .string()
    .trim()
    .min(2, 'Search must be at least 2 characters.')
    .max(120, 'Search must not exceed 120 characters.')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type DocumentsQuerySchemaInput = z.input<typeof documentsQuerySchema>;
export type DocumentsQuerySchemaOutput = z.output<typeof documentsQuerySchema>;
