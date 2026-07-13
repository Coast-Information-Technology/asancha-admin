// src/components/ui/drawer/drawer.tsx

/**
 * File purpose:
 * Provides the shared Drawer primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for mobile navigation, filters, side panels, quick detail previews, and
 * operational action panels.
 *
 * Security note:
 * Drawer visibility is not authorization. Backend permissions remain final.
 */

'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './drawer.module.css';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  title: string;
  children: ReactNode;
  side?: DrawerSide;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
}

export function Drawer({
  open,
  title,
  children,
  side = 'right',
  footer,
  onClose,
  className,
}: DrawerProps) {
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
    <div aria-modal="true" className={styles.overlay} role="dialog">
      <button aria-label="Close drawer" className={styles.backdrop} onClick={onClose} type="button" />
      <aside className={cn(styles.drawer, styles[side], className)}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button aria-label="Close drawer" className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </aside>
    </div>
  );
}
