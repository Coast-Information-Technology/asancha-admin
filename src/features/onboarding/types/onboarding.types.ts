// src/features/onboarding/types/onboarding.types.ts

/**
 * File purpose:
 * Defines safe TypeScript types for the Admin Onboarding feature.
 *
 * Role in the project:
 * These types represent onboarding list records, detail metadata, and sanitized
 * role-specific sections returned by the admin onboarding endpoints.
 *
 * Business relevance:
 * Onboarding records show how far a public user has progressed through a role
 * workflow and whether the record is ready for verification review.
 *
 * Security note:
 * Raw document URLs, bank details, secrets, and internal identifiers must not
 * be exposed through the frontend onboarding detail view.
 */

export type OnboardingProfileType =
  'investor' | 'property_owner' | 'property_agent' | 'property_sourcer' | 'service_provider';

export type OnboardingStatus =
  'not_started' | 'in_progress' | 'submitted' | 'completed' | 'rejected' | 'on_hold' | 'unknown';

export type OnboardingVerificationStatus =
  'not_started' | 'pending' | 'in_review' | 'approved' | 'rejected' | 'flagged' | 'unknown';

export interface OnboardingDataField {
  label: string;
  value: string;
}

export interface OnboardingDataSection {
  key: string;
  label: string;
  fields: readonly OnboardingDataField[];
}

export interface OnboardingListItem {
  onboardingPublicId: string;
  profileType: OnboardingProfileType;
  businessProfileType: OnboardingProfileType;
  status: OnboardingStatus;
  verificationStatus: OnboardingVerificationStatus;
  currentStep?: string;
  userPublicId: string;
  email: string;
  createdAt: string;
  createdAtLabel: string;
  updatedAt: string;
  updatedAtLabel: string;
  submittedAt?: string;
  submittedAtLabel?: string;
  completedAt?: string;
  completedAtLabel?: string;
  dataSectionCount: number;
  href: string;
}

export interface OnboardingDetail extends OnboardingListItem {
  dataSections: readonly OnboardingDataSection[];
}

export interface OnboardingQuery {
  profileType?: OnboardingProfileType;
  email?: string;
  status?: OnboardingStatus;
  verificationStatus?: OnboardingVerificationStatus;
}

export interface OnboardingListResponse {
  items: readonly OnboardingListItem[];
  total: number;
}
