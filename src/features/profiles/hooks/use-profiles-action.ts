// src/features/profiles/hooks/use-profiles-action.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin profile review actions.
 *
 * Role in the project:
 * This hook validates and submits profile review actions, then invalidates
 * profile queries so lists and detail pages can refresh.
 *
 * Key exports:
 * - useProfilesAction validates and submits profile actions.
 *
 * Business relevance:
 * Profile actions affect onboarding readiness, user role trust, related
 * property/listing flows, and service provider/platform participation.
 *
 * Security note:
 * Frontend hooks do not authorize actions. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, redaction, and audit
 * logging remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitProfileAction } from '../api/profiles.api';
import { profilesActionSchema } from '../schemas/profiles-action.schema';
import type { ProfileActionInput, ProfileMutationResponse } from '../types/profiles.types';

export interface UseProfilesActionOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useProfilesAction(options: UseProfilesActionOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<ProfileMutationResponse, Error, ProfileActionInput>({
    mutationFn: async (input) => {
      const parsedInput = profilesActionSchema.parse(input);

      return submitProfileAction(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['profiles'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to submit profile action.');
    },
  });
}
