// src/features/profiles/types/profiles.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin profile management.
 *
 * Role in the project:
 * This file provides shared profile list, profile detail, query, action, status,
 * and mutation response types for the profiles feature layer and reusable
 * profile components.
 *
 * Key exports:
 * - ProfileType defines supported public business profile types.
 * - ProfileStatus defines profile review and lifecycle states.
 * - ProfileListItem defines safe profile table rows.
 * - ProfileDetail defines safe profile detail payloads.
 * - ProfilesQuery defines list and filter inputs.
 * - ProfileActionInput defines review/action payloads.
 *
 * Business relevance:
 * Profiles define the business role a public user performs on Asancha, including
 * investor, property owner, property agent, property sourcer, and service
 * provider workflows.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Do not expose
 * MongoDB ObjectIds, private KYC notes, internal admin notes, restricted
 * document URLs, secrets, raw provider payloads, or unauthorised audit data.
 */

export type ProfileType =
  | 'general'
  | 'investor'
  | 'property_owner'
  | 'property_agent'
  | 'property_sourcer'
  | 'service_provider';

export type ProfileCompletionStatus = 'not_started' | 'in_progress' | 'completed' | 'unknown';

export type ProfileStatus =
  | 'draft'
  | 'pending'
  | 'under_review'
  | 'correction_requested'
  | 'on_hold'
  | 'approved'
  | 'rejected'
  | 'suspended'
  | 'completed';

export type ProfileVerificationStatus =
  'not_started' | 'pending' | 'in_review' | 'approved' | 'rejected' | 'flagged' | 'not_available';

export type ProfileActionType =
  'approve' | 'reject' | 'place_on_hold' | 'request_correction' | 'suspend' | 'restore';

export interface ProfileListItem {
  profilePublicId: string;
  userPublicId: string;
  displayName: string;
  emailLabel: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  preferredContactMethod?: string;
  profileType: ProfileType;
  status: ProfileStatus;
  verificationStatus: ProfileVerificationStatus;
  profileCompletionStatus?: ProfileCompletionStatus;
  isVerified?: boolean;
  isActive?: boolean;
  summary?: ProfileSummary;
  companyLabel?: string;
  createdAt?: string;
  createdAtLabel: string;
  updatedAt?: string;
  updatedAtLabel?: string;
  href: string;
}

export interface ProfileSummary {
  type?: string;
  category?: string;
  fundingMethod?: string;
  serviceCategories?: readonly string[];
}

export interface ProfileRelatedSummary {
  relatedUserLabel: string;
  relatedCompanyLabel?: string;
  relatedPropertiesCount: number;
  relatedListingsCount: number;
  relatedDocumentsCount: number;
  relatedVerificationReviewsCount: number;
}

export interface ProfileDetail {
  profilePublicId: string;
  userPublicId: string;
  displayName: string;
  emailLabel: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  preferredContactMethod?: string;
  profileType: ProfileType;
  status: ProfileStatus;
  verificationStatus: ProfileVerificationStatus;
  profileCompletionStatus?: ProfileCompletionStatus;
  isVerified?: boolean;
  isActive?: boolean;
  profileSummary?: ProfileSummary;
  createdAt?: string;
  createdAtLabel: string;
  updatedAt?: string;
  updatedAtLabel?: string;
  summary: string;
  relatedSummary?: ProfileRelatedSummary;
}

export interface ProfilesQuery {
  profileType?: ProfileType;
  status?: ProfileStatus;
  verificationStatus?: ProfileVerificationStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface ProfilesListResponse {
  items: readonly ProfileListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface ProfileActionInput {
  profilePublicId: string;
  action: ProfileActionType;
  reason?: string;
  safeUserMessage?: string;
  internalNote?: string;
}

export interface ProfileMutationResponse {
  profilePublicId: string;
  message: string;
}
