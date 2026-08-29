// src/features/staff/api/staff.api.ts

/**
 * File purpose:
 * Provides API helpers for Asancha Admin staff management.
 *
 * Role in the project:
 * This file centralises staff list, staff detail, create staff, update staff
 * status, and update staff role requests with safe fallback data for early
 * implementation.
 *
 * Key exports:
 * - getStaffList loads paginated staff records.
 * - getStaffDetail loads a safe staff detail payload.
 * - createStaff creates a permitted staff account invite.
 * - updateStaffStatus updates staff account status.
 * - updateStaffRole updates staff role where allowed.
 *
 * Business relevance:
 * Staff management controls internal access to operations, review queues,
 * support, staff governance, settings, API access, audit logs, and other admin
 * modules.
 *
 * Security note:
 * API helpers do not authorize access. Backend permissions, staff visibility,
 * allowed role/status transitions, super_admin protection, audit logging, and
 * redaction remain final.
 */

import type {
  CreateStaffInput,
  CreateStaffResponseData,
  StaffAccountStatus,
  StaffDetail,
  StaffListItem,
  StaffListResponse,
  StaffMutationResponse,
  StaffPermissionSummary,
  StaffQuery,
  StaffRole,
  UpdateStaffRoleInput,
  UpdateStaffStatusInput,
} from '../types/staff.types';
import { adminPost } from '../../../lib/api/admin-fetch';

const STAFF_API_PATHS = {
  list: '/api/v1/admin/staff',
  detail: (staffPublicId: string) => `/api/v1/admin/staff/${encodeURIComponent(staffPublicId)}`,
  create: '/admin/staff',
  updateStatus: (staffPublicId: string) =>
    `/api/v1/admin/staff/${encodeURIComponent(staffPublicId)}/status`,
  updateRole: (staffPublicId: string) =>
    `/api/v1/admin/staff/${encodeURIComponent(staffPublicId)}/role`,
} as const;

const FALLBACK_STAFF_LIST_RESPONSE: StaffListResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 20,
  hasNextPage: false,
};

const FALLBACK_PERMISSION_SUMMARY: StaffPermissionSummary = {
  canAccessReviewQueues: false,
  canManageStaff: false,
  canApprovePayments: false,
  canReviewDocuments: false,
  canReviewVerification: false,
  canAccessApiAccess: false,
  canAccessAuditLogs: false,
  canAccessSettings: false,
};

function createFallbackStaffDetail(staffPublicId: string): StaffDetail {
  return {
    staffPublicId,
    displayName: 'Staff detail pending',
    emailLabel: 'Email hidden until API connection',
    role: 'customer_care_rep',
    status: 'pending',
    createdAtLabel: 'Pending API connection',
    permissionSummary: FALLBACK_PERMISSION_SUMMARY,
  };
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function getNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function isStaffRole(value: unknown): value is StaffRole {
  return value === 'super_admin' || value === 'admin' || value === 'customer_care_rep';
}

function isStaffAccountStatus(value: unknown): value is StaffAccountStatus {
  return (
    value === 'invited' ||
    value === 'pending' ||
    value === 'active' ||
    value === 'locked' ||
    value === 'suspended' ||
    value === 'disabled'
  );
}

function getApiBaseUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!value) {
    return null;
  }

  return value.replace(/\/+$/, '');
}

function createApiUrl(path: string, query?: URLSearchParams): string | null {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return null;
  }

  const safePath = path.startsWith('/') ? path : `/${path}`;
  const queryString = query?.toString();

  return queryString ? `${baseUrl}${safePath}?${queryString}` : `${baseUrl}${safePath}`;
}

function unwrapEnvelopeData(payload: unknown): unknown {
  if (!isRecord(payload)) {
    return payload;
  }

  if ('data' in payload) {
    return payload.data;
  }

  return payload;
}

function createStaffQuery(query: StaffQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.role) {
    params.set('role', query.role);
  }

  if (query.status) {
    params.set('status', query.status);
  }

  if (query.search) {
    params.set('search', query.search);
  }

  params.set('page', String(query.page ?? 1));
  params.set('pageSize', String(query.pageSize ?? 20));

  return params;
}

function parseStaffListItem(value: unknown): StaffListItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const staffPublicId = getString(value.staffPublicId);
  const displayName = getString(value.displayName);
  const emailLabel = getString(value.emailLabel);
  const role = isStaffRole(value.role) ? value.role : null;
  const status = isStaffAccountStatus(value.status) ? value.status : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const href = getString(value.href);

  if (
    !staffPublicId ||
    !displayName ||
    !emailLabel ||
    !role ||
    !status ||
    !createdAtLabel ||
    !href
  ) {
    return null;
  }

  return {
    staffPublicId,
    displayName,
    emailLabel,
    role,
    status,
    createdAtLabel,
    lastActiveAtLabel: getString(value.lastActiveAtLabel) ?? undefined,
    href,
  };
}

function parseStaffListResponse(value: unknown): StaffListResponse | null {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return null;
  }

  const total = getNumber(value.total);
  const page = getNumber(value.page);
  const pageSize = getNumber(value.pageSize);
  const hasNextPage = getBoolean(value.hasNextPage);
  const items = value.items.map(parseStaffListItem);

  if (
    total === null ||
    page === null ||
    pageSize === null ||
    hasNextPage === null ||
    items.some((item) => item === null)
  ) {
    return null;
  }

  return {
    items: items.filter((item): item is StaffListItem => item !== null),
    total,
    page,
    pageSize,
    hasNextPage,
  };
}

