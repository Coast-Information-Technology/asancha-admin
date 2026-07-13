// app/auth/forgot-password/page.tsx

/**
 * File purpose:
 * Renders the forgot-password page for Asancha Admin staff accounts.
 *
 * Role in the project:
 * This page connects ForgotPasswordForm to the auth feature hook and displays a
 * safe generic response after staff email submission.
 *
 * Key exports:
 * - ForgotPasswordPage renders /auth/forgot-password.
 *
 * Business relevance:
 * Staff password recovery must not reveal whether an email address exists.
 *
 * Security note:
 * Backend rate limiting, generic responses, reset-token creation, and audit
 * logging remain final. This page must not expose staff existence or reset
 * token details.
 */

'use client';

import { Suspense, useState } from 'react';

import {
  ForgotPasswordForm,
  type ForgotPasswordFormValues,
} from '../../../src/components/auth/forgot-password-form';
import { AUTH_SAFE_MESSAGES } from '../../../src/features/auth/constants/auth.constants';
import { useForgotPassword } from '../../../src/features/auth/hooks/use-forgot-password';

function ForgotPasswordContent() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const forgotPasswordMutation = useForgotPassword({
    onSuccess: (message) => {
      setErrorMessage(null);
      setSuccessMessage(message ?? AUTH_SAFE_MESSAGES.forgotPasswordSuccess);
    },
    onError: (message) => {
      setSuccessMessage(null);
      setErrorMessage(message);
    },
  });

  const handleSubmit = async (values: ForgotPasswordFormValues): Promise<void> => {
    await forgotPasswordMutation.mutateAsync(values);
  };

  return (
    <ForgotPasswordForm
      errorMessage={errorMessage}
      loading={forgotPasswordMutation.isPending}
      onSubmit={handleSubmit}
      successMessage={successMessage}
    />
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
