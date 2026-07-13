// app/auth/reset-password/page.tsx

/**
 * File purpose:
 * Renders the reset-password page for Asancha Admin staff accounts.
 *
 * Role in the project:
 * This page reads the reset token from the URL query string and connects
 * ResetPasswordForm to the auth feature hook.
 *
 * Key exports:
 * - ResetPasswordPage renders /auth/reset-password.
 *
 * Business relevance:
 * Staff password reset must remain separate from public onboarding and public
 * signup flows.
 *
 * Security note:
 * Reset tokens must be verified by the backend. This page must not display,
 * log, persist, or expose reset tokens outside the submit payload.
 */

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import {
  ResetPasswordForm,
  type ResetPasswordFormValues,
} from '../../../src/components/auth/reset-password-form';
import { useResetPassword } from '../../../src/features/auth/hooks/use-reset-password';

function MissingTokenState() {
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
      <h1 className="asancha-page-title">Reset link unavailable</h1>
      <p className="asancha-page-description">
        This password reset link is missing required information or has already been used. Request a
        new password reset link from the forgot-password page.
      </p>
      <Link className="asancha-status asancha-status-info" href="/auth/forgot-password">
        Request a new reset link
      </Link>
    </section>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetPasswordMutation = useResetPassword({
    onSuccess: (message) => {
      setErrorMessage(null);
      setSuccessMessage(message ?? 'Password reset successful. Redirecting...');
    },
    onError: (message) => {
      setSuccessMessage(null);
      setErrorMessage(message);
    },
  });

  const handleSubmit = async (values: ResetPasswordFormValues): Promise<void> => {
    await resetPasswordMutation.mutateAsync(values);
  };

  if (!token) {
    return <MissingTokenState />;
  }

  return (
    <ResetPasswordForm
      errorMessage={errorMessage}
      loading={resetPasswordMutation.isPending}
      onSubmit={handleSubmit}
      successMessage={successMessage}
      token={token}
    />
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
