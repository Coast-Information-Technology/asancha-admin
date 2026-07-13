// src/components/ui/badge/badge.tsx

/**
 * File purpose:
 * Provides the shared Badge primitive for Asancha Admin.
 *
 * Role in the project:
 * Used for role, status, priority, risk, payment, document, verification,
 * booking, message, audit, and queue badges.
 *
 * Security note:
 * Badges are display-only and must not replace backend workflow state.
 */

import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './badge.module.css';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'muted';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

export function Badge({ children, tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone], className)} {...props}>
      {children}
    </span>
  );
}
