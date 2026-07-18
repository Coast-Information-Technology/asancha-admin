// src/features/companies/types/companies.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin company management.
 *
 * Role in the project:
 * This file provides shared company list, company detail, member, document,
 * verification, query, action, status, and mutation response types for the
 * companies feature layer and reusable company components.
 *
 * Key exports:
 * - CompanyStatus defines company onboarding and review lifecycle states.
 * - CompanyVerificationStatus defines company verification states.
 * - CompanyListItem defines safe company table rows.
 * - CompanyDetail defines safe company detail payloads.
 * - CompanyMember defines safe company member rows.
 * - CompaniesQuery defines list and filter inputs.
 * - CompanyActionInput defines review/action payloads.
 *
 * Business relevance:
 * Company records support property owners, property agents, property sourcers,
 * service providers, API partners, documents, verification, member management,
 * and operational trust workflows.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Do not expose
 * MongoDB ObjectIds, private KYC notes, internal admin notes, restricted
 * document URLs, secrets, raw provider payloads, API key hashes, webhook secrets,
 * or unauthorised audit data.
 */

export type CompanyStatus =
  | 'draft'
  | 'pending'
  | 'under_review'
  | 'on_hold'
  | 'approved'
  | 'rejected'
  | 'suspended';

export type CompanyVerificationStatus =
  | 'not_started'
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'flagged';

export type CompanyMemberRole =
  | 'owner'
  | 'director'
  | 'manager'
  | 'agent'
  | 'sourcer'
  | 'service_provider'
  | 'api_contact'
  | 'member';

export type CompanyMemberStatus =
  | 'invited'
  | 'active'
  | 'removed'
  | 'suspended';

export type CompanyActionType =
  | 'approve'
  | 'reject'
  | 'place_on_hold'
  | 'request_documents'
  | 'request_correction'
  | 'suspend'
  | 'restore';

export interface CompanyListItem {
  companyPublicId: string;
  companyName: string;
  companyTypeLabel: string;
  primaryContactLabel?: string;
  status: CompanyStatus;
  verificationStatus: CompanyVerificationStatus;
  membersCount: number;
  documentsCount: number;
  createdAtLabel: string;
  updatedAtLabel?: string;
  href: string;
}

export interface CompanyMember {
  memberPublicId: string;
  userPublicId: string;
  displayName: string;
  emailLabel: string;
  role: CompanyMemberRole;
  status: CompanyMemberStatus;
  joinedAtLabel?: string;
}

export interface CompanyDocumentSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  replacementRequired: number;
}

export interface CompanyRelatedSummary {
  membersCount: number;
  documentsCount: number;
  propertiesCount: number;
  listingsCount: number;
  verificationReviewsCount: number;
}

export interface CompanyDetail {
  companyPublicId: string;
  companyName: string;
  companyTypeLabel: string;
  status: CompanyStatus;
  verificationStatus: CompanyVerificationStatus;
  primaryContactLabel?: string;
  createdAtLabel: string;
  updatedAtLabel?: string;
  summary: string;
  relatedSummary: CompanyRelatedSummary;
  documentSummary: CompanyDocumentSummary;
  members: readonly CompanyMember[];
}

export interface CompaniesQuery {
  status?: CompanyStatus;
  verificationStatus?: CompanyVerificationStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CompaniesListResponse {
  items: readonly CompanyListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface CompanyActionInput {
  companyPublicId: string;
  action: CompanyActionType;
  reason?: string;
  safeUserMessage?: string;
  internalNote?: string;
}

export interface CompanyMutationResponse {
  companyPublicId: string;
  message: string;
}
