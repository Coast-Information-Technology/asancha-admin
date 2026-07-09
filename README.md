# Asancha Admin

Asancha Admin is the internal admin/staff frontend application for the Asancha platform.

This application is separate from the public/user frontend and is used only by authorised Asancha staff.

## Application Identity

| Item              | Value                                                       |
| ----------------- | ----------------------------------------------------------- |
| Repository        | `asancha-admin`                                             |
| Application type  | Admin/Staff Frontend                                        |
| Framework         | Next.js App Router                                          |
| Language          | TypeScript                                                  |
| Styling           | Tailwind CSS + CSS Modules                                  |
| Validation        | Zod + React Hook Form                                       |
| Package manager   | npm                                                         |
| Production domain | Admin domain configured privately in deployment environment |

## Purpose

The purpose of `asancha-admin` is to provide a secure internal operations interface for Asancha staff.

It supports:

* staff authentication
* admin dashboards
* customer care dashboard
* super admin dashboard
* review queues
* user management
* staff management
* profile reviews
* company reviews
* property reviews
* listing reviews
* document reviews
* verification reviews
* payment reviews
* deal reservation oversight
* deal activity oversight
* booking management
* messages and support oversight
* notifications
* API access management
* AI/admin insight screens
* audit log views
* operational settings where allowed

## What This Application Is Not

This application is not the public/user frontend.

Do not add public-user flows to this repository.

The following do not belong in `asancha-admin`:

* public signup
* public onboarding
* public marketplace
* public listing discovery
* public user dashboards
* public API partner application flow
* investor dashboard
* property owner dashboard
* property agent dashboard
* property sourcer dashboard
* service provider dashboard

Those belong in the separate public/user frontend repository.

## Allowed Users

The admin frontend supports only internal staff users:

* `super_admin`
* `admin`
* `customer_care_rep`

## Disallowed Users

The following users must not access the admin frontend as normal users:

* `guest`
* `investor`
* `property_owner`
* `property_agent`
* `property_sourcer`
* `service_provider`
* `api_partner`

Public users must not be given admin/staff frontend access.

## Role Access Summary

### Super Admin

A `super_admin` may access:

* dashboard
* review queues
* users
* staff
* profiles
* companies
* properties
* listings
* documents
* verification reviews
* deal reservations
* deal activities
* payments
* bookings
* messages
* notifications
* API access
* AI/admin insights
* audit logs
* settings
* my staff account

A `super_admin` may create:

* `admin`
* `customer_care_rep`

A `super_admin` must not create another `super_admin` from the frontend.

### Admin

An `admin` may access broad operational and review areas where allowed.

An `admin` may create:

* `customer_care_rep`

An `admin` must not create:

* `admin`
* `super_admin`

### Customer Care Representative

A `customer_care_rep` should only access safe support views.

Recommended access:

* dashboard
* safe user support view
* bookings support view
* messages
* document status
* verification status
* payment status
* notifications
* my staff account

A `customer_care_rep` must not access:

* staff management
* staff creation
* audit logs
* settings
* API access approval
* payment approval controls
* document approval controls
* verification approval controls
* listing approval controls
* super admin controls

## Super Admin Creation Rule

No frontend screen, route, form, modal, or action may create a `super_admin`.

The first `super_admin` must be created only through backend seed/bootstrap logic.

## Frontend and Backend Responsibility

The frontend may:

* display data
* guide staff actions
* hide inaccessible menu items
* disable restricted buttons
* show safe error messages
* show permission-aware UI
* route users to allowed screens
* request backend actions

The frontend must not be treated as the final security authority.

The backend API remains responsible for enforcing:

* authentication
* authorization
* staff permissions
* account status
* resource visibility
* review permissions
* payment decisions
* document review decisions
* verification review decisions
* API access decisions
* staff creation restrictions
* audit logging

No important business rule should exist only in the frontend.

## Route and Navigation Principles

Detail pages must not appear as sidebar menu items.

Sidebar navigation should show only index, list, queue, or workspace pages.

Detail pages should be reached from:

* table rows
* list items
* review queue items
* search results
* related-resource links

Examples:

```txt
/users
/users/[userPublicId]

/staff
/staff/[staffPublicId]

/profiles
/profiles/[profilePublicId]

/companies
/companies/[companyPublicId]

/properties
/properties/[propertyPublicId]

/listings
/listings/[listingPublicId]

/documents
/documents/[documentPublicId]

/verification-reviews
/verification-reviews/[verificationReviewPublicId]

/payments
/payments/[paymentPublicId]

/deal-reservations
/deal-reservations/[reservationPublicId]

/bookings
/bookings/[bookingPublicId]

/messages
/messages/[conversationPublicId]

/audit-logs
/audit-logs/[auditLogPublicId]
```

## Messages Naming Rule

The admin frontend should use the menu label:

```txt
Messages
```

The backend may still use:

```txt
conversations
messages
```

Conceptually:

```txt
conversations = thread/container
messages = individual messages inside a conversation
```

Frontend route group:

```txt
/messages
/messages/[conversationPublicId]
```

## Public ID Rule

Frontend routes must use public-facing identifiers.

Use:

* `userPublicId`
* `staffPublicId`
* `profilePublicId`
* `companyPublicId`
* `propertyPublicId`
* `listingPublicId`
* `documentPublicId`
* `verificationReviewPublicId`
* `paymentPublicId`
* `reservationPublicId`
* `bookingPublicId`
* `conversationPublicId`
* `apiClientPublicId`
* `auditLogPublicId`

