// src/types/routes.types.ts

/**
 * File purpose:
 * Defines shared route types for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises route metadata, route params, breadcrumb items, and
 * navigation-safe route references used across layouts, navigation, guards, and
 * feature modules.
 *
 * Key exports:
 * - AdminRouteReference defines safe route links.
 * - PublicIdRouteParams defines common dynamic route params.
 * - BreadcrumbItem defines breadcrumb links.
 *
 * Business relevance:
 * asancha-admin must use public IDs in frontend routes. Detail pages are valid
 * pages but must not be placed in sidebar menus.
 *
 * Security note:
 * Route types do not authorize access. Middleware, page guards, and backend
 * permission enforcement remain required.
 */

import type { StaffRole } from './staff.types';

export type AdminRouteAccessLevel = 'public_auth' | 'staff' | 'super_admin_only' | 'restricted';

export interface AdminRouteReference {
  href: string;
  label: string;
  description?: string;
  accessLevel: AdminRouteAccessLevel;
  allowedRoles?: readonly StaffRole[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface PublicIdRouteParams {
  userPublicId?: string;
  staffPublicId?: string;
  profilePublicId?: string;
  companyPublicId?: string;
  propertyPublicId?: string;
  listingPublicId?: string;
  documentPublicId?: string;
  verificationReviewPublicId?: string;
  reservationPublicId?: string;
  dealActivityPublicId?: string;
  paymentPublicId?: string;
  paymentReference?: string;
  bookingPublicId?: string;
  conversationPublicId?: string;
  applicationPublicId?: string;
  apiClientPublicId?: string;
  apiPlanPublicId?: string;
  subscriptionPublicId?: string;
  apiKeyPublicId?: string;
  webhookPublicId?: string;
  auditLogPublicId?: string;
}

export interface RouteSearchParams {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
  status?: string;
  role?: string;
  type?: string;
  risk?: string;
  target?: string;
  source?: string;
}

export interface PageProps<
  TParams extends Record<string, string | undefined> = Record<string, string | undefined>,
  TSearchParams extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >,
> {
  params: TParams;
  searchParams: TSearchParams;
}

export interface RouteGuardResult {
  allowed: boolean;
  redirectTo?: string;
  reason?: string;
}
