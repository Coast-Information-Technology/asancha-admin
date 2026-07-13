// src/components/ui/dialog/dialog.tsx

/**
 * File purpose:
 * Provides the shared Dialog primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for accessible lightweight confirmations, form panels, alerts, and
 * action prompts.
 *
 * Security note:
 * Dialog confirmation does not replace backend permission enforcement.
 */

'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './dialog.module.css';

export interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
  labelledById?: string;
}

export function Dialog({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  className,
  labelledById = 'asancha-dialog-title',
}: DialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.dataset.scrollLocked = 'true';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      delete document.body.dataset.scrollLocked;
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div aria-labelledby={labelledById} aria-modal="true" className={styles.overlay} role="dialog">
      <button aria-label="Close dialog" className={styles.backdrop} onClick={onClose} type="button" />
      <section className={cn(styles.dialog, className)}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title} id={labelledById}>{title}</h2>
            {description ? <p className={styles.description}>{description}</p> : null}
          </div>
          <button aria-label="Close dialog" className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </section>
    </div>
  );
}
