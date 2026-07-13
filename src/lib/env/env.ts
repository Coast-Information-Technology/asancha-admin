// src/lib/env/env.ts

/**
 * File purpose:
 * Provides a typed, validated environment configuration object for the Asancha
 * Admin frontend.
 *
 * Role in the project:
 * This file reads browser-safe NEXT_PUBLIC_* values, validates them through the
 * env schema, and exposes a single typed env object for the rest of the
 * frontend codebase.
 *
 * Key exports:
 * - env contains validated public environment values.
 * - isProductionEnv, isDevelopmentEnv, isTestEnv, and isStagingEnv expose safe
 *   environment checks.
 * - getRequiredPublicEnvUrl safely retrieves required URLs when a module truly
 *   needs one.
 *
 * Business relevance:
 * The admin frontend must not hardcode or document live internal service URLs.
 * Environment-specific values should be configured privately through local env
 * files or deployment settings.
 *
 * Security note:
 * This file must only read NEXT_PUBLIC_* values because it runs in a frontend
 * project. Do not add secrets, private tokens, webhook secrets, database URLs,
 * API key hashes, storage secrets, private document URLs, or admin bootstrap
 * details here.
 */

import { z } from 'zod';

import { envSchema, type EnvSchemaOutput } from './env.schema';

function parseEnvironment(): EnvSchemaOutput {
  const parsedEnv = envSchema.safeParse({
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_PUBLIC_APP_URL,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  });

  if (!parsedEnv.success) {
    const formattedError = z.treeifyError(parsedEnv.error);

    throw new Error(
      `Invalid Asancha Admin environment configuration: ${JSON.stringify(formattedError)}`,
    );
  }

  return parsedEnv.data;
}

export const env = parseEnvironment();

export const isProductionEnv = env.NEXT_PUBLIC_ENVIRONMENT === 'production';
export const isDevelopmentEnv = env.NEXT_PUBLIC_ENVIRONMENT === 'development';
export const isTestEnv = env.NEXT_PUBLIC_ENVIRONMENT === 'test';
export const isStagingEnv = env.NEXT_PUBLIC_ENVIRONMENT === 'staging';

export type PublicEnvUrlKey =
  | 'NEXT_PUBLIC_APP_URL'
  | 'NEXT_PUBLIC_API_BASE_URL'
  | 'NEXT_PUBLIC_PUBLIC_APP_URL';

export function getRequiredPublicEnvUrl(key: PublicEnvUrlKey): string {
  const value = env[key];

  if (!value || value.trim().length === 0) {
    throw new Error(`${key} is required for this operation.`);
  }

  return value;
}

export function hasPublicEnvUrl(key: PublicEnvUrlKey): boolean {
  return env[key].trim().length > 0;
}
