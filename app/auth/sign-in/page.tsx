// app/auth/sign-in/page.tsx

/**
 * File purpose:
 * Renders the staff-only sign-in page for Asancha Admin.
 *
 * Role in the project:
 * This page connects the StaffSignInForm component to the auth feature hook and
 * redirects authorised staff after successful backend authentication.
 *
 * Key exports:
 * - SignInPage renders /auth/sign-in.
 *
 * Business relevance:
 * Only super_admin, admin, and customer_care_rep users may use this admin
 * frontend. Public users must not sign in here.
 *
 * Security note:
 * This page does not create authority. Backend authentication, staff role
 * validation, account status checks, rate limits, lockout, and audit logs remain
 * final.
 */

'use client';

import { Suspense, useState } from 'react';

import {
  StaffSignInForm,
  type StaffSignInFormValues,
} from '../../../src/components/auth/staff-sign-in-form';
import { useStaffSignIn } from '../../../src/features/auth/hooks/use-staff-sign-in';

function SignInContent() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const signInMutation = useStaffSignIn({
    onSuccess: (message) => {
      setErrorMessage(null);
      setSuccessMessage(message ?? 'Sign in successful. Redirecting...');
    },
    onError: (message) => {
      setSuccessMessage(null);
      setErrorMessage(message);
    },
  });

  const handleSubmit = async (values: StaffSignInFormValues): Promise<void> => {
    await signInMutation.mutateAsync(values);
  };

  return (
    <StaffSignInForm
      errorMessage={errorMessage}
      loading={signInMutation.isPending}
      onSubmit={handleSubmit}
      successMessage={successMessage}
    />
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}
