/**
 * File purpose:
 * Renders the validated create-staff form for Asancha Admin.
 *
 * Role in the project:
 * Collects the backend staff registration payload and submits it through the
 * staff feature mutation hook.
 *
 * Business relevance:
 * Staff creation supports authorised internal team growth while preserving the
 * approved role matrix. Super admin creation is never available in this form.
 *
 * Security note:
 * New staff members create their own password through the backend's first-time
 * setup flow. Backend authorization remains final.
 */

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { canCreateStaffRole } from '../../lib/auth/staff-role-guards';
import {
  STAFF_CREATION_RULES,
  STAFF_ROLE_LABELS,
  type StaffCreationTargetRole,
} from '../../lib/constants/staff-roles.constants';
import { createDefaultFormMode, createZodFormResolver } from '../../lib/zod/form-resolver';
import { useStaffAuthStore } from '../../store/staff-auth.store';
import { Alert } from '../ui/alert/alert';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Select } from '../ui/select/select';

import { useCreateStaff } from '../../features/staff/hooks/use-create-staff';
import { createStaffSchema } from '../../features/staff/schemas/create-staff.schema';
import type { CreateStaffSchemaInput } from '../../features/staff/schemas/create-staff.schema';

import styles from './staff.module.css';

const EMPTY_ALLOWED_ROLES: readonly StaffCreationTargetRole[] = [];

const DEFAULT_FORM_VALUES: CreateStaffSchemaInput = {
  email: '',
  role: 'customer_care_rep',
  firstName: '',
  lastName: '',
};

export interface CreateStaffFormProps {
  onCreated?: (message: string) => void;
}

export function CreateStaffForm({ onCreated }: CreateStaffFormProps) {
  const actorRole = useStaffAuthStore((state) => state.user?.role);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const allowedRoles = actorRole ? STAFF_CREATION_RULES[actorRole] : EMPTY_ALLOWED_ROLES;
  const canSubmit = Boolean(
    actorRole && allowedRoles.some((targetRole) => canCreateStaffRole(actorRole, targetRole)),
  );
  const {
    clearErrors,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
  } = useForm<CreateStaffSchemaInput>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: createDefaultFormMode(),
    reValidateMode: 'onChange',
    resolver: createZodFormResolver(createStaffSchema),
  });

  useEffect(() => {
    if (allowedRoles.length === 0) {
      return;
    }

    const selectedRole = getValues('role');

    if (!allowedRoles.includes(selectedRole)) {
      setValue('role', allowedRoles[0], { shouldValidate: true });
    }
  }, [allowedRoles, getValues, setValue]);

  const createStaffMutation = useCreateStaff({
    onSuccess: (message) => {
      reset({
        ...DEFAULT_FORM_VALUES,
        role: allowedRoles[0] ?? 'customer_care_rep',
      });
      setServerErrorMessage(null);
      setSuccessMessage(message);
      onCreated?.(message);
    },
    onError: (message) => {
      setSuccessMessage(null);
      setServerErrorMessage(message);
    },
  });

  async function handleValidSubmit(values: CreateStaffSchemaInput): Promise<void> {
    clearErrors('root');
    setSuccessMessage(null);
    setServerErrorMessage(null);

    if (!actorRole || !canCreateStaffRole(actorRole, values.role)) {
      setError('root', {
        message: 'Your staff role is not permitted to create this account.',
        type: 'permission',
      });
      return;
    }

    createStaffMutation.mutate(values);
  }

  const permissionErrorMessage = errors.root?.message;

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleValidSubmit)}>
      {!actorRole ? (
        <Alert title="Checking staff permissions" tone="info">
          Your current staff session is still loading. The form will enable when the backend session
          confirms your staff role.
        </Alert>
      ) : null}

      {actorRole && !canSubmit ? (
        <Alert title="Staff creation unavailable" tone="danger">
          Your current staff role cannot create staff accounts. Customer care representatives cannot
          create staff accounts.
        </Alert>
      ) : null}

      {permissionErrorMessage ? (
        <Alert title="Staff creation blocked" tone="danger">
          {permissionErrorMessage}
        </Alert>
      ) : null}

      {serverErrorMessage ? (
        <Alert title="Staff creation failed" tone="danger">
          {serverErrorMessage}
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert title="Staff account created" tone="success">
          The staff member can now continue with the account setup.
        </Alert>
      ) : null}

      <div className={styles.formGrid}>
        <Input
          autoComplete="given-name"
          errorText={errors.firstName?.message}
          label="First name"
          placeholder="Amelia"
          {...register('firstName')}
        />

        <Input
          autoComplete="family-name"
          errorText={errors.lastName?.message}
          label="Last name"
          placeholder="Grant"
          {...register('lastName')}
        />

        <Input
          autoComplete="email"
          errorText={errors.email?.message}
          label="Email address"
          placeholder="staff@example.com"
          type="email"
          {...register('email')}
        />

        <div className={styles.fullField}>
          <Select
            errorText={errors.role?.message}
            label="Staff role"
            options={allowedRoles.map((role) => ({
              label: STAFF_ROLE_LABELS[role],
              value: role,
            }))}
            placeholder={canSubmit ? 'Select a staff role' : 'Role unavailable'}
            {...register('role')}
          />
        </div>

      </div>

      <p className={styles.formNote}>
        The staff member will be required to create a password before accessing the dashboard.
      </p>

      <div className={styles.actions}>
        <Button
          className={styles.submitButton}
          disabled={!canSubmit}
          loading={createStaffMutation.isPending}
          type="submit"
        >
          Create staff account
        </Button>
      </div>
    </form>
  );
}
