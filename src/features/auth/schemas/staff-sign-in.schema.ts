// src/features/auth/schemas/staff-sign-in.schema.ts

/**
 * File purpose:
 * Defines the staff sign-in validation schema for the Asancha Admin frontend.
 *
 * Role in the project:
 * This schema validates staff sign-in form data before it is sent to the auth
 * API layer.
 *
 * Key exports:
 * - staffSignInSchema validates staff sign-in input.
 * - StaffSignInSchemaInput defines inferred sign-in input.
 *
 * Business relevance:
 * Only authorised staff users may sign in to asancha-admin. Public user login
 * and public signup do not belong in this frontend.
 *
 * Security note:
 * Frontend validation is UX guidance only. Backend authentication, rate limits,
 * staff role checks, account status checks, lockout, and audit logs remain final.
 */

import { z } from 'zod';

import { AUTH_FORM_LIMITS } from '../constants/auth.constants';

export const staffSignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Staff email is required.')
    .max(AUTH_FORM_LIMITS.emailMaxLength, 'Staff email is too long.')
    .email('Enter a valid staff email.')
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(1, 'Password is required.')
    .max(AUTH_FORM_LIMITS.passwordMaxLength, 'Password is too long.'),
  rememberDevice: z.boolean().default(false),
});

export type StaffSignInSchemaInput = z.input<typeof staffSignInSchema>;
export type StaffSignInSchemaOutput = z.output<typeof staffSignInSchema>;
