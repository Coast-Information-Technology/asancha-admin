// src/features/companies/hooks/use-companies-action.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin company review actions.
 *
 * Role in the project:
 * This hook validates and submits company review actions, then invalidates
 * company queries so lists and detail pages can refresh.
 *
 * Key exports:
 * - useCompaniesAction validates and submits company actions.
 *
 * Business relevance:
 * Company actions affect onboarding readiness, company trust, member
 * relationships, documents, verification, API partner readiness, and platform
 * participation.
 *
 * Security note:
 * Frontend hooks do not authorize actions. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, redaction, and audit
 * logging remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitCompanyAction } from '../api/companies.api';
import { companiesActionSchema } from '../schemas/companies-action.schema';
import type { CompanyActionInput, CompanyMutationResponse } from '../types/companies.types';

export interface UseCompaniesActionOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useCompaniesAction(options: UseCompaniesActionOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<CompanyMutationResponse, Error, CompanyActionInput>({
    mutationFn: async (input) => {
      const parsedInput = companiesActionSchema.parse(input);

      return submitCompanyAction(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['companies'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to submit company action.');
    },
  });
}
