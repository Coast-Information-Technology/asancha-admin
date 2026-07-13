// src/store/admin-dashboard.store.ts

/**
 * File purpose:
 * Provides client-side dashboard state for the Asancha Admin frontend.
 *
 * Role in the project:
 * This Zustand store keeps dashboard summary cards, role dashboard metadata,
 * queue counts, operational metrics, and dashboard loading/error state
 * available to dashboard components.
 *
 * Key exports:
 * - useAdminDashboardStore exposes dashboard metrics and safe update helpers.
 *
 * Business relevance:
 * Dashboard widgets differ by staff role. Customer care must only see
 * support-safe widgets, while admin and super_admin may see broader operational
 * widgets where backend permissions allow.
 *
 * Security note:
 * Dashboard state is display-only. Backend endpoints remain the source of truth
 * for dashboard data, staff permissions, review queues, payment state,
 * verification state, audit visibility, and system status.
 */

'use client';

import { create } from 'zustand';

import type { StaffRole } from '../lib/auth/staff-role-guards';

export type DashboardMetricTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface DashboardMetric {
  key: string;
  label: string;
  value: number;
  href?: string;
  description?: string;
  tone: DashboardMetricTone;
}

export interface DashboardQueueSummary {
  pendingProfiles: number;
  pendingCompanies: number;
  pendingProperties: number;
  pendingListings: number;
  pendingDocuments: number;
  pendingVerificationReviews: number;
  pendingPayments: number;
  pendingDealReservations: number;
  pendingBookings: number;
  pendingApiPartners: number;
  pendingAiReviews: number;
}

export interface AdminDashboardState {
  role: StaffRole | null;
  metrics: readonly DashboardMetric[];
  queueSummary: DashboardQueueSummary;
  lastUpdatedAt: string | null;
  loading: boolean;
  errorMessage: string | null;
  setRole: (role: StaffRole | null) => void;
  setMetrics: (metrics: readonly DashboardMetric[]) => void;
  setQueueSummary: (queueSummary: Partial<DashboardQueueSummary>) => void;
  setLastUpdatedAt: (lastUpdatedAt: string | null) => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  resetDashboard: () => void;
}

const EMPTY_QUEUE_SUMMARY: DashboardQueueSummary = {
  pendingProfiles: 0,
  pendingCompanies: 0,
  pendingProperties: 0,
  pendingListings: 0,
  pendingDocuments: 0,
  pendingVerificationReviews: 0,
  pendingPayments: 0,
  pendingDealReservations: 0,
  pendingBookings: 0,
  pendingApiPartners: 0,
  pendingAiReviews: 0,
};

export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  role: null,
  metrics: [],
  queueSummary: EMPTY_QUEUE_SUMMARY,
  lastUpdatedAt: null,
  loading: false,
  errorMessage: null,

  setRole: (role) => {
    set({
      role,
    });
  },

  setMetrics: (metrics) => {
    set({
      metrics: [...metrics],
      errorMessage: null,
    });
  },

  setQueueSummary: (queueSummary) => {
    set((state) => ({
      queueSummary: {
        ...state.queueSummary,
        ...queueSummary,
      },
      errorMessage: null,
    }));
  },

  setLastUpdatedAt: (lastUpdatedAt) => {
    set({
      lastUpdatedAt,
    });
  },

  setLoading: (loading) => {
    set({
      loading,
    });
  },

  setErrorMessage: (errorMessage) => {
    set({
      errorMessage,
    });
  },

  resetDashboard: () => {
    set({
      role: null,
      metrics: [],
      queueSummary: EMPTY_QUEUE_SUMMARY,
      lastUpdatedAt: null,
      loading: false,
      errorMessage: null,
    });
  },
}));
