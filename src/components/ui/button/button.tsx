// src/components/ui/button/button.tsx

/**
 * File purpose:
 * Provides the shared Button primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component is used across forms, tables, dialogs, drawers, review panels,
 * auth screens, dashboards, and admin actions.
 *
 * Key exports:
 * - Button renders an accessible button or link-style button.
 *
 * Business relevance:
 * Admin actions must be clear and predictable, especially for high-impact review,
 * payment, document, verification, staff, and API access workflows.
 *
 * Security note:
 * Disabled/hidden buttons are not security. Backend permission checks remain
 * the final authority for every action.
 */

import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'warning' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export type ButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export type ButtonLinkProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    disabled?: boolean;
  };

export type ButtonComponentProps = ButtonProps | ButtonLinkProps;

function getButtonClassName(props: {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  className?: string;
}): string {
  return cn(
    styles.button,
    styles[props.variant],
    styles[props.size],
    props.fullWidth && styles.fullWidth,
    props.className,
  );
}

export function Button(props: ButtonComponentProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    className,
    ...rest
  } = props;

  const content = (
    <>
      {loading ? <span aria-hidden="true" className={styles.spinner} /> : leftIcon}
      <span className={styles.label}>{children}</span>
      {!loading ? rightIcon : null}
    </>
  );

  const buttonClassName = getButtonClassName({
    variant,
    size,
    fullWidth,
    className,
  });

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, disabled, ...anchorProps } = rest;

    return (
      <Link
        aria-disabled={disabled || loading}
        className={cn(buttonClassName, (disabled || loading) && styles.disabled)}
        href={disabled || loading ? '#' : href}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }

  const { disabled, type = 'button', ...buttonProps } = rest;

  return (
    <button className={buttonClassName} disabled={disabled || loading} type={type} {...buttonProps}>
      {content}
    </button>
  );
}
