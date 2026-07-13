// src/lib/constants/routes.constants.ts

/**
 * File purpose:
 * Defines frontend route constants and public-ID route builders for the
 * Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises route paths used by navigation, redirects, dashboards,
 * tables, detail links, breadcrumbs, and permission-aware UI.
 *
 * Key exports:
 * - ADMIN_ROUTES defines static route constants.
 * - ADMIN_ROUTE_BUILDERS defines public-ID route builders.
 * - AUTH_ROUTES defines staff auth route constants.
 *
 * Business relevance:
 * asancha-admin must not include public signup, public onboarding, marketplace,
 * or public user dashboard routes. Detail pages are valid pages but must not be
 * placed in sidebar menus. Frontend routes must use public IDs, not MongoDB
 * ObjectIds.
 *
 * Security note:
 * Route constants do not authorize access. Backend authentication,
 * authorization, account status, permissions, resource visibility, and audit
 * logging remain the final enforcement authority.
 */

import { createPublicIdRouteSegment } from '../utils/public-id';

export const AUTH_ROUTES = {
  signIn: '/auth/sign-in',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  setPassword: '/auth/set-password',
  verifyStaffInvite: '/auth/verify-staff-invite',
  locked: '/auth/locked',
  unauthorized: '/auth/unauthorized',
} as const;

export const DASHBOARD_ROUTES = {
  root: '/dashboard',
  superAdmin: '/dashboard/super-admin',
  admin: '/dashboard/admin',
  customerCare: '/dashboard/customer-care',
} as const;

export const ADMIN_ROUTES = {
  home: '/',
  auth: AUTH_ROUTES,
  dashboard: DASHBOARD_ROUTES,

  reviewQueues: {
    root: '/review-queues',
    profiles: '/review-queues/profiles',
    companies: '/review-queues/companies',
    properties: '/review-queues/properties',
    listings: '/review-queues/listings',
    documents: '/review-queues/documents',
    verificationReviews: '/review-queues/verification-reviews',
    payments: '/review-queues/payments',
    dealReservations: '/review-queues/deal-reservations',
    bookings: '/review-queues/bookings',
    apiPartners: '/review-queues/api-partners',
    ai: '/review-queues/ai',
  },

  users: {
    root: '/users',
    public: '/users/public',
    suspended: '/users/suspended',
    search: '/users/search',
  },

  staff: {
    root: '/staff',
    new: '/staff/new',
  },

  profiles: {
    root: '/profiles',
    investors: '/profiles/investors',
    propertyOwners: '/profiles/property-owners',
    propertyAgents: '/profiles/property-agents',
    propertySourcers: '/profiles/property-sourcers',
    serviceProviders: '/profiles/service-providers',
  },

  companies: {
    root: '/companies',
  },

  properties: {
    root: '/properties',
  },

  listings: {
    root: '/listings',
  },

  documents: {
    root: '/documents',
    status: '/documents/status',
  },

  verificationReviews: {
    root: '/verification-reviews',
    status: '/verification-reviews/status',
  },

  dealReservations: {
    root: '/deal-reservations',
  },

  dealActivities: {
    root: '/deal-activities',
  },

  payments: {
    root: '/payments',
    status: '/payments/status',
    references: '/payments/references',
  },

  bookings: {
    root: '/bookings',
    new: '/bookings/new',
    support: '/bookings/support',
  },

  messages: {
    root: '/messages',
    assigned: '/messages/assigned',
  },

  notifications: {
    root: '/notifications',
    templates: '/notifications/templates',
    newSystem: '/notifications/system/new',
    newUser: '/notifications/user/new',
    preferences: '/notifications/preferences',
  },

  apiAccess: {
    applications: '/api-access/applications',
    clients: '/api-access/clients',
    plans: '/api-access/plans',
    subscriptions: '/api-access/subscriptions',
    keys: '/api-access/keys',
    usage: '/api-access/usage',
    webhooks: '/api-access/webhooks',
    billing: '/api-access/billing',
  },

  ai: {
    root: '/ai',
    recommendations: '/ai/recommendations',
    matchingSnapshots: '/ai/matching-snapshots',
    analysisRuns: '/ai/analysis-runs',
    feedback: '/ai/feedback',
  },

  auditLogs: {
    root: '/audit-logs',
    highRisk: '/audit-logs/high-risk',
    staff: '/audit-logs/staff',
    payments: '/audit-logs/payments',
    verification: '/audit-logs/verification',
    documents: '/audit-logs/documents',
    apiAccess: '/audit-logs/api-access',
  },

  settings: {
    root: '/settings',
    permissions: '/settings/permissions',
    policies: '/settings/policies',
    emailTemplates: '/settings/email-templates',
    notificationTemplates: '/settings/notification-templates',
    apiAccess: '/settings/api-access',
    integrations: '/settings/integrations',
    system: '/settings/system',
  },

  myProfile: {
    root: '/my-profile',
    security: '/my-profile/security',
    notifications: '/my-profile/notifications',
    activity: '/my-profile/activity',
  },

  system: {
    status: '/system/status',
  },
} as const;

