// src/features/listings/hooks/use-listings-action.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin listing lifecycle actions.
 *
 * Role in the project:
 * This hook validates and submits listing lifecycle actions, then invalidates
 * listing queries so lists and detail pages can refresh.
 *
 * Key exports:
 * - useListingsAction validates and submits listing actions.
 *
 * Business relevance:
 * Listing actions affect publication, marketplace visibility, reservation
 * readiness, property exposure, investor experience, and platform quality.
 *
 * Security note:
 * Frontend hooks do not authorize actions. Backend permissions, allowed action
 * transitions, high-impact confirmation, internal note handling, safe user
 * messaging, redaction, lifecycle rules, and audit logging remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitListingAction } from '../api/listings.api';
import { listingsActionSchema } from '../schemas/listings-action.schema';
import type { ListingActionInput, ListingMutationResponse } from '../types/listings.types';

export interface UseListingsActionOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useListingsAction(options: UseListingsActionOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<ListingMutationResponse, Error, ListingActionInput>({
    mutationFn: async (input) => {
      const parsedInput = listingsActionSchema.parse(input);

      return submitListingAction(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['listings'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to submit listing action.');
    },
  });
}
