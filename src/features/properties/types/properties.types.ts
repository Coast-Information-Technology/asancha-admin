// src/features/properties/types/properties.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin property management.
 *
 * Role in the project:
 * This file provides shared property list, property detail, document summary,
 * listing summary, activity summary, query, action, status, and mutation
 * response types for the properties feature layer.
 *
 * Key exports:
 * - PropertyStatus defines property review and lifecycle states.
 * - PropertyDocumentStatus defines property document status states.
 * - PropertyListItem defines safe property table rows.
 * - PropertyDetail defines safe property detail payloads.
 * - PropertiesQuery defines list and filter inputs.
 * - PropertyActionInput defines review/action payloads.
 *
 * Business relevance:
 * Property records connect owners, agents, sourcers, companies, documents,
 * listings, deal reservations, messages, and operational review workflows.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Do not expose
 * MongoDB ObjectIds, private KYC notes, internal admin notes, restricted
 * document URLs, secrets, raw provider payloads, or unauthorised audit data.
 */

export type PropertyStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'correction_requested'
  | 'approved'
  | 'rejected'
  | 'archived'
  | 'suspended';

export type PropertyDocumentStatus =
  | 'not_started'
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'replacement_required'
  | 'on_hold';

export type PropertyListingStatus =
  'not_listed' | 'submitted' | 'under_review' | 'published' | 'reserved' | 'rejected' | 'archived';

export type PropertySourceType =
  'property_owner' | 'property_agent' | 'property_sourcer' | 'company' | 'admin';

export type PropertyActionType =
  | 'approve'
  | 'reject'
  | 'place_under_review'
  | 'request_correction'
  | 'request_documents'
  | 'archive'
  | 'restore'
  | 'suspend';

export interface PropertyListItem {
  propertyPublicId: string;
  title: string;
  locationLabel: string;
  sourceLabel: string;
  sourceType: PropertySourceType;
  status: PropertyStatus;
  documentStatus: PropertyDocumentStatus;
  listingStatus: PropertyListingStatus;
  companyLabel?: string;
  createdAtLabel: string;
  updatedAtLabel?: string;
  href: string;
}

export interface PropertyDocumentSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  replacementRequired: number;
}

export interface PropertyListingSummary {
  total: number;
  submitted: number;
  underReview: number;
  published: number;
  reserved: number;
  rejected: number;
  archived: number;
}

export interface PropertyActivitySummary {
  total: number;
  latestActivityLabel?: string;
}

export interface PropertyRelatedSummary {
  relatedCompanyLabel?: string;
  relatedProfileLabel?: string;
  relatedUserLabel?: string;
  documentsCount: number;
  listingsCount: number;
  reservationsCount: number;
  activitiesCount: number;
}

export interface PropertyDetail {
  propertyPublicId: string;
  title: string;
  locationLabel: string;
  sourceLabel: string;
  sourceType: PropertySourceType;
  status: PropertyStatus;
  documentStatus: PropertyDocumentStatus;
  listingStatus: PropertyListingStatus;
  createdAtLabel: string;
  updatedAtLabel?: string;
  summary: string;
  relatedSummary: PropertyRelatedSummary;
  documentSummary: PropertyDocumentSummary;
  listingSummary: PropertyListingSummary;
  activitySummary: PropertyActivitySummary;
}

export interface PropertiesQuery {
  status?: PropertyStatus;
  documentStatus?: PropertyDocumentStatus;
  listingStatus?: PropertyListingStatus;
  sourceType?: PropertySourceType;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface PropertiesListResponse {
  items: readonly PropertyListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface PropertyActionInput {
  propertyPublicId: string;
  action: PropertyActionType;
  reason?: string;
  safeUserMessage?: string;
  internalNote?: string;
}

export interface PropertyMutationResponse {
  propertyPublicId: string;
  message: string;
}
