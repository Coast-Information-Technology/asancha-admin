// src/features/properties/constants/properties.constants.ts

/**
 * File purpose:
 * Defines constants, labels, routes, query keys, and safe fallback data for
 * Asancha Admin property management.
 *
 * Role in the project:
 * This file centralises property labels, property routes, API paths, query keys,
 * status labels, action labels, and safe fallback responses.
 *
 * Key exports:
 * - PROPERTIES_API_PATHS defines backend endpoint paths.
 * - PROPERTIES_QUERY_KEYS defines TanStack Query keys.
 * - PROPERTY_STATUS_LABELS defines readable property status labels.
 * - PROPERTY_DOCUMENT_STATUS_LABELS defines readable document status labels.
 * - FALLBACK_PROPERTIES_LIST_RESPONSE provides safe empty list fallback.
 *
 * Business relevance:
 * Property constants keep review, document, listing, and activity screens
 * consistent across the admin/staff frontend.
 *
 * Security note:
 * Fallback data must not contain private KYC notes, internal notes, restricted
 * document URLs, ObjectIds, secrets, or audit-sensitive values.
 */

import type {
  PropertiesListResponse,
  PropertiesQuery,
  PropertyActionType,
  PropertyDocumentStatus,
  PropertyListingStatus,
  PropertySourceType,
  PropertyStatus,
} from '../types/properties.types';

export const PROPERTIES_API_PATHS = {
  list: '/api/v1/admin/properties',
  detail: (propertyPublicId: string) =>
    `/api/v1/admin/properties/${encodeURIComponent(propertyPublicId)}`,
  action: (propertyPublicId: string) =>
    `/api/v1/admin/properties/${encodeURIComponent(propertyPublicId)}/actions`,
} as const;

export const PROPERTIES_QUERY_KEYS = {
  all: ['properties'] as const,
  list: (query: PropertiesQuery) =>
    [
      'properties',
      'list',
      query.status ?? 'all',
      query.documentStatus ?? 'all',
      query.listingStatus ?? 'all',
      query.sourceType ?? 'all',
      query.search ?? '',
      query.page ?? 1,
      query.pageSize ?? 20,
    ] as const,
  detail: (propertyPublicId: string) => ['properties', 'detail', propertyPublicId] as const,
} as const;

export const PROPERTIES_STALE_TIME_MS = 60_000;

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under review',
  correction_requested: 'Correction requested',
  approved: 'Approved',
  rejected: 'Rejected',
  archived: 'Archived',
  suspended: 'Suspended',
};

export const PROPERTY_DOCUMENT_STATUS_LABELS: Record<PropertyDocumentStatus, string> = {
  not_started: 'Not started',
  pending: 'Pending',
  in_review: 'In review',
  approved: 'Approved',
  rejected: 'Rejected',
  replacement_required: 'Replacement required',
  on_hold: 'On hold',
};

export const PROPERTY_LISTING_STATUS_LABELS: Record<PropertyListingStatus, string> = {
  not_listed: 'Not listed',
  submitted: 'Submitted',
  under_review: 'Under review',
  published: 'Published',
  reserved: 'Reserved',
  rejected: 'Rejected',
  archived: 'Archived',
};

export const PROPERTY_SOURCE_TYPE_LABELS: Record<PropertySourceType, string> = {
  property_owner: 'Property owner',
  property_agent: 'Property agent',
  property_sourcer: 'Property sourcer',
  company: 'Company',
  admin: 'Admin',
};

export const PROPERTY_ACTION_LABELS: Record<PropertyActionType, string> = {
  approve: 'Approve',
  reject: 'Reject',
  place_under_review: 'Place under review',
  request_correction: 'Request correction',
  request_documents: 'Request documents',
  archive: 'Archive',
  restore: 'Restore',
  suspend: 'Suspend',
};

export const FALLBACK_PROPERTIES_LIST_RESPONSE: PropertiesListResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};
