// src/features/auth/hooks/use-reset-password.ts

/**
 * File purpose:
 * Provides password mutation hooks for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file exposes reset-password and invited staff set-password hooks used by
 * auth pages.
 *
 * Key exports:
 * - useResetPassword completes reset-password flow.
 * - useSetPassword completes invited staff password setup flow.
 *
 * Business relevance:
 * Staff password setup/reset must be separate from public signup and must never
 * allow frontend super_admin creation.
 *
 * Security note:
 * Tokens and passwords must only be sent to the backend submit endpoint and must
 * not be stored in persistent client state.
 */

'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ZodError } from 'zod';

import { getApiErrorMessage } from '../../../lib/api/api-error';

import { resetStaffPassword, setInvitedStaffPassword } from '../api/auth.api';
import { AUTH_REDIRECT_PATHS, AUTH_SAFE_MESSAGES } from '../constants/auth.constants';
import { resetPasswordSchema } from '../schemas/reset-password.schema';
import { setPasswordSchema } from '../schemas/set-password.schema';
import type {
  AuthHookOptions,
  ResetPasswordRequest,
  SetPasswordRequest,
} from '../types/auth.types';

function getSafeErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? fallbackMessage;
  }

  const message = getApiErrorMessage(error);

  return message || fallbackMessage;
}

export function useResetPassword(options: AuthHookOptions = {}) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: ResetPasswordRequest) => {
      const payload = resetPasswordSchema.parse(input);

      return resetStaffPassword(payload);
    },

    onSuccess: (response) => {
      options.onSuccess?.(response.message ?? AUTH_SAFE_MESSAGES.resetPasswordSuccess);
      router.replace(response.redirectTo ?? options.redirectTo ?? AUTH_REDIRECT_PATHS.signIn);
    },

    onError: (error) => {
      const message = getSafeErrorMessage(error, 'We could not reset your password.');

      options.onError?.(message);
    },
  });
}

export function useSetPassword(options: AuthHookOptions = {}) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: SetPasswordRequest) => {
      const payload = setPasswordSchema.parse(input);

      return setInvitedStaffPassword(payload);
    },

    onSuccess: (response) => {
      options.onSuccess?.(response.message ?? AUTH_SAFE_MESSAGES.setPasswordSuccess);
      router.replace(response.redirectTo ?? options.redirectTo ?? AUTH_REDIRECT_PATHS.signIn);
    },

    onError: (error) => {
      const message = getSafeErrorMessage(error, 'We could not set your staff password.');

      options.onError?.(message);
    },
  });
}
