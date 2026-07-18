// src/features/documents/constants/documents.constants.ts

/**
 * File purpose:
 * Defines constants, labels, routes, query keys, and safe fallback data for
 * Asancha Admin document management.
 *
 * Role in the project:
 * This file centralises document labels, API paths, query keys, status labels,
 * action labels, owner labels, risk labels, and safe fallback responses.
 *
 * Key exports:
 * - DOCUMENTS_API_PATHS defines backend endpoint paths.
 * - DOCUMENTS_QUERY_KEYS defines TanStack Query keys.
 * - DOCUMENT_STATUS_LABELS defines readable document status labels.
 * - DOCUMENT_ACTION_LABELS defines readable document action labels.
 * - FALLBACK_DOCUMENTS_LIST_RESPONSE provides safe empty list fallback.
 *
 * Business relevance:
 * Document constants keep document review, status, correction, replacement, and
 * history screens consistent across the admin/staff frontend.
 *
 * Security note:
 * Fallback data must not contain private KYC notes, internal notes, restricted
 * document URLs, ObjectIds, raw files, secrets, or audit-sensitive values.
 */

import type {
  DocumentActionType,
  DocumentOwnerType,
  DocumentReviewRisk,
  DocumentStatus,
  DocumentsListResponse,
  DocumentsQuery,
} from '../types/documents.types';

export const DOCUMENTS_API_PATHS = {
  list: '/api/v1/admin/documents',
  detail: (documentPublicId: string) =>
    `/api/v1/admin/documents/${encodeURIComponent(documentPublicId)}`,
  action: (documentPublicId: string) =>
    `/api/v1/admin/documents/${encodeURIComponent(documentPublicId)}/actions`,
} as const;

export const DOCUMENTS_QUERY_KEYS = {
  all: ['documents'] as const,
  list: (query: DocumentsQuery) =>
    [
      'documents',
      'list',
      query.status ?? 'all',
      query.ownerType ?? 'all',
      query.reviewRisk ?? 'all',
      query.replacementRequired === undefined ? 'all' : String(query.replacementRequired),
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
  detail: (documentPublicId: string) => ['documents', 'detail', documentPublicId] as const,
} as const;

export const DOCUMENTS_STALE_TIME_MS = 60_000;

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  pending: 'Pending',
  in_review: 'In review',
  approved: 'Approved',
  rejected: 'Rejected',
  on_hold: 'On hold',
  replacement_required: 'Replacement required',
  expired: 'Expired',
  archived: 'Archived',
};

export const DOCUMENT_OWNER_TYPE_LABELS: Record<DocumentOwnerType, string> = {
  user: 'User',
  profile: 'Profile',
  company: 'Company',
  property: 'Property',
  listing: 'Listing',
  verification_review: 'Verification review',
  api_partner: 'API partner',
};

export const DOCUMENT_REVIEW_RISK_LABELS: Record<DocumentReviewRisk, string> = {
  none: 'No risk',
  low: 'Low risk',
  medium: 'Medium risk',
  high: 'High risk',
  flagged: 'Flagged',
};

export const DOCUMENT_ACTION_LABELS: Record<DocumentActionType, string> = {
  approve: 'Approve',
  reject: 'Reject',
  place_on_hold: 'Place on hold',
  request_replacement: 'Request replacement',
  request_correction: 'Request correction',
  mark_in_review: 'Mark in review',
  archive: 'Archive',
  restore: 'Restore',
};

export const FALLBACK_DOCUMENTS_LIST_RESPONSE: DocumentsListResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};
