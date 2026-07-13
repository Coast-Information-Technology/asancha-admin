// src/lib/env/env.schema.ts

/**
 * File purpose:
 * Defines Zod validation rules for browser-safe environment variables used by
 * the Asancha Admin frontend.
 *
 * Role in the project:
 * This file validates the public runtime configuration needed by the admin
 * frontend before the application depends on it.
 *
 * Key exports:
 * - EnvironmentName defines supported frontend environment names.
 * - envSchema validates the allowed NEXT_PUBLIC_* values.
 * - EnvSchemaInput and EnvSchemaOutput provide typed input/output shapes.
 *
 * Business relevance:
 * asancha-admin is an internal staff frontend. Environment values must be
 * validated without exposing secrets, internal service URLs, tokens, webhook
 * secrets, private document URLs, API key hashes, private KYC notes, or audit
 * sensitive details.
 *
 * Security note:
 * Only browser-safe values may use NEXT_PUBLIC_*.
 * Production secrets and private operational values must be configured in
 * deployment settings and must never be committed or logged.
 */

import { z } from 'zod';

export const environmentNameSchema = z.enum(['development', 'test', 'staging', 'production']);

export type EnvironmentName = z.infer<typeof environmentNameSchema>;

const optionalUrlSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value || value.length === 0) {
      return '';
    }

    return value.replace(/\/+$/g, '');
  })
  .pipe(z.union([z.literal(''), z.string().url('Must be a valid URL.')]));

export const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z
    .string()
    .trim()
    .min(1, 'NEXT_PUBLIC_APP_NAME is required.')
    .default('Asancha Admin'),

  NEXT_PUBLIC_APP_URL: optionalUrlSchema.default(''),

  NEXT_PUBLIC_API_BASE_URL: optionalUrlSchema.default(''),

  NEXT_PUBLIC_PUBLIC_APP_URL: optionalUrlSchema.default(''),

  NEXT_PUBLIC_ENVIRONMENT: environmentNameSchema.default('development'),
});

export type EnvSchemaInput = z.input<typeof envSchema>;
export type EnvSchemaOutput = z.output<typeof envSchema>;
