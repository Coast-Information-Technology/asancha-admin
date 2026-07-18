// src/components/ui/drawer/drawer.tsx

/** Accessible side drawer primitive used by mobile navigation and panels. */

'use client';

import type { ReactNode } from 'react';
import { useEffect, useId, useRef } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './drawer.module.css';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  const drawerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const focusFrame = window.requestAnimationFrame(() => {
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

      (firstFocusable ?? drawerRef.current)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.dataset.scrollLocked = 'true';

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      delete document.body.dataset.scrollLocked;
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div aria-labelledby={titleId} aria-modal="true" className={styles.overlay} role="dialog">
      <button aria-label="Close drawer" className={styles.backdrop} onClick={onClose} type="button" />
      <aside
        className={cn(styles.drawer, styles[side], className)}
        ref={drawerRef}
        tabIndex={-1}
      >
        <header className={styles.header}>
          <h2 className={styles.title} id={titleId}>{title}</h2>
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
