// src/hooks/use-toast.ts

/**
 * File purpose:
 * Provides a lightweight toast state hook for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook supports success, error, warning, and info feedback for admin
 * forms, review actions, table actions, safe redirects, auth flows, and general
 * staff UI events.
 *
 * Key exports:
 * - useToast manages local toast state.
 *
 * Business relevance:
 * Staff users need clear feedback after actions such as saving, reviewing,
 * filtering, sending messages, and handling operational workflows.
 *
 * Security note:
 * Toast messages must not expose secrets, private URLs, API keys, webhook
 * secrets, private KYC notes, internal admin notes, raw provider errors, or
 * MongoDB ObjectIds.
 */

'use client';

import { useCallback, useState } from 'react';

export type ToastTone = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
  durationMs: number;
}

export interface CreateToastInput {
  title: string;
  description?: string;
  tone?: ToastTone;
  durationMs?: number;
}

export interface UseToastResult {
  toasts: ToastMessage[];
  showToast: (input: CreateToastInput) => string;
  dismissToast: (toastId: string) => void;
  clearToasts: () => void;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
}

const DEFAULT_TOAST_DURATION_MS = 5000;

function createToastId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function useToast(): UseToastResult {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((toastId: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback((input: CreateToastInput): string => {
    const toastId = createToastId();

    const toast: ToastMessage = {
      id: toastId,
      title: input.title,
      description: input.description,
      tone: input.tone ?? 'info',
      durationMs: input.durationMs ?? DEFAULT_TOAST_DURATION_MS,
    };

    setToasts((currentToasts) => [toast, ...currentToasts]);

    if (toast.durationMs > 0) {
      window.setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((currentToast) => currentToast.id !== toastId),
        );
      }, toast.durationMs);
    }

    return toastId;
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback(
    (title: string, description?: string) => {
      return showToast({
        title,
        description,
        tone: 'success',
      });
    },
    [showToast],
  );

  const error = useCallback(
    (title: string, description?: string) => {
      return showToast({
        title,
        description,
        tone: 'error',
      });
    },
    [showToast],
  );

  const warning = useCallback(
    (title: string, description?: string) => {
      return showToast({
        title,
        description,
        tone: 'warning',
      });
    },
    [showToast],
  );

  const info = useCallback(
    (title: string, description?: string) => {
      return showToast({
        title,
        description,
        tone: 'info',
      });
    },
    [showToast],
  );

  return {
    toasts,
    showToast,
    dismissToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };
}
