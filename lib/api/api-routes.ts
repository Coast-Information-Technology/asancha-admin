// src/lib/api/api-routes.ts

/**
 * File purpose:
 * Defines frontend-safe backend route constants for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises API route paths so admin modules do not hardcode strings
 * repeatedly across hooks, services, forms, and tables.
 *
 * Key exports:
 * - API_ROUTES contains route builders for admin/staff API calls.
 * - buildApiRoute safely joins path segments.
 *
 * Business relevance:
 * Admin frontend code must use public IDs in route paths and must not expose
 * MongoDB ObjectIds. This file also avoids documenting or hardcoding live
 * backend base URLs inside source code.
 */

export const API_VERSION_PREFIX = '/api/v1';

type PublicId = string;

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

export function buildApiRoute(...segments: string[]): string {
  const cleanedSegments = segments.map(trimSlashes).filter(Boolean);

  return `/${cleanedSegments.join('/')}`;
}

export const API_ROUTES = {
  auth: {
    signIn: buildApiRoute(API_VERSION_PREFIX, 'auth', 'admin', 'sign-in'),
    forgotPassword: buildApiRoute(API_VERSION_PREFIX, 'auth', 'admin', 'forgot-password'),
    resetPassword: buildApiRoute(API_VERSION_PREFIX, 'auth', 'admin', 'reset-password'),
    setPassword: buildApiRoute(API_VERSION_PREFIX, 'auth', 'admin', 'set-password'),
    verifyStaffInvite: buildApiRoute(API_VERSION_PREFIX, 'auth', 'admin', 'verify-staff-invite'),
    me: buildApiRoute(API_VERSION_PREFIX, 'auth', 'me'),
    logout: buildApiRoute(API_VERSION_PREFIX, 'auth', 'logout'),
    refresh: buildApiRoute(API_VERSION_PREFIX, 'auth', 'refresh'),
  },

  dashboard: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'dashboard'),
    superAdmin: buildApiRoute(API_VERSION_PREFIX, 'admin', 'dashboard', 'super-admin'),
    admin: buildApiRoute(API_VERSION_PREFIX, 'admin', 'dashboard', 'admin'),
    customerCare: buildApiRoute(API_VERSION_PREFIX, 'admin', 'dashboard', 'customer-care'),
  },

  reviewQueues: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues'),
    profiles: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'profiles'),
    companies: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'companies'),
    properties: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'properties'),
    listings: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'listings'),
    documents: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'documents'),
    verificationReviews: buildApiRoute(
      API_VERSION_PREFIX,
      'admin',
      'review-queues',
      'verification-reviews',
    ),
    payments: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'payments'),
    dealReservations: buildApiRoute(
      API_VERSION_PREFIX,
      'admin',
      'review-queues',
      'deal-reservations',
    ),
    bookings: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'bookings'),
    apiPartners: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'api-partners'),
    ai: buildApiRoute(API_VERSION_PREFIX, 'admin', 'review-queues', 'ai'),
  },

  users: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'users'),
    publicUsers: buildApiRoute(API_VERSION_PREFIX, 'admin', 'users', 'public'),
    suspended: buildApiRoute(API_VERSION_PREFIX, 'admin', 'users', 'suspended'),
    search: buildApiRoute(API_VERSION_PREFIX, 'admin', 'users', 'search'),
    detail: (userPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'users', userPublicId),
    setStatus: (userPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'users', userPublicId, 'status'),
    setRole: (userPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'users', userPublicId, 'role'),
  },

  staff: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'staff'),
    create: buildApiRoute(API_VERSION_PREFIX, 'admin', 'staff'),
    detail: (staffPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'staff', staffPublicId),
    profile: (staffPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'staff', staffPublicId, 'profile'),
    security: (staffPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'staff', staffPublicId, 'security'),
    permissions: (staffPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'staff', staffPublicId, 'permissions'),
  },

  profiles: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'profiles'),
    investors: buildApiRoute(API_VERSION_PREFIX, 'admin', 'profiles', 'investors'),
    propertyOwners: buildApiRoute(API_VERSION_PREFIX, 'admin', 'profiles', 'property-owners'),
    propertyAgents: buildApiRoute(API_VERSION_PREFIX, 'admin', 'profiles', 'property-agents'),
    propertySourcers: buildApiRoute(API_VERSION_PREFIX, 'admin', 'profiles', 'property-sourcers'),
    serviceProviders: buildApiRoute(API_VERSION_PREFIX, 'admin', 'profiles', 'service-providers'),
    detail: (profilePublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'profiles', profilePublicId),
  },

  companies: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'companies'),
    detail: (companyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'companies', companyPublicId),
    members: (companyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'companies', companyPublicId, 'members'),
    documents: (companyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'companies', companyPublicId, 'documents'),
    verification: (companyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'companies', companyPublicId, 'verification'),
  },

  properties: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'properties'),
    detail: (propertyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'properties', propertyPublicId),
    documents: (propertyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'properties', propertyPublicId, 'documents'),
    listings: (propertyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'properties', propertyPublicId, 'listings'),
    activities: (propertyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'properties', propertyPublicId, 'activities'),
  },

  listings: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'listings'),
    detail: (listingPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'listings', listingPublicId),
    review: (listingPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'listings', listingPublicId, 'review'),
    visibility: (listingPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'listings', listingPublicId, 'visibility'),
    activities: (listingPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'listings', listingPublicId, 'activities'),
    audit: (listingPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'listings', listingPublicId, 'audit'),
  },

  documents: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'documents'),
    status: buildApiRoute(API_VERSION_PREFIX, 'admin', 'documents', 'status'),
    detail: (documentPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'documents', documentPublicId),
    review: (documentPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'documents', documentPublicId, 'review'),
    history: (documentPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'documents', documentPublicId, 'history'),
  },

  verificationReviews: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'verification-reviews'),
    status: buildApiRoute(API_VERSION_PREFIX, 'admin', 'verification-reviews', 'status'),
    detail: (verificationReviewPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'verification-reviews',
        verificationReviewPublicId,
      ),
    review: (verificationReviewPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'verification-reviews',
        verificationReviewPublicId,
        'review',
      ),
    documents: (verificationReviewPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'verification-reviews',
        verificationReviewPublicId,
        'documents',
      ),
    messages: (verificationReviewPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'verification-reviews',
        verificationReviewPublicId,
        'messages',
      ),
    audit: (verificationReviewPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'verification-reviews',
        verificationReviewPublicId,
        'audit',
      ),
  },

  dealReservations: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'deal-reservations'),
    detail: (reservationPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'deal-reservations', reservationPublicId),
    payment: (reservationPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'deal-reservations',
        reservationPublicId,
        'payment',
      ),
    messages: (reservationPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'deal-reservations',
        reservationPublicId,
        'messages',
      ),
    activities: (reservationPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'deal-reservations',
        reservationPublicId,
        'activities',
      ),
  },

  dealActivities: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'deal-activities'),
    detail: (dealActivityPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'deal-activities', dealActivityPublicId),
  },

  payments: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'payments'),
    status: buildApiRoute(API_VERSION_PREFIX, 'admin', 'payments', 'status'),
    references: buildApiRoute(API_VERSION_PREFIX, 'admin', 'payments', 'references'),
    referenceDetail: (paymentReference: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'payments', 'references', paymentReference),
    detail: (paymentPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'payments', paymentPublicId),
    review: (paymentPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'payments', paymentPublicId, 'review'),
    trace: (paymentPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'payments', paymentPublicId, 'trace'),
  },

  bookings: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'bookings'),
    create: buildApiRoute(API_VERSION_PREFIX, 'admin', 'bookings'),
    support: buildApiRoute(API_VERSION_PREFIX, 'admin', 'bookings', 'support'),
    detail: (bookingPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'bookings', bookingPublicId),
    reschedule: (bookingPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'bookings', bookingPublicId, 'reschedule'),
  },

  messages: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'messages'),
    assigned: buildApiRoute(API_VERSION_PREFIX, 'admin', 'messages', 'assigned'),
    conversation: (conversationPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'messages', conversationPublicId),
  },

  notifications: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'notifications'),
    templates: buildApiRoute(API_VERSION_PREFIX, 'admin', 'notifications', 'templates'),
    createSystem: buildApiRoute(API_VERSION_PREFIX, 'admin', 'notifications', 'system'),
    createUser: buildApiRoute(API_VERSION_PREFIX, 'admin', 'notifications', 'user'),
    preferences: buildApiRoute(API_VERSION_PREFIX, 'admin', 'notifications', 'preferences'),
  },

  apiAccess: {
    applications: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'applications'),
    applicationDetail: (applicationPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'api-access',
        'applications',
        applicationPublicId,
      ),
    clients: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'clients'),
    clientDetail: (apiClientPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'clients', apiClientPublicId),
    plans: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'plans'),
    planDetail: (apiPlanPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'plans', apiPlanPublicId),
    subscriptions: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'subscriptions'),
    subscriptionDetail: (subscriptionPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'api-access',
        'subscriptions',
        subscriptionPublicId,
      ),
    keys: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'keys'),
    keyDetail: (apiKeyPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'keys', apiKeyPublicId),
    usage: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'usage'),
    clientUsage: (apiClientPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'usage', apiClientPublicId),
    webhooks: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'webhooks'),
    webhookDetail: (webhookPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'webhooks', webhookPublicId),
    webhookDeliveries: (webhookPublicId: PublicId) =>
      buildApiRoute(
        API_VERSION_PREFIX,
        'admin',
        'api-access',
        'webhooks',
        webhookPublicId,
        'deliveries',
      ),
    billing: buildApiRoute(API_VERSION_PREFIX, 'admin', 'api-access', 'billing'),
  },

  ai: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'ai'),
    recommendations: buildApiRoute(API_VERSION_PREFIX, 'admin', 'ai', 'recommendations'),
    matchingSnapshots: buildApiRoute(API_VERSION_PREFIX, 'admin', 'ai', 'matching-snapshots'),
    analysisRuns: buildApiRoute(API_VERSION_PREFIX, 'admin', 'ai', 'analysis-runs'),
    feedback: buildApiRoute(API_VERSION_PREFIX, 'admin', 'ai', 'feedback'),
  },

  auditLogs: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs'),
    highRisk: buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs', 'high-risk'),
    staff: buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs', 'staff'),
    payments: buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs', 'payments'),
    verification: buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs', 'verification'),
    documents: buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs', 'documents'),
    apiAccess: buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs', 'api-access'),
    detail: (auditLogPublicId: PublicId) =>
      buildApiRoute(API_VERSION_PREFIX, 'admin', 'audit-logs', auditLogPublicId),
  },

  settings: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'settings'),
    permissions: buildApiRoute(API_VERSION_PREFIX, 'admin', 'settings', 'permissions'),
    policies: buildApiRoute(API_VERSION_PREFIX, 'admin', 'settings', 'policies'),
    emailTemplates: buildApiRoute(API_VERSION_PREFIX, 'admin', 'settings', 'email-templates'),
    notificationTemplates: buildApiRoute(
      API_VERSION_PREFIX,
      'admin',
      'settings',
      'notification-templates',
    ),
    apiAccess: buildApiRoute(API_VERSION_PREFIX, 'admin', 'settings', 'api-access'),
    integrations: buildApiRoute(API_VERSION_PREFIX, 'admin', 'settings', 'integrations'),
    system: buildApiRoute(API_VERSION_PREFIX, 'admin', 'settings', 'system'),
  },

  myProfile: {
    root: buildApiRoute(API_VERSION_PREFIX, 'admin', 'my-profile'),
    security: buildApiRoute(API_VERSION_PREFIX, 'admin', 'my-profile', 'security'),
    notifications: buildApiRoute(API_VERSION_PREFIX, 'admin', 'my-profile', 'notifications'),
    activity: buildApiRoute(API_VERSION_PREFIX, 'admin', 'my-profile', 'activity'),
  },

  system: {
    status: buildApiRoute(API_VERSION_PREFIX, 'admin', 'system', 'status'),
  },
} as const;
