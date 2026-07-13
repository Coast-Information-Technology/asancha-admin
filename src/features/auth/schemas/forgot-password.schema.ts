// src/features/auth/schemas/forgot-password.schema.ts

/**
 * File purpose:
 * Defines the forgot-password validation schema for the Asancha Admin frontend.
 *
 * Role in the project:
 * This schema validates staff email input before a password reset request is
 * submitted.
 *
 * Key exports:
 * - forgotPasswordSchema validates forgot-password input.
 *
 * Business relevance:
 * Staff password recovery must be safe and must not reveal whether an email
 * exists in the system.
 *
 * Security note:
 * Backend must rate-limit and return generic responses. Frontend validation does
 * not protect against abuse by itself.
 */

import { z } from 'zod';

import { AUTH_FORM_LIMITS } from '../constants/auth.constants';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Staff email is required.')
    .max(AUTH_FORM_LIMITS.emailMaxLength, 'Staff email is too long.')
    .email('Enter a valid staff email.')
    .transform((value) => value.toLowerCase()),
});

export type ForgotPasswordSchemaInput = z.input<typeof forgotPasswordSchema>;
export type ForgotPasswordSchemaOutput = z.output<typeof forgotPasswordSchema>;
