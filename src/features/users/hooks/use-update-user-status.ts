// src/features/users/hooks/use-update-user-status.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin user status and role updates.
 *
 * Role in the project:
 * This hook file centralises update operations and query invalidation for user
 * account status and public role changes.
 *
 * Key exports:
 * - useUpdateUserStatus validates and submits user status updates.
 * - useUpdateUserRole validates and submits user role updates.
 *
 * Business relevance:
 * User status and role changes are high-impact admin actions that affect user
 * access, onboarding, support, and operational workflows.
 *
 * Security note:
 * Frontend mutation hooks do not authorize actions. Backend permissions,
 * allowed transitions, audit logging, and redaction remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUserRole, updateUserStatus } from '../api/users.api';
import { setUserRoleSchema } from '../schemas/set-user-role.schema';
import { setUserStatusSchema } from '../schemas/set-user-status.schema';
import type {
  SetUserRoleInput,
  SetUserStatusInput,
  UserMutationResponse,
} from '../types/users.types';

export interface UseUserMutationOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useUpdateUserStatus(options: UseUserMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<UserMutationResponse, Error, SetUserStatusInput>({
    mutationFn: async (input) => {
      const parsedInput = setUserStatusSchema.parse(input);

      return updateUserStatus(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to update user status.');
    },
  });
}

export function useUpdateUserRole(options: UseUserMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<UserMutationResponse, Error, SetUserRoleInput>({
    mutationFn: async (input) => {
      const parsedInput = setUserRoleSchema.parse(input);

      return updateUserRole(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to update user role.');
    },
  });
}
