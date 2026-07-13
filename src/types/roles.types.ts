// src/types/roles.types.ts

/**
 * File purpose:
 * Defines shared role and permission display types for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file centralises role groups, role options, permission descriptions, and
 * permission-aware UI helper types used across navigation, users, staff, and
 * admin action components.
 *
 * Key exports:
 * - AsanchaKnownRole defines all known frontend role keys.
 * - RoleOption defines a safe role select/display option.
 * - PermissionCheckResult defines frontend permission evaluation output.
 *
 * Business relevance:
 * Role labels help staff understand records and actions. Frontend role labels
 * must not create authority or bypass backend permissions.
 *
 * Security note:
 * These role types are display and UI guidance only. Backend guards and
 * permission policies remain final.
 */

import type { PublicUserRole } from './users.types';
import type { StaffRole } from './staff.types';

export type AsanchaKnownRole = StaffRole | PublicUserRole;

export type RoleGroup = 'staff' | 'public_user' | 'partner' | 'guest' | 'unknown';

export interface RoleOption<TRole extends string = string> {
  value: TRole;
  label: string;
  shortLabel?: string;
  description?: string;
  group: RoleGroup;
  disabled?: boolean;
}

export interface PermissionDescription {
  key: string;
  label: string;
  description?: string;
  category: string;
  highImpact?: boolean;
}

export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
  shouldHide?: boolean;
  shouldDisable?: boolean;
}

export interface RoleVisibilityRule {
  allowedRoles: readonly StaffRole[];
  hiddenFromRoles?: readonly StaffRole[];
}

export interface StaffRoleCreationRule {
  actorRole: StaffRole;
  creatableRoles: readonly Exclude<StaffRole, 'super_admin'>[];
}

export interface RoleBadgeDisplay {
  label: string;
  tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
}
