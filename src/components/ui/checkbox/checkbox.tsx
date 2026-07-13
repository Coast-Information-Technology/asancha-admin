// src/components/ui/checkbox/checkbox.tsx

/**
 * File purpose:
 * Provides the shared Checkbox primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used in filters, policy confirmations, preferences, table selections, and
 * controlled admin forms.
 *
 * Key exports:
 * - Checkbox renders an accessible checkbox with label/helper/error text.
 *
 * Security note:
 * Checkbox confirmation is not backend authorization. Sensitive actions still
 * require backend permission and audit enforcement.
 */

import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  helperText?: string;
  errorText?: string;
}

export function Checkbox({ id, label, helperText, errorText, className, ...props }: CheckboxProps) {
  const checkboxId = id ?? props.name;
  const descriptionId = helperText ? `${checkboxId}-helper` : undefined;
  const errorId = errorText ? `${checkboxId}-error` : undefined;

  return (
    <label className={styles.wrapper}>
      <input
        aria-describedby={cn(descriptionId, errorId) || undefined}
        aria-invalid={Boolean(errorText)}
        className={cn(styles.checkbox, className)}
        id={checkboxId}
        type="checkbox"
        {...props}
      />
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        {helperText ? <span className={styles.helper} id={descriptionId}>{helperText}</span> : null}
        {errorText ? <span className={styles.error} id={errorId}>{errorText}</span> : null}
      </span>
    </label>
  );
}
