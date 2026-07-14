// src/features/staff/hooks/use-create-staff.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin staff creation and staff updates.
 *
 * Role in the project:
 * This hook file centralises create staff, update staff status, and update staff
 * role operations with query invalidation.
 *
 * Key exports:
 * - useCreateStaff validates and submits permitted staff creation.
 * - useUpdateStaffStatus validates and submits staff status updates.
 * - useUpdateStaffRole validates and submits permitted staff role updates.
 *
 * Business relevance:
 * Staff creation and updates are high-impact operations that affect internal
 * admin access and operational security.
 *
 * Security note:
 * Frontend hooks do not authorize actions. No frontend hook may create or assign
 * super_admin. Backend permissions, allowed transitions, audit logging, and
 * redaction remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createStaff, updateStaffRole, updateStaffStatus } from '../api/staff.api';
import { createStaffSchema } from '../schemas/create-staff.schema';
import { updateStaffRoleSchema } from '../schemas/update-staff-role.schema';
import { updateStaffStatusSchema } from '../schemas/update-staff-status.schema';
import type {
  CreateStaffInput,
  StaffMutationResponse,
  UpdateStaffRoleInput,
  UpdateStaffStatusInput,
} from '../types/staff.types';

export interface UseStaffMutationOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useCreateStaff(options: UseStaffMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<StaffMutationResponse, Error, CreateStaffInput>({
    mutationFn: async (input) => {
      const parsedInput = createStaffSchema.parse(input);

      return createStaff(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['staff'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to create staff invite.');
    },
  });
}

export function useUpdateStaffStatus(options: UseStaffMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<StaffMutationResponse, Error, UpdateStaffStatusInput>({
    mutationFn: async (input) => {
      const parsedInput = updateStaffStatusSchema.parse(input);

      return updateStaffStatus(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['staff'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to update staff status.');
    },
  });
}

export function useUpdateStaffRole(options: UseStaffMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<StaffMutationResponse, Error, UpdateStaffRoleInput>({
    mutationFn: async (input) => {
      const parsedInput = updateStaffRoleSchema.parse(input);

      return updateStaffRole(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['staff'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to update staff role.');
    },
  });
}
