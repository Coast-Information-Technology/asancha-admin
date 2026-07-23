// src/lib/navigation/admin-sidebar-navigation.ts

/**
 * File purpose:
 * Defines the sidebar navigation for admin users in the Asancha Admin frontend.
 *
 * Role in the project:
 * This file lists the approved admin sidebar menu items. Admin users have broad
 * operational access, but must not see super-admin-only controls as normal admin
 * workflow.
 *
 * Key exports:
 * - ADMIN_SIDEBAR_NAVIGATION defines the admin sidebar.
 * - getAdminSidebarNavigation returns the sidebar configuration.
 *
 * Business relevance:
 * Admin users may create customer_care_rep accounts only. They must not create
 * admin accounts or super_admin accounts from frontend routes, forms, modals,
 * menu items, or actions.
 *
 * Security note:
 * Navigation visibility is frontend guidance only. The backend API remains the
 * final authority for all staff and admin permissions.
 */

import type { AdminNavigationItem } from './admin-top-bar-navigation';

export const ADMIN_SIDEBAR_NAVIGATION: readonly AdminNavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/admin',
    iconName: 'LayoutDashboard',
    description: 'Admin dashboard overview.',
    allowedRoles: ['admin'],
  },
  {
    label: 'Review Queues',
    href: '/review-queues',
    iconName: 'ListChecks',
    description: 'Review queues available to admin users.',
    badgeKey: 'reviewQueueCount',
    allowedRoles: ['admin'],
  },
  {
    label: 'Onboarding',
    href: '/onboarding',
    iconName: 'ClipboardCheck',
    description: 'Review onboarding progress and submitted records.',
    badgeKey: 'onboardingReviewCount',
    allowedRoles: ['admin'],
  },
  {
    label: 'Records',
    href: '/records',
    iconName: 'Database',
    description: 'Access operational records and review workspaces.',
    allowedRoles: ['admin'],
    renderAsSectionGroup: true,
    children: [
      {
        label: 'Users',
        href: '/users',
        iconName: 'Users',
        description: 'View public user records and safe user support context.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Staff',
        href: '/staff',
        iconName: 'ShieldUser',
        description: 'Limited staff management for customer care accounts.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Profiles',
        href: '/profiles',
        iconName: 'IdCard',
        description: 'Review role-specific user profiles.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Companies',
        href: '/companies',
        iconName: 'Building2',
        description: 'Review company records.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Properties',
        href: '/properties',
        iconName: 'House',
        description: 'Review submitted properties.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Listings',
        href: '/listings',
        iconName: 'ListTodo',
        description: 'Review listing lifecycle.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Documents',
        href: '/documents',
        iconName: 'FileText',
        description: 'Review document status and correction workflows.',
        badgeKey: 'documentReviewCount',
        allowedRoles: ['admin'],
      },
      {
        label: 'Verification Reviews',
        href: '/verification-reviews',
        iconName: 'ShieldCheck',
        description: 'Review verification workflows.',
        badgeKey: 'verificationReviewCount',
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    label: 'Operations',
    href: '/operations',
    iconName: 'Workflow',
    description: 'Access operational workflows and records.',
    allowedRoles: ['admin'],
    renderAsSectionGroup: true,
    children: [
      {
        label: 'Deal Reservations',
        href: '/deal-reservations',
        iconName: 'Handshake',
        description: 'Monitor deal reservations.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Deal Activities',
        href: '/deal-activities',
        iconName: 'Activity',
        description: 'Track deal activity records.',
        allowedRoles: ['admin'],
      },
      {
        label: 'Payments',
        href: '/payments',
        iconName: 'CreditCard',
        description: 'Review payment status and payment references.',
        badgeKey: 'paymentReviewCount',
        allowedRoles: ['admin'],
      },
      {
        label: 'Bookings',
        href: '/bookings',
        iconName: 'CalendarDays',
        description: 'Manage booking operations.',
        badgeKey: 'bookingSupportCount',
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    label: 'Communication',
    href: '/communication',
    iconName: 'MessagesSquare',
    description: 'Access staff messages and operational notifications.',
    allowedRoles: ['admin'],
    renderAsSectionGroup: true,
    children: [
      {
        label: 'Messages',
        href: '/messages',
        iconName: 'MessagesSquare',
        description: 'Open staff messages and conversation threads.',
        badgeKey: 'messageUnreadCount',
        allowedRoles: ['admin'],
      },
      {
        label: 'Notifications',
        href: '/notifications',
        iconName: 'Bell',
        description: 'View operational notifications.',
        badgeKey: 'notificationUnreadCount',
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    label: 'Governance',
    href: '/governance',
    iconName: 'ShieldCheck',
    description: 'Access administrative governance tools.',
    allowedRoles: ['admin'],
    renderAsSectionGroup: true,
    children: [
      {
        label: 'API Access',
        href: '/api-access',
        iconName: 'KeyRound',
        description: 'Manage API access where permission allows.',
        allowedRoles: ['admin'],
      },
      {
        label: 'AI',
        href: '/ai',
        iconName: 'Sparkles',
        description: 'View AI/admin insight screens where permission allows.',
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    label: 'My Staff Account',
    href: '/my-profile',
    iconName: 'UserCircle',
    description: 'Manage your own staff account.',
    allowedRoles: ['admin'],
  },
];

export function getAdminSidebarNavigation(): AdminNavigationItem[] {
  return [...ADMIN_SIDEBAR_NAVIGATION];
}
