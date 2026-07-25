# Asancha Admin Implementation State

Last reviewed: 2026-07-25

## Repository scope

This repository is the Asancha internal admin/staff frontend. It supports only:

- `super_admin`
- `admin`
- `customer_care_rep`

It must not contain public signup, public onboarding, marketplace, public user
dashboard, or public API partner application flows.

## Current implementation state

The application currently has a strong frontend shell and route/UI foundation.
Authentication is connected to the backend through the local auth API routes and
cookie session flow. Most operational list and detail pages still use clearly
labelled demo data while their feature API layers are prepared for replacement
with live query results.

The current dashboard data source is intentionally mock data. The live dashboard
loader exists, but it is not the active source until the backend response is
ready and verified.

## Roadmap block status

| Block | Area                                   | State       | Notes                                                                                                                                                                                                            |
| ----- | -------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | Repository and documentation           | Complete    | Repository docs, implementation state, rules, priority, and route/navigation references are present.                                                                                                             |
| 1     | Foundation and configuration           | Complete    | Next.js, TypeScript, styling, validation, environment, request-state dependencies, formatting configuration, and root loading/error boundaries exist.                                                            |
| 2     | Shared UI foundation                   | Complete    | Shared primitives, empty/error/permission states, audit confirmation, responsive data-table controls, and shell components exist. Feature-level usage and broader accessibility review continue in later blocks. |
| 3     | API, auth session, guards, permissions | Complete    | API client, auth helpers, session normalization, proxy protection, route rules, and permission helpers exist.                                                                                                    |
| 4     | Staff authentication screens           | Complete    | Sign-in, password recovery, invite verification, locked, and unauthorized screens exist.                                                                                                                         |
| 5     | Admin shell and navigation             | Complete    | Desktop/mobile shell, role-aware navigation, messages, notifications, staff menu, and theme controls exist.                                                                                                      |
| 6     | Dashboards                             | Partial     | Resolver and role dashboards exist, but the active dashboard source is mock data.                                                                                                                                |
| 7     | Review queues                          | Partial     | Queue routes and UI foundations exist; the Admin Onboarding list/detail read flow is live, while the remaining queue integrations are incomplete.                                                                |
| 8     | Users                                  | Partial     | Confirmed GET list/detail endpoints are connected; local filtering/pagination remains until backend query support is confirmed, and status mutation is blocked pending its contract.                             |
| 9     | Staff                                  | Partial     | Staff creation is connected to the confirmed POST endpoint; staff list/detail read integration remains incomplete.                                                                                               |
| 10    | Profiles                               | Partial     | Confirmed GET list/detail endpoints are connected for general and role-specific profiles; related user-profile reads and profile actions remain pending.                                                         |
| 11    | Companies                              | Partial     | List/detail/related workflow UI and API foundations exist; live page integration is incomplete.                                                                                                                  |
| 12    | Properties                             | Partial     | List/detail/related workflow UI and API foundations exist; live page integration is incomplete.                                                                                                                  |
| 13    | Listings                               | Partial     | List/detail/review/visibility/activity/audit UI and API foundations exist; live page integration is incomplete.                                                                                                  |
| 14    | Documents                              | Partial     | List/detail/review/history/status UI and API foundations exist; live page integration is incomplete.                                                                                                             |
| 15    | Verification reviews                   | Partial     | List/detail/review/document/message/audit UI and API foundations exist; live page integration is incomplete.                                                                                                     |
| 16    | Deal reservations                      | Partial     | Route and demo workflow foundations exist; live feature integration is not complete.                                                                                                                             |
| 17    | Deal activities                        | Partial     | Listing route exists; detail route and live feature integration remain.                                                                                                                                          |
| 18    | Payments                               | Partial     | Landing/status preview routes exist; the full payment workflow is not implemented.                                                                                                                               |
| 19    | Bookings                               | Partial     | Landing/support preview routes exist; create/detail/reschedule workflows remain.                                                                                                                                 |
| 20    | Messages                               | Partial     | Landing/assigned preview routes exist; conversation detail and live messaging remain.                                                                                                                            |
| 21    | Notifications                          | Partial     | Notification landing UI and unread-count shell support exist; inbox actions, templates, sending, and preferences remain.                                                                                         |
| 22    | API access                             | Partial     | Landing preview exists; application, client, key, usage, webhook, and billing screens remain.                                                                                                                    |
| 23    | AI/admin insights                      | Partial     | Landing and queue preview foundations exist; the full AI module remains.                                                                                                                                         |
| 24    | Audit logs                             | Partial     | Landing, high-risk, and staff views exist; category/detail and live redacted data remain.                                                                                                                        |
| 25    | Settings                               | Partial     | Landing preview exists; settings submodules and live permission-aware controls remain.                                                                                                                           |
| 26    | My staff account                       | Partial     | Routes exist as preview foundations; live profile, security, preferences, and activity actions remain.                                                                                                           |
| 27    | States and accessibility hardening     | Partial     | Loading, safe alerts, skeletons, error/empty/permission states, and protected route states exist; full accessibility review remains.                                                                             |
| 28    | Testing and QA                         | Partial     | `npm run lint`, `npm run typecheck`, and `npm run build` pass. Automated tests are not configured.                                                                                                               |
| 29    | Vercel deployment                      | Not started | Production deployment, domain, environment, and release checks remain.                                                                                                                                           |

## Current validation baseline

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run build` passes.
- `npm run format:check` passes.
- No `npm run test` or `npm run test:e2e` script is configured.

## Next implementation target

The confirmed Admin Onboarding list/detail endpoints are connected. The list
uses the confirmed `profileType` and `email` query parameters; status and
verification filters are applied locally until those backend query contracts
are confirmed. Nested document URLs and financial/sensitive fields are
redacted before display. Next, connect confirmed related user profile reads,
then continue integrating later modules only when their admin read response
contracts are confirmed by the backend team.
