// app/auth/verify-staff-invite/page.tsx

/**
 * File purpose:
 * Renders the staff invitation verification page for Asancha Admin.
 *
 * Role in the project:
 * This page verifies an invite token from the URL query string and links valid
 * invited staff users to the set-password flow.
 *
 * Key exports:
 * - VerifyStaffInvitePage renders /auth/verify-staff-invite.
 *
 * Business relevance:
 * Staff invitation verification supports authorised staff account setup only.
 * It must not become public signup, public role selection, or super_admin
 * creation.
 *
 * Security note:
 * Invite tokens must be verified by the backend. This page must not display raw
 * tokens, expose invite secrets, reveal unsafe backend errors, or create staff
 * accounts directly.
 */

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';

import { Button } from '../../../src/components/ui/button/button';
import { verifyStaffInvite } from '../../../src/features/auth/api/auth.api';
import { AUTH_SAFE_MESSAGES } from '../../../src/features/auth/constants/auth.constants';
import type { VerifyStaffInviteResponse } from '../../../src/features/auth/types/auth.types';
import { getApiErrorMessage } from '../../../src/lib/api/api-error';

type InviteState =
  | {
      status: 'idle' | 'loading';
      result: null;
      errorMessage: null;
    }
  | {
      status: 'success';
      result: VerifyStaffInviteResponse;
      errorMessage: null;
    }
  | {
      status: 'error';
      result: null;
      errorMessage: string;
    };

function VerifyStaffInviteContent() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('inviteToken') ?? '';

  const [inviteState, setInviteState] = useState<InviteState>({
    status: 'idle',
    result: null,
    errorMessage: null,
  });

  const setPasswordHref = useMemo(() => {
    if (!inviteToken) {
      return '/auth/sign-in';
    }

    const params = new URLSearchParams({
      inviteToken,
    });

    return `/auth/set-password?${params.toString()}`;
  }, [inviteToken]);

  useEffect(() => {
    let active = true;

    async function verifyInvite(): Promise<void> {
      if (!inviteToken) {
        setInviteState({
          status: 'error',
          result: null,
          errorMessage: AUTH_SAFE_MESSAGES.inviteInvalid,
        });

        return;
      }

      setInviteState({
        status: 'loading',
        result: null,
        errorMessage: null,
      });

      try {
        const result = await verifyStaffInvite(inviteToken);

        if (!active) {
          return;
        }

        if (!result.valid) {
          setInviteState({
            status: 'error',
            result: null,
            errorMessage: result.message ?? AUTH_SAFE_MESSAGES.inviteInvalid,
          });

          return;
        }

        setInviteState({
          status: 'success',
          result,
          errorMessage: null,
        });
      } catch (error) {
        if (!active) {
          return;
        }

        setInviteState({
          status: 'error',
          result: null,
          errorMessage: getApiErrorMessage(error) || AUTH_SAFE_MESSAGES.inviteInvalid,
        });
      }
    }

    void verifyInvite();

    return () => {
      active = false;
    };
  }, [inviteToken]);

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
        <h1 className="asancha-page-title">Verify staff invitation</h1>
        <p className="asancha-page-description">
          We are checking whether this staff invitation is valid and available for password setup.
        </p>
      </div>

      {inviteState.status === 'loading' || inviteState.status === 'idle' ? (
        <div className="asancha-status asancha-status-info" role="status">
          Checking invitation...
        </div>
      ) : null}

      {inviteState.status === 'error' ? (
        <>
          <div className="asancha-status asancha-status-danger" role="alert">
            {inviteState.errorMessage}
          </div>
          <Button href="/auth/sign-in" variant="secondary">
            Return to sign in
          </Button>
        </>
      ) : null}

      {inviteState.status === 'success' ? (
        <>
          <div className="asancha-status asancha-status-success" role="status">
            Invitation verified
          </div>

          <div
            style={{
              display: 'grid',
              gap: '0.35rem',
              color: 'var(--asancha-color-text-muted)',
              fontSize: 'var(--asancha-font-size-sm)',
              lineHeight: 'var(--asancha-line-height-relaxed)',
            }}
          >
            {inviteState.result.displayName ? (
              <p>
                Staff name:{' '}
                <strong style={{ color: 'var(--asancha-color-text)' }}>
                  {inviteState.result.displayName}
                </strong>
              </p>
            ) : null}

            {inviteState.result.email ? (
              <p>
                Staff email:{' '}
                <strong style={{ color: 'var(--asancha-color-text)' }}>
                  {inviteState.result.email}
                </strong>
              </p>
            ) : null}

            {inviteState.result.role ? (
              <p>
                Staff role:{' '}
                <strong style={{ color: 'var(--asancha-color-text)' }}>
                  {inviteState.result.role}
                </strong>
              </p>
            ) : null}
          </div>

          <Button href={setPasswordHref}>Continue to set password</Button>
        </>
      ) : null}

      <p
        style={{
          color: 'var(--asancha-color-text-subtle)',
          fontSize: 'var(--asancha-font-size-sm)',
          lineHeight: 'var(--asancha-line-height-relaxed)',
          textAlign: 'center',
        }}
      >
        This page is for invited Asancha staff only. It is not a public signup page.{' '}
        <Link href="/auth/sign-in" style={{ color: 'var(--asancha-color-brand)', fontWeight: 750 }}>
          Sign in instead
        </Link>
        .
      </p>
    </section>
  );
}

export default function VerifyStaffInvitePage() {
  return (
    <Suspense fallback={null}>
      <VerifyStaffInviteContent />
    </Suspense>
  );
}
