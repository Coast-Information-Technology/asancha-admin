// src/lib/utils/routes.ts

/**
 * File purpose:
 * Provides safe route utility helpers for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises frontend route construction, path matching, query
 * string building, and path normalisation used by navigation, tables, filters,
 * breadcrumbs, and redirect helpers.
 *
 * Key exports:
 * - buildRoute joins route segments safely.
 * - appendSearchParams appends query params to internal routes.
 * - normaliseRoutePath keeps route comparisons consistent.
 * - isInternalRoute checks whether a path is an internal admin route.
 *
 * Business relevance:
 * Admin frontend routes must use public-facing identifiers and must not expose
 * MongoDB ObjectIds, private service URLs, private document URLs, or internal
 * backend implementation details.
 *
 * Security note:
 * Route helpers do not authorize access. Middleware, page guards, and backend
 * permission enforcement remain required for protected routes and actions.
 */

export type RouteQueryValue = string | number | boolean | null | undefined;
export type RouteQueryParams = Record<string, RouteQueryValue | readonly RouteQueryValue[]>;

const INTERNAL_ROUTE_PATTERN = /^\/(?!\/)/;

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

function stringifyQueryValue(value: Exclude<RouteQueryValue, null | undefined>): string {
  return String(value);
}

export function normaliseRoutePath(path: string): string {
  if (!path || path.trim().length === 0) {
    return '/';
  }

  const [pathname = '/'] = path.trim().split('?');
  const normalisedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withoutTrailingSlash = normalisedPathname.replace(/\/+$/g, '');

  return withoutTrailingSlash.length > 0 ? withoutTrailingSlash : '/';
}

export function isInternalRoute(path: string): boolean {
  return INTERNAL_ROUTE_PATTERN.test(path);
}

export function isExternalRoute(path: string): boolean {
  return /^https?:\/\//i.test(path) || path.startsWith('//');
}

export function buildRoute(...segments: readonly RouteQueryValue[]): string {
  const cleanedSegments = segments
    .filter((segment): segment is Exclude<RouteQueryValue, null | undefined> => {
      return segment !== null && segment !== undefined && String(segment).trim().length > 0;
    })
    .map((segment) => encodeURIComponent(trimSlashes(String(segment))))
    .filter(Boolean);

  return `/${cleanedSegments.join('/')}`;
}

export function buildRouteFromTemplate(
  template: string,
  params: Record<string, RouteQueryValue>,
): string {
  return template.replace(/\[([^\]]+)\]/g, (_, key: string) => {
    const value = params[key];

    if (value === null || value === undefined || String(value).trim().length === 0) {
      throw new Error(`Missing route parameter: ${key}`);
    }

    return encodeURIComponent(String(value));
  });
}

export function appendSearchParams(path: string, params: RouteQueryParams = {}): string {
  const [pathname, existingSearch = ''] = path.split('?');
  const searchParams = new URLSearchParams(existingSearch);

  Object.entries(params).forEach(([key, value]) => {
    searchParams.delete(key);

    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          searchParams.append(key, stringifyQueryValue(item));
        }
      });

      return;
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      searchParams.set(key, stringifyQueryValue(value));
    }
  });

  const queryString = searchParams.toString();

  return queryString.length > 0
    ? `${normaliseRoutePath(pathname)}?${queryString}`
    : normaliseRoutePath(pathname);
}

export function removeSearchParams(path: string, keys: readonly string[]): string {
  const [pathname, existingSearch = ''] = path.split('?');
  const searchParams = new URLSearchParams(existingSearch);

  keys.forEach((key) => searchParams.delete(key));

  const queryString = searchParams.toString();

  return queryString.length > 0
    ? `${normaliseRoutePath(pathname)}?${queryString}`
    : normaliseRoutePath(pathname);
}

export function getRouteParent(path: string): string {
  const normalisedPath = normaliseRoutePath(path);

  if (normalisedPath === '/') {
    return '/';
  }

  const segments = normalisedPath.split('/').filter(Boolean);

  if (segments.length <= 1) {
    return '/';
  }

  return `/${segments.slice(0, -1).join('/')}`;
}

export function isRouteActive(
  currentPathname: string,
  href: string,
  options: { exact?: boolean } = {},
): boolean {
  const currentPath = normaliseRoutePath(currentPathname);
  const targetPath = normaliseRoutePath(href);

  if (options.exact) {
    return currentPath === targetPath;
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}
