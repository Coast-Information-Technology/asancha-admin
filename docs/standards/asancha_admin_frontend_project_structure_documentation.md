asancha-admin/
|-- public/
| |-- favicon.ico
| |-- icons/
| |-- images/
| |-- logo/
| `-- robots.txt
|
|-- app/
| |-- layout.tsx
| |-- page.tsx
| |-- loading.tsx
| |-- error.tsx
| |-- not-found.tsx
| |-- global-error.tsx
| |
| |-- auth/
| | |-- layout.tsx
| | |-- sign-in/page.tsx
| | |-- forgot-password/page.tsx
| | |-- reset-password/page.tsx
| | |-- set-password/page.tsx
| | |-- verify-staff-invite/page.tsx
| | |-- locked/page.tsx
| | `-- unauthorized/page.tsx
| |
| |-- dashboard/
| | |-- layout.tsx
| | |-- page.tsx
| | |-- super-admin/page.tsx
| | |-- admin/page.tsx
| | `-- customer-care/page.tsx
| |
| |-- review-queues/
| | |-- page.tsx
| | |-- profiles/page.tsx
| | |-- companies/page.tsx
| | |-- properties/page.tsx
| | |-- listings/page.tsx
| | |-- documents/page.tsx
| | |-- verification-reviews/page.tsx
| | |-- payments/page.tsx
| | |-- deal-reservations/page.tsx
| | |-- bookings/page.tsx
| | |-- api-partners/page.tsx
| | `-- ai/page.tsx
| |
| |-- users/
| | |-- page.tsx
| | |-- public/page.tsx
| | |-- suspended/page.tsx
| | |-- search/page.tsx
| | |-- [userPublicId]/
| | | |-- page.tsx
| | `-- _components/
| | |-- user-detail-tabs.tsx
| | |-- user-overview-tab.tsx
| | |-- user-profiles-tab.tsx
| | |-- user-companies-tab.tsx
| | |-- user-properties-tab.tsx
| | |-- user-listings-tab.tsx
| | |-- user-deal-reservations-tab.tsx
| | |-- user-bookings-tab.tsx
| | |-- user-payments-tab.tsx
| | |-- user-documents-tab.tsx
| | |-- user-verification-tab.tsx
| | |-- user-messages-tab.tsx
| | |-- user-notifications-tab.tsx
| | `-- user-audit-trail-tab.tsx
| |
| |-- staff/
| | |-- page.tsx
| | |-- new/page.tsx
| | `-- [staffPublicId]/
| | |-- page.tsx
| | |-- profile/page.tsx
| | |-- security/page.tsx
| | `-- permissions/page.tsx
| |
| |-- profiles/
| | |-- page.tsx
| | |-- investors/page.tsx
| | |-- property-owners/page.tsx
| | |-- property-agents/page.tsx
| | |-- property-sourcers/page.tsx
| | |-- service-providers/page.tsx
| | `-- [profilePublicId]/page.tsx
| |
| |-- companies/
| | |-- page.tsx
| | `-- [companyPublicId]/
| | |-- page.tsx
| | |-- members/page.tsx
| | |-- documents/page.tsx
| | `-- verification/page.tsx
| |
| |-- properties/
| | |-- page.tsx
| | `-- [propertyPublicId]/
| | |-- page.tsx
| | |-- documents/page.tsx
| | |-- listings/page.tsx
| | `-- activities/page.tsx
| |
| |-- listings/
| | |-- page.tsx
| | `-- [listingPublicId]/
| | |-- page.tsx
| | |-- review/page.tsx
| | |-- visibility/page.tsx
| | |-- activities/page.tsx
| | `-- audit/page.tsx
| |
| |-- documents/
| | |-- page.tsx
| | |-- status/page.tsx
| | `-- [documentPublicId]/
| | |-- page.tsx
| | |-- review/page.tsx
| | `-- history/page.tsx
| |
| |-- verification-reviews/
| | |-- page.tsx
| | |-- status/page.tsx
| | `-- [verificationReviewPublicId]/
| | |-- page.tsx
| | |-- review/page.tsx
| | |-- documents/page.tsx
| | |-- messages/page.tsx
| | `-- audit/page.tsx
| |
| |-- deal-reservations/
| | |-- page.tsx
| | `-- [reservationPublicId]/
| | |-- page.tsx
| | |-- payment/page.tsx
| | |-- messages/page.tsx
| | `-- activities/page.tsx
| |
| |-- deal-activities/
| | |-- page.tsx
| | `-- [dealActivityPublicId]/page.tsx
| |
| |-- payments/
| | |-- page.tsx
| | |-- status/page.tsx
| | |-- references/
| | | |-- page.tsx
| | | `-- [paymentReference]/page.tsx
| | `-- [paymentPublicId]/
| | |-- page.tsx
| | |-- review/page.tsx
| | `-- trace/page.tsx
| |
| |-- bookings/
| | |-- page.tsx
| | |-- new/page.tsx
| | |-- support/page.tsx
| | `-- [bookingPublicId]/
| | |-- page.tsx
| | `-- reschedule/page.tsx
| |
| |-- messages/
| | |-- page.tsx
| | |-- assigned/page.tsx
| | `-- [conversationPublicId]/page.tsx
| |
| |-- notifications/
| | |-- page.tsx
| | |-- templates/page.tsx
| | |-- system/new/page.tsx
| | |-- user/new/page.tsx
| | `-- preferences/page.tsx
| |
| |-- api-access/
| | |-- applications/
| | | |-- page.tsx
| | | `-- [applicationPublicId]/page.tsx
| | |-- clients/
| | | |-- page.tsx
| | | `-- [apiClientPublicId]/page.tsx
| | |-- plans/
| | | |-- page.tsx
| | | `-- [apiPlanPublicId]/page.tsx
| | |-- subscriptions/
| | | |-- page.tsx
| | | `-- [subscriptionPublicId]/page.tsx
| | |-- keys/
| | | |-- page.tsx
| | | `-- [apiKeyPublicId]/page.tsx
| | |-- usage/
| | | |-- page.tsx
| | | `-- [apiClientPublicId]/page.tsx
| | |-- webhooks/
| | | |-- page.tsx
| | | `-- [webhookPublicId]/
| | | |-- page.tsx
| | | `-- deliveries/page.tsx
| | `-- billing/page.tsx
| |
| |-- ai/
| | |-- page.tsx
| | |-- recommendations/page.tsx
| | |-- matching-snapshots/page.tsx
| | |-- analysis-runs/page.tsx
| | `-- feedback/page.tsx
| |
| |-- audit-logs/
| | |-- page.tsx
| | |-- high-risk/page.tsx
| | |-- staff/page.tsx
| | |-- payments/page.tsx
| | |-- verification/page.tsx
| | |-- documents/page.tsx
| | |-- api-access/page.tsx
| | `-- [auditLogPublicId]/page.tsx
| |
| |-- settings/
| | |-- page.tsx
| | |-- permissions/page.tsx
| | |-- policies/page.tsx
| | |-- email-templates/page.tsx
| | |-- notification-templates/page.tsx
| | |-- api-access/page.tsx
| | |-- integrations/page.tsx
| | `-- system/page.tsx
| |
| |-- my-profile/
| | |-- page.tsx
| | |-- security/page.tsx
| | |-- notifications/page.tsx
| | `-- activity/page.tsx
| |
| `-- system/
| `-- status/page.tsx
|
|-- src/
| |-- components/
| | |-- ui/
| | | |-- button/
| | | | |-- button.tsx
| | | | `-- button.module.css
| | | |-- input/
| | | | |-- input.tsx
| | | | `-- input.module.css
| | | |-- select/
| | | | |-- select.tsx
| | | | `-- select.module.css
| | | |-- checkbox/
| | | | |-- checkbox.tsx
| | | | `-- checkbox.module.css
| | | |-- textarea/
| | | | |-- textarea.tsx
| | | | `-- textarea.module.css
| | | |-- dialog/
| | | | |-- dialog.tsx
| | | | `-- dialog.module.css
| | | |-- drawer/
| | | | |-- drawer.tsx
| | | | `-- drawer.module.css
| | | |-- modal/
| | | | |-- modal.tsx
| | | | `-- modal.module.css
| | | |-- table/
| | | | |-- table.tsx
| | | | `-- table.module.css
| | | |-- data-table/
| | | | |-- data-table.tsx
| | | | `-- data-table.module.css
| | | |-- badge/
| | | | |-- badge.tsx
| | | | `-- badge.module.css
| | | |-- card/
| | | | |-- card.tsx
| | | | `-- card.module.css
| | | |-- tabs/
| | | | |-- tabs.tsx
| | | | `-- tabs.module.css
| | | |-- toast/
| | | | |-- toast.tsx
| | | | `-- toast.module.css
| | | |-- dropdown-menu/
| | | | |-- dropdown-menu.tsx
| | | | `-- dropdown-menu.module.css
| | | |-- command-menu/
| | | | |-- command-menu.tsx
| | | | `-- command-menu.module.css
| | | |-- alert/
| | | | |-- alert.tsx
| | | | `-- alert.module.css
| | | `-- skeleton/
| | | |-- skeleton.tsx
| | | `-- skeleton.module.css
| | |
| | |-- layout/
| | | |-- admin-shell/
| | | | |-- admin-shell.tsx
| | | | `-- admin-shell.module.css
| | | |-- admin-top-bar/
| | | | |-- admin-top-bar.tsx
| | | | `-- admin-top-bar.module.css
| | | |-- admin-sidebar/
| | | | |-- admin-sidebar.tsx
| | | | `-- admin-sidebar.module.css
| | | |-- mobile-admin-top-bar/
| | | | |-- mobile-admin-top-bar.tsx
| | | | `-- mobile-admin-top-bar.module.css
| | | |-- mobile-admin-drawer/
| | | | |-- mobile-admin-drawer.tsx
| | | | `-- mobile-admin-drawer.module.css
| | | |-- staff-avatar-menu/
| | | | |-- staff-avatar-menu.tsx
| | | | `-- staff-avatar-menu.module.css
| | | `-- page-shell/
| | | |-- page-shell.tsx
| | | `-- page-shell.module.css
| | |
| | |-- auth/
| | | |-- staff-sign-in-form.tsx
| | | |-- forgot-password-form.tsx
| | | |-- reset-password-form.tsx
| | | |-- set-password-form.tsx
| | | `-- auth.module.css
| | |
| | |-- dashboard/
| | | |-- admin-dashboard-card.tsx
| | | |-- review-queue-summary-card.tsx
| | | |-- staff-activity-summary-card.tsx
| | | |-- operational-alert-card.tsx
| | | |-- customer-care-summary-card.tsx
| | | `-- dashboard.module.css
| | |
| | |-- review-queues/
| | | |-- review-queue-card.tsx
| | | |-- review-queue-table.tsx
| | | |-- review-priority-badge.tsx
| | | `-- review-queues.module.css
| | |
| | |-- users/
| | | |-- users-table.tsx
| | | |-- user-status-badge.tsx
| | | |-- user-role-badge.tsx
| | | |-- user-detail-header.tsx
| | | |-- user-detail-tabs.tsx
| | | `-- users.module.css
| | |
| | |-- staff/
| | | |-- staff-table.tsx
| | | |-- create-staff-form.tsx
| | | |-- staff-role-badge.tsx
| | | |-- staff-status-badge.tsx
| | | `-- staff.module.css
| | |
| | |-- profiles/
| | | |-- profiles-table.tsx
| | | |-- profile-type-badge.tsx
| | | |-- profile-status-badge.tsx
| | | `-- profiles.module.css
| | |
| | |-- documents/
| | | |-- documents-table.tsx
| | | |-- document-review-panel.tsx
| | | |-- document-status-badge.tsx
| | | |-- document-history-list.tsx
| | | `-- documents.module.css
| | |
| | |-- verification-reviews/
| | | |-- verification-review-table.tsx
| | | |-- verification-review-panel.tsx
| | | |-- verification-status-badge.tsx
| | | |-- risk-rating-badge.tsx
| | | `-- verification-reviews.module.css
| | |
| | |-- payments/
| | | |-- payments-table.tsx
| | | |-- payment-review-panel.tsx
| | | |-- payment-reference-card.tsx
| | | |-- payment-status-badge.tsx
| | | `-- payments.module.css
| | |
| | |-- deal-reservations/
| | | |-- deal-reservations-table.tsx
| | | |-- reservation-status-badge.tsx
| | | |-- reservation-detail-card.tsx
| | | `-- deal-reservations.module.css
| | |
| | |-- deal-activities/
| | | |-- deal-activity-table.tsx
| | | |-- deal-activity-timeline.tsx
| | | `-- deal-activities.module.css
| | |
| | |-- bookings/
| | | |-- bookings-table.tsx
| | | |-- create-booking-form.tsx
| | | |-- booking-status-badge.tsx
| | | |-- booking-participants-list.tsx
| | | `-- bookings.module.css
| | |
| | |-- messages/
| | | |-- messages-table.tsx
| | | |-- message-thread.tsx
| | | |-- message-composer.tsx
| | | |-- message-type-badge.tsx
| | | `-- messages.module.css
| | |
| | |-- notifications/
| | | |-- notification-bell.tsx
| | | |-- admin-notification-list.tsx
| | | |-- notification-template-table.tsx
| | | |-- send-system-notification-form.tsx
| | | |-- send-user-notification-form.tsx
| | | `-- notifications.module.css
| | |
| | |-- api-access/
| | | |-- api-partner-applications-table.tsx
| | | |-- api-clients-table.tsx
| | | |-- api-key-metadata-table.tsx
| | | |-- api-usage-summary-card.tsx
| | | |-- webhook-deliveries-table.tsx
| | | `-- api-access.module.css
| | |
| | |-- ai/
| | | |-- ai-analysis-runs-table.tsx
| | | |-- ai-recommendations-table.tsx
| | | |-- matching-snapshots-table.tsx
| | | |-- ai-feedback-table.tsx
| | | `-- ai.module.css
| | |
| | |-- audit-logs/
| | | |-- audit-logs-table.tsx
| | | |-- audit-log-detail.tsx
| | | |-- audit-category-badge.tsx
| | | |-- audit-status-badge.tsx
| | | `-- audit-logs.module.css
| | |
| | `-- settings/
| | |-- settings-card.tsx
| | |-- permission-settings-table.tsx
| | |-- email-template-settings-table.tsx
| | |-- notification-template-settings-table.tsx
| | `-- settings.module.css
| |
| |-- features/
| | |-- auth/
| | | |-- api/auth.api.ts
| | | |-- schemas/
| | | | |-- staff-sign-in.schema.ts
| | | | |-- forgot-password.schema.ts
| | | | |-- reset-password.schema.ts
| | | | `-- set-password.schema.ts
| | | |-- hooks/
| | | | |-- use-staff-sign-in.ts
| | | | |-- use-staff-session.ts
| | | | |-- use-forgot-password.ts
| | | | `-- use-reset-password.ts
| | | |-- types/auth.types.ts
| | | `-- constants/auth.constants.ts
| | |
| | |-- dashboard/
| | | |-- api/dashboard.api.ts
| | | |-- hooks/
| | | | |-- use-admin-dashboard-state.ts
| | | | |-- use-review-queue-summary.ts
| | | | `-- use-staff-dashboard-state.ts
| | | |-- types/dashboard.types.ts
| | | `-- constants/dashboard.constants.ts
| | |
| | |-- review-queues/
| | | |-- api/review-queues.api.ts
| | | |-- hooks/
| | | | |-- use-review-queues.ts
| | | | `-- use-review-queue-items.ts
| | | |-- types/review-queues.types.ts
| | | `-- constants/review-queues.constants.ts
| | |
| | |-- users/
| | | |-- api/users.api.ts
| | | |-- schemas/
| | | | |-- user-query.schema.ts
| | | | |-- set-user-status.schema.ts
| | | | `-- set-user-role.schema.ts
| | | |-- hooks/
| | | | |-- use-users.ts
| | | | |-- use-user-detail.ts
| | | | `-- use-update-user-status.ts
| | | `-- types/users.types.ts
| | |
| | |-- staff/
| | | |-- api/staff.api.ts
| | | |-- schemas/
| | | | |-- create-staff.schema.ts
| | | | |-- update-staff-status.schema.ts
| | | | `-- update-staff-role.schema.ts
| | | |-- hooks/
| | | | |-- use-staff-list.ts
| | | | |-- use-staff-detail.ts
| | | | `-- use-create-staff.ts
| | | `-- types/staff.types.ts
| | |
| | |-- profiles/
| | | |-- api/profiles.api.ts
| | | |-- schemas/
| | | | |-- profiles-query.schema.ts
| | | | `-- profiles-action.schema.ts
| | | |-- hooks/
| | | | |-- use-profiles-list.ts
| | | | |-- use-profiles-detail.ts
| | | | `-- use-profiles-action.ts
| | | |-- types/profiles.types.ts
| | | `-- constants/profiles.constants.ts
| | |
| | |-- companies/
| | | |-- api/companies.api.ts
| | | |-- schemas/
| | | | |-- companies-query.schema.ts
| | | | `-- companies-action.schema.ts
| | | |-- hooks/
| | | | |-- use-companies-list.ts
| | | | |-- use-companies-detail.ts
| | | | `-- use-companies-action.ts
| | | |-- types/companies.types.ts
| | | `-- constants/companies.constants.ts
| | |
| | |-- properties/
| | | |-- api/properties.api.ts
| | | |-- schemas/
| | | | |-- properties-query.schema.ts
| | | | `-- properties-action.schema.ts
| | | |-- hooks/
| | | | |-- use-properties-list.ts
| | | | |-- use-properties-detail.ts
| | | | `-- use-properties-action.ts
| | | |-- types/properties.types.ts
| | | `-- constants/properties.constants.ts
| | |
| | |-- listings/
| | | |-- api/listings.api.ts
| | | |-- schemas/
| | | | |-- listings-query.schema.ts
| | | | `-- listings-action.schema.ts
| | | |-- hooks/
| | | | |-- use-listings-list.ts
| | | | |-- use-listings-detail.ts
| | | | `-- use-listings-action.ts
| | | |-- types/listings.types.ts
| | | `-- constants/listings.constants.ts
| | |
| | |-- documents/
| | | |-- api/documents.api.ts
| | | |-- schemas/
| | | | |-- documents-query.schema.ts
| | | | `-- documents-action.schema.ts
| | | |-- hooks/
| | | | |-- use-documents-list.ts
| | | | |-- use-documents-detail.ts
| | | | `-- use-documents-action.ts
| | | |-- types/documents.types.ts
| | | `-- constants/documents.constants.ts
| | |
| | |-- verification-reviews/
| | | |-- api/verification-reviews.api.ts
| | | |-- schemas/
| | | | |-- verification-reviews-query.schema.ts
| | | | `-- verification-reviews-action.schema.ts
| | | |-- hooks/
| | | | |-- use-verification-reviews-list.ts
| | | | |-- use-verification-reviews-detail.ts
| | | | `-- use-verification-reviews-action.ts
| | | |-- types/verification-reviews.types.ts
| | | `-- constants/verification-reviews.constants.ts
| | |
| | |-- deal-reservations/
| | | |-- api/deal-reservations.api.ts
| | | |-- schemas/
| | | | |-- deal-reservations-query.schema.ts
| | | | `-- deal-reservations-action.schema.ts
| | | |-- hooks/
| | | | |-- use-deal-reservations-list.ts
| | | | |-- use-deal-reservations-detail.ts
| | | | `-- use-deal-reservations-action.ts
| | | |-- types/deal-reservations.types.ts
| | | `-- constants/deal-reservations.constants.ts
| | |
| | |-- deal-activities/
| | | |-- api/deal-activities.api.ts
| | | |-- schemas/
| | | | |-- deal-activities-query.schema.ts
| | | | `-- deal-activities-action.schema.ts
| | | |-- hooks/
| | | | |-- use-deal-activities-list.ts
| | | | |-- use-deal-activities-detail.ts
| | | | `-- use-deal-activities-action.ts
| | | |-- types/deal-activities.types.ts
| | | `-- constants/deal-activities.constants.ts
| | |
| | |-- payments/
| | | |-- api/payments.api.ts
| | | |-- schemas/
| | | | |-- payments-query.schema.ts
| | | | `-- payments-action.schema.ts
| | | |-- hooks/
| | | | |-- use-payments-list.ts
| | | | |-- use-payments-detail.ts
| | | | `-- use-payments-action.ts
| | | |-- types/payments.types.ts
| | | `-- constants/payments.constants.ts
| | |
| | |-- bookings/
| | | |-- api/bookings.api.ts
| | | |-- schemas/
| | | | |-- bookings-query.schema.ts
| | | | `-- bookings-action.schema.ts
| | | |-- hooks/
| | | | |-- use-bookings-list.ts
| | | | |-- use-bookings-detail.ts
| | | | `-- use-bookings-action.ts
| | | |-- types/bookings.types.ts
| | | `-- constants/bookings.constants.ts
| | |
| | |-- messages/
| | | |-- api/messages.api.ts
| | | |-- schemas/
| | | | |-- messages-query.schema.ts
| | | | `-- messages-action.schema.ts
| | | |-- hooks/
| | | | |-- use-messages-list.ts
| | | | |-- use-messages-detail.ts
| | | | `-- use-messages-action.ts
| | | |-- types/messages.types.ts
| | | `-- constants/messages.constants.ts
| | |
| | |-- notifications/
| | | |-- api/notifications.api.ts
| | | |-- schemas/
| | | | |-- notifications-query.schema.ts
| | | | `-- notifications-action.schema.ts
| | | |-- hooks/
| | | | |-- use-notifications-list.ts
| | | | |-- use-notifications-detail.ts
| | | | `-- use-notifications-action.ts
| | | |-- types/notifications.types.ts
| | | `-- constants/notifications.constants.ts
| | |
| | |-- api-access/
| | | |-- api/api-access.api.ts
| | | |-- schemas/
| | | | |-- api-access-query.schema.ts
| | | | `-- api-access-action.schema.ts
| | | |-- hooks/
| | | | |-- use-api-access-list.ts
| | | | |-- use-api-access-detail.ts
| | | | `-- use-api-access-action.ts
| | | |-- types/api-access.types.ts
| | | `-- constants/api-access.constants.ts
| | |
| | |-- ai/
| | | |-- api/ai.api.ts
| | | |-- schemas/
| | | | |-- ai-query.schema.ts
| | | | `-- ai-action.schema.ts
| | | |-- hooks/
| | | | |-- use-ai-list.ts
| | | | |-- use-ai-detail.ts
| | | | `-- use-ai-action.ts
| | | |-- types/ai.types.ts
| | | `-- constants/ai.constants.ts
| | |
| | |-- audit-logs/
| | | |-- api/audit-logs.api.ts
| | | |-- schemas/
| | | | |-- audit-logs-query.schema.ts
| | | | `-- audit-logs-action.schema.ts
| | | |-- hooks/
| | | | |-- use-audit-logs-list.ts
| | | | |-- use-audit-logs-detail.ts
| | | | `-- use-audit-logs-action.ts
| | | |-- types/audit-logs.types.ts
| | | `-- constants/audit-logs.constants.ts
| | |
| | |-- settings/
| | | |-- api/settings.api.ts
| | | |-- schemas/
| | | | |-- settings-query.schema.ts
| | | | `-- settings-action.schema.ts
| | | |-- hooks/
| | | | |-- use-settings-list.ts
| | | | |-- use-settings-detail.ts
| | | | `-- use-settings-action.ts
| | | |-- types/settings.types.ts
| | | `-- constants/settings.constants.ts
| | |
| | |-- my-profile/
| | | |-- api/my-profile.api.ts
| | | |-- schemas/
| | | | |-- my-profile-query.schema.ts
| | | | `-- my-profile-action.schema.ts
| | | |-- hooks/
| | | | |-- use-my-profile-list.ts
| | | | |-- use-my-profile-detail.ts
| | | | `-- use-my-profile-action.ts
| | | |-- types/my-profile.types.ts
| | | `-- constants/my-profile.constants.ts
| | |
| | `-- system/
| | |-- api/system.api.ts
| | |-- schemas/
| | | |-- system-query.schema.ts
| | | `-- system-action.schema.ts
| | |-- hooks/
| | | |-- use-system-list.ts
| | | |-- use-system-detail.ts
| | | `-- use-system-action.ts
| | |-- types/system.types.ts
| | `-- constants/system.constants.ts
| |
| |-- lib/
| | |-- api/
| | | |-- api-client.ts
| | | |-- api-error.ts
| | | |-- api-response.ts
| | | |-- api-routes.ts
| | | |-- admin-fetch.ts
| | | `-- auth-fetch.ts
| | |
| | |-- auth/
| | | |-- staff-session.ts
| | | |-- staff-cookies.ts
| | | |-- staff-auth-guards.ts
| | | |-- staff-role-guards.ts
| | | `-- staff-permission-guards.ts
| | |
| | |-- env/
| | | |-- env.ts
| | | `-- env.schema.ts
| | |
| | |-- zod/
| | | |-- zod-error-map.ts
| | | `-- form-resolver.ts
| | |
| | |-- navigation/
| | | |-- admin-top-bar-navigation.ts
| | | |-- super-admin-sidebar-navigation.ts
| | | |-- admin-sidebar-navigation.ts
| | | |-- customer-care-sidebar-navigation.ts
| | | |-- mobile-admin-drawer-navigation.ts
| | | `-- my-staff-account-navigation.ts
| | |
| | |-- permissions/
| | | |-- staff-role-permissions.ts
| | | |-- route-permissions.ts
| | | |-- menu-visibility.ts
| | | `-- action-permissions.ts
| | |
| | |-- formatters/
| | | |-- currency.ts
| | | |-- date.ts
| | | |-- percentage.ts
| | | |-- status-label.ts
| | | `-- role-label.ts
| | |
| | |-- utils/
| | | |-- cn.ts
| | | |-- routes.ts
| | | |-- public-id.ts
| | | |-- safe-redirect.ts
| | | |-- table-query.ts
| | | `-- redaction.ts
| | |
| | `-- constants/
| | |-- app.constants.ts
| | |-- staff-roles.constants.ts
| | |-- user-roles.constants.ts
| | |-- statuses.constants.ts
| | |-- review-queues.constants.ts
| | |-- message-types.constants.ts
| | |-- audit.constants.ts
| | `-- routes.constants.ts
| |
| |-- hooks/
| | |-- use-media-query.ts
| | |-- use-click-outside.ts
| | |-- use-debounce.ts
| | |-- use-pagination.ts
| | |-- use-table-state.ts
| | |-- use-toast.ts
| | |-- use-confirm-action.ts
| | `-- use-permission-check.ts
| |
| |-- store/
| | |-- staff-auth.store.ts
| | |-- admin-dashboard.store.ts
| | |-- admin-navigation.store.ts
| | |-- admin-search.store.ts
| | |-- notifications.store.ts
| | `-- ui.store.ts
| |
| |-- styles/
| | |-- globals.css
| | |-- tailwind.css
| | |-- variables.css
| | |-- typography.css
| | |-- admin-layout.css
| | `-- utilities.css
| |
| `-- types/
| |-- api.types.ts
| |-- auth.types.ts
| |-- staff.types.ts
| |-- users.types.ts
| |-- roles.types.ts
| |-- review-queues.types.ts
| |-- dashboard.types.ts
| |-- routes.types.ts
| |-- pagination.types.ts
| |-- table.types.ts
| `-- index.ts
|
|-- .env.example
|-- .env.local.example
|-- .gitignore
|-- .eslintrc.cjs
|-- .prettierrc
|-- components.json
|-- next.config.ts
|-- package.json
|-- package-lock.json
|-- postcss.config.mjs
|-- tailwind.config.ts
|-- tsconfig.json
|-- README.md
`-- middleware.ts