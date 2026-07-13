// src/features/auth/hooks/use-staff-session.ts

/**
 * File purpose:
 * Provides the current staff session query hook for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook fetches the current staff session, updates the staff auth store, and
 * optionally redirects unauthenticated/unauthorised staff contexts.
 *
 * Key exports:
 * - useStaffSession exposes the current staff session query.
 *
 * Business relevance:
 * Admin shell, route guards, dashboards, and permission-aware UI need a safe
 * current staff session snapshot.
 *
 * Security note:
 * Frontend session state is not final authority. Backend auth, account status,
 * permissions, resource visibility, and audit logging remain final.
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getApiErrorMessage } from '../../../lib/api/api-error';
import { useStaffAuthStore } from '../../../store/staff-auth.store';

import { getCurrentStaffSession } from '../api/auth.api';
import { AUTH_QUERY_KEYS, AUTH_REDIRECT_PATHS } from '../constants/auth.constants';
import type { StaffSessionHookOptions } from '../types/auth.types';

export function useStaffSession(options: StaffSessionHookOptions = {}) {
  const router = useRouter();
  const setSession = useStaffAuthStore((state) => state.setSession);
  const clearSession = useStaffAuthStore((state) => state.clearSession);
  const setHydrated = useStaffAuthStore((state) => state.setHydrated);
  const setErrorMessage = useStaffAuthStore((state) => state.setErrorMessage);

  const query = useQuery({
    queryKey: AUTH_QUERY_KEYS.staffSession,
    queryFn: getCurrentStaffSession,
    enabled: options.enabled ?? true,
    retry: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (query.data) {
      setSession(query.data.session);
      setHydrated(true);
      setErrorMessage(null);
    }
  }, [query.data, setErrorMessage, setHydrated, setSession]);

  useEffect(() => {
    if (!query.error) {
      return;
    }

    clearSession();
    setHydrated(true);
    setErrorMessage(getApiErrorMessage(query.error));

    if (options.redirectOnUnauthorized) {
      router.replace(AUTH_REDIRECT_PATHS.signIn);
    }
  }, [
    clearSession,
    options.redirectOnUnauthorized,
    query.error,
    router,
    setErrorMessage,
    setHydrated,
  ]);

  return query;
}
