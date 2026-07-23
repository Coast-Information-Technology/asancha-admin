// src/features/documents/hooks/use-documents-action.ts

/**
 * File purpose:
 * Provides mutation hooks for Asancha Admin document review actions.
 *
 * Role in the project:
 * This hook validates and submits document review actions, then invalidates
 * document queries so lists and detail pages can refresh.
 *
 * Key exports:
 * - useDocumentsAction validates and submits document actions.
 *
 * Business relevance:
 * Document actions affect onboarding quality, profile approval, company
 * approval, property approval, verification workflows, API partner readiness,
 * and platform trust.
 *
 * Security note:
 * Frontend hooks do not authorize actions. Backend permissions, allowed action
 * transitions, internal note handling, safe user messaging, file access,
 * redaction, and audit logging remain final.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitDocumentAction } from '../api/documents.api';
import { documentsActionSchema } from '../schemas/documents-action.schema';
import type { DocumentActionInput, DocumentMutationResponse } from '../types/documents.types';

export interface UseDocumentsActionOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useDocumentsAction(options: UseDocumentsActionOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<DocumentMutationResponse, Error, DocumentActionInput>({
    mutationFn: async (input) => {
      const parsedInput = documentsActionSchema.parse(input);

      return submitDocumentAction(parsedInput);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['documents'] });
      options.onSuccess?.(response.message);
    },
    onError: (error) => {
      options.onError?.(error.message || 'Unable to submit document action.');
    },
  });
}
