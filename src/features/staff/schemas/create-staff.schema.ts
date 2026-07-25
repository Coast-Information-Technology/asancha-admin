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

const staffPasswordSchema = z
  .string()
  .min(10, 'Password must be at least 10 characters.')
  .max(128, 'Password must not exceed 128 characters.')
  .regex(/[A-Z]/, 'Password must include an uppercase letter.')
  .regex(/[a-z]/, 'Password must include a lowercase letter.')
  .regex(/[0-9]/, 'Password must include a number.')
  .regex(/[^A-Za-z0-9]/, 'Password must include a symbol.');

const staffPhoneNumberSchema = z
  .string()
  .trim()
  .min(7, 'Enter a valid staff phone number.')
  .max(32, 'Phone number must not exceed 32 characters.')
  .regex(/^\+?[0-9()[\].\s-]+$/, 'Enter a valid staff phone number.');

export const createStaffSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid staff email address.')
    .max(160, 'Staff email must not exceed 160 characters.'),
  password: staffPasswordSchema,
  role: createStaffRoleSchema,
  displayName: z
    .string()
    .trim()
    .min(2, 'Staff display name must be at least 2 characters.')
    .max(120, 'Staff display name must not exceed 120 characters.'),
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters.')
    .max(80, 'First name must not exceed 80 characters.'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters.')
    .max(80, 'Last name must not exceed 80 characters.'),
  phoneNumber: staffPhoneNumberSchema,
  jobTitle: z
    .string()
    .trim()
    .min(2, 'Job title must be at least 2 characters.')
    .max(120, 'Job title must not exceed 120 characters.'),
  department: z
    .string()
    .trim()
    .min(2, 'Department must be at least 2 characters.')
    .max(120, 'Department must not exceed 120 characters.'),
});

export type CreateStaffSchemaInput = z.input<typeof createStaffSchema>;
export type CreateStaffSchemaOutput = z.output<typeof createStaffSchema>;
