// src/features/dashboard/hooks/use-staff-dashboard-state.ts

/**
 * File purpose:
 * Provides a React Query hook for the current staff role dashboard state.
 *
 * Role in the project:
 * This hook loads the correct dashboard state for super_admin, admin, or
 * customer_care_rep.
 *
 * Key exports:
 * - useStaffDashboardState returns role-specific dashboard query state.
 *
 * Business relevance:
 * Staff users must land on dashboards that match their operational role.
 * Customer care must only see safe support dashboard data.
 *
 * Security note:
 * This hook is not a permission boundary. Backend authentication,
 * authorization, role checks, account status checks, and resource visibility
 * remain final.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { getStaffDashboardState } from '../api/dashboard.api';
import {
  DASHBOARD_QUERY_KEYS,
  DASHBOARD_STALE_TIME_MS,
} from '../constants/dashboard.constants';
import type { DashboardStaffRole, StaffDashboardState } from '../types/dashboard.types';

export function useStaffDashboardState(role: DashboardStaffRole) {
  return useQuery<StaffDashboardState>({
    queryKey: DASHBOARD_QUERY_KEYS.staffState(role),
    queryFn: () => getStaffDashboardState(role),
    staleTime: DASHBOARD_STALE_TIME_MS,
  });
}