Do not expose MongoDB ObjectIds in frontend routes, UI, logs, or public responses.

## Sensitive Data Rule

The frontend must not expose:

* JWT secrets
* database URLs
* secret keys
* webhook secrets
* API key hashes
* admin bootstrap secrets
* mail provider secrets
* storage secrets
* full API keys
* private document URLs
* private KYC notes
* internal admin notes
* audit-sensitive secrets
* MongoDB ObjectIds
* internal service URLs
* private operational URLs

Only browser-safe environment variables may use `NEXT_PUBLIC_*`.

## Security Note

This is the internal Asancha admin/staff frontend.

For security reasons, this README must not expose sensitive operational URLs such as:

* backend API base URL
* internal API routes
* public app URL
* private service URLs
* secret keys
* webhook URLs
* document storage URLs
* admin bootstrap details

All environment-specific URLs should be configured privately through environment variables and deployment settings.

Do not document live internal service URLs directly in this repository README.

## Environment Variables

Create `.env.local` from `.env.example`.

Only browser-safe values may use `NEXT_PUBLIC_*`.

Example:

```env
NEXT_PUBLIC_APP_NAME=Asancha Admin
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_PUBLIC_APP_URL=
NEXT_PUBLIC_ENVIRONMENT=development
```

Production values should be configured privately in the deployment environment.

Do not commit real production URLs, secrets, tokens, API keys, webhook secrets, storage URLs, or internal service URLs into the repository.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app should run locally at:

```txt
http://localhost:3000
```

If another frontend app is already using port `3000`, run this app on another port:

```bash
npm run dev -- -p 3001
```

## Build

```bash
npm run build
```

## Start Production Build

```bash
npm run start
```

## Lint

```bash
npm run lint
```

## Type Check

```bash
npm run typecheck
```

## Format

```bash
npm run format
```

## Format Check

```bash
npm run format:check
```

## Suggested Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Core Dependencies

```bash
npm install zod react-hook-form @hookform/resolvers
npm install clsx tailwind-merge
npm install lucide-react
npm install date-fns
```

Optional request/state dependencies may be added when needed:

```bash
npm install @tanstack/react-query
npm install zustand
```

## Styling Rule

Use Tailwind CSS for:

* layout
* spacing
* grids
* responsive behaviour
* typography utilities
* common UI utilities

Use CSS Modules for:

* complex admin layouts
* sidebars
* mobile drawers
* dashboards
* tables
* modals
* drawers
* command menus
* transition-heavy UI

## Validation Rule

Use Zod and React Hook Form for form validation.

Validation schemas should live close to the feature they support.

Example:

```txt
src/features/auth/schemas/staff-sign-in.schema.ts
src/features/staff/schemas/create-staff.schema.ts
src/features/users/schemas/set-user-status.schema.ts
```

## Recommended Project Structure

```txt
asancha-admin/
|-- public/
|-- app/
|-- src/
| |-- components/
| |-- features/
| |-- lib/
| |-- hooks/
| |-- store/
| |-- styles/
| `-- types/
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
```

## Main App Route Groups

```txt
app/
|-- auth/
|-- dashboard/
|-- review-queues/
|-- users/
|-- staff/
|-- profiles/
|-- companies/
|-- properties/
|-- listings/
|-- documents/
|-- verification-reviews/
|-- deal-reservations/
|-- deal-activities/
|-- payments/
|-- bookings/
|-- messages/
|-- notifications/
|-- api-access/
|-- ai/
|-- audit-logs/
|-- settings/
|-- my-profile/
`-- system/
```

## Implementation Approach

This project is implemented manually.

The implementation should proceed step by step:

1. frontend foundation and configuration
2. shared UI primitives
3. API client and response handling
4. staff auth session handling
5. route guards and permission helpers
6. admin auth screens
7. admin shell, top bar, sidebar, and mobile drawer
8. dashboard resolver and role dashboards
9. review queues
10. users module
11. staff module
12. profiles module
13. companies module
14. properties module
15. listings module
16. documents module
17. verification reviews module
18. deal reservations module
19. deal activities module
20. payments module
21. bookings module
22. messages module
23. notifications module
24. API access module
25. AI/admin insights module
26. audit logs module
27. settings module
28. my staff account module
29. system status
30. error, empty, loading, locked, and accessibility states
31. testing and QA
32. deployment preparation

## Manual Implementation Rule

This repository does not require AI project-state control files.

Do not create:

```txt
docs/ai/PROJECT_STATE.md
docs/implementation/IMPLEMENTATION_RULES.md
docs/implementation/IMPLEMENTATION_PRIORITY.md
```

Implementation priority, state, and rules are controlled manually by the project owner.

## Deployment

The admin frontend is intended to be deployed on Vercel.

Production domain and environment-specific service URLs should be configured privately in the deployment environment.

Do not document live internal service URLs directly in this README.

## Security Reminder

The admin frontend is an internal operational interface.

Do not rely on hidden routes, hidden menu items, disabled buttons, or frontend-only checks for security.

Every sensitive action must be enforced by the backend API.

## Documentation Sources

This README follows the approved Asancha planning documents, including:

* Asancha Frontend Functional Business Rules
* Asancha Admin Route & Navigation Map
* Asancha Admin Frontend Project Structure
* Asancha Frontend Screen Behaviour
* Asancha UX Business Rules
* Asancha Backend API Endpoint Rules
* Asancha Engineering Code Standards
* Asancha Admin Staff Ops decisions
