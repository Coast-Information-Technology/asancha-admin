// src/components/ui/toast/toast.tsx

/**
 * File purpose:
 * Provides shared Toast display components for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for safe success, error, warning, and info feedback.
 *
 * Security note:
 * Toasts must not expose secrets, raw provider errors, ObjectIds, private URLs,
 * or internal notes.
 */

import type { ToastMessage } from '../../../hooks/use-toast';
import { cn } from '../../../lib/utils/cn';

import styles from './toast.module.css';

export interface ToastViewportProps {
  toasts: readonly ToastMessage[];
  onDismiss: (toastId: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div aria-live="polite" className={styles.viewport}>
      {toasts.map((toast) => (
        <article className={cn(styles.toast, styles[toast.tone])} key={toast.id}>
          <div>
            <strong className={styles.title}>{toast.title}</strong>
            {toast.description ? <p className={styles.description}>{toast.description}</p> : null}
          </div>
          <button
            aria-label="Dismiss notification"
            className={styles.closeButton}
            onClick={() => onDismiss(toast.id)}
            type="button"
          >
            ×
          </button>
        </article>
      ))}
    </div>
  );
}
