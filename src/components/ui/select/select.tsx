// src/components/ui/select/select.tsx

/**
 * File purpose:
 * Provides the shared Select primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for filters, status selection, role selection where allowed, sorting, and
 * controlled admin forms.
 *
 * Key exports:
 * - Select renders a labelled native select with helper/error text.
 *
 * Business relevance:
 * Select options must respect staff restrictions. For example, create staff
 * forms must not offer super_admin creation.
 *
 * Security note:
 * Removing an option in the UI is not security. Backend validation remains final.
 */

import type { SelectHTMLAttributes } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './select.module.css';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  placeholder?: string;
  options: readonly SelectOption[];
  fullWidth?: boolean;
}

export function Select({
  id,
  label,
  helperText,
  errorText,
  placeholder,
  options,
  fullWidth = true,
  className,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
  const descriptionId = helperText ? `${selectId}-helper` : undefined;
  const errorId = errorText ? `${selectId}-error` : undefined;

  return (
    <label className={cn(styles.field, fullWidth && styles.fullWidth)}>
      {label ? <span className={styles.label}>{label}</span> : null}

      <select
        aria-describedby={cn(descriptionId, errorId) || undefined}
        aria-invalid={Boolean(errorText)}
        className={cn(styles.select, errorText && styles.invalid, className)}
        id={selectId}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {helperText ? <span className={styles.helper} id={descriptionId}>{helperText}</span> : null}
      {errorText ? <span className={styles.error} id={errorId}>{errorText}</span> : null}
    </label>
  );
}
