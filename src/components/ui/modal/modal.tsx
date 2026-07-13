// src/components/ui/modal/modal.tsx

/**
 * File purpose:
 * Provides a shared Modal wrapper for the Asancha Admin frontend.
 *
 * Role in the project:
 * This component wraps Dialog for modal workflows where teams prefer Modal
 * naming in feature modules.
 *
 * Security note:
 * Modal confirmation is UX only. Backend authorization remains final.
 */

'use client';

import type { ReactNode } from 'react';

import { Dialog } from '../dialog/dialog';

export interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
}

export function Modal(props: ModalProps) {
  return <Dialog {...props} />;
}
