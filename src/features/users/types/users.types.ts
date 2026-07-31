// src/features/users/types/users.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin user management screens.
 *
 * Role in the project:
 * This file provides shared user list, user detail, query, status, role, and
 * mutation payload types for the users feature layer and reusable user
 * components.
 *
 * Key exports:
 * - PublicUserRole defines public platform user roles.
 * - UserAccountStatus defines account status values used by admin UI.
 * - UserListItem defines safe user table rows.
 * - UserDetail defines safe user detail payloads.
 * - UserQuery defines list/search filters.
 * - SetUserStatusInput defines user status update payloads.
 * - SetUserRoleInput defines user role update payloads.
 *
 * Business relevance:
 * Admin users need safe user lookup, list filtering, public user review, support
 * context, suspension/status management, and user detail tabs.
 *
 * Security note:
 * These types must use public IDs and safe summaries only. Do not expose
 * MongoDB ObjectIds, secrets, private KYC notes, internal admin notes,
 * restricted document URLs, full API keys, webhook secrets, or unauthorised
 * audit trail data.
 */

export type PublicUserRole =
  | 'guest'
  | 'investor'
  | 'property_owner'
  | 'property_agent'
  | 'property_sourcer'
  | 'service_provider'
  | 'api_partner'
  | 'admin'
  | 'customer_care_rep'
  | 'super_admin';

export type UserAccountStatus =
  | 'active'
  | 'pending'
  | 'email_unverified'
  | 'profile_incomplete'
  | 'under_review'
  | 'suspended'
  | 'restricted'
  | 'locked'
  | 'disabled';

export type UserVerificationStatus =
  | 'not_started'
  | 'pending'
  | 'in_review'
  | 'correction_requested'
  | 'approved'
  | 'rejected'
  | 'flagged';

export type UserSortColumn = 'createdAt' | 'updatedAt';

export type UserSortDirection = 'asc' | 'desc';

export interface UserSortState {
  column: UserSortColumn;
  direction: UserSortDirection;
}

export type UserBulkAction = 'verify' | 'deactivate';

export interface UserListItem {
  userPublicId: string;
  displayName: string;
  emailLabel: string;
  phoneLabel?: string;
  role: PublicUserRole;
  status: UserAccountStatus;
  verificationStatus: UserVerificationStatus;
  createdAtLabel: string;
  createdAt?: string;
  updatedAtLabel?: string;
  updatedAt?: string;
  lastSeenAtLabel?: string;
  isVerified?: boolean;
  isActive?: boolean;
  isSuspended?: boolean;
  mustChangePassword?: boolean;
  href: string;
}

export interface UserRelatedCounts {
  profiles: number;
  companies: number;
  properties: number;
  listings: number;
  dealReservations: number;
  bookings: number;
  payments: number;
  documents: number;
  verificationReviews: number;
  messages: number;
  notifications: number;
}

export interface UserDetail {
  userPublicId: string;
  displayName: string;
  emailLabel: string;
  phoneLabel?: string;
  role: PublicUserRole;
  status: UserAccountStatus;
  verificationStatus: UserVerificationStatus;
  createdAtLabel: string;
  createdAt?: string;
  updatedAtLabel?: string;
  updatedAt?: string;
  lastSeenAtLabel?: string;
  isVerified?: boolean;
  isActive?: boolean;
  isSuspended?: boolean;
  mustChangePassword?: boolean;
  relatedCounts?: UserRelatedCounts;
}

export interface UserQuery {
  role?: PublicUserRole;
  status?: UserAccountStatus;
  verificationStatus?: UserVerificationStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface UsersResponse {
  items: readonly UserListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface SetUserStatusInput {
  userPublicId: string;
  status: UserAccountStatus;
  reason?: string;
}

export interface SetUserRoleInput {
  userPublicId: string;
  role: PublicUserRole;
  reason?: string;
}

export interface UserMutationResponse {
  userPublicId: string;
  message: string;
}

export interface UsersApiEnvelope<TData> {
  success: boolean;
  message?: string;
  data: TData;
}
