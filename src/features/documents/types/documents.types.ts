// src/features/documents/types/documents.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin document management.
 *
 * Role in the project:
 * This file provides shared document list, document detail, document history,
 * document owner, query, action, status, and mutation response types for the
 * documents feature layer.
 *
 * Key exports:
 * - DocumentStatus defines document review lifecycle states.
 * - DocumentOwnerType defines the type of resource/user that owns a document.
 * - DocumentListItem defines safe document table rows.
 * - DocumentDetail defines safe document detail payloads.
 * - DocumentsQuery defines document list and filter inputs.
 * - DocumentActionInput defines review/action payloads.
 *
 * Business relevance:
 * Document records support onboarding, profile review, company review, property
 * review, verification workflows, API partner readiness, and operational trust.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Do not expose
 * MongoDB ObjectIds, private document URLs, raw KYC files, private KYC notes,
 * internal admin notes, secrets, raw provider payloads, or unauthorised audit
 * data.
 */

export type DocumentStatus =
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'on_hold'
  | 'replacement_required'
  | 'expired'
  | 'archived';

export type DocumentOwnerType =
  | 'user'
  | 'profile'
  | 'company'
  | 'property'
  | 'listing'
  | 'verification_review'
  | 'api_partner';

export type DocumentReviewRisk =
  | 'none'
  | 'low'
  | 'medium'
  | 'high'
  | 'flagged';

export type DocumentActionType =
  | 'approve'
  | 'reject'
  | 'place_on_hold'
  | 'request_replacement'
  | 'request_correction'
  | 'mark_in_review'
  | 'archive'
  | 'restore';

export interface DocumentOwnerSummary {
  ownerPublicId: string;
  ownerType: DocumentOwnerType;
  ownerLabel: string;
  relatedUserLabel?: string;
}

export interface DocumentListItem {
  documentPublicId: string;
  documentLabel: string;
  documentTypeLabel: string;
  ownerSummary: DocumentOwnerSummary;
  status: DocumentStatus;
  reviewRisk: DocumentReviewRisk;
  submittedAtLabel: string;
  updatedAtLabel?: string;
  replacementRequired: boolean;
  href: string;
}

export interface DocumentHistoryItem {
  historyPublicId: string;
  eventLabel: string;
  status: DocumentStatus;
  actorLabel?: string;
  createdAtLabel: string;
  safeSummary: string;
}

export interface DocumentReviewSummary {
  status: DocumentStatus;
  reviewRisk: DocumentReviewRisk;
  reviewedByLabel?: string;
  reviewedAtLabel?: string;
  latestSafeUserMessage?: string;
  latestInternalNoteLabel?: string;
}

export interface DocumentDetail {
  documentPublicId: string;
  documentLabel: string;
  documentTypeLabel: string;
  status: DocumentStatus;
  reviewRisk: DocumentReviewRisk;
  ownerSummary: DocumentOwnerSummary;
  submittedAtLabel: string;
  updatedAtLabel?: string;
  replacementRequired: boolean;
  summary: string;
  reviewSummary: DocumentReviewSummary;
  history: readonly DocumentHistoryItem[];
}

export interface DocumentsQuery {
  status?: DocumentStatus;
  ownerType?: DocumentOwnerType;
  reviewRisk?: DocumentReviewRisk;
  replacementRequired?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface DocumentsListResponse {
  items: readonly DocumentListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface DocumentActionInput {
  documentPublicId: string;
  action: DocumentActionType;
  reason?: string;
  safeUserMessage?: string;
  internalNote?: string;
}

export interface DocumentMutationResponse {
  documentPublicId: string;
  message: string;
}
