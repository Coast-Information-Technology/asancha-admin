// src/components/auth/set-password-form.tsx

/**
 * File purpose:
 * Provides the set-password form for invited staff accounts.
 *
 * Role in the project:
 * This component accepts a staff public ID and setup token from the page/route
 * layer and allows a newly invited staff user to set their first password.
 *
 * Key exports:
 * - SetPasswordForm renders the invited staff password setup form.
 *
 * Business relevance:
 * Staff accounts are created by authorised staff only. Invited staff can set a
 * password, but this frontend must not allow public signup or super_admin
 * creation.
 *
 * Security note:
 * The invite token must be validated by the backend. This form must not expose
 * invite secrets, raw token details, staff existence checks, or backend-only
 * permission rules.
 */

'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { AUTH_FORM_LIMITS } from '../../features/auth/constants/auth.constants';

import styles from './auth.module.css';

export interface SetPasswordFormValues {
  userPublicId: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface SetPasswordFormProps {
  userPublicId: string;
  token: string;
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  onSubmit: (values: SetPasswordFormValues) => Promise<void> | void;
}

export function SetPasswordForm({
  userPublicId,
  token,
  loading = false,
  errorMessage = null,
  successMessage = null,
  onSubmit,
}: SetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordIsTooShort =
    password.length > 0 && password.length < AUTH_FORM_LIMITS.passwordMinLength;
  const passwordHasRequiredCharacters =
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
  const passwordIsMissingRequiredCharacters =
    password.length >= AUTH_FORM_LIMITS.passwordMinLength && !passwordHasRequiredCharacters;
  const passwordsDoNotMatch =
    password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;
  const canSubmit =
    password.length >= AUTH_FORM_LIMITS.passwordMinLength &&
    passwordHasRequiredCharacters &&
    confirmPassword.length > 0 &&
    !passwordsDoNotMatch;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    await onSubmit({
      userPublicId,
      token,
      password,
      confirmPassword,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Set your staff password</h1>
        <p className={styles.description}>
          Complete your invited staff account setup. This page is only for authorised Asancha staff
          invitations.
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
          errorText={
            passwordIsTooShort
              ? `Password must be at least ${AUTH_FORM_LIMITS.passwordMinLength} characters.`
              : passwordIsMissingRequiredCharacters
                ? 'Include uppercase, lowercase, a number, and a special character.'
                : undefined
          }
          helperText={`Use at least ${AUTH_FORM_LIMITS.passwordMinLength} characters, including uppercase, lowercase, a number, and a special character.`}
          label="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />

        <Input
          autoComplete="new-password"
          errorText={passwordsDoNotMatch ? 'Passwords do not match.' : undefined}
          label="Confirm password"
          name="confirmPassword"
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          type="password"
          value={confirmPassword}
        />
      </div>

      <Button disabled={!canSubmit} fullWidth loading={loading} type="submit">
        Set password
      </Button>

      <p className={styles.footerNote}>
        Already have access?{' '}
        <Link className={styles.inlineLink} href="/auth/sign-in">
          Sign in
        </Link>
      </p>
    </form>
  );
}
