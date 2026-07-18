// src/features/properties/hooks/use-properties-action.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin property review actions.
 *
 * Role in the project:
 * This hook validates and submits property review actions, then invalidates
 * property queries so lists and detail pages can refresh.
 *
 * Key exports:
 * - usePropertiesAction validates and submits property actions.
 *
 * Business relevance:
 * Property actions affect property review readiness, document follow-up,
 * listing readiness, reservation confidence, and platform inventory quality.
 *
 * Security note:
 * Frontend hooks do not authorize actions. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, redaction, and audit
 * logging remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitPropertyAction } from '../api/properties.api';
import { propertiesActionSchema } from '../schemas/properties-action.schema';
import type {
  PropertyActionInput,
  PropertyMutationResponse,
} from '../types/properties.types';

export interface UsePropertiesActionOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function usePropertiesAction(options: UsePropertiesActionOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<PropertyMutationResponse, Error, PropertyActionInput>({
    mutationFn: async (input) => {
      const parsedInput = propertiesActionSchema.parse(input);

      return submitPropertyAction(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['properties'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to submit property action.');
    },
  });
}