export const ADMIN_ROUTE_BUILDERS = {
  userDetail: (userPublicId: string) =>
    `/users/${createPublicIdRouteSegment(userPublicId, 'userPublicId')}`,

  staffDetail: (staffPublicId: string) =>
    `/staff/${createPublicIdRouteSegment(staffPublicId, 'staffPublicId')}`,

  staffProfile: (staffPublicId: string) =>
    `/staff/${createPublicIdRouteSegment(staffPublicId, 'staffPublicId')}/profile`,

  staffSecurity: (staffPublicId: string) =>
    `/staff/${createPublicIdRouteSegment(staffPublicId, 'staffPublicId')}/security`,

  staffPermissions: (staffPublicId: string) =>
    `/staff/${createPublicIdRouteSegment(staffPublicId, 'staffPublicId')}/permissions`,

  profileDetail: (profilePublicId: string) =>
    `/profiles/${createPublicIdRouteSegment(profilePublicId, 'profilePublicId')}`,

  companyDetail: (companyPublicId: string) =>
    `/companies/${createPublicIdRouteSegment(companyPublicId, 'companyPublicId')}`,

  companyMembers: (companyPublicId: string) =>
    `/companies/${createPublicIdRouteSegment(companyPublicId, 'companyPublicId')}/members`,

  companyDocuments: (companyPublicId: string) =>
    `/companies/${createPublicIdRouteSegment(companyPublicId, 'companyPublicId')}/documents`,

  companyVerification: (companyPublicId: string) =>
    `/companies/${createPublicIdRouteSegment(companyPublicId, 'companyPublicId')}/verification`,

  propertyDetail: (propertyPublicId: string) =>
    `/properties/${createPublicIdRouteSegment(propertyPublicId, 'propertyPublicId')}`,

  propertyDocuments: (propertyPublicId: string) =>
    `/properties/${createPublicIdRouteSegment(propertyPublicId, 'propertyPublicId')}/documents`,

  propertyListings: (propertyPublicId: string) =>
    `/properties/${createPublicIdRouteSegment(propertyPublicId, 'propertyPublicId')}/listings`,

  propertyActivities: (propertyPublicId: string) =>
    `/properties/${createPublicIdRouteSegment(propertyPublicId, 'propertyPublicId')}/activities`,

  listingDetail: (listingPublicId: string) =>
    `/listings/${createPublicIdRouteSegment(listingPublicId, 'listingPublicId')}`,

  listingReview: (listingPublicId: string) =>
    `/listings/${createPublicIdRouteSegment(listingPublicId, 'listingPublicId')}/review`,

  listingVisibility: (listingPublicId: string) =>
    `/listings/${createPublicIdRouteSegment(listingPublicId, 'listingPublicId')}/visibility`,

  listingActivities: (listingPublicId: string) =>
    `/listings/${createPublicIdRouteSegment(listingPublicId, 'listingPublicId')}/activities`,

  listingAudit: (listingPublicId: string) =>
    `/listings/${createPublicIdRouteSegment(listingPublicId, 'listingPublicId')}/audit`,

  documentDetail: (documentPublicId: string) =>
    `/documents/${createPublicIdRouteSegment(documentPublicId, 'documentPublicId')}`,

  documentReview: (documentPublicId: string) =>
    `/documents/${createPublicIdRouteSegment(documentPublicId, 'documentPublicId')}/review`,

  documentHistory: (documentPublicId: string) =>
    `/documents/${createPublicIdRouteSegment(documentPublicId, 'documentPublicId')}/history`,

  verificationReviewDetail: (verificationReviewPublicId: string) =>
    `/verification-reviews/${createPublicIdRouteSegment(
      verificationReviewPublicId,
      'verificationReviewPublicId',
    )}`,

  verificationReviewAction: (verificationReviewPublicId: string) =>
    `/verification-reviews/${createPublicIdRouteSegment(
      verificationReviewPublicId,
      'verificationReviewPublicId',
    )}/review`,

  verificationReviewDocuments: (verificationReviewPublicId: string) =>
    `/verification-reviews/${createPublicIdRouteSegment(
      verificationReviewPublicId,
      'verificationReviewPublicId',
    )}/documents`,

  verificationReviewMessages: (verificationReviewPublicId: string) =>
    `/verification-reviews/${createPublicIdRouteSegment(
      verificationReviewPublicId,
      'verificationReviewPublicId',
    )}/messages`,

  verificationReviewAudit: (verificationReviewPublicId: string) =>
    `/verification-reviews/${createPublicIdRouteSegment(
      verificationReviewPublicId,
      'verificationReviewPublicId',
    )}/audit`,

  dealReservationDetail: (reservationPublicId: string) =>
    `/deal-reservations/${createPublicIdRouteSegment(
      reservationPublicId,
      'reservationPublicId',
    )}`,

  dealReservationPayment: (reservationPublicId: string) =>
    `/deal-reservations/${createPublicIdRouteSegment(
      reservationPublicId,
      'reservationPublicId',
    )}/payment`,

  dealReservationMessages: (reservationPublicId: string) =>
    `/deal-reservations/${createPublicIdRouteSegment(
      reservationPublicId,
      'reservationPublicId',
    )}/messages`,

  dealReservationActivities: (reservationPublicId: string) =>
    `/deal-reservations/${createPublicIdRouteSegment(
      reservationPublicId,
      'reservationPublicId',
    )}/activities`,

  dealActivityDetail: (dealActivityPublicId: string) =>
    `/deal-activities/${createPublicIdRouteSegment(
      dealActivityPublicId,
      'dealActivityPublicId',
    )}`,

  paymentReferenceDetail: (paymentReference: string) =>
    `/payments/references/${createPublicIdRouteSegment(paymentReference, 'paymentReference')}`,

  paymentDetail: (paymentPublicId: string) =>
    `/payments/${createPublicIdRouteSegment(paymentPublicId, 'paymentPublicId')}`,

  paymentReview: (paymentPublicId: string) =>
    `/payments/${createPublicIdRouteSegment(paymentPublicId, 'paymentPublicId')}/review`,

  paymentTrace: (paymentPublicId: string) =>
    `/payments/${createPublicIdRouteSegment(paymentPublicId, 'paymentPublicId')}/trace`,

  bookingDetail: (bookingPublicId: string) =>
    `/bookings/${createPublicIdRouteSegment(bookingPublicId, 'bookingPublicId')}`,

  bookingReschedule: (bookingPublicId: string) =>
    `/bookings/${createPublicIdRouteSegment(bookingPublicId, 'bookingPublicId')}/reschedule`,

  conversationDetail: (conversationPublicId: string) =>
    `/messages/${createPublicIdRouteSegment(conversationPublicId, 'conversationPublicId')}`,

  apiPartnerApplicationDetail: (applicationPublicId: string) =>
    `/api-access/applications/${createPublicIdRouteSegment(
      applicationPublicId,
      'applicationPublicId',
    )}`,

  apiClientDetail: (apiClientPublicId: string) =>
    `/api-access/clients/${createPublicIdRouteSegment(apiClientPublicId, 'apiClientPublicId')}`,

  apiPlanDetail: (apiPlanPublicId: string) =>
    `/api-access/plans/${createPublicIdRouteSegment(apiPlanPublicId, 'apiPlanPublicId')}`,

  apiSubscriptionDetail: (subscriptionPublicId: string) =>
    `/api-access/subscriptions/${createPublicIdRouteSegment(
      subscriptionPublicId,
      'subscriptionPublicId',
    )}`,

  apiKeyDetail: (apiKeyPublicId: string) =>
    `/api-access/keys/${createPublicIdRouteSegment(apiKeyPublicId, 'apiKeyPublicId')}`,

  apiUsageDetail: (apiClientPublicId: string) =>
    `/api-access/usage/${createPublicIdRouteSegment(apiClientPublicId, 'apiClientPublicId')}`,

  webhookDetail: (webhookPublicId: string) =>
    `/api-access/webhooks/${createPublicIdRouteSegment(webhookPublicId, 'webhookPublicId')}`,

  webhookDeliveries: (webhookPublicId: string) =>
    `/api-access/webhooks/${createPublicIdRouteSegment(
      webhookPublicId,
      'webhookPublicId',
    )}/deliveries`,

  auditLogDetail: (auditLogPublicId: string) =>
    `/audit-logs/${createPublicIdRouteSegment(auditLogPublicId, 'auditLogPublicId')}`,
} as const;

export const DISALLOWED_ADMIN_FRONTEND_ROUTES = [
  '/auth/sign-up',
  '/onboarding',
  '/marketplace',
  '/api-partner/apply',
  '/public-dashboard',
] as const;

export const DETAIL_ROUTE_PATTERNS = [
  '/users/[userPublicId]',
  '/staff/[staffPublicId]',
  '/profiles/[profilePublicId]',
  '/companies/[companyPublicId]',
  '/properties/[propertyPublicId]',
  '/listings/[listingPublicId]',
  '/documents/[documentPublicId]',
  '/verification-reviews/[verificationReviewPublicId]',
  '/deal-reservations/[reservationPublicId]',
  '/deal-activities/[dealActivityPublicId]',
  '/payments/[paymentPublicId]',
  '/bookings/[bookingPublicId]',
  '/messages/[conversationPublicId]',
  '/audit-logs/[auditLogPublicId]',
] as const;
