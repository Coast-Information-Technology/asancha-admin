// app/auth/unauthorized/page.tsx

/**
 * File purpose:
 * Renders the unauthorized-access page for Asancha Admin.
 *
 * Role in the project:
 * This page is shown when the current visitor or staff context is not allowed to
 * access the requested admin area.
 *
 * Key exports:
 * - UnauthorizedPage renders /auth/unauthorized.
 *
 * Business relevance:
 * asancha-admin is restricted to super_admin, admin, and customer_care_rep
 * users. Public users must not access this frontend.
 *
 * Security note:
 * This page must not disclose role-policy internals, restricted records,
 * sensitive route information, ObjectIds, secrets, or backend authorization
 * details.
 */

import Link from 'next/link';

import { Button } from '../../../src/components/ui/button/button';

export default function UnauthorizedPage() {
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
        <h1 className="asancha-page-title">Unauthorized access</h1>
        <p className="asancha-page-description">
          You do not have permission to access this admin area, or your account is not an authorised
          Asancha staff account.
        </p>
      </div>

      <div className="asancha-status asancha-status-danger" role="alert">
        Permission required
      </div>

      <p
        style={{
          color: 'var(--asancha-color-text-muted)',
          fontSize: 'var(--asancha-font-size-sm)',
          lineHeight: 'var(--asancha-line-height-relaxed)',
        }}
      >
        Asancha Admin is for authorised internal operations staff only. Public users, partners,
        property users, and marketplace users should not use this frontend.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <Button href="/auth/sign-in" variant="secondary">
          Return to sign in
        </Button>

        <Button href="/dashboard">Go to dashboard</Button>
      </div>

      <p
        style={{
          color: 'var(--asancha-color-text-subtle)',
          fontSize: 'var(--asancha-font-size-sm)',
          lineHeight: 'var(--asancha-line-height-relaxed)',
          textAlign: 'center',
        }}
      >
        If you believe your staff role should have access, contact an authorised administrator.{' '}
        <Link href="/auth/locked" style={{ color: 'var(--asancha-color-brand)', fontWeight: 750 }}>
          Account restricted?
        </Link>
      </p>
    </section>
  );
}
