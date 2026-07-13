// src/types/index.ts

/**
 * File purpose:
 * Re-exports shared TypeScript contracts for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file provides a single import surface for shared app-wide types used by
 * feature modules, reusable components, hooks, stores, and app routes.
 *
 * Key exports:
 * - API types
 * - Auth types
 * - Staff types
 * - User types
 * - Role types
 * - Review queue types
 * - Dashboard types
 * - Route types
 * - Pagination types
 * - Table types
 *
 * Business relevance:
 * Centralised shared types reduce duplication and keep the admin frontend
 * aligned with the approved staff-only operating model.
 *
 * Security note:
 * Shared types must continue to prefer public IDs and safe display contracts.
 * They must not introduce MongoDB ObjectIds, secrets, private URLs, full API
 * keys, webhook secrets, password hashes, raw KYC files, or internal notes into
 * frontend contracts.
 */

export type {
  ApiActorSummary,
  ApiEnvelope,
  ApiErrorCode,
  ApiErrorDetails,
  ApiErrorEnvelope,
  ApiFilterInput,
  ApiFilterValue,
  ApiHttpMethod,
  ApiListMeta,
  ApiListQueryInput,
  ApiMeta,
  ApiMutationState,
  ApiPaginatedData,
  ApiPaginationInput,
  ApiPublicResource,
  ApiRequestState,
  ApiSearchInput,
  ApiSortDirection,
  ApiSortInput,
  ApiTimestampedResource,
} from './api.types';

export type {
  AuthPageState,
  ForgotPasswordInput,
  ResetPasswordInput,
  SafeAuthMessage,
  SetPasswordInput,
  StaffAuthRedirectReason,
  StaffAuthResult,
  StaffAuthSessionSummary,
  StaffAuthUserSummary,
  StaffPasswordPolicyHint,
  StaffSignInInput,
  VerifyStaffInviteInput,
} from './auth.types';

export type {
  CreateStaffInput,
  StaffAccountStatus,
  StaffActivitySummary,
  StaffCreationRole,
  StaffDetail,
  StaffPermissionSummary,
  StaffRecord,
  StaffRole,
  StaffSummary,
  StaffTableFilters,
  UpdateStaffRoleInput,
  UpdateStaffStatusInput,
} from './staff.types';

export type {
  PublicUserRecord,
  PublicUserRole,
  PublicUserStatus,
  PublicUserSummary,
  SetUserRoleInput,
  SetUserStatusInput,
  UserBusinessProfileSummary,
  UserCompanySummary,
  UserDetail,
  UserDetailTabKey,
  UserTableFilters,
} from './users.types';

export type {
  AsanchaKnownRole,
  PermissionCheckResult,
  PermissionDescription,
  RoleBadgeDisplay,
  RoleGroup,
  RoleOption,
  RoleVisibilityRule,
  StaffRoleCreationRule,
} from './roles.types';

export type {
  ReviewQueueDefinition,
  ReviewQueueFilters,
  ReviewQueueItem,
  ReviewQueueItemStatus,
  ReviewQueueKey,
  ReviewQueuePriority,
  ReviewQueueSummary,
} from './review-queues.types';

export type {
  DashboardAlert,
  DashboardMetricCard,
  DashboardMetricTone,
  DashboardWidget,
  DashboardWidgetKey,
  PlatformHealthSummary,
  StaffDashboardPayload,
} from './dashboard.types';

export type {
  AdminRouteAccessLevel,
  AdminRouteReference,
  BreadcrumbItem,
  PageProps,
  PublicIdRouteParams,
  RouteGuardResult,
  RouteSearchParams,
} from './routes.types';

export type {
  CursorPaginatedResult,
  CursorPaginationMeta,
  CursorPaginationQuery,
  PaginatedResult,
  PaginationControls,
  PaginationMeta,
  PaginationQuery,
} from './pagination.types';

export type {
  TableAction,
  TableColumn,
  TableColumnAlign,
  TableDataState,
  TableDensity,
  TableEmptyState,
  TableFilterDefinition,
  TableFilterOption,
  TableSelectionState,
  TableSortDirection,
  TableSortState,
  TableState,
} from './table.types';
