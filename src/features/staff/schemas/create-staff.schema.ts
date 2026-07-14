// src/features/staff/schemas/create-staff.schema.ts

/**
 * File purpose:
 * Defines Zod validation for creating permitted Asancha staff accounts.
 *
 * Role in the project:
 * This schema validates the create-staff form payload before it is sent to the
 * staff API helper.
 *
 * Key exports:
 * - createStaffRoleSchema allows only admin and customer_care_rep.
 * - createStaffSchema validates create-staff input.
 * - CreateStaffSchemaInput defines input type.
 * - CreateStaffSchemaOutput defines parsed output type.
 *
 * Business relevance:
 * Staff creation supports internal operations while enforcing the approved role
 * creation matrix.
 *
 * Security note:
 * This schema intentionally excludes super_admin. Super admin creation is
 * seed/bootstrap only and must not exist in frontend forms, routes, modals, or
 * actions. Backend authorization remains final.
 */

import { z } from 'zod';

export const createStaffRoleSchema = z.enum(['admin', 'customer_care_rep']);

export const createStaffSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, 'Staff display name must be at least 2 characters.')
    .max(120, 'Staff display name must not exceed 120 characters.'),
  email: z
    .string()
    .trim()
    .email('Enter a valid staff email address.')
    .max(160, 'Staff email must not exceed 160 characters.'),
  role: createStaffRoleSchema,
  inviteMessage: z
    .string()
    .trim()
    .max(500, 'Invite message must not exceed 500 characters.')
    .optional(),
});

export type CreateStaffSchemaInput = z.input<typeof createStaffSchema>;
export type CreateStaffSchemaOutput = z.output<typeof createStaffSchema>;
