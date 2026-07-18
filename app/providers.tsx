// app/providers.tsx

/**
 * File purpose:
 * Provides client-side root providers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file wraps the app with providers required by client hooks and
 * interactive admin features, starting with TanStack Query.
 *
 * Key exports:
 * - AppProviders wraps children with QueryClientProvider.
 *
 * Business relevance:
 * Feature hooks such as auth, dashboard, review queues, users, staff, messages,
 * notifications, and admin modules need a shared query client for request-state
 * handling.
 *
 * Security note:
 * Client providers are not an authorization boundary. Backend authentication,
 * authorization, staff permissions, account status checks, resource visibility,
 * redaction, and audit logging remain the final authority.
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import { AdminThemeProvider } from '../src/components/layout/admin-theme-provider';

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
          staleTime: 60_000,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AdminThemeProvider>{children}</AdminThemeProvider>
    </QueryClientProvider>
  );
}
