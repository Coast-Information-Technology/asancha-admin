// src/features/auth/hooks/use-forgot-password.ts

/**
 * File purpose:
 * Provides the forgot-password mutation hook for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook validates staff email input and submits a password reset request
 * through the auth API layer.
 *
 * Key exports:
 * - useForgotPassword exposes the forgot-password mutation.
 *
 * Business relevance:
 * Staff password recovery should return safe generic responses and must not
 * reveal whether a staff email exists.
 *
 * Security note:
 * Backend rate limiting, generic responses, audit logging, and abuse prevention
 * remain mandatory.
 */

'use client';

import { useMutation } from '@tanstack/react-query';

import { getApiErrorMessage } from '../../../lib/api/api-error';

import { requestStaffPasswordReset } from '../api/auth.api';
import { AUTH_SAFE_MESSAGES } from '../constants/auth.constants';
import { forgotPasswordSchema } from '../schemas/forgot-password.schema';
import type { AuthHookOptions, ForgotPasswordRequest } from '../types/auth.types';

function getSafeErrorMessage(error: unknown, fallbackMessage: string): string {
  const message = getApiErrorMessage(error);

  return message || fallbackMessage;
}

export function useForgotPassword(options: AuthHookOptions = {}) {
  return useMutation({
    mutationFn: async (input: ForgotPasswordRequest) => {
      const payload = forgotPasswordSchema.parse(input);

      return requestStaffPasswordReset(payload);
    },

    onSuccess: (response) => {
      options.onSuccess?.(response.message ?? AUTH_SAFE_MESSAGES.forgotPasswordSuccess);
    },

    onError: (error) => {
      const message = getSafeErrorMessage(error, AUTH_SAFE_MESSAGES.forgotPasswordSuccess);

      options.onError?.(message);
    },
  });
}
