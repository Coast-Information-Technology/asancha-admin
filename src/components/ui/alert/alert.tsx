// src/components/ui/alert/alert.tsx

/**
 * File purpose:
 * Provides the shared Alert primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for safe information, warnings, errors, permission blocks, and system
 * notices across admin screens.
 *
 * Security note:
 * Alerts must not expose secrets, raw provider payloads, ObjectIds, or private
 * internal notes.
 */

import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './alert.module.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: ReactNode;
  tone?: AlertTone;
}

export function Alert({ title, children, tone = 'info', className, ...props }: AlertProps) {
  return (
    <div
      className={cn(styles.alert, styles[tone], className)}
      role={tone === 'danger' ? 'alert' : 'status'}
      {...props}
    >
      <strong className={styles.title}>{title}</strong>
      {children ? <div className={styles.body}>{children}</div> : null}
    </div>
  );
}
