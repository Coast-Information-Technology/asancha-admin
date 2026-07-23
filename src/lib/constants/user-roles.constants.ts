// src/lib/constants/user-roles.constants.ts

/**
 * File purpose:
 * Defines public user role constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises public/user role values, labels, descriptions, and
 * route filter values used by user management, profile review, search, filters,
 * badges, and admin support screens.
 *
 * Key exports:
 * - PUBLIC_USER_ROLE_VALUES defines the public/user roles visible in admin.
 * - PUBLIC_USER_ROLE_OPTIONS defines safe display options.
 * - USER_ROLE_GROUPS separates staff, public users, and API partners.
 *
 * Business relevance:
 * Public users must not access asancha-admin as normal users. Their records may
 * be viewed or supported by authorised staff only through safe admin screens.
 *
 * Security note:
 * Role labels are display-only. Backend role guards and permissions remain the
 * final authority for access, visibility, onboarding state, and mutations.
 */

export const PUBLIC_USER_ROLE_VALUES = [
  'guest',
  'investor',
  'property_owner',
  'property_agent',
  'property_sourcer',
  'service_provider',
  'api_partner',
] as const;

export type PublicUserRole = (typeof PUBLIC_USER_ROLE_VALUES)[number];

export const PUBLIC_USER_ROLE_LABELS: Record<PublicUserRole, string> = {
  guest: 'Guest',
  investor: 'Investor',
  property_owner: 'Property Owner',
  property_agent: 'Property Agent',
  property_sourcer: 'Property Sourcer',
  service_provider: 'Service Provider',
  api_partner: 'API Partner',
};

export const PUBLIC_USER_ROLE_SHORT_LABELS: Record<PublicUserRole, string> = {
  guest: 'Guest',
  investor: 'Investor',
  property_owner: 'Owner',
  property_agent: 'Agent',
  property_sourcer: 'Sourcer',
  service_provider: 'Provider',
  api_partner: 'API Partner',
};

export const PUBLIC_USER_ROLE_DESCRIPTIONS: Record<PublicUserRole, string> = {
  guest: 'Unauthenticated or public browsing user context.',
  investor: 'Buyer or investor looking for property opportunities.',
  property_owner: 'Property owner submitting or managing property records.',
  property_agent: 'Property agent managing property opportunities.',
  property_sourcer: 'Property sourcer submitting sourced opportunities.',
  service_provider: 'Service provider supporting property-related services.',
  api_partner: 'Approved or applicant partner seeking API-enabled access.',
};

export const PUBLIC_USER_ROLE_OPTIONS = PUBLIC_USER_ROLE_VALUES.map((role) => ({
  value: role,
  label: PUBLIC_USER_ROLE_LABELS[role],
  shortLabel: PUBLIC_USER_ROLE_SHORT_LABELS[role],
  description: PUBLIC_USER_ROLE_DESCRIPTIONS[role],
}));

export const BUSINESS_PROFILE_ROLE_VALUES = [
  'investor',
  'property_owner',
  'property_agent',
  'property_sourcer',
  'service_provider',
] as const;

export type BusinessProfileRole = (typeof BUSINESS_PROFILE_ROLE_VALUES)[number];

export const USER_ROLE_GROUPS = {
  publicUsers: PUBLIC_USER_ROLE_VALUES,
  businessProfiles: BUSINESS_PROFILE_ROLE_VALUES,
  apiPartners: ['api_partner'],
  guests: ['guest'],
} as const;

export function getPublicUserRoleLabel(role: PublicUserRole): string {
  return PUBLIC_USER_ROLE_LABELS[role];
}

export function getPublicUserRoleShortLabel(role: PublicUserRole): string {
  return PUBLIC_USER_ROLE_SHORT_LABELS[role];
}

export function isPublicUserRole(value: unknown): value is PublicUserRole {
  return typeof value === 'string' && PUBLIC_USER_ROLE_VALUES.includes(value as PublicUserRole);
}

export function isBusinessProfileRole(value: unknown): value is BusinessProfileRole {
  return (
    typeof value === 'string' && BUSINESS_PROFILE_ROLE_VALUES.includes(value as BusinessProfileRole)
  );
}
