// src/types/users.types.ts

/**
 * File purpose:
 * Defines shared public user types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises safe public user records, role summaries, profile links,
 * status values, and user detail tab contracts used by admin user screens.
 *
 * Key exports:
 * - PublicUserRole defines public/user-facing roles visible to staff.
 * - PublicUserRecord defines frontend-safe public user data.
 * - UserDetailTabKey defines the user detail tab keys.
 *
 * Business relevance:
 * Public users are managed and supported by authorised staff only. Public users
 * must not be allowed into asancha-admin as dashboard users.
 *
 * Security note:
 * User records must use userPublicId. Do not expose MongoDB ObjectIds, password
 * hashes, tokens, private KYC notes, raw KYC files, private document URLs,
 * internal admin notes, or restricted audit data to unauthorised staff.
 */

import type { ApiTimestampedResource } from './api.types';
import type { StaffSummary } from './staff.types';

export type PublicUserRole =
  | 'guest'
  | 'investor'
  | 'property_owner'
  | 'property_agent'
  | 'property_sourcer'
  | 'service_provider'
  | 'api_partner';

export type PublicUserStatus =
  | 'active'
  | 'pending'
  | 'suspended'
  | 'disabled'
  | 'locked'
  | 'unknown';

export interface PublicUserRecord extends ApiTimestampedResource {
  userPublicId: string;
  email: string;
  displayName: string;
  role: PublicUserRole;
  accountStatus: PublicUserStatus;
  phoneNumber?: string | null;
  avatarUrl?: string;
  lastLoginAt?: string | null;
  profileCompletionPercentage?: number;
}

export interface PublicUserSummary {
  userPublicId: string;
  displayName: string;
  email?: string;
  role: PublicUserRole;
  accountStatus?: PublicUserStatus;
}

export interface UserBusinessProfileSummary {
  profilePublicId: string;
  role: Exclude<PublicUserRole, 'guest' | 'api_partner'>;
  status: string;
  completionPercentage?: number;
}

export interface UserCompanySummary {
  companyPublicId: string;
  name: string;
  status: string;
}

export interface UserDetail extends PublicUserRecord {
  profiles: readonly UserBusinessProfileSummary[];
  companies: readonly UserCompanySummary[];
  assignedStaff?: StaffSummary | null;
}

export type UserDetailTabKey =
  | 'overview'
  | 'profiles'
  | 'companies'
  | 'properties'
  | 'listings'
  | 'deal_reservations'
  | 'bookings'
  | 'payments'
  | 'documents'
  | 'verification'
  | 'messages'
  | 'notifications'
  | 'audit_trail';

export interface UserTableFilters {
  role?: PublicUserRole;
  accountStatus?: PublicUserStatus;
  search?: string;
}

export interface SetUserStatusInput {
  userPublicId: string;
  accountStatus: Exclude<PublicUserStatus, 'unknown'>;
  reason?: string;
}

export interface SetUserRoleInput {
  userPublicId: string;
  role: Exclude<PublicUserRole, 'guest'>;
  reason?: string;
}
