// src/features/staff/types/staff.types.ts

/**
 * File purpose:
 * Defines TypeScript types for Asancha Admin staff management.
 *
 * Role in the project:
 * This file provides shared staff list, staff detail, query, role, status, and
 * mutation payload types for the staff feature layer and reusable staff
 * components.
 *
 * Key exports:
 * - StaffRole defines supported staff roles.
 * - CreateStaffRole defines roles that may be created from the frontend.
 * - StaffAccountStatus defines staff account lifecycle states.
 * - StaffListItem defines safe staff table rows.
 * - StaffDetail defines safe staff detail payloads.
 * - CreateStaffInput defines create-staff form payloads.
 * - UpdateStaffStatusInput defines staff status update payloads.
 * - UpdateStaffRoleInput defines staff role update payloads.
 *
 * Business relevance:
 * Staff management controls internal operational access for super_admin, admin,
 * and customer_care_rep users.
 *
 * Security note:
 * No frontend type or form may allow creating super_admin. Staff records must
 * use public IDs only and must not expose ObjectIds, passwords, tokens, secrets,
 * private audit payloads, API key hashes, webhook secrets, or restricted data.
 */

export type StaffRole = 'super_admin' | 'admin' | 'customer_care_rep';

export type CreateStaffRole = Exclude<StaffRole, 'super_admin'>;

export type StaffAccountStatus =
  'invited' | 'pending' | 'active' | 'locked' | 'suspended' | 'disabled';

export interface StaffListItem {
  staffPublicId: string;
  displayName: string;
  emailLabel: string;
  role: StaffRole;
  status: StaffAccountStatus;
  createdAtLabel: string;
  lastActiveAtLabel?: string;
  href: string;
}

export interface StaffPermissionSummary {
  canAccessReviewQueues: boolean;
  canManageStaff: boolean;
  canApprovePayments: boolean;
  canReviewDocuments: boolean;
  canReviewVerification: boolean;
  canAccessApiAccess: boolean;
  canAccessAuditLogs: boolean;
  canAccessSettings: boolean;
}

export interface StaffDetail {
  staffPublicId: string;
  displayName: string;
  emailLabel: string;
  role: StaffRole;
  status: StaffAccountStatus;
  createdAtLabel: string;
  lastActiveAtLabel?: string;
  permissionSummary: StaffPermissionSummary;
}

export interface StaffQuery {
  role?: StaffRole;
  status?: StaffAccountStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface StaffListResponse {
  items: readonly StaffListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface CreateStaffInput {
  email: string;
  password: string;
  role: CreateStaffRole;
  displayName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
}

export interface UpdateStaffStatusInput {
  staffPublicId: string;
  status: StaffAccountStatus;
  reason?: string;
}

export interface UpdateStaffRoleInput {
  staffPublicId: string;
  role: CreateStaffRole;
  reason?: string;
}

export interface StaffMutationResponse {
  staffPublicId: string;
  message: string;
}
