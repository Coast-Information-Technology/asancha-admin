// src/components/ui/input/input.tsx

/**
 * File purpose:
 * Provides the shared Input primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component supports auth forms, filters, search, review actions, settings,
 * staff forms, and admin operational screens.
 *
 * Key exports:
 * - Input renders a labelled input with helper/error text.
 *
 * Business relevance:
 * Form inputs must be consistent and accessible across staff-only workflows.
 *
 * Security note:
 * Input validation here is UX guidance only. Backend DTO validation remains final.
 */

import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export function Input({
  id,
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  const descriptionId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorText ? `${inputId}-error` : undefined;

  return (
    <label className={cn(styles.field, fullWidth && styles.fullWidth)}>
      {label ? <span className={styles.label}>{label}</span> : null}

      <span className={cn(styles.control, errorText && styles.invalid)}>
        {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
        <input
          aria-describedby={cn(descriptionId, errorId) || undefined}
          aria-invalid={Boolean(errorText)}
          className={cn(styles.input, className)}
          id={inputId}
          {...props}
        />
        {rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
      </span>

      {helperText ? <span className={styles.helper} id={descriptionId}>{helperText}</span> : null}
      {errorText ? <span className={styles.error} id={errorId}>{errorText}</span> : null}
    </label>
  );
}
