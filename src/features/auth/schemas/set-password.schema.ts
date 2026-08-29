// src/features/auth/schemas/set-password.schema.ts

/**
 * File purpose:
 * Defines the invited staff set-password validation schema for Asancha Admin.
 *
 * Role in the project:
 * This schema validates the staff public ID, setup token, and password fields
 * for invited staff account setup.
 *
 * Key exports:
 * - setPasswordSchema validates invited staff password setup input.
 *
 * Business relevance:
 * Staff accounts are created by authorised staff only. This schema supports
 * invited staff completing setup, not public signup or super_admin creation.
 *
 * Security note:
 * Invite tokens must be verified by the backend. Invite secrets must not be
 * logged, persisted, or exposed in frontend state.
 */

import { z } from 'zod';

import { AUTH_FORM_LIMITS } from '../constants/auth.constants';

export const setPasswordSchema = z
  .object({
    userPublicId: z.string().trim().uuid('Staff setup link is invalid.'),
    token: z
      .string()
      .trim()
      .min(AUTH_FORM_LIMITS.tokenMinLength, 'Setup token is invalid.')
      .max(AUTH_FORM_LIMITS.tokenMaxLength, 'Setup token is invalid.'),
    password: z
      .string()
      .min(
        AUTH_FORM_LIMITS.passwordMinLength,
        `Password must be at least ${AUTH_FORM_LIMITS.passwordMinLength} characters.`,
      )
      .max(AUTH_FORM_LIMITS.passwordMaxLength, 'Password is too long.')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
        'Password must include uppercase, lowercase, number, and special character.',
      ),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type SetPasswordSchemaInput = z.input<typeof setPasswordSchema>;
export type SetPasswordSchemaOutput = z.output<typeof setPasswordSchema>;
