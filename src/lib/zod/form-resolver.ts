// src/lib/zod/form-resolver.ts

/**
 * File purpose:
 * Provides React Hook Form resolver helpers for Zod schemas in the Asancha
 * Admin frontend.
 *
 * Role in the project:
 * This file centralises how admin forms connect Zod validation schemas to
 * React Hook Form. It keeps form setup consistent across authentication,
 * staff management, user management, review actions, filters, settings, and
 * operational workflows.
 *
 * Key exports:
 * - createZodFormResolver creates a typed resolver for a Zod schema.
 * - createDefaultFormMode provides the standard validation mode for admin forms.
 *
 * Business relevance:
 * Staff-facing forms must validate input clearly before sending requests to the
 * backend. This improves UX and reduces avoidable backend errors, but does not
 * replace backend DTO validation, authorization, staff permissions, review
 * rules, payment rules, document rules, verification rules, or audit logging.
 *
 * Security note:
 * Frontend form validation is not a security boundary. Every sensitive action
 * must still be validated and enforced by the backend API.
 */

import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, Resolver } from 'react-hook-form';
import type { z } from 'zod';

import { applyAsanchaZodErrorMap } from './zod-error-map';

export type AdminFormValidationMode = 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';

export interface AdminFormResolverOptions {
  applySharedErrorMap?: boolean;
}

type AdminZodSchema<TFieldValues extends FieldValues> = z.ZodType<unknown, TFieldValues>;

/**
 * Creates a React Hook Form resolver from a Zod schema.
 *
 * Business rule:
 * Admin forms should use shared validation behaviour, but frontend validation
 * must not be treated as backend enforcement.
 *
 * Technical note:
 * The double cast through unknown is intentional because Zod v4 and
 * @hookform/resolvers can expose slightly different generic constraints across
 * package versions, even when the runtime integration is correct.
 *
 * @param schema - The Zod schema used to validate form values.
 * @param options - Resolver configuration.
 * @returns A typed React Hook Form resolver.
 */
export function createZodFormResolver<TFieldValues extends FieldValues>(
  schema: AdminZodSchema<TFieldValues>,
  options: AdminFormResolverOptions = {},
): Resolver<TFieldValues> {
  if (options.applySharedErrorMap !== false) {
    applyAsanchaZodErrorMap();
  }

  return zodResolver(
    schema as z.ZodType<unknown, FieldValues>,
  ) as unknown as Resolver<TFieldValues>;
}

export function createDefaultFormMode(): AdminFormValidationMode {
  return 'onSubmit';
}

export function createDefaultReValidateMode(): AdminFormValidationMode {
  return 'onChange';
}
