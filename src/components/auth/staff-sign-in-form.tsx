// src/components/auth/staff-sign-in-form.tsx

/**
 * File purpose:
 * Provides the staff sign-in form for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component is used by the staff-only sign-in page. It collects staff email,
 * password, and optional device preference before delegating submission to the
 * auth feature/page layer.
 *
 * Key exports:
 * - StaffSignInForm renders the staff sign-in form.
 *
 * Business relevance:
 * asancha-admin is only for super_admin, admin, and customer_care_rep users.
 * Public users must not sign in to this frontend.
 *
 * Security note:
 * This form is UX only. Backend authentication, staff role validation, account
 * status checks, session creation, rate limiting, audit logging, and lockout
 * rules remain the final authority.
 */

'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { Button } from '../ui/button/button';
import { Checkbox } from '../ui/checkbox/checkbox';
import { Input } from '../ui/input/input';

import styles from './auth.module.css';

export interface StaffSignInFormValues {
  email: string;
  password: string;
  rememberDevice: boolean;
}

export interface StaffSignInFormProps {
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  onSubmit: (values: StaffSignInFormValues) => Promise<void> | void;
}

export function StaffSignInForm({
  loading = false,
  errorMessage = null,
  successMessage = null,
  onSubmit,
}: StaffSignInFormProps) {
  const [values, setValues] = useState<StaffSignInFormValues>({
    email: '',
    password: '',
    rememberDevice: false,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    await onSubmit({
      email: values.email.trim().toLowerCase(),
      password: values.password,
      rememberDevice: values.rememberDevice,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Sign in to Asancha Admin</h1>
        <p className={styles.description}>
          Access is restricted to authorised Asancha staff accounts only.
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
          autoComplete="email"
          label="Staff email"
          name="email"
          onChange={(event) =>
            setValues((currentValues) => ({
              ...currentValues,
              email: event.target.value,
            }))
          }
          placeholder="name@asancha.co.uk"
          required
          type="email"
          value={values.email}
        />

        <Input
          autoComplete="current-password"
          label="Password"
          name="password"
          onChange={(event) =>
            setValues((currentValues) => ({
              ...currentValues,
              password: event.target.value,
            }))
          }
          placeholder="Enter your password"
          required
          type="password"
          value={values.password}
        />

        <div className={styles.formRow}>
          <Checkbox
            checked={values.rememberDevice}
            label="Remember this device"
            name="rememberDevice"
            onChange={(event) =>
              setValues((currentValues) => ({
                ...currentValues,
                rememberDevice: event.target.checked,
              }))
            }
          />

          <Link className={styles.inlineLink} href="/auth/forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>

      <Button fullWidth loading={loading} type="submit">
        Sign in
      </Button>
    </form>
  );
}
