// app/auth/set-password/page.tsx

/**
 * File purpose:
 * Renders the invited staff set-password page for Asancha Admin.
 *
 * Role in the project:
 * This page reads the staff public ID and setup token from the URL query string
 * and connects SetPasswordForm to the invited staff password setup hook.
 *
 * Key exports:
 * - SetPasswordPage renders /auth/set-password.
 *
 * Business relevance:
 * Staff accounts are created by authorised staff only. This page completes an
 * invited staff setup flow and must not become public signup.
 *
 * Security note:
 * Invite tokens must be verified by the backend. This page must not display,
 * log, persist, or expose invite tokens outside the submit payload.
 */

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import {
  SetPasswordForm,
  type SetPasswordFormValues,
} from '../../../src/components/auth/set-password-form';
import { useSetPassword } from '../../../src/features/auth/hooks/use-reset-password';

function MissingInviteTokenState() {
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
      <h1 className="asancha-page-title">Invitation link unavailable</h1>
      <p className="asancha-page-description">
        This staff invitation link is missing required information, expired, or no longer available.
        Contact an authorised administrator if you believe this is a mistake.
      </p>
      <Link className="asancha-status asancha-status-info" href="/auth/sign-in">
        Return to sign in
      </Link>
    </section>
  );
}

function SetPasswordContent() {
  const searchParams = useSearchParams();
  const userPublicId = searchParams.get('userPublicId') ?? '';
  const token = searchParams.get('token') ?? '';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const setPasswordMutation = useSetPassword({
    onSuccess: (message) => {
      setErrorMessage(null);
      setSuccessMessage(message ?? 'Staff password set successfully. Redirecting...');
    },
    onError: (message) => {
      setSuccessMessage(null);
      setErrorMessage(message);
    },
  });

  const handleSubmit = async (values: SetPasswordFormValues): Promise<void> => {
    await setPasswordMutation.mutateAsync(values);
  };

  if (!userPublicId || !token) {
    return <MissingInviteTokenState />;
  }

  return (
    <SetPasswordForm
      errorMessage={errorMessage}
      loading={setPasswordMutation.isPending}
      onSubmit={handleSubmit}
      successMessage={successMessage}
      token={token}
      userPublicId={userPublicId}
    />
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <SetPasswordContent />
    </Suspense>
  );
}
