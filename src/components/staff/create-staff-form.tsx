// src/components/staff/create-staff-form.tsx

/**
 * File purpose:
 * Renders the create-staff form for Asancha Admin.
 *
 * Role in the project:
 * This component collects permitted staff invite details and submits them
 * through the staff feature mutation hook.
 *
 * Key exports:
 * - CreateStaffForm renders a frontend-safe create staff form.
 *
 * Business relevance:
 * Staff creation supports authorised internal team growth while preserving the
 * approved staff role matrix.
 *
 * Security note:
 * This form intentionally excludes super_admin. Super admin creation is
 * seed/bootstrap only and must not exist in frontend routes, forms, modals,
 * dropdowns, or actions. Backend authorization remains final.
 */

'use client';

import { useState, type FormEvent } from 'react';

import { useCreateStaff } from '../../features/staff/hooks/use-create-staff';
import type { CreateStaffInput, CreateStaffRole } from '../../features/staff/types/staff.types';

import styles from './staff.module.css';

export interface CreateStaffFormProps {
  onCreated?: (message: string) => void;
}

export function CreateStaffForm({ onCreated }: CreateStaffFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<CreateStaffRole>('customer_care_rep');
  const [inviteMessage, setInviteMessage] = useState('');
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  const createStaffMutation = useCreateStaff({
    onSuccess: (message) => {
      setDisplayName('');
      setEmail('');
      setRole('customer_care_rep');
      setInviteMessage('');
      setLocalMessage(message);
      onCreated?.(message);
    },
    onError: (message) => {
      setLocalMessage(message);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CreateStaffInput = {
      displayName,
      email,
      role,
      inviteMessage: inviteMessage.trim().length > 0 ? inviteMessage : undefined,
    };

    createStaffMutation.mutate(payload);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.notice} role="status">
        This form can only create admin or customer care accounts. It must never create a
        super_admin account.
      </div>

      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span className={styles.label}>Display name</span>
          <input
            className={styles.input}
            maxLength={120}
            minLength={2}
            name="displayName"
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Example: Asancha Operations"
            required
            type="text"
            value={displayName}
          />
          <span className={styles.helpText}>Use the staff member&apos;s safe display name.</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Staff email</span>
          <input
            className={styles.input}
            maxLength={160}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="staff@example.com"
            required
            type="email"
            value={email}
          />
          <span className={styles.helpText}>The staff invite will be sent to this email.</span>
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Role</span>
        <select
          className={styles.select}
          name="role"
          onChange={(event) => setRole(event.target.value as CreateStaffRole)}
          required
          value={role}
        >
          <option value="customer_care_rep">Customer care representative</option>
          <option value="admin">Admin</option>
        </select>
        <span className={styles.helpText}>
          Super admin is intentionally not available in this form.
        </span>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Invite message</span>
        <textarea
          className={styles.textarea}
          maxLength={500}
          name="inviteMessage"
          onChange={(event) => setInviteMessage(event.target.value)}
          placeholder="Optional short message for the staff invite."
          value={inviteMessage}
        />
        <span className={styles.helpText}>Optional. Do not include passwords or secrets.</span>
      </label>

      {localMessage ? (
        <div className={styles.notice} role="status">
          {localMessage}
        </div>
      ) : null}

      <div className={styles.actions}>
        <button
          className={styles.primaryButton}
          disabled={createStaffMutation.isPending}
          type="submit"
        >
          {createStaffMutation.isPending ? 'Submitting…' : 'Create staff invite'}
        </button>
      </div>
    </form>
  );
}
