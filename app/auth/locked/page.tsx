// app/auth/locked/page.tsx

/**
 * File purpose:
 * Renders the locked-account information page for Asancha Admin staff.
 *
 * Role in the project:
 * This page gives safe guidance when a staff account is locked, suspended,
 * disabled, pending, or otherwise blocked from entering the admin frontend.
 *
 * Key exports:
 * - LockedPage renders /auth/locked.
 *
 * Business relevance:
 * Staff access can be blocked by account status. The frontend must communicate
 * clearly without exposing private internal reasons or backend security details.
 *
 * Security note:
 * This page must not reveal sensitive lockout rules, staff security signals,
 * internal investigations, private notes, or backend policy internals.
 */

import Link from 'next/link';

import { Button } from '../../../src/components/ui/button/button';

export default function LockedPage() {
  return (
    <section
      style={{
        width: 'min(100%, 28rem)',
        display: 'grid',
        gap: '1rem',
        border: '1px solid var(--asancha-color-border)',
        borderRadius: 'var(--asancha-radius-2xl)',
        background: 'var(--asancha-color-surface)',
        boxShadow: 'var(--asancha-shadow-lg)',
        padding: 'clamp(1.25rem, 4vw, 2rem)',
      }}
    >
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <h1 className="asancha-page-title">Account access restricted</h1>
        <p className="asancha-page-description">
          Your staff account cannot access Asancha Admin right now. This may be due to account
          status, security review, suspension, or an access restriction.
        </p>
      </div>

      <div className="asancha-status asancha-status-warning" role="status">
        Access blocked
      </div>

      <p
        style={{
          color: 'var(--asancha-color-text-muted)',
          fontSize: 'var(--asancha-font-size-sm)',
          lineHeight: 'var(--asancha-line-height-relaxed)',
        }}
      >
        Contact an authorised administrator if you believe this is a mistake. Do not share your
        password or account credentials with anyone.
      </p>

      <Button href="/auth/sign-in" variant="secondary">
        Return to sign in
      </Button>

      <p
        style={{
          color: 'var(--asancha-color-text-subtle)',
          fontSize: 'var(--asancha-font-size-sm)',
          lineHeight: 'var(--asancha-line-height-relaxed)',
          textAlign: 'center',
        }}
      >
        This page is for staff access status only. Public user support is not handled from the admin
        auth area.{' '}
        <Link href="/auth/unauthorized" style={{ color: 'var(--asancha-color-brand)', fontWeight: 750 }}>
          Learn about access restrictions
        </Link>
        .
      </p>
    </section>
  );
}
