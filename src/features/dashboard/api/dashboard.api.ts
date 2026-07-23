// src/features/dashboard/api/dashboard.api.ts

/**
 * File purpose:
 * Provides dashboard API helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises dashboard data loading for role-specific dashboards and
 * review queue summaries.
 *
 * Key exports:
 * - getSuperAdminDashboardState loads the super admin dashboard payload.
 * - getAdminDashboardState loads the admin dashboard payload.
 * - getCustomerCareDashboardState loads the customer care dashboard payload.
 * - getStaffDashboardState resolves the correct dashboard payload by staff role.
 * - getReviewQueueSummary loads role-aware review queue summaries.
 *
 * Business relevance:
 * Dashboard API helpers prepare the frontend for live operational metrics while
 * keeping safe typed fallback data available during implementation.
 *
 * Security note:
 * Frontend API helpers must not expose secrets, ObjectIds, private document
 * URLs, private KYC notes, internal admin notes, full API keys, API key hashes,
 * webhook secrets, or restricted audit details.
 */

import {
  DASHBOARD_API_PATHS,
  FALLBACK_ADMIN_DASHBOARD_STATE,
  FALLBACK_CUSTOMER_CARE_DASHBOARD_STATE,
  FALLBACK_REVIEW_QUEUE_SUMMARY,
  FALLBACK_SUPER_ADMIN_DASHBOARD_STATE,
} from '../constants/dashboard.constants';
import { adminGet } from '../../../lib/api/admin-fetch';
import type {
  AdminDashboardState,
  CustomerCareDashboardState,
  DashboardMetric,
  DashboardStaffRole,
  ReviewQueueSummaryItem,
  StaffDashboardState,
  SuperAdminDashboardState,
} from '../types/dashboard.types';

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isDashboardMetric(value: unknown): value is DashboardMetric {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.key === 'string' &&
    typeof value.label === 'string' &&
    typeof value.value === 'number' &&
    typeof value.description === 'string' &&
    typeof value.href === 'string' &&
    typeof value.tone === 'string'
  );
}

function isReviewQueueSummaryItem(value: unknown): value is ReviewQueueSummaryItem {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.queueType === 'string' &&
    typeof value.label === 'string' &&
    typeof value.pendingCount === 'number' &&
    typeof value.urgentCount === 'number' &&
    typeof value.oldestItemAgeLabel === 'string' &&
    typeof value.href === 'string' &&
    Array.isArray(value.allowedRoles)
  );
}

function isReviewQueueSummary(value: unknown): value is readonly ReviewQueueSummaryItem[] {
  return Array.isArray(value) && value.every(isReviewQueueSummaryItem);
}

function isBaseDashboardState(value: unknown, role: DashboardStaffRole): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.role === role &&
    typeof value.generatedAtLabel === 'string' &&
    Array.isArray(value.metrics) &&
    value.metrics.every(isDashboardMetric) &&
    Array.isArray(value.reviewQueues) &&
    value.reviewQueues.every(isReviewQueueSummaryItem) &&
    Array.isArray(value.quickLinks)
  );
}

function isSuperAdminDashboardState(value: unknown): value is SuperAdminDashboardState {
  return isBaseDashboardState(value, 'super_admin');
}

function isAdminDashboardState(value: unknown): value is AdminDashboardState {
  return isBaseDashboardState(value, 'admin');
}

function isCustomerCareDashboardState(value: unknown): value is CustomerCareDashboardState {
  return isBaseDashboardState(value, 'customer_care_rep');
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

async function getJsonFromApi(path: string): Promise<unknown> {
  try {
    const response = await adminGet<unknown>(path);

    return response.data;
  } catch {
    return null;
  }
}

export async function getSuperAdminDashboardState(): Promise<SuperAdminDashboardState> {
  const payload = await getJsonFromApi(DASHBOARD_API_PATHS.superAdmin);
  const data = unwrapEnvelopeData(payload);

  if (isSuperAdminDashboardState(data)) {
    return data;
  }

  return FALLBACK_SUPER_ADMIN_DASHBOARD_STATE;
}

export async function getAdminDashboardState(): Promise<AdminDashboardState> {
  const payload = await getJsonFromApi(DASHBOARD_API_PATHS.admin);
  const data = unwrapEnvelopeData(payload);

  if (isAdminDashboardState(data)) {
    return data;
  }

  return FALLBACK_ADMIN_DASHBOARD_STATE;
}

export async function getCustomerCareDashboardState(): Promise<CustomerCareDashboardState> {
  const payload = await getJsonFromApi(DASHBOARD_API_PATHS.customerCare);
  const data = unwrapEnvelopeData(payload);

  if (isCustomerCareDashboardState(data)) {
    return data;
  }

  return FALLBACK_CUSTOMER_CARE_DASHBOARD_STATE;
}

export async function getStaffDashboardState(
  role: DashboardStaffRole,
): Promise<StaffDashboardState> {
  if (role === 'super_admin') {
    return getSuperAdminDashboardState();
  }

  if (role === 'admin') {
    return getAdminDashboardState();
  }

  return getCustomerCareDashboardState();
}

export async function getReviewQueueSummary(
  role: DashboardStaffRole,
): Promise<readonly ReviewQueueSummaryItem[]> {
  const payload = await getJsonFromApi(`${DASHBOARD_API_PATHS.reviewQueueSummary}?role=${role}`);
  const data = unwrapEnvelopeData(payload);

  if (isReviewQueueSummary(data)) {
    return data.filter((queue) => queue.allowedRoles.includes(role));
  }

  return FALLBACK_REVIEW_QUEUE_SUMMARY.filter((queue) => queue.allowedRoles.includes(role));
}
