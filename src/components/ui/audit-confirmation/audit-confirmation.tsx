/**
 * Shared confirmation dialog for high-impact, audit-sensitive staff actions.
 *
 * The component collects a safe human-readable reason before the parent submits
 * the action. It improves auditability but does not replace backend policy,
 * authorization, transition, or audit enforcement.
 */

'use client';

import { useState } from 'react';

import { Button, type ButtonVariant } from '../button/button';
import { Modal } from '../modal/modal';
import { Textarea } from '../textarea/textarea';

import styles from './audit-confirmation.module.css';

export type AuditConfirmationTone = 'default' | 'warning' | 'danger';

export interface AuditConfirmationProps {
  open: boolean;
  title: string;
  description: string;
  actionLabel: string;
  cancelLabel?: string;
  reasonLabel?: string;
  reasonHelperText?: string;
  reasonRequired?: boolean;
  tone?: AuditConfirmationTone;
  pending?: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void> | void;
}

function getConfirmVariant(tone: AuditConfirmationTone): ButtonVariant {
  if (tone === 'danger') {
    return 'danger';
  }

  if (tone === 'warning') {
    return 'warning';
  }

  return 'primary';
}

export function AuditConfirmation({
  open,
  title,
  description,
  actionLabel,
  cancelLabel = 'Cancel',
  reasonLabel = 'Reason for this action',
  reasonHelperText = 'This reason may be recorded with the action audit event.',
  reasonRequired = true,
  tone = 'default',
  pending = false,
  onClose,
  onConfirm,
}: AuditConfirmationProps) {
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    setReason('');
    setErrorMessage(null);
    onClose();
  };

  const handleConfirm = async () => {
    const trimmedReason = reason.trim();

    if (reasonRequired && trimmedReason.length < 3) {
      setErrorMessage('Enter a brief reason before continuing.');
      return;
    }

    setErrorMessage(null);
    await onConfirm(trimmedReason);
  };

  return (
    <Modal
      description={description}
      footer={
        <div className={styles.footer}>
          <Button disabled={pending} onClick={handleClose} variant="secondary">
            {cancelLabel}
          </Button>
          <Button
            loading={pending}
            onClick={() => void handleConfirm()}
            variant={getConfirmVariant(tone)}
          >
            {actionLabel}
          </Button>
        </div>
      }
      onClose={handleClose}
      open={open}
      title={title}
    >
      <div className={styles.body}>
        <Textarea
          aria-required={reasonRequired}
          errorText={errorMessage ?? undefined}
          helperText={reasonHelperText}
          label={reasonLabel}
          maxLength={1000}
          onChange={(event) => setReason(event.target.value)}
          value={reason}
        />
      </div>
    </Modal>
  );
}
