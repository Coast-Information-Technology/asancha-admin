// src/features/dashboard/hooks/use-admin-dashboard-state.ts

/**
 * File purpose:
 * Provides a React Query hook for admin and super admin dashboard states.
 *
 * Role in the project:
 * This hook loads operational dashboard data for super_admin and admin users.
 *
 * Key exports:
 * - useAdminDashboardState returns admin or super admin dashboard query state.
 *
 * Business relevance:
 * Admin dashboards guide operational staff toward review queues, assigned work,
 * alerts, and permitted modules.
 *
 * Security note:
 * This hook controls request state only. Backend permissions and redaction
 * remain the final source of truth.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getAdminDashboardState, getSuperAdminDashboardState } from '../api/dashboard.api';
import { DASHBOARD_QUERY_KEYS, DASHBOARD_STALE_TIME_MS } from '../constants/dashboard.constants';
import type {
  AdminDashboardState,
  DashboardStaffRole,
  SuperAdminDashboardState,
} from '../types/dashboard.types';

export type AdminDashboardRole = Extract<DashboardStaffRole, 'super_admin' | 'admin'>;

export type AdminDashboardStateForRole<TRole extends AdminDashboardRole> =
  TRole extends 'super_admin' ? SuperAdminDashboardState : AdminDashboardState;

export function useAdminDashboardState<TRole extends AdminDashboardRole>(role: TRole) {
  return useQuery<AdminDashboardStateForRole<TRole>>({
    queryKey: DASHBOARD_QUERY_KEYS.adminState(role),
    queryFn: async () => {
      if (role === 'super_admin') {
        return getSuperAdminDashboardState() as Promise<AdminDashboardStateForRole<TRole>>;
      }

      return getAdminDashboardState() as Promise<AdminDashboardStateForRole<TRole>>;
    },
    staleTime: DASHBOARD_STALE_TIME_MS,
  });
}
