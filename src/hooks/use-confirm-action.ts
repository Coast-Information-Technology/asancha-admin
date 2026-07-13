// src/hooks/use-confirm-action.ts

/**
 * File purpose:
 * Provides confirmation-action state for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook supports high-impact admin actions that require confirmation before
 * execution, such as approval, rejection, suspension, cancellation, status
 * changes, payment review, document review, verification review, and API access
 * actions.
 *
 * Key exports:
 * - useConfirmAction manages confirmation modal/dialog state.
 *
 * Business relevance:
 * Sensitive staff actions must be deliberate, auditable, and permission-aware.
 * Frontend confirmation improves safety but does not replace backend
 * authorization, policy checks, state-machine validation, or audit logging.
 *
 * Security note:
 * Confirmation UI is not a security boundary. Backend enforcement remains
 * mandatory for every sensitive action.
 */

'use client';

import { useCallback, useState } from 'react';

export type ConfirmActionTone = 'default' | 'warning' | 'danger';

export interface ConfirmActionState {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel: string;
  tone: ConfirmActionTone;
  pending: boolean;
}

export interface OpenConfirmActionInput {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmActionTone;
  onConfirm: () => Promise<void> | void;
}

export interface UseConfirmActionResult {
  confirmation: ConfirmActionState;
  openConfirmAction: (input: OpenConfirmActionInput) => void;
  closeConfirmAction: () => void;
  runConfirmedAction: () => Promise<void>;
}

const DEFAULT_CONFIRMATION_STATE: ConfirmActionState = {
  open: false,
  title: '',
  description: undefined,
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  tone: 'default',
  pending: false,
};

export function useConfirmAction(): UseConfirmActionResult {
  const [confirmation, setConfirmation] = useState<ConfirmActionState>(DEFAULT_CONFIRMATION_STATE);
  const [confirmHandler, setConfirmHandler] = useState<(() => Promise<void> | void) | null>(null);

  const closeConfirmAction = useCallback(() => {
    setConfirmation(DEFAULT_CONFIRMATION_STATE);
    setConfirmHandler(null);
  }, []);

  const openConfirmAction = useCallback((input: OpenConfirmActionInput) => {
    setConfirmation({
      open: true,
      title: input.title,
      description: input.description,
      confirmLabel: input.confirmLabel ?? 'Confirm',
      cancelLabel: input.cancelLabel ?? 'Cancel',
      tone: input.tone ?? 'default',
      pending: false,
    });

    setConfirmHandler(() => input.onConfirm);
  }, []);

  const runConfirmedAction = useCallback(async () => {
    if (!confirmHandler) {
      return;
    }

    setConfirmation((currentState) => ({
      ...currentState,
      pending: true,
    }));

    try {
      await confirmHandler();
      closeConfirmAction();
    } catch (error) {
      setConfirmation((currentState) => ({
        ...currentState,
        pending: false,
      }));

      throw error;
    }
  }, [closeConfirmAction, confirmHandler]);

  return {
    confirmation,
    openConfirmAction,
    closeConfirmAction,
    runConfirmedAction,
  };
}
