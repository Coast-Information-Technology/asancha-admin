# Asancha Admin Implementation Rules

These rules govern the frontend implementation. They do not replace the
approved business, database, API, onboarding, UX, or permission documents.

## Source-of-truth order

When documents conflict, follow this order:

1. Functional business rules
2. Database schema rules
3. API endpoint rules
4. Onboarding rules
5. UX business rules
6. Frontend screen behaviour
7. Engineering code standards
8. Email, notification, event, and audit rules
9. Revised project structure
10. Admin route and navigation map
11. This repository implementation documentation

The frontend may guide actions and display data. The backend remains the final
authority for authentication, authorization, permissions, visibility, review
decisions, payments, documents, verification, staff creation, and audit logs.

## Scope and audience

- Build only for `super_admin`, `admin`, and `customer_care_rep`.
- Do not add public signup, public onboarding, marketplace, or public-user dashboard routes.
- Do not add admin/staff routes to the public application.
- Do not create a `super_admin` from any frontend route, form, modal, or action.
- Customer care must receive safe support views only.

## Navigation and routing

- Sidebar items represent modules, lists, queues, or workspaces.
- Detail pages must be reached from table rows, queues, search results, or related-resource links.
- Detail pages must not be sidebar items.
- Use `Messages` as the frontend navigation label; conversations remain backend thread containers.
- Use public IDs in routes and links.
- Do not expose MongoDB ObjectIds in routes, UI, logs, or responses.

## Permission and security rules

- Hidden menus and disabled buttons are UX guidance, not security controls.
- Every sensitive action must be permission-aware in the frontend and enforced by the backend.
- Non-super-admin staff must not see super-admin records.
- Admin staff may not create admin or super-admin accounts.
- Customer care may not manage staff or perform restricted approval actions.
- Audit logs, high-risk details, private KYC notes, and internal admin notes require appropriate staff permissions.

## Data handling rules

- Never expose JWT secrets, database URLs, secret keys, webhook secrets, API key hashes, full API keys, private document URLs, private KYC files, or internal service secrets.
- Use safe API response types and redaction helpers.
- Keep demo data clearly labelled and isolated so it can be replaced by API results.
- Do not allow mock data to be mistaken for authoritative backend state.
- Backend errors must be converted into safe user-facing messages.

## UI and interaction rules

- Use shared UI primitives before creating one-off controls.
- Use Zod and React Hook Form for validated forms.
- Provide loading, empty, error, locked, unauthorized, and permission-blocked states.
- High-impact actions require confirmation and an appropriate reason where required.
- Status and risk indicators must not depend on colour alone.
- Preserve responsive layout, keyboard navigation, visible focus, and readable table overflow.

## Change-control rule

Do not change the approved project structure to avoid implementing a feature. Add
implementation inside the existing route and feature boundaries. Update this
documentation when the project state, rules, or priorities materially change.
