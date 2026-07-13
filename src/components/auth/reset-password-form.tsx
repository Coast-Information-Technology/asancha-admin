// src/components/auth/reset-password-form.tsx

/**
 * File purpose:
 * Provides the reset-password form for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component accepts a reset token from the page/route layer and collects a
 * new password and confirmation from the staff user.
 *
 * Key exports:
 * - ResetPasswordForm renders the reset-password form.
 *
 * Business relevance:
 * Staff password reset must be secure, explicit, and isolated from public-user
 * onboarding or signup flows.
 *
 * Security note:
 * The reset token must be verified by the backend. This form must not log,
 * persist, expose, or store reset tokens beyond the current submit payload.
 */

'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';

import styles from './auth.module.css';

export interface ResetPasswordFormValues {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormProps {
  token: string;
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  onSubmit: (values: ResetPasswordFormValues) => Promise<void> | void;
}

export function ResetPasswordForm({
  token,
  loading = false,
  errorMessage = null,
  successMessage = null,
  onSubmit,
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordsDoNotMatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    await onSubmit({
      token,
      password,
      confirmPassword,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Create a new password</h1>
        <p className={styles.description}>
          Choose a strong password for your Asancha staff account.
        </p>
      </div>

      {errorMessage ? (
        <div className={styles.errorBanner} role="alert">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className={styles.successBanner} role="status">
          {successMessage}
        </div>
      ) : null}

      <div className={styles.fields}>
        <Input
          autoComplete="new-password"
          helperText="Use a strong password that is not shared with any other system."
          label="New password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />

        <Input
          autoComplete="new-password"
          errorText={passwordsDoNotMatch ? 'Passwords do not match.' : undefined}
          label="Confirm new password"
          name="confirmPassword"
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          type="password"
          value={confirmPassword}
        />
      </div>

      <Button disabled={passwordsDoNotMatch} fullWidth loading={loading} type="submit">
        Reset password
      </Button>

      <p className={styles.footerNote}>
        Already completed this step?{' '}
        <Link className={styles.inlineLink} href="/auth/sign-in">
          Return to sign in
        </Link>
      </p>
    </form>
  );
}
