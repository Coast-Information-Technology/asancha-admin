# Asancha Admin Implementation Priority

Last reviewed: 2026-07-21

Implementation follows the approved roadmap sequence. Work should not move to a
later module while a shared foundation gap would cause duplicated or unsafe UI.

## Priority 0 — Repository documentation

Keep the repository state, rules, priorities, route map, and project structure
references current. This is the documentation baseline for all later work.

## Priority 1 — Shared foundation (completed)

The repository now has dedicated empty-state, error-state, and
permission-blocked components; responsive data-table sorting, filtering, and
pagination controls; root loading and error boundaries; audit-sensitive action
confirmation; and an enforced Prettier configuration.

## Priority 2 — Connect the existing operational modules

Wire the current page components to their existing feature hooks and API
parsers, in this order:

1. Dashboard and review queues
2. Users and staff
3. Profiles
4. Companies
5. Properties
6. Listings
7. Documents
8. Verification reviews

For each module, complete list loading, query filters, pagination, detail
loading, safe errors, empty states, mutations, confirmation, and permission-aware
actions before moving on.

## Priority 3 — Implement the remaining operational modules

Continue in roadmap order:

1. Deal reservations
2. Deal activities
3. Payments
4. Bookings
5. Messages
6. Notifications
7. API access
8. AI/admin insights
9. Audit logs
10. Settings
11. My staff account

Each module must include its approved list/detail route pattern, safe public IDs,
role restrictions, realistic loading/empty/error states, and backend-shaped API
types before it is considered complete.

## Priority 4 — Hardening

- Complete system status and safe error states.
- Review customer-care route and action restrictions.
- Verify detail pages are not in sidebar navigation.
- Verify no public-user or frontend super-admin creation paths exist.
- Verify sensitive data redaction and public-ID usage.
- Complete keyboard, focus, responsive, and table accessibility checks.

## Priority 5 — Testing and QA

- Add unit/component tests for auth, resolver, permissions, redaction, and state components.
- Add E2E coverage for staff authentication, role navigation, list/detail workflows, and restricted actions.
- Run lint, typecheck, build, formatting, unit tests, and E2E tests before release.

## Priority 6 — Deployment

- Configure production environment variables privately.
- Confirm the Vercel build and production domain.
- Confirm unauthenticated, public-user, locked-account, and unauthorized redirects.
- Confirm no secrets or private operational URLs are exposed to the browser.
