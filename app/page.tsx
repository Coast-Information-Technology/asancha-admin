// app/page.tsx

/**
 * File purpose:
 * Provides the root index route for the Asancha Admin frontend.
 *
 * Role in the project:
 * This page redirects the root route to the dashboard resolver route. Middleware
 * and dashboard guards will handle staff session and role-specific routing.
 *
 * Key exports:
 * - HomePage redirects / to /dashboard.
 *
 * Business relevance:
 * asancha-admin is not a public website or marketplace. The root route should
 * direct staff toward the admin dashboard flow.
 *
 * Security note:
 * Redirecting from this page is not authorization. Backend auth, route guards,
 * staff permissions, account status, and middleware remain required.
 */

import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
}