function parsePermissionSummary(value: unknown): StaffPermissionSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const canAccessReviewQueues = getBoolean(value.canAccessReviewQueues);
  const canManageStaff = getBoolean(value.canManageStaff);
  const canApprovePayments = getBoolean(value.canApprovePayments);
  const canReviewDocuments = getBoolean(value.canReviewDocuments);
  const canReviewVerification = getBoolean(value.canReviewVerification);
  const canAccessApiAccess = getBoolean(value.canAccessApiAccess);
  const canAccessAuditLogs = getBoolean(value.canAccessAuditLogs);
  const canAccessSettings = getBoolean(value.canAccessSettings);

  if (
    canAccessReviewQueues === null ||
    canManageStaff === null ||
    canApprovePayments === null ||
    canReviewDocuments === null ||
    canReviewVerification === null ||
    canAccessApiAccess === null ||
    canAccessAuditLogs === null ||
    canAccessSettings === null
  ) {
    return null;
  }

  return {
    canAccessReviewQueues,
    canManageStaff,
    canApprovePayments,
    canReviewDocuments,
    canReviewVerification,
    canAccessApiAccess,
    canAccessAuditLogs,
    canAccessSettings,
  };
}

function parseStaffDetail(value: unknown): StaffDetail | null {
  if (!isRecord(value)) {
    return null;
  }

  const staffPublicId = getString(value.staffPublicId);
  const displayName = getString(value.displayName);
  const emailLabel = getString(value.emailLabel);
  const role = isStaffRole(value.role) ? value.role : null;
  const status = isStaffAccountStatus(value.status) ? value.status : null;
  const createdAtLabel = getString(value.createdAtLabel);
  const permissionSummary = parsePermissionSummary(value.permissionSummary);

  if (
    !staffPublicId ||
    !displayName ||
    !emailLabel ||
    !role ||
    !status ||
    !createdAtLabel ||
    !permissionSummary
  ) {
    return null;
  }

  return {
    staffPublicId,
    displayName,
    emailLabel,
    role,
    status,
    createdAtLabel,
    lastActiveAtLabel: getString(value.lastActiveAtLabel) ?? undefined,
    permissionSummary,
  };
}

async function getJsonFromApi(path: string, query?: URLSearchParams): Promise<unknown> {
  const url = createApiUrl(path, query);

  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<unknown>;
}

async function sendJsonToApi(
  path: string,
  method: 'PATCH' | 'POST',
  body: unknown,
): Promise<unknown> {
  const url = createApiUrl(path);

  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    method,
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<unknown>;
}

function parseMutationResponse(
  value: unknown,
  fallbackPublicId: string,
  fallbackMessage: string,
): StaffMutationResponse {
  const data = unwrapEnvelopeData(value);

  if (!isRecord(data)) {
    return {
      staffPublicId: fallbackPublicId,
      message: fallbackMessage,
    };
  }

  return {
    staffPublicId: getString(data.staffPublicId) ?? fallbackPublicId,
    message: getString(data.message) ?? fallbackMessage,
  };
}

export async function getStaffList(query: StaffQuery = {}): Promise<StaffListResponse> {
  const payload = await getJsonFromApi(STAFF_API_PATHS.list, createStaffQuery(query));
  const parsed = parseStaffListResponse(unwrapEnvelopeData(payload));

  return (
    parsed ?? {
      ...FALLBACK_STAFF_LIST_RESPONSE,
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
    }
  );
}

export async function getStaffDetail(staffPublicId: string): Promise<StaffDetail> {
  const payload = await getJsonFromApi(STAFF_API_PATHS.detail(staffPublicId));
  const parsed = parseStaffDetail(unwrapEnvelopeData(payload));

  return parsed ?? createFallbackStaffDetail(staffPublicId);
}

export async function createStaff(input: CreateStaffInput): Promise<StaffMutationResponse> {
  const payload: CreateStaffInput = {
    email: input.email,
    role: input.role,
    firstName: input.firstName,
    lastName: input.lastName,
  };

  const response = await adminPost<CreateStaffResponseData, CreateStaffInput>(
    STAFF_API_PATHS.create,
    payload,
  );

  return {
    staffPublicId: response.data.publicId,
    message: 'Staff account created successfully.',
  };
}

export async function updateStaffStatus(
  input: UpdateStaffStatusInput,
): Promise<StaffMutationResponse> {
  const payload = await sendJsonToApi(STAFF_API_PATHS.updateStatus(input.staffPublicId), 'PATCH', {
    status: input.status,
    reason: input.reason,
  });

  return parseMutationResponse(payload, input.staffPublicId, 'Staff status update submitted.');
}

export async function updateStaffRole(input: UpdateStaffRoleInput): Promise<StaffMutationResponse> {
  const payload = await sendJsonToApi(STAFF_API_PATHS.updateRole(input.staffPublicId), 'PATCH', {
    role: input.role,
    reason: input.reason,
  });

  return parseMutationResponse(payload, input.staffPublicId, 'Staff role update submitted.');
}
