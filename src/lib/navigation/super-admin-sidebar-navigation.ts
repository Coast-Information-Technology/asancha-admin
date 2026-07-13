// src/lib/navigation/super-admin-sidebar-navigation.ts

/**
 * File purpose:
 * Defines the sidebar navigation for super_admin users in the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * This file lists the approved super admin sidebar menu items. It includes
 * index, queue, list, and workspace routes only. Detail pages must be reached
 * from table rows, queues, search results, or related-resource links.
 *
 * Key exports:
 * - SUPER_ADMIN_SIDEBAR_NAVIGATION defines the super admin sidebar.
 * - getSuperAdminSidebarNavigation returns the sidebar configuration.
 *
 * Business relevance:
 * super_admin users may see the broadest admin navigation, including audit logs
 * and settings. However, no frontend route, form, modal, menu item, or action
 * may create another super_admin.
 *
 * Security note:
 * Sidebar visibility is frontend guidance only. Backend staff guards,
 * permission checks, audit logs, and policies remain mandatory.
 */

import type { AdminNavigationItem } from './admin-top-bar-navigation';

export const SUPER_ADMIN_SIDEBAR_NAVIGATION: readonly AdminNavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/super-admin',
    iconName: 'LayoutDashboard',
    description: 'Super admin dashboard overview.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Review Queues',
    href: '/review-queues',
    iconName: 'ListChecks',
    description: 'Central operational review queues.',
    badgeKey: 'reviewQueueCount',
    allowedRoles: ['super_admin'],
    children: [
      {
        label: 'All Queues',
        href: '/review-queues',
        iconName: 'ListChecks',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Profiles',
        href: '/review-queues/profiles',
        iconName: 'UserRoundCheck',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Companies',
        href: '/review-queues/companies',
        iconName: 'Building2',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Properties',
        href: '/review-queues/properties',
        iconName: 'House',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Listings',
        href: '/review-queues/listings',
        iconName: 'ListTodo',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Documents',
        href: '/review-queues/documents',
        iconName: 'FileCheck2',
        badgeKey: 'documentReviewCount',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Verification Reviews',
        href: '/review-queues/verification-reviews',
        iconName: 'ShieldCheck',
        badgeKey: 'verificationReviewCount',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Payments',
        href: '/review-queues/payments',
        iconName: 'CreditCard',
        badgeKey: 'paymentReviewCount',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Deal Reservations',
        href: '/review-queues/deal-reservations',
        iconName: 'Handshake',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Bookings',
        href: '/review-queues/bookings',
        iconName: 'CalendarClock',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'API Partners',
        href: '/review-queues/api-partners',
        iconName: 'KeyRound',
        badgeKey: 'apiAccessReviewCount',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'AI',
        href: '/review-queues/ai',
        iconName: 'Sparkles',
        badgeKey: 'aiReviewCount',
        allowedRoles: ['super_admin'],
      },
    ],
  },
  {
    label: 'Users',
    href: '/users',
    iconName: 'Users',
    description: 'View and manage public user records safely.',
    allowedRoles: ['super_admin'],
    children: [
      {
        label: 'All Users',
        href: '/users',
        iconName: 'Users',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Public Users',
        href: '/users/public',
        iconName: 'UserRound',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Suspended Users',
        href: '/users/suspended',
        iconName: 'UserX',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Search Users',
        href: '/users/search',
        iconName: 'Search',
        allowedRoles: ['super_admin'],
      },
    ],
  },
  {
    label: 'Staff',
    href: '/staff',
    iconName: 'ShieldUser',
    description: 'Manage admin and customer care staff accounts.',
    allowedRoles: ['super_admin'],
    children: [
      {
        label: 'All Staff',
        href: '/staff',
        iconName: 'ShieldUser',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Create Staff',
        href: '/staff/new',
        iconName: 'UserPlus',
        description: 'Create admin or customer care staff only.',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Admins',
        href: '/staff?role=admin',
        iconName: 'ShieldCheck',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Customer Care',
        href: '/staff?role=customer_care_rep',
        iconName: 'Headphones',
        allowedRoles: ['super_admin'],
      },
    ],
  },
  {
    label: 'Profiles',
    href: '/profiles',
    iconName: 'IdCard',
    description: 'Review role-specific business profiles.',
    allowedRoles: ['super_admin'],
    children: [
      {
        label: 'All Profiles',
        href: '/profiles',
        iconName: 'IdCard',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Investors',
        href: '/profiles/investors',
        iconName: 'ChartNoAxesCombined',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Property Owners',
        href: '/profiles/property-owners',
        iconName: 'Home',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Property Agents',
        href: '/profiles/property-agents',
        iconName: 'BriefcaseBusiness',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Property Sourcers',
        href: '/profiles/property-sourcers',
        iconName: 'MapPinned',
        allowedRoles: ['super_admin'],
      },
      {
        label: 'Service Providers',
        href: '/profiles/service-providers',
        iconName: 'Wrench',
        allowedRoles: ['super_admin'],
      },
    ],
  },
  {
    label: 'Companies',
    href: '/companies',
    iconName: 'Building2',
    description: 'Review company profiles and verification status.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Properties',
    href: '/properties',
    iconName: 'House',
    description: 'Review submitted property records.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Listings',
    href: '/listings',
    iconName: 'ListTodo',
    description: 'Review listing lifecycle and marketplace readiness.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Documents',
    href: '/documents',
    iconName: 'FileText',
    description: 'Review uploaded documents and document statuses.',
    badgeKey: 'documentReviewCount',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Verification Reviews',
    href: '/verification-reviews',
    iconName: 'ShieldCheck',
    description: 'Manage verification review workflows.',
    badgeKey: 'verificationReviewCount',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Deal Reservations',
    href: '/deal-reservations',
    iconName: 'Handshake',
    description: 'Monitor deal reservations and reservation lifecycle.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Deal Activities',
    href: '/deal-activities',
    iconName: 'Activity',
    description: 'Track deal activity records.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Payments',
    href: '/payments',
    iconName: 'CreditCard',
    description: 'Review payment references and payment status.',
    badgeKey: 'paymentReviewCount',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Bookings',
    href: '/bookings',
    iconName: 'CalendarDays',
    description: 'Manage viewing and operational bookings.',
    badgeKey: 'bookingSupportCount',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Messages',
    href: '/messages',
    iconName: 'MessagesSquare',
    description: 'Open admin messages and conversation threads.',
    badgeKey: 'messageUnreadCount',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Notifications',
    href: '/notifications',
    iconName: 'Bell',
    description: 'View operational notifications.',
    badgeKey: 'notificationUnreadCount',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'API Access',
    href: '/api-access',
    iconName: 'KeyRound',
    description: 'Manage API clients, partner access, keys, usage, and billing.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'AI',
    href: '/ai',
    iconName: 'Sparkles',
    description: 'Review AI/admin insight screens.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Audit Logs',
    href: '/audit-logs',
    iconName: 'FileClock',
    description: 'View restricted internal audit logs.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Settings',
    href: '/settings',
    iconName: 'Settings',
    description: 'Manage restricted admin settings.',
    allowedRoles: ['super_admin'],
  },
  {
    label: 'My Staff Account',
    href: '/my-profile',
    iconName: 'UserCircle',
    description: 'Manage your own staff account.',
    allowedRoles: ['super_admin'],
  },
];

export function getSuperAdminSidebarNavigation(): AdminNavigationItem[] {
  return [...SUPER_ADMIN_SIDEBAR_NAVIGATION];
}
