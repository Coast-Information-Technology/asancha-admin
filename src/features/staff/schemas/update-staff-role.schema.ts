// src/features/staff/schemas/update-staff-role.schema.ts

/**
 * File purpose:
 * Defines Zod validation for updating staff roles from the frontend.
 *
 * Role in the project:
 * This schema validates staff role update payloads while excluding super_admin
 * from frontend role assignment.
 *
 * Key exports:
 * - updateStaffRoleSchema validates staff role update input.
 * - UpdateStaffRoleSchemaInput defines input type.
 * - UpdateStaffRoleSchemaOutput defines parsed output type.
 *
 * Business relevance:
 * Staff role changes affect admin access to review queues, users, documents,
 * verification, payments, staff management, API access, audit logs, settings,
 * and support workflows.
 *
 * Security note:
 * This schema intentionally excludes super_admin. No frontend route, form,
 * modal, dropdown, or action may create or assign super_admin. Backend
 * authorization and audit logging remain final.
 */

import { z } from 'zod';

import { createStaffRoleSchema } from './create-staff.schema';

export const updateStaffRoleSchema = z.object({
  staffPublicId: z
    .string()
    .trim()
    .min(6, 'Staff public ID is required.')
    .max(120, 'Staff public ID is too long.'),
  role: createStaffRoleSchema,
  reason: z
    .string()
    .trim()
    .min(5, 'Reason must be at least 5 characters.')
    .max(500, 'Reason must not exceed 500 characters.')
    .optional(),
});

export type UpdateStaffRoleSchemaInput = z.input<typeof updateStaffRoleSchema>;
export type UpdateStaffRoleSchemaOutput = z.output<typeof updateStaffRoleSchema>;
