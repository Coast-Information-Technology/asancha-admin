// src/types/staff.types.ts

/**
 * File purpose:
 * Defines shared staff account types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises staff account records, staff creation payloads, staff
 * status values, staff role values, and staff table/detail view contracts.
 *
 * Key exports:
 * - StaffRole defines allowed admin/staff roles.
 * - StaffAccountStatus defines safe staff account status values.
 * - StaffRecord defines a frontend-safe staff account record.
 *
 * Business relevance:
 * Staff users are only super_admin, admin, and customer_care_rep. No frontend
 * route, form, modal, menu item, or action may create a super_admin.
 *
 * Security note:
 * Staff records must use staffPublicId. Do not expose MongoDB ObjectIds,
 * password hashes, tokens, invite secrets, API keys, private notes, or
 * backend-only permission internals.
 */

import type { ApiTimestampedResource } from './api.types';

export type StaffRole = 'super_admin' | 'admin' | 'customer_care_rep';

export type StaffAccountStatus =
  'active' | 'pending' | 'invited' | 'locked' | 'suspended' | 'disabled' | 'unknown';

export interface StaffRecord extends ApiTimestampedResource {
  staffPublicId: string;
  email: string;
  displayName: string;
  role: StaffRole;
  accountStatus: StaffAccountStatus;
  avatarUrl?: string;
  lastLoginAt?: string | null;
  invitedAt?: string | null;
  invitedBy?: StaffSummary | null;
}

export interface StaffSummary {
  staffPublicId: string;
  displayName: string;
  email?: string;
  role: StaffRole;
  accountStatus?: StaffAccountStatus;
}

export type StaffCreationRole = Exclude<StaffRole, 'super_admin'>;

export interface CreateStaffInput {
  email: string;
  password: string;
  role: StaffCreationRole;
  displayName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
}

export interface UpdateStaffStatusInput {
  staffPublicId: string;
  accountStatus: Exclude<StaffAccountStatus, 'unknown'>;
  reason?: string;
}

export interface UpdateStaffRoleInput {
  staffPublicId: string;
  role: StaffCreationRole;
  reason?: string;
}

export interface StaffPermissionSummary {
  key: string;
  label: string;
  description?: string;
  enabled: boolean;
}

export interface StaffDetail extends StaffRecord {
  permissions: readonly StaffPermissionSummary[];
  createdBy?: StaffSummary | null;
  updatedBy?: StaffSummary | null;
}

export interface StaffTableFilters {
  role?: StaffRole;
  accountStatus?: StaffAccountStatus;
  search?: string;
}

export interface StaffActivitySummary {
  staffPublicId: string;
  displayName: string;
  role: StaffRole;
  lastActionAt: string | null;
  recentActionCount: number;
}
