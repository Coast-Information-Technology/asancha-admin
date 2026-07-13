// src/store/notifications.store.ts

/**
 * File purpose:
 * Provides client-side notification state for the Asancha Admin frontend.
 *
 * Role in the project:
 * This Zustand store manages notification preview state, unread count, latest
 * notifications, notification drawer state, loading state, and safe local UI
 * actions.
 *
 * Key exports:
 * - useNotificationsStore exposes notification state and update helpers.
 *
 * Business relevance:
 * Notifications are operational, role-aware, safe, and action-oriented. They
 * must not become promotional messages or expose sensitive internal notes.
 *
 * Security note:
 * Notification state is frontend display state only. Backend notification
 * endpoints must enforce staff permissions, profile visibility, safe payloads,
 * public IDs, and redaction of private KYC/risk details, secrets, API keys,
 * webhook secrets, and internal IDs.
 */

'use client';

import { create } from 'zustand';

export type AdminNotificationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type AdminNotificationStatus = 'unread' | 'read' | 'dismissed';

export interface AdminNotificationPreview {
  notificationPublicId: string;
  title: string;
  body: string;
  href?: string;
  category?: string;
  priority: AdminNotificationPriority;
  status: AdminNotificationStatus;
  createdAt: string;
}

export interface NotificationsState {
  unreadCount: number;
  latestNotifications: readonly AdminNotificationPreview[];
  drawerOpen: boolean;
  loading: boolean;
  errorMessage: string | null;
  setUnreadCount: (unreadCount: number) => void;
  incrementUnreadCount: (amount?: number) => void;
  decrementUnreadCount: (amount?: number) => void;
  setLatestNotifications: (notifications: readonly AdminNotificationPreview[]) => void;
  upsertNotification: (notification: AdminNotificationPreview) => void;
  markNotificationRead: (notificationPublicId: string) => void;
  dismissNotification: (notificationPublicId: string) => void;
  markAllRead: () => void;
  setDrawerOpen: (drawerOpen: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  resetNotifications: () => void;
}

function normaliseCount(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.floor(value));
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  unreadCount: 0,
  latestNotifications: [],
  drawerOpen: false,
  loading: false,
  errorMessage: null,

  setUnreadCount: (unreadCount) => {
    set({
      unreadCount: normaliseCount(unreadCount),
    });
  },

  incrementUnreadCount: (amount = 1) => {
    set((state) => ({
      unreadCount: normaliseCount(state.unreadCount + amount),
    }));
  },

  decrementUnreadCount: (amount = 1) => {
    set((state) => ({
      unreadCount: normaliseCount(state.unreadCount - amount),
    }));
  },

  setLatestNotifications: (notifications) => {
    set({
      latestNotifications: [...notifications],
      errorMessage: null,
    });
  },

  upsertNotification: (notification) => {
    set((state) => {
      const existingNotification = state.latestNotifications.find((item) => {
        return item.notificationPublicId === notification.notificationPublicId;
      });

      const nextNotifications = existingNotification
        ? state.latestNotifications.map((item) =>
            item.notificationPublicId === notification.notificationPublicId ? notification : item,
          )
        : [notification, ...state.latestNotifications];

      return {
        latestNotifications: nextNotifications.slice(0, 20),
      };
    });
  },

  markNotificationRead: (notificationPublicId) => {
    set((state) => ({
      latestNotifications: state.latestNotifications.map((notification) =>
        notification.notificationPublicId === notificationPublicId
          ? {
              ...notification,
              status: 'read',
            }
          : notification,
      ),
      unreadCount: normaliseCount(state.unreadCount - 1),
    }));
  },

  dismissNotification: (notificationPublicId) => {
    set((state) => ({
      latestNotifications: state.latestNotifications.map((notification) =>
        notification.notificationPublicId === notificationPublicId
          ? {
              ...notification,
              status: 'dismissed',
            }
          : notification,
      ),
      unreadCount: normaliseCount(state.unreadCount - 1),
    }));
  },

  markAllRead: () => {
    set((state) => ({
      latestNotifications: state.latestNotifications.map((notification) => ({
        ...notification,
        status: notification.status === 'dismissed' ? 'dismissed' : 'read',
      })),
      unreadCount: 0,
    }));
  },

  setDrawerOpen: (drawerOpen) => {
    set({
      drawerOpen,
    });
  },

  openDrawer: () => {
    set({
      drawerOpen: true,
    });
  },

  closeDrawer: () => {
    set({
      drawerOpen: false,
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

  resetNotifications: () => {
    set({
      unreadCount: 0,
      latestNotifications: [],
      drawerOpen: false,
      loading: false,
      errorMessage: null,
    });
  },
}));
