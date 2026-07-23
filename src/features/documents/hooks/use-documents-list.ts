// src/features/documents/hooks/use-documents-list.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin document lists.
 *
 * Role in the project:
 * This hook loads paginated document records with safe status, owner type,
 * review risk, replacement requirement, and search filters.
 *
 * Key exports:
 * - useDocumentsList returns document list query state.
 *
 * Business relevance:
 * Document lists power document review, support-safe status views, replacement
 * workflows, onboarding checks, and verification workflows.
 *
 * Security note:
 * Frontend filters are not authorization. Backend result visibility, file
 * access, redaction, and audit logging remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getDocumentsList } from '../api/documents.api';
import { DOCUMENTS_QUERY_KEYS, DOCUMENTS_STALE_TIME_MS } from '../constants/documents.constants';
import type { DocumentsListResponse, DocumentsQuery } from '../types/documents.types';

export function useDocumentsList(query: DocumentsQuery = {}) {
  return useQuery<DocumentsListResponse>({
    queryKey: DOCUMENTS_QUERY_KEYS.list(query),
    queryFn: () => getDocumentsList(query),
    staleTime: DOCUMENTS_STALE_TIME_MS,
  });
}
