# Asancha Admin Route and Navigation Map

Version: v1.0

This is the frontend route and navigation reference for the internal Asancha
admin/staff application. Backend authorization remains final.

## Allowed staff roles

- `super_admin`
- `admin`
- `customer_care_rep`

Public users, guests, API partners, and business-role users do not use this
frontend as staff users.

## Global shell navigation

The desktop top bar contains:

- Asancha Admin branding
- Global search
- Review queue shortcut
- Messages
- Notifications
- Current staff account menu

Help/Support is not a top-bar item. Messages is the frontend label for staff
communication; backend conversations remain thread containers.

The mobile top bar and drawer expose the same operational destinations in a
responsive form.

## Sidebar module groups

Super admin navigation may include:

- Dashboard
- Review Queues
- Onboarding
- Records
  - Users
  - Staff
  - Profiles
  - Companies
  - Properties
  - Listings
  - Documents
  - Verification Reviews
- Operations
  - Deal Reservations
  - Deal Activities
  - Payments
  - Bookings
- Communication
  - Messages
  - Notifications
- Governance
  - API Access
  - AI Insights
  - Audit Logs
  - Settings
- My Staff Account

Admin navigation includes the permitted operational modules but excludes
super-admin-only controls. It includes the Onboarding review workspace for
onboarding progress and submitted-record review. Customer care navigation is
limited to dashboard, safe user support, booking support, messages, document
status, verification status, payment status, notifications, and My Staff
Account.

Sidebar modules may expand into their approved list, queue, and role-filter
destinations. Review Queues, Onboarding, Users, Staff, and Profiles are
intentionally single sidebar destinations; their individual queues, status
filters, search views, role filters, and staff actions are available as cards,
filters, buttons, and links on their respective main pages. Detail pages remain
reachable from rows and related links. Create Staff remains limited by the
staff role and must never offer frontend creation of a super_admin account.

## Approved route groups

```txt
/auth/sign-in
/auth/forgot-password
/auth/reset-password
/auth/set-password
/auth/verify-staff-invite
/auth/locked
/auth/unauthorized

/dashboard
/dashboard/super-admin
/dashboard/admin
/dashboard/customer-care

/review-queues
/review-queues/profiles
/review-queues/companies
/review-queues/properties
/review-queues/listings
/review-queues/documents
/review-queues/verification-reviews
/review-queues/payments
/review-queues/deal-reservations
/review-queues/bookings
/review-queues/api-partners
/review-queues/ai

/onboarding

/users
/users/public
/users/suspended
/users/search
/users/[userPublicId]

/staff
/staff/new
/staff/[staffPublicId]
/staff/[staffPublicId]/profile
/staff/[staffPublicId]/security
/staff/[staffPublicId]/permissions

/profiles
/profiles/investors
/profiles/property-owners
/profiles/property-agents
/profiles/property-sourcers
/profiles/service-providers
/profiles/[profilePublicId]

/companies
/companies/[companyPublicId]
/companies/[companyPublicId]/members
/companies/[companyPublicId]/documents
/companies/[companyPublicId]/verification

/properties
/properties/[propertyPublicId]
/properties/[propertyPublicId]/documents
/properties/[propertyPublicId]/listings
/properties/[propertyPublicId]/activities

/listings
/listings/[listingPublicId]
/listings/[listingPublicId]/review
/listings/[listingPublicId]/visibility
/listings/[listingPublicId]/activities
/listings/[listingPublicId]/audit

/documents
/documents/status
/documents/[documentPublicId]
/documents/[documentPublicId]/review
/documents/[documentPublicId]/history

/verification-reviews
/verification-reviews/status
/verification-reviews/[verificationReviewPublicId]
/verification-reviews/[verificationReviewPublicId]/review
/verification-reviews/[verificationReviewPublicId]/documents
/verification-reviews/[verificationReviewPublicId]/messages
/verification-reviews/[verificationReviewPublicId]/audit

/deal-reservations
/deal-reservations/[reservationPublicId]
/deal-reservations/[reservationPublicId]/payment
/deal-reservations/[reservationPublicId]/messages
/deal-reservations/[reservationPublicId]/activities

/deal-activities
/deal-activities/[dealActivityPublicId]

/payments
/payments/status
/payments/references
/payments/references/[paymentReference]
/payments/[paymentPublicId]
/payments/[paymentPublicId]/review
/payments/[paymentPublicId]/trace

/bookings
/bookings/new
/bookings/support
/bookings/[bookingPublicId]
/bookings/[bookingPublicId]/reschedule

/messages
/messages/assigned
/messages/[conversationPublicId]

/notifications
/notifications/templates
/notifications/system/new
/notifications/user/new
/notifications/preferences

/api-access/applications
/api-access/clients
/api-access/plans
/api-access/subscriptions
/api-access/keys
/api-access/usage
/api-access/webhooks
/api-access/billing

/ai
/ai/recommendations
/ai/matching-snapshots
/ai/analysis-runs
/ai/feedback

/audit-logs
/audit-logs/high-risk
/audit-logs/staff
/audit-logs/payments
/audit-logs/verification
/audit-logs/documents
/audit-logs/api-access
/audit-logs/[auditLogPublicId]

/settings
/settings/permissions
/settings/policies
/settings/email-templates
/settings/notification-templates
/settings/api-access
/settings/integrations
/settings/system

/my-profile
/my-profile/security
/my-profile/notifications
/my-profile/activity

/system/status
```

## Route rules

- List, queue, search, and workspace routes may be sidebar destinations.
- Detail routes must be reached from rows, queue items, search results, or related links.
- Route parameters must use public identifiers.
- Customer care must not access staff management, audit logs, settings, API
  access approval, or restricted approval controls.
- Frontend route checks guide UX only; backend authorization must enforce access.
