// src/lib/auth/session-expiry.ts

/**
 * File purpose:
 * Defines the browser event used to notify the authenticated admin shell that
 * an API request was rejected because the staff session is no longer valid.
 *
 * Role in the project:
 * The API client can detect an expired session, while the admin shell owns the
 * user-facing response: clearing local auth state and redirecting to sign-in.
 * Keeping those responsibilities separate avoids coupling the API client to
 * Next.js routing or React state.
 *
 * Key exports:
 * - SESSION_EXPIRED_EVENT identifies the shared browser event.
 * - notifySessionExpired dispatches the event from browser requests.
 *
 * Business relevance:
 * A backend 401 must consistently return staff to authentication instead of
 * leaving individual tables to display misleading unauthorized errors.
 */

export const SESSION_EXPIRED_EVENT = 'asancha:session-expired';

export function notifySessionExpired(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}
