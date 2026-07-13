// src/lib/formatters/role-label.ts

/**
 * File purpose:
 * Provides safe role and profile-type label helpers for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file centralises how staff roles, public user roles, and business
 * profile types are displayed across admin navigation, tables, badges, detail
 * pages, review queues, staff management, user management, and support screens.
 *
 * Key exports:
 * - KnownAsanchaRole defines known role/profile keys used in UI formatting.
 * - formatRoleLabel converts a role key into a readable label.
 * - isStaffRoleLabelKey checks whether a role is a staff role key.
 *
 * Business relevance:
 * Role labels must be clear because admin users make permission-sensitive
 * decisions. The frontend must not create staff authority by label alone.
 *
 * Security note:
 * Role formatting is display-only. Backend role guards, permission guards,
 * account status checks, audit logs, and staff creation restrictions remain the
 * source of truth.
 */

export type KnownAsanchaRole =
  | 'guest'
  | 'investor'
  | 'property_owner'
  | 'property_agent'
  | 'property_sourcer'
  | 'service_provider'
  | 'api_partner'
  | 'super_admin'
  | 'admin'
  | 'customer_care_rep';

export type RoleGroup = 'public_user' | 'staff' | 'partner' | 'unknown';

export interface RoleDisplay {
  label: string;
  shortLabel: string;
  group: RoleGroup;
}

const ROLE_LABELS: Record<KnownAsanchaRole, RoleDisplay> = {
  guest: {
    label: 'Guest',
    shortLabel: 'Guest',
    group: 'public_user',
  },
  investor: {
    label: 'Investor',
    shortLabel: 'Investor',
    group: 'public_user',
  },
  property_owner: {
    label: 'Property Owner',
    shortLabel: 'Owner',
    group: 'public_user',
  },
  property_agent: {
    label: 'Property Agent',
    shortLabel: 'Agent',
    group: 'public_user',
  },
  property_sourcer: {
    label: 'Property Sourcer',
    shortLabel: 'Sourcer',
    group: 'public_user',
  },
  service_provider: {
    label: 'Service Provider',
    shortLabel: 'Provider',
    group: 'public_user',
  },
  api_partner: {
    label: 'API Partner',
    shortLabel: 'Partner',
    group: 'partner',
  },
  super_admin: {
    label: 'Super Admin',
    shortLabel: 'Super Admin',
    group: 'staff',
  },
  admin: {
    label: 'Admin',
    shortLabel: 'Admin',
    group: 'staff',
  },
  customer_care_rep: {
    label: 'Customer Care Representative',
    shortLabel: 'Customer Care',
    group: 'staff',
  },
};

function normaliseRoleKey(role: unknown): string {
  if (typeof role !== 'string') {
    return 'unknown';
  }

  const trimmedRole = role.trim();

  if (trimmedRole.length === 0) {
    return 'unknown';
  }

  return trimmedRole
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

function titleCaseFromRoleKey(roleKey: string): string {
  return roleKey
    .split('_')
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

export function isKnownAsanchaRole(role: unknown): role is KnownAsanchaRole {
  const roleKey = normaliseRoleKey(role);

  return Object.prototype.hasOwnProperty.call(ROLE_LABELS, roleKey);
}

export function isStaffRoleLabelKey(role: unknown): boolean {
  const roleKey = normaliseRoleKey(role);

  return roleKey === 'super_admin' || roleKey === 'admin' || roleKey === 'customer_care_rep';
}

export function isPublicUserRoleLabelKey(role: unknown): boolean {
  const roleDisplay = getRoleDisplay(role);

  return roleDisplay.group === 'public_user';
}

export function isPartnerRoleLabelKey(role: unknown): boolean {
  const roleDisplay = getRoleDisplay(role);

  return roleDisplay.group === 'partner';
}

export function getRoleDisplay(role: unknown): RoleDisplay {
  const roleKey = normaliseRoleKey(role);

  if (isKnownAsanchaRole(roleKey)) {
    return ROLE_LABELS[roleKey];
  }

  return {
    label: titleCaseFromRoleKey(roleKey),
    shortLabel: titleCaseFromRoleKey(roleKey),
    group: 'unknown',
  };
}

export function formatRoleLabel(role: unknown): string {
  return getRoleDisplay(role).label;
}

export function formatShortRoleLabel(role: unknown): string {
  return getRoleDisplay(role).shortLabel;
}

export function getRoleGroup(role: unknown): RoleGroup {
  return getRoleDisplay(role).group;
}

export function formatRoleGroupLabel(role: unknown): string {
  const group = getRoleGroup(role);

  if (group === 'staff') {
    return 'Staff';
  }

  if (group === 'public_user') {
    return 'Public User';
  }

  if (group === 'partner') {
    return 'Partner';
  }

  return 'Unknown';
}
