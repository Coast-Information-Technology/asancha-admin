// src/features/verification-reviews/types/verification-reviews.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin verification review management.
 *
 * Role in the project:
 * This file provides shared verification review list, detail, target, document,
 * message, audit summary, query, action, risk, status, and mutation response
 * types for the verification reviews feature layer.
 *
 * Key exports:
 * - VerificationReviewStatus defines verification review lifecycle states.
 * - VerificationReviewTargetType defines the resource being verified.
 * - VerificationRiskRating defines safe review risk labels.
 * - VerificationReviewListItem defines safe review table rows.
 * - VerificationReviewDetail defines safe review detail payloads.
 * - VerificationReviewsQuery defines list and filter inputs.
 * - VerificationReviewActionInput defines review/action payloads.
 *
 * Business relevance:
 * Verification reviews support KYC/AML readiness, profile approval, company
 * approval, property approval, API partner readiness, payment review context,
 * and sensitive action unlocks.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Do not expose
 * MongoDB ObjectIds, private KYC notes, internal admin notes, restricted
 * document URLs, raw risk payloads, secrets, raw provider payloads, or
 * unauthorised audit data.
 */

export type VerificationReviewStatus =
  | 'pending'
  | 'in_review'
  | 'correction_required'
  | 'approved'
  | 'rejected'
  | 'on_hold'
  | 'expired'
  | 'archived';

export type VerificationReviewTargetType =
  | 'general_profile'
  | 'investor_profile'
  | 'property_owner_profile'
  | 'property_agent_profile'
  | 'property_sourcer_profile'
  | 'service_provider_profile'
  | 'api_partner_profile'
  | 'company'
  | 'property'
  | 'document'
  | 'payment'
  | 'api_client';

export type VerificationRiskRating = 'unknown' | 'low' | 'medium' | 'high' | 'critical';

export type VerificationReviewPriority = 'low' | 'normal' | 'high' | 'critical';

export type VerificationReviewActionType =
  | 'mark_in_review'
  | 'approve'
  | 'reject'
  | 'place_on_hold'
  | 'request_correction'
  | 'request_documents'
  | 'update_risk'
  | 'archive'
  | 'restore';

export interface VerificationReviewTargetSummary {
  targetPublicId: string;
  targetType: VerificationReviewTargetType;
  targetLabel: string;
  relatedUserLabel?: string;
  relatedCompanyLabel?: string;
}

export interface VerificationReviewDocumentSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  replacementRequired: number;
}

export interface VerificationReviewMessageSummary {
  openThreads: number;
  assignedThreads: number;
  unreadThreads: number;
  latestMessageLabel?: string;
}

export interface VerificationReviewAuditSummary {
  highImpactActionsCount: number;
  latestAuditLabel?: string;
}

export interface VerificationReviewListItem {
  verificationReviewPublicId: string;
  title: string;
  targetSummary: VerificationReviewTargetSummary;
  status: VerificationReviewStatus;
  riskRating: VerificationRiskRating;
  priority: VerificationReviewPriority;
  submittedAtLabel: string;
  updatedAtLabel?: string;
  assignedToLabel?: string;
  href: string;
}

export interface VerificationReviewDetail {
  verificationReviewPublicId: string;
  title: string;
  status: VerificationReviewStatus;
  riskRating: VerificationRiskRating;
  priority: VerificationReviewPriority;
  targetSummary: VerificationReviewTargetSummary;
  submittedAtLabel: string;
  updatedAtLabel?: string;
  assignedToLabel?: string;
  reviewedByLabel?: string;
  reviewedAtLabel?: string;
  safeSummary: string;
  latestSafeUserMessage?: string;
  latestInternalNoteLabel?: string;
  documentSummary: VerificationReviewDocumentSummary;
  messageSummary: VerificationReviewMessageSummary;
  auditSummary: VerificationReviewAuditSummary;
}

export interface VerificationReviewsQuery {
  status?: VerificationReviewStatus;
  targetType?: VerificationReviewTargetType;
  riskRating?: VerificationRiskRating;
  priority?: VerificationReviewPriority;
  assignedToMe?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface VerificationReviewsListResponse {
  items: readonly VerificationReviewListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface VerificationReviewActionInput {
  verificationReviewPublicId: string;
  action: VerificationReviewActionType;
  reason?: string;
  safeUserMessage?: string;
  internalNote?: string;
  riskRating?: VerificationRiskRating;
}

export interface VerificationReviewMutationResponse {
  verificationReviewPublicId: string;
  message: string;
}
