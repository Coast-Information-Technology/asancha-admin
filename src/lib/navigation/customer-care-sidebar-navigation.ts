// src/lib/navigation/customer-care-sidebar-navigation.ts

/**
 * File purpose:
 * Defines the sidebar navigation for customer_care_rep users in the Asancha
 * Admin frontend.
 *
 * Role in the project:
 * This file lists safe support-only navigation available to customer care
 * representatives.
 *
 * Key exports:
 * - CUSTOMER_CARE_SIDEBAR_NAVIGATION defines customer care sidebar links.
 * - getCustomerCareSidebarNavigation returns the sidebar configuration.
 *
 * Business relevance:
 * customer_care_rep users must not access staff management, audit logs,
 * settings, API access approval, payment approval controls, document approval
 * controls, verification approval controls, listing approval controls, AI admin
 * insight tools, or super admin controls.
 *
 * Security note:
 * Customer care menu restrictions are frontend guidance. Backend permission
 * checks must still block restricted resources and actions.
 */

import type { AdminNavigationItem } from './admin-top-bar-navigation';

export const CUSTOMER_CARE_SIDEBAR_NAVIGATION: readonly AdminNavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/customer-care',
    iconName: 'LayoutDashboard',
    description: 'Customer care dashboard overview.',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Users',
    href: '/users',
    iconName: 'Users',
    description: 'Safe support view for user lookup and assistance.',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Bookings',
    href: '/bookings',
    iconName: 'CalendarDays',
    description: 'Support view for booking assistance.',
    badgeKey: 'bookingSupportCount',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Support',
    href: '/support',
    iconName: 'Headphones',
    description: 'Manage safe customer support cases and escalations.',
    badgeKey: 'supportAttentionCount',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Messages',
    href: '/messages',
    iconName: 'MessagesSquare',
    description: 'Assigned support messages and conversation threads.',
    badgeKey: 'messageUnreadCount',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Documents Status',
    href: '/documents/status',
    iconName: 'FileText',
    description: 'View document status for support context only.',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Verification Status',
    href: '/verification-reviews/status',
    iconName: 'ShieldCheck',
    description: 'View verification status for support context only.',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Payments Status',
    href: '/payments/status',
    iconName: 'CreditCard',
    description: 'View payment status for support context only.',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'Notifications',
    href: '/notifications',
    iconName: 'Bell',
    description: 'View operational notifications.',
    badgeKey: 'notificationUnreadCount',
    allowedRoles: ['customer_care_rep'],
  },
  {
    label: 'My Staff Account',
    href: '/my-profile',
    iconName: 'UserCircle',
    description: 'Manage your own staff account.',
    allowedRoles: ['customer_care_rep'],
  },
];

export function getCustomerCareSidebarNavigation(): AdminNavigationItem[] {
  return [...CUSTOMER_CARE_SIDEBAR_NAVIGATION];
}
