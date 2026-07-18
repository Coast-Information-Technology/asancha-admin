// src/features/properties/schemas/properties-query.schema.ts

/**
 * File purpose:
 * Defines Zod validation for Asancha Admin property list and search queries.
 *
 * Role in the project:
 * This schema validates filters used by property overview, property review,
 * property documents, property listings, and property activities screens.
 *
 * Key exports:
 * - propertyStatusSchema validates property lifecycle statuses.
 * - propertyDocumentStatusSchema validates property document statuses.
 * - propertyListingStatusSchema validates property listing statuses.
 * - propertySourceTypeSchema validates property source types.
 * - propertiesQuerySchema validates property list filters and pagination.
 *
 * Business relevance:
 * Safe filtering helps staff locate property records by review status,
 * document status, listing status, source type, and support-safe search terms.
 *
 * Security note:
 * Query validation does not authorize access. Backend permissions, result
 * visibility, redaction, and audit logging remain final.
 */

import { z } from 'zod';

export const propertyStatusSchema = z.enum([
  'draft',
  'submitted',
  'under_review',
  'correction_requested',
  'approved',
  'rejected',
  'archived',
  'suspended',
]);

export const propertyDocumentStatusSchema = z.enum([
  'not_started',
  'pending',
  'in_review',
  'approved',
  'rejected',
  'replacement_required',
  'on_hold',
]);

export const propertyListingStatusSchema = z.enum([
  'not_listed',
  'submitted',
  'under_review',
  'published',
  'reserved',
  'rejected',
  'archived',
]);

export const propertySourceTypeSchema = z.enum([
  'property_owner',
  'property_agent',
  'property_sourcer',
  'company',
  'admin',
]);

export const propertiesQuerySchema = z.object({
  status: propertyStatusSchema.optional(),
  documentStatus: propertyDocumentStatusSchema.optional(),
  listingStatus: propertyListingStatusSchema.optional(),
  sourceType: propertySourceTypeSchema.optional(),
  search: z
    .string()
    .trim()
    .min(2, 'Search must be at least 2 characters.')
    .max(120, 'Search must not exceed 120 characters.')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type PropertiesQuerySchemaInput = z.input<typeof propertiesQuerySchema>;
export type PropertiesQuerySchemaOutput = z.output<typeof propertiesQuerySchema>;
