// app/layout.tsx

/**
 * File purpose:
 * Provides the root application layout for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file is required by Next.js App Router and wraps every route in the
 * admin frontend with global metadata, global styles, and shared app providers.
 *
 * Key exports:
 * - RootLayout renders the required html/body structure.
 *
 * Business relevance:
 * asancha-admin is a staff-only internal operations frontend for super_admin,
 * admin, and customer_care_rep users.
 *
 * Security note:
 * The root layout is not an authorization boundary. Middleware/proxy, backend
 * authentication, backend authorization, staff permissions, account status
 * checks, resource visibility, and audit logging remain the final authority.
 */

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { AppProviders } from './providers';

import '../src/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Asancha Admin',
    template: '%s | Asancha Admin',
  },
  description: 'Staff-only internal operations frontend for Asancha Admin.',
  applicationName: 'Asancha Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: '#1e3a8a',
};

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
