// src/features/staff/schemas/update-staff-status.schema.ts

/**
 * File purpose:
 * Defines Zod validation for updating staff account status.
 *
 * Role in the project:
 * This schema validates staff status update payloads before they are submitted
 * through the staff API helper.
 *
 * Key exports:
 * - staffAccountStatusSchema defines allowed staff account statuses.
 * - updateStaffStatusSchema validates staff status update input.
 * - UpdateStaffStatusSchemaInput defines input type.
 * - UpdateStaffStatusSchemaOutput defines parsed output type.
 *
 * Business relevance:
 * Staff account status affects internal platform access, operational safety, and
 * support/security workflows.
 *
 * Security note:
 * Frontend validation is not authorization. Backend permission checks, allowed
 * status transitions, audit logging, and staff visibility remain final.
 */

import { z } from 'zod';

export const staffAccountStatusSchema = z.enum([
  'invited',
  'pending',
  'active',
  'locked',
  'suspended',
  'disabled',
]);

export const updateStaffStatusSchema = z.object({
  staffPublicId: z
    .string()
    .trim()
    .min(6, 'Staff public ID is required.')
    .max(120, 'Staff public ID is too long.'),
  status: staffAccountStatusSchema,
  reason: z
    .string()
    .trim()
    .min(5, 'Reason must be at least 5 characters.')
    .max(500, 'Reason must not exceed 500 characters.')
    .optional(),
});

export type UpdateStaffStatusSchemaInput = z.input<typeof updateStaffStatusSchema>;
export type UpdateStaffStatusSchemaOutput = z.output<typeof updateStaffStatusSchema>;
