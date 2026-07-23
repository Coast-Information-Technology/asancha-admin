// src/features/documents/hooks/use-documents-detail.ts

/**
 * File purpose:
 * Provides a React Query hook for Asancha Admin document detail pages.
 *
 * Role in the project:
 * This hook loads safe document detail data by public document ID.
 *
 * Key exports:
 * - useDocumentsDetail returns document detail query state.
 *
 * Business relevance:
 * Document detail supports document review, support status, replacement,
 * correction, safe user messaging, internal note separation, and history.
 *
 * Security note:
 * This hook must use public IDs only. Backend permissions, file access,
 * redaction, review action access, and audit logging remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getDocumentDetail } from '../api/documents.api';
import { DOCUMENTS_QUERY_KEYS, DOCUMENTS_STALE_TIME_MS } from '../constants/documents.constants';
import type { DocumentDetail } from '../types/documents.types';

export function useDocumentsDetail(documentPublicId: string) {
  return useQuery<DocumentDetail>({
    queryKey: DOCUMENTS_QUERY_KEYS.detail(documentPublicId),
    queryFn: () => getDocumentDetail(documentPublicId),
    enabled: documentPublicId.trim().length > 0,
    staleTime: DOCUMENTS_STALE_TIME_MS,
  });
}
