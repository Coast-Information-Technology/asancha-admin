// src/features/auth/hooks/use-staff-sign-in.ts

/**
 * File purpose:
 * Provides the staff sign-in mutation hook for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook validates sign-in input, calls the staff sign-in API, updates the
 * staff auth store with the returned session, and redirects to the appropriate
 * staff dashboard.
 *
 * Key exports:
 * - useStaffSignIn exposes the sign-in mutation.
 *
 * Business relevance:
 * Only authorised staff users should enter asancha-admin. Public users must not
 * be treated as valid admin users.
 *
 * Security note:
 * This hook must not persist passwords, JWTs, refresh tokens, or raw cookies.
 * Backend auth, role validation, account status, lockout, and audit logging
 * remain final.
 */

'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { getApiErrorMessage } from '../../../lib/api/api-error';
import { useStaffAuthStore } from '../../../store/staff-auth.store';

import { signInStaff } from '../api/auth.api';
import { AUTH_REDIRECT_PATHS, AUTH_SAFE_MESSAGES } from '../constants/auth.constants';
import { staffSignInSchema } from '../schemas/staff-sign-in.schema';
import type { AuthHookOptions, StaffSignInRequest } from '../types/auth.types';

function getSafeErrorMessage(error: unknown, fallbackMessage: string): string {
  const message = getApiErrorMessage(error);

  return message || fallbackMessage;
}

export function useStaffSignIn(options: AuthHookOptions = {}) {
  const router = useRouter();
  const setSession = useStaffAuthStore((state) => state.setSession);
  const setErrorMessage = useStaffAuthStore((state) => state.setErrorMessage);
  const setLoading = useStaffAuthStore((state) => state.setLoading);

  return useMutation({
    mutationFn: async (input: StaffSignInRequest) => {
      const payload = staffSignInSchema.parse(input);

      return signInStaff(payload);
    },

    onMutate: () => {
      setLoading(true);
      setErrorMessage(null);
    },

    onSuccess: (response) => {
      setSession(response.session);
      setLoading(false);
      options.onSuccess?.(response.message);

      router.replace(options.redirectTo ?? response.redirectTo ?? AUTH_REDIRECT_PATHS.dashboard);
    },

    onError: (error) => {
      const message = getSafeErrorMessage(error, AUTH_SAFE_MESSAGES.signInFailed);

      setLoading(false);
      setErrorMessage(message);
      options.onError?.(message);
    },
  });
}
