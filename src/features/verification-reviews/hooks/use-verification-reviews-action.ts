// src/features/verification-reviews/hooks/use-verification-reviews-action.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin verification review actions.
 *
 * Role in the project:
 * This hook validates and submits verification review actions, then invalidates
 * verification review queries so lists and detail pages can refresh.
 *
 * Key exports:
 * - useVerificationReviewsAction validates and submits review actions.
 *
 * Business relevance:
 * Verification review actions affect KYC/AML readiness, onboarding quality,
 * sensitive action unlocks, API partner readiness, and platform trust.
 *
 * Security note:
 * Frontend hooks do not authorize actions. Backend permissions, allowed action
 * transitions, risk handling, internal note handling, safe user messaging,
 * redaction, document visibility, and audit logging remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitVerificationReviewAction } from '../api/verification-reviews.api';
import { verificationReviewsActionSchema } from '../schemas/verification-reviews-action.schema';
import type {
  VerificationReviewActionInput,
  VerificationReviewMutationResponse,
} from '../types/verification-reviews.types';

export interface UseVerificationReviewsActionOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useVerificationReviewsAction(
  options: UseVerificationReviewsActionOptions = {},
) {
  const queryClient = useQueryClient();

  return useMutation<
    VerificationReviewMutationResponse,
    Error,
    VerificationReviewActionInput
  >({
    mutationFn: async (input) => {
      const parsedInput = verificationReviewsActionSchema.parse(input);

      return submitVerificationReviewAction(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['verification-reviews'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to submit verification review action.');
    },
  });
}
