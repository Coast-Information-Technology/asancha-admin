// src/features/auth/schemas/reset-password.schema.ts

/**
 * File purpose:
 * Defines the reset-password validation schema for the Asancha Admin frontend.
 *
 * Role in the project:
 * This schema validates reset token and password fields before they are sent to
 * the auth API layer.
 *
 * Key exports:
 * - resetPasswordSchema validates reset-password input.
 *
 * Business relevance:
 * Staff password reset must be isolated from public onboarding and public signup.
 *
 * Security note:
 * Reset tokens must be verified by the backend. Tokens must not be logged,
 * persisted, or exposed in client state beyond the submit payload.
 */

import { z } from 'zod';

import { AUTH_FORM_LIMITS } from '../constants/auth.constants';

export const resetPasswordSchema = z
  .object({
    token: z
      .string()
      .trim()
      .min(AUTH_FORM_LIMITS.tokenMinLength, 'Reset token is invalid.')
      .max(AUTH_FORM_LIMITS.tokenMaxLength, 'Reset token is invalid.'),
    password: z
      .string()
      .min(
        AUTH_FORM_LIMITS.passwordMinLength,
        `Password must be at least ${AUTH_FORM_LIMITS.passwordMinLength} characters.`,
      )
      .max(AUTH_FORM_LIMITS.passwordMaxLength, 'Password is too long.'),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchemaInput = z.input<typeof resetPasswordSchema>;
export type ResetPasswordSchemaOutput = z.output<typeof resetPasswordSchema>;
