// src/components/auth/forgot-password-form.tsx

/**
 * File purpose:
 * Provides the forgot-password request form for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component lets authorised staff request a password reset email by
 * submitting their staff email address.
 *
 * Key exports:
 * - ForgotPasswordForm renders the forgot-password form.
 *
 * Business relevance:
 * Staff password recovery must be clear and safe without revealing whether an
 * email address exists in the system.
 *
 * Security note:
 * The backend must rate-limit requests and return safe generic responses. This
 * form must not expose staff existence, reset tokens, raw errors, or account
 * security details.
 */

'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';

import styles from './auth.module.css';

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ForgotPasswordFormProps {
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  onSubmit: (values: ForgotPasswordFormValues) => Promise<void> | void;
}

export function ForgotPasswordForm({
  loading = false,
  errorMessage = null,
  successMessage = null,
  onSubmit,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    await onSubmit({
      email: email.trim().toLowerCase(),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Reset your password</h1>
        <p className={styles.description}>
          Enter your staff email. If the account can receive password reset instructions, we will
          send the next step securely.
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

      <Input
        autoComplete="email"
        label="Staff email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@asancha.co.uk"
        required
        type="email"
        value={email}
      />

      <Button fullWidth loading={loading} type="submit">
        Send reset instructions
      </Button>

      <p className={styles.footerNote}>
        Remembered your password?{' '}
        <Link className={styles.inlineLink} href="/auth/sign-in">
          Return to sign in
        </Link>
      </p>
    </form>
  );
}
