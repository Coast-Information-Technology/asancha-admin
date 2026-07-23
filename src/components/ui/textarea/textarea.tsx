// src/components/ui/textarea/textarea.tsx

/**
 * File purpose:
 * Provides the shared Textarea primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for safe messages, review notes, rejection reasons, correction requests,
 * staff notes where permitted, and form descriptions.
 *
 * Security note:
 * Textarea content must be validated and authorized by the backend. Internal
 * notes must not be exposed to public users.
 */

import type { TextareaHTMLAttributes } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
}

export function Textarea({
  id,
  label,
  helperText,
  errorText,
  fullWidth = true,
  className,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;
  const descriptionId = helperText ? `${textareaId}-helper` : undefined;
  const errorId = errorText ? `${textareaId}-error` : undefined;

  return (
    <label className={cn(styles.field, fullWidth && styles.fullWidth)}>
      {label ? <span className={styles.label}>{label}</span> : null}

      <textarea
        aria-describedby={cn(descriptionId, errorId) || undefined}
        aria-invalid={Boolean(errorText)}
        className={cn(styles.textarea, errorText && styles.invalid, className)}
        id={textareaId}
        {...props}
      />

      {helperText ? (
        <span className={styles.helper} id={descriptionId}>
          {helperText}
        </span>
      ) : null}
      {errorText ? (
        <span className={styles.error} id={errorId}>
          {errorText}
        </span>
      ) : null}
    </label>
  );
}
