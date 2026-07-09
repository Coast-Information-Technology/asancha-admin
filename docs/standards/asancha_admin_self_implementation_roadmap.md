Asancha Admin/Staff Frontend Implementation Roadmap for Self-Implementation
Version: v1.0 — Developer Use Draft
Frontend App: asancha-admin
Domain: https://admin.asancha.co.uk
Framework: Next.js App Router
Validation: Zod + React Hook Form
Styling: Tailwind CSS + CSS Modules
Package Manager: npm
Audience: super_admin, admin, customer_care_rep
Excluded Audience: guest, investor, property_owner, property_agent, property_sourcer, service_provider, api_partner
Implementation Owner: Toluwalope Coast / Asancha project owner
Usage: This roadmap is written for manual, step-by-step implementation, not automated Codex execution.
---
1. Purpose
This document defines the implementation roadmap for building the Asancha admin/staff frontend application manually by the project owner/developer.
This roadmap is for:
asancha-admin
It is not for:
asancha-web asancha-api asancha-worker
The purpose is to guide you as the implementing developer through a controlled frontend build order so that the admin/staff frontend is implemented cleanly, safely, and in alignment with the approved Admin Route & Navigation Map, Admin Frontend Project Structure, backend endpoint rules, frontend functional rules, and staff permission model.
The frontend may display and guide staff actions, but the backend remains the final enforcement authority for authentication, authorization, staff permissions, resource visibility, audit logging, review decisions, payment decisions, document review, verification review, API access, and staff creation.
---
2. Source-of-Truth Rule for Implementation
You must follow this order when documents conflict:
1. Functional Business Rules Master Document
2. Database Schema Rules
3. API Endpoint Rules
4. Onboarding Rules
5. UX Business Rules
6. Frontend Screen Behaviour
7. Engineering Code Standards
8. Email Templates
9. Notification Events and Templates
10. Event and Background Jobs
11. Audit Log and Compliance Traceability
12. Revised Project Structure
13. Admin Route & Navigation Map
14. Admin Frontend Project Structure
15. This Admin/Staff Frontend Implementation Roadmap
This roadmap explains the execution order.
It does not override the approved business rules.
---
3. Implementation Philosophy
You must build asancha-admin as a serious internal operations frontend, not as a public dashboard.
The implementation must follow these principles:
1. Build the foundation first.
2. Keep asancha-admin separate from asancha-web.
3. Do not create public signup, public onboarding, marketplace, or public user dashboard routes in asancha-admin.
4. Do not create admin/staff routes inside asancha-web.
5. Do not create a super_admin from any frontend route, form, modal, or action.
6. Staff users are only super_admin, admin, and customer_care_rep.
7. Customer care must only see safe support views.
8. Detail pages must not appear as sidebar menu items.
9. Detail pages must be reached from list/table rows, queues, search results, or related-resource links.
10. Use Messages as the frontend menu label.
11. Keep backend conversations as the thread/container concept.
12. Use public IDs in frontend routes.
13. Do not expose MongoDB ObjectIds.
14. Do not expose secrets, API key hashes, webhook secrets, private KYC notes, internal admin notes, or restricted document URLs.
15. Frontend route protection guides UX only; backend enforcement remains final.
The approved Admin Frontend Project Structure confirms that asancha-admin must not contain public signup, public onboarding, marketplace, or public user dashboard routes, and that detail pages must not be placed in sidebar menus.
---
4. High-Level Implementation Order
You should implement the admin/staff frontend in this order:
0. Repository preparation and implementation documentation 1. Frontend foundation and configuration 2. Shared UI primitives and admin styling foundation 3. API client, staff auth session, route guards, and permission helpers 4. Admin auth screens 5. Admin shell, top bar, sidebar, mobile drawer, and navigation 6. Dashboard resolver and role dashboards 7. Review queues 8. Users module 9. Staff module 10. Profiles module 11. Companies module 12. Properties module 13. Listings module 14. Documents module 15. Verification reviews module 16. Deal reservations module 17. Deal activities module 18. Payments module 19. Bookings module 20. Messages module 21. Notifications module 22. API access module 23. AI/admin insights module 24. Audit logs module 25. Settings module 26. My staff account module 27. System status, safe error states, empty states, loading states, accessibility 28. Testing and QA 29. Vercel deployment preparation
---
5. Implementation Block 0 — Repository Preparation and developer Documentation
Goal
Prepare the asancha-admin repository so you have a clear record of the approved admin/staff direction before writing code.
Tasks
1. Create or confirm the asancha-admin repository.
2. Add README.md with project purpose.
3. Add docs/ folder.
4. Add docs/implementation/PROJECT_STATE.md.
5. Add docs/implementation/IMPLEMENTATION_RULES.md.
6. Add docs/implementation/IMPLEMENTATION_PRIORITY.md.
7. Add docs/standards/ for admin frontend rules and route maps.
8. Add the approved Admin Route & Navigation Map.
9. Add the approved Admin Frontend Project Structure.
10. Add note that public/user routes must never be created in asancha-admin.
11. Add note that super_admin cannot be created from frontend.
12. Add note that detail pages are pages, not sidebar items.
Files/Folders
asancha-admin/ ├─ docs/ │  ├─ ai/ │  │  ├─ PROJECT_STATE.md │  │  ├─ IMPLEMENTATION_RULES.md │  │  └─ IMPLEMENTATION_PRIORITY.md │  └─ standards/ │     ├─ frontend-functional-business-rules.md │     ├─ admin-route-navigation-map.md │     ├─ admin-screen-behaviour.md │     └─ admin-frontend-project-structure.md
Developer Checkpoint
- asancha-admin exists as a separate repo.
- README.md states this is the admin/staff frontend.
- docs/implementation/PROJECT_STATE.md exists.
- docs/implementation/IMPLEMENTATION_RULES.md exists.
- No public signup route exists.
- No public onboarding route exists.
- No marketplace route exists.
- No frontend super_admin creation path exists.
---
6. Implementation Block 1 — Frontend Foundation and Configuration
Goal
Create the Next.js project foundation with TypeScript, Tailwind, CSS Modules, Zod, React Hook Form, and npm.
Tasks
1. Initialise Next.js App Router project.
2. Configure TypeScript.
3. Configure Tailwind CSS.
4. Configure CSS Modules usage.
5. Configure ESLint and Prettier.
6. Add Zod.
7. Add React Hook Form.
8. Add @hookform/resolvers.
9. Add clsx and tailwind-merge.
10. Add lucide-react.
11. Add date-fns.
12. Add optional TanStack Query or selected request-state tool.
13. Add optional Zustand if global admin UI state is needed.
14. Add environment variable validation.
15. Add root error/loading/not-found/global-error files.
Required Dependencies
npm install zod react-hook-form @hookform/resolvers npm install clsx tailwind-merge npm install lucide-react npm install date-fns
Optional:
npm install @tanstack/react-query npm install zustand
Root Files
asancha-admin/ ├─ app/ ├─ src/ ├─ public/ ├─ .env.example ├─ .gitignore ├─ .eslintrc.cjs ├─ .prettierrc ├─ next.config.ts ├─ package.json ├─ package-lock.json ├─ postcss.config.mjs ├─ tailwind.config.ts ├─ tsconfig.json ├─ README.md └─ middleware.ts
Environment Variables
NEXT_PUBLIC_APP_NAME=Asancha Admin NEXT_PUBLIC_APP_URL=https://admin.asancha.co.uk NEXT_PUBLIC_API_BASE_URL=https://api.asancha.co.uk/api/v1 NEXT_PUBLIC_PUBLIC_APP_URL=https://asancha.co.uk NEXT_PUBLIC_ENVIRONMENT=production
Safety Rule
Never expose secrets through NEXT_PUBLIC_*.
The admin frontend must not expose JWT secrets, database URLs, Stripe secret keys, webhook secrets, API key hashes, admin bootstrap secrets, mail provider secrets, storage secrets, full API keys, private document URLs, private KYC notes, or audit-sensitive secrets.
---
7. Implementation Block 2 — Shared UI Primitives and Admin Styling Foundation
Goal
Build the reusable admin UI layer before building admin screens.
Tasks
1. Create shared UI components.
2. Create admin shell components.
3. Create admin table components.
4. Create filter/search components.
5. Create form components.
6. Create review/action panels.
7. Create confirmation modal component.
8. Create status badges.
9. Create priority/risk badges.
10. Create loading/skeleton components.
11. Create empty-state and error-state components.
12. Create permission-blocked component.
13. Create audit-aware action confirmation component.
Files/Folders
src/components/ui/ ├─ button/ ├─ input/ ├─ select/ ├─ checkbox/ ├─ textarea/ ├─ dialog/ ├─ drawer/ ├─ modal/ ├─ table/ ├─ data-table/ ├─ badge/ ├─ card/ ├─ tabs/ ├─ toast/ ├─ dropdown-menu/ ├─ command-menu/ ├─ alert/ ├─ skeleton/ ├─ empty-state/ ├─ error-state/ └─ permission-blocked/
Styling Rule
Use Tailwind for:
layout spacing grid flex responsive behaviour common utilities simple visual states
Use CSS Modules for:
admin shell layout sidebar transitions mobile drawer behaviour dense data tables modals review panels confirmation dialogs audit detail screens transition-heavy UI
Developer Checkpoint
- Shared UI components exist before feature screens.
- Data table component supports sorting/filtering/pagination state.
- Confirmation modal exists for sensitive actions.
- Permission blocked state exists.
- Empty and error state components exist.
- Status badges do not rely on colour alone.
---
8. Implementation Block 3 — API Client, Staff Auth Session, Route Guards, and Permissions
Goal
Create a safe admin frontend API layer before connecting screens.
Tasks
1. Create api-client.ts.
2. Create admin-fetch.ts.
3. Create auth-fetch.ts.
4. Create api-error.ts.
5. Create api-response.ts.
6. Create route constants.
7. Create staff session helpers.
8. Create staff auth guards.
9. Create staff role guards.
10. Create staff permission helpers.
11. Create route permission map.
12. Create menu visibility helpers.
13. Create action permission helpers.
14. Create redaction utility.
15. Create safe redirect helper.
Files/Folders
```txt id=“bx7rjc” src/lib/api/ ├─ api-client.ts ├─ api-error.ts ├─ api-response.ts ├─ api-routes.ts ├─ admin-fetch.ts └─ auth-fetch.ts
src/lib/auth/ ├─ staff-session.ts ├─ staff-cookies.ts ├─ staff-auth-guards.ts ├─ staff-role-guards.ts └─ staff-permission-guards.ts
src/lib/permissions/ ├─ staff-role-permissions.ts ├─ route-permissions.ts ├─ menu-visibility.ts └─ action-permissions.ts
src/lib/utils/ ├─ routes.ts ├─ safe-redirect.ts ├─ public-id.ts ├─ table-query.ts └─ redaction.ts

## Required Behaviour

Admin route protection must follow staff roles:

```super_admin
admin
customer_care_rep
Customer care must only see safe support views.
Super admin accounts must not be visible to non-super-admin staff.
The admin route map states that customer care reps may access dashboard, safe user support views, booking support, messages, document status, verification status, payment status, notifications, and my staff account, but must not access staff management, audit logs, settings, API access approval, payment approval controls, document approval controls, verification approval controls, listing approval controls, or super admin controls.
Developer Checkpoint
- API client wraps the Asancha response envelope.
- Backend errors are displayed safely.
- Permission helper controls menu visibility.
- Customer care cannot see restricted menus.
- Route guards do not replace backend enforcement.
- No MongoDB ObjectId is shown in admin UI.
---
9. Implementation Block 4 — Admin Auth Screens
Goal
Implement staff-only authentication screens.
Routes
/auth/sign-in /auth/forgot-password /auth/reset-password /auth/set-password /auth/verify-staff-invite /auth/locked /auth/unauthorized
Tasks
1. Build staff sign-in screen.
2. Build forgot password screen.
3. Build reset password screen.
4. Build set password screen.
5. Build staff invite verification screen.
6. Build locked account screen.
7. Build unauthorized screen.
8. Add safe auth messages.
9. Add staff redirect after successful sign-in.
Must Not Include
public role selection public signup API partner guest application normal public onboarding marketplace links as primary action
Developer Checkpoint
- Admin auth has no public signup.
- Admin auth has no public role selection.
- Forgot password does not reveal whether email exists.
- Locked/unauthorized screens are safe.
- Successful sign-in routes by staff role.
---
10. Implementation Block 5 — Admin Shell, Top Bar, Sidebar, Mobile Drawer, and Navigation
Goal
Build the admin app frame before building individual modules.
Admin Desktop Top Bar
Admin Desktop Top Bar ├─ Logo / Asancha Admin ├─ Global Search ├─ Review Queue Shortcut ├─ Messages ├─ Notifications └─ Staff Avatar Menu
Important: Help / Support is not part of the admin/staff top bar.
The revised Admin Route & Navigation Map intentionally removes Help/Support from the admin top bar and uses Messages and Notifications for operational communication.
Mobile Admin Top Bar
Mobile Admin Top Bar ├─ Logo / Admin ├─ Review Queue Icon ├─ Messages Icon ├─ Notifications Bell └─ Menu Button
Staff Avatar Menu
My Profile Security Notification Preferences Logout
Sidebar Role Variants
super_admin sidebar admin sidebar customer_care_rep sidebar
Files/Folders
```txt id=“9cgv60” src/components/layout/ ├─ admin-shell/ ├─ admin-top-bar/ ├─ admin-sidebar/ ├─ mobile-admin-top-bar/ ├─ mobile-admin-drawer/ ├─ staff-avatar-menu/ └─ page-shell/
src/lib/navigation/ ├─ admin-top-bar-navigation.ts ├─ super-admin-sidebar-navigation.ts ├─ admin-sidebar-navigation.ts ├─ customer-care-sidebar-navigation.ts ├─ mobile-admin-drawer-navigation.ts └─ my-staff-account-navigation.ts

## Developer Checkpoint

```- Help/Support is not in the admin top bar.
- Messages is in desktop top bar.
- Messages is in mobile top bar.
- Messages is in mobile drawer.
- Sidebar changes by staff role.
- Detail pages are not sidebar menu items.
---
11. Implementation Block 6 — Dashboard Resolver and Role Dashboards
Goal
Build dashboard routing and the three staff dashboard experiences.
Routes
/dashboard /dashboard/super-admin /dashboard/admin /dashboard/customer-care
Dashboard Resolver
super_admin -> /dashboard/super-admin admin -> /dashboard/admin customer_care_rep -> /dashboard/customer-care unauthenticated -> /auth/sign-in public user -> /auth/unauthorized suspended or locked staff -> /auth/locked
Super Admin Widgets
review queue summary pending profiles pending companies pending properties pending listings pending documents pending verification reviews pending payments pending deal reservations API partner applications staff activity summary audit alerts system notifications recent high-risk actions platform health summary
Admin Widgets
review queue summary pending profiles pending companies pending properties pending listings pending documents pending verification reviews pending payments pending deal reservations assigned messages booking queue API partner application queue where allowed recent operational activity system notifications
Customer Care Widgets
assigned messages open support messages booking support items document status inquiries verification status inquiries payment status inquiries user lookup shortcut recent support notifications
Developer Checkpoint
- /dashboard resolves correctly by staff role.
- Customer care dashboard only shows support-safe widgets.
- Admin does not see super-admin-only widgets.
- Dashboard cards link to list/queue pages, not hidden detail menu items.
---
12. Implementation Block 7 — Review Queues
Goal
Build central operational review queues.
Routes
/review-queues /review-queues/profiles /review-queues/companies /review-queues/properties /review-queues/listings /review-queues/documents /review-queues/verification-reviews /review-queues/payments /review-queues/deal-reservations /review-queues/bookings /review-queues/api-partners /review-queues/ai
Tasks
1. Build all queues overview.
2. Build profile review queue.
3. Build company review queue.
4. Build property review queue.
5. Build listing review queue.
6. Build document review queue.
7. Build verification review queue.
8. Build payment review queue.
9. Build deal reservation review queue.
10. Build booking review queue where relevant.
11. Build API partner review queue.
12. Build AI/admin review queue where relevant.
Queue Row Behaviour
Queue rows navigate to relevant detail pages:
/review-queues/documents └─ click document review row    └─ /documents/[documentPublicId]
Developer Checkpoint
- Queue pages show count, priority, age/SLA, status, assigned staff where applicable.
- Queue rows open detail pages.
- Detail pages are not sidebar menu items.
- Customer care only sees permitted support queues.
---
13. Implementation Block 8 — Users Module
Goal
Build admin user list, search, filters, and user detail tabs.
Routes
/users /users/public /users/suspended /users/search /users?role=investor /users?role=property_owner /users?role=property_agent /users?role=property_sourcer /users?role=service_provider /users?role=api_partner /users/[userPublicId]
User Detail Tabs
Overview Profiles Companies Properties Listings Deal Reservations Bookings Payments Documents Verification Messages Notifications Audit Trail
Audit Trail is visible only to staff with audit permission.
Important Rule
Do not create User Detail as a sidebar item.
The admin route map states that user detail is reached by clicking a user row and must be a page with tabs/sections, not multiple sidebar menu items.
Developer Checkpoint
- User tables support filtering and safe search.
- User detail uses tabs.
- Customer care gets safe user support view only.
- Super admin records are not visible to non-super-admin staff.
- Internal ObjectIds are not displayed.
---
14. Implementation Block 9 — Staff Module
Goal
Build staff list, staff creation, and staff detail.
Routes
/staff /staff/new /staff?role=admin /staff?role=customer_care_rep /staff?role=super_admin /staff/[staffPublicId] /staff/[staffPublicId]/profile /staff/[staffPublicId]/security /staff/[staffPublicId]/permissions
Allowed Staff Creation
super_admin -> admin super_admin -> customer_care_rep admin -> customer_care_rep
Disallowed Staff Creation
super_admin -> super_admin admin -> admin admin -> super_admin customer_care_rep -> any staff account
No frontend route may create a super_admin.
The frontend rules confirm that no frontend screen, route, form, modal, or action may create a super_admin; super admin creation is seed/bootstrap only.
Developer Checkpoint
- Create staff form does not offer super_admin.
- Admin can only create customer_care_rep.
- Customer care cannot access staff module.
- Non-super-admin staff cannot see super_admin records.
---
15. Implementation Block 10 — Profiles Module
Goal
Build role profile review and management screens.
Routes
/profiles /profiles/investors /profiles/property-owners /profiles/property-agents /profiles/property-sourcers /profiles/service-providers /profiles/[profilePublicId]
Tasks
1. Build profile list.
2. Build role-specific profile lists.
3. Build profile detail.
4. Show verification/onboarding status.
5. Show related user/company.
6. Show safe admin review actions where allowed.
Developer Checkpoint
- Profiles are separated by business role.
- Broad agent wording is not used.
- Profile detail is not a sidebar item.
- Customer care sees status/support view only where allowed.
---
16. Implementation Block 11 — Companies Module
Goal
Build company management and review screens.
Routes
/companies /companies/[companyPublicId] /companies/[companyPublicId]/members /companies/[companyPublicId]/documents /companies/[companyPublicId]/verification
Status Filters
/companies?status=pending /companies?status=approved /companies?status=rejected /companies?status=on_hold
Developer Checkpoint
- Company list supports status filtering.
- Company detail shows members, documents, verification state.
- Customer care does not see high-risk company mutation controls.
---
17. Implementation Block 12 — Properties Module
Goal
Build property review and management screens.
Routes
/properties /properties/[propertyPublicId] /properties/[propertyPublicId]/documents /properties/[propertyPublicId]/listings /properties/[propertyPublicId]/activities
Status Filters
/properties?status=submitted /properties?status=under_review /properties?status=approved /properties?status=rejected
Developer Checkpoint
- Property list supports safe filters.
- Property detail links documents, listings, and activities.
- Property review actions are permission-aware.
- Customer care sees only safe status view where allowed.
---
18. Implementation Block 13 — Listings Module
Goal
Build listing review and lifecycle management screens.
Routes
/listings /listings/[listingPublicId] /listings/[listingPublicId]/review /listings/[listingPublicId]/visibility /listings/[listingPublicId]/activities /listings/[listingPublicId]/audit
Status Filters
/listings?status=submitted /listings?status=under_review /listings?status=published /listings?status=reserved /listings?status=rejected /listings?status=archived
Developer Checkpoint
- Listing lifecycle actions are permission-aware.
- High-impact status changes require confirmation.
- Listing detail is opened from table/queue rows.
- Audit tab/route is visible only where allowed.
---
19. Implementation Block 14 — Documents Module
Goal
Build document review, status, correction, and history screens.
Routes
/documents /documents/status /documents/[documentPublicId] /documents/[documentPublicId]/review /documents/[documentPublicId]/history
Status Filters
/documents?status=pending /documents?status=approved /documents?status=rejected /documents?status=on_hold /documents?status=replacement_required
Admin Document Actions
Approve Reject Place On Hold Request Replacement Add Internal Note Send Safe User Message View Audit Trail
Must Not Expose
private document URLs raw KYC files without permission internal admin notes to public users private KYC notes to unauthorised staff secrets MongoDB ObjectIds
Developer Checkpoint
- Document review has internal note and safe user message separated.
- Replacement required action is clear.
- Customer care can see document status, not approval controls.
- Document detail is not a sidebar item.
---
20. Implementation Block 15 — Verification Reviews Module
Goal
Build verification review, risk, document, message, and audit screens.
Routes
/verification-reviews /verification-reviews/status /verification-reviews/[verificationReviewPublicId] /verification-reviews/[verificationReviewPublicId]/review /verification-reviews/[verificationReviewPublicId]/documents /verification-reviews/[verificationReviewPublicId]/messages /verification-reviews/[verificationReviewPublicId]/audit
Status Filters
/verification-reviews?status=pending /verification-reviews?status=in_review /verification-reviews?status=on_hold /verification-reviews?status=correction_requested /verification-reviews?status=approved /verification-reviews?status=rejected /verification-reviews?risk=flagged
Developer Checkpoint
- Risk details are visible only to authorised staff.
- Internal notes are separated from safe user-facing messages.
- Customer care gets status/support view only.
- Verification review action confirms before submit.
---
21. Implementation Block 16 — Deal Reservations Module
Goal
Build deal reservation oversight screens.
Routes
/deal-reservations /deal-reservations/[reservationPublicId] /deal-reservations/[reservationPublicId]/payment /deal-reservations/[reservationPublicId]/messages /deal-reservations/[reservationPublicId]/activities
Status Filters
/deal-reservations?status=pending /deal-reservations?status=payment_pending /deal-reservations?status=reserved /deal-reservations?status=expired /deal-reservations?status=cancelled /deal-reservations?status=completed
Deal reservations are a first-class admin menu and database-backed area, with their own lifecycle and related payment, listing, property, investor, and admin approval context.
Developer Checkpoint
- Reservation list supports status filters.
- Reservation detail links payment, messages, and activities.
- Approval/cancellation actions are permission-aware.
- Customer care sees status/support only.
---
22. Implementation Block 17 — Deal Activities Module
Goal
Build deal activity timeline screens.
Routes
/deal-activities /deal-activities/[dealActivityPublicId]
Filters
/deal-activities?target=listing /deal-activities?target=property /deal-activities?target=reservation /deal-activities?target=payment /deal-activities?source=admin
Important Rule
Deal activities are not the same as audit logs.
Deal Activity = business timeline Audit Log = internal compliance/security trace
The audit document states that audit logs are different from notifications, emails, conversations, and deal activities.
Developer Checkpoint
- Deal activity timeline is business-facing/admin-operational.
- Audit logs are not mixed into deal activity UI.
- Detail page is not a sidebar item.
---
23. Implementation Block 18 — Payments Module
Goal
Build payment reference, payment review, status, and trace screens.
Routes
/payments /payments/status /payments/references /payments/references/[paymentReference] /payments/[paymentPublicId] /payments/[paymentPublicId]/review /payments/[paymentPublicId]/trace
Status Filters
/payments?status=pending_payment /payments?status=submitted_for_review /payments?status=paid /payments?status=expired /payments?status=cancelled /payments?status=rejected,failed
Admin Payment Actions
Generate Payment Reference Approve Payment Reject Payment Cancel Payment Expire Payment View Trace Details
Developer Checkpoint
- Payment review actions are permission-aware.
- Customer care cannot approve/reject payments.
- Payment proof does not automatically mark payment as paid.
- Sensitive provider/payment data is redacted.
---
24. Implementation Block 19 — Bookings Module
Goal
Build admin booking management and support screens.
Routes
/bookings /bookings/new /bookings/support /bookings/[bookingPublicId] /bookings/[bookingPublicId]/reschedule
Status Filters
/bookings?status=upcoming /bookings?status=pending /bookings?status=completed /bookings?status=cancelled /bookings?type=support&status=upcoming
Developer Checkpoint
- Admin-created booking form exists where allowed.
- Customer care gets booking support views.
- Booking participants are shown safely.
- Reschedule/cancel actions are permission-aware.
---
25. Implementation Block 20 — Messages Module
Goal
Build admin/staff message oversight and support handling.
Routes
/messages /messages/assigned /messages/[conversationPublicId]
Message Type Filters
/messages?type=support /messages?type=deal /messages?type=reservation /messages?type=payment /messages?type=verification /messages?type=document_review /messages?type=booking /messages?type=property_submission /messages?type=api_partner
Message Types
support deal reservation payment verification document_review booking property_submission api_partner
The admin route map confirms that the frontend menu label should be Messages, while backend conversations remain the thread/container concept and messages remain individual items inside the thread.
Developer Checkpoint
- Messages menu exists.
- Assigned messages view exists.
- Conversation detail opens from list row.
- Support, deal, reservation, payment, verification, document, booking, property submission, and API partner filters exist.
- Internal admin notes are not mixed with user-facing messages.
---
26. Implementation Block 21 — Notifications Module
Goal
Build admin/staff notifications, templates, system notifications, user notifications, and preferences.
Routes
/notifications /notifications/templates /notifications/system/new /notifications/user/new /notifications/preferences
Required Features
unread count notification bell latest notifications notification inbox category filter priority filter read/unread dismiss read all open related item notification preferences template list where allowed send system notification where allowed send user notification where allowed
The notification rules define notifications as operational, role-aware, profile-aware, action-oriented, safe, and not promotional. They must not expose sensitive internal notes, private KYC/risk details, secrets, API keys, webhook secrets, or internal IDs.
Developer Checkpoint
- Notifications are permission-aware.
- Customer care sees own/assigned notifications only.
- System/user notification sending is restricted.
- Notification payloads use safe public IDs and URLs.
---
27. Implementation Block 22 — API Access Module
Goal
Build API partner application review, API clients, plans, subscriptions, keys metadata, usage, webhooks, and billing screens.
Routes
/api-access/applications /api-access/applications/[applicationPublicId] /api-access/clients /api-access/clients/[apiClientPublicId] /api-access/plans /api-access/plans/[apiPlanPublicId] /api-access/subscriptions /api-access/subscriptions/[subscriptionPublicId] /api-access/keys /api-access/keys/[apiKeyPublicId] /api-access/usage /api-access/usage/[apiClientPublicId] /api-access/webhooks /api-access/webhooks/[webhookPublicId] /api-access/webhooks/[webhookPublicId]/deliveries /api-access/billing
Admin API Access Actions
Approve Application Reject Application Place On Hold Request More Information Assign Plan Assign Scopes Suspend Client Reactivate Client Review Usage Review Webhooks Review Billing
Must Not Show
full API keys after initial reveal API key hashes webhook secrets private infrastructure values partner docs mixed with admin docs
The endpoint rules require public, admin, and partner API documentation to be separated, and API partners must not receive full backend Swagger/admin/internal documentation.
Developer Checkpoint
- API Access is hidden from customer care.
- API key metadata is safe.
- Full API keys are never repeatedly displayed.
- Webhook delivery screens redact secrets.
- API client approval actions are permission-aware.
---
28. Implementation Block 23 — AI/Admin Insights Module
Goal
Build admin AI overview, recommendations, matching snapshots, analysis runs, and feedback screens.
Routes
/ai /ai/recommendations /ai/matching-snapshots /ai/analysis-runs /ai/feedback
AI Admin Screens Should Support
AI overview recommendation insights matching snapshots analysis runs AI feedback safe status and confidence display links to listing/profile where allowed
Important Rule
AI must not override:
permission rules verification rules payment rules policy rules reservation rules listing lifecycle rules admin approval data visibility rules
Developer Checkpoint
- AI screens are hidden from customer care.
- AI recommendations are explainable.
- AI does not present certainty or financial/legal guarantees.
- Sensitive AI payloads are not exposed.
---
29. Implementation Block 24 — Audit Logs Module
Goal
Build audit log search, filtering, detail, and high-risk action views for authorised staff.
Routes
/audit-logs /audit-logs/high-risk /audit-logs/staff /audit-logs/payments /audit-logs/verification /audit-logs/documents /audit-logs/api-access /audit-logs/[auditLogPublicId]
Audit UI Should Show
action category actor target status safe summary source createdAt requestId correlationId
Must Not Show
passwords tokens full API keys API key hashes webhook secrets private document URLs raw KYC files payment provider secrets private AI prompts
Audit logs are internal records and must not be exposed to public users or unauthorised staff.
Developer Checkpoint
- Audit Logs menu is hidden from customer care.
- Audit detail redacts secrets.
- High-risk filters exist.
- Audit detail is not a sidebar menu item.
---
30. Implementation Block 25 — Settings Module
Goal
Build settings screens for authorised users only.
Routes
/settings /settings/permissions /settings/policies /settings/email-templates /settings/notification-templates /settings/api-access /settings/integrations /settings/system
Access
super_admin -> full settings where allowed admin -> limited settings where allowed customer_care_rep -> no settings access except own preferences
Must Not Expose Controls For
creating super_admin viewing secrets editing audit logs directly viewing full API keys editing protected system internals without permission
Developer Checkpoint
- Settings menu hidden from customer care.
- Admin sees only permitted settings.
- Super-admin-only settings are protected.
- No setting exposes secret values.
---
31. Implementation Block 26 — My Staff Account Module
Goal
Build current staff account pages.
Routes
/my-profile /my-profile/security /my-profile/notifications /my-profile/activity
Tasks
1. Build my profile page.
2. Build staff security page.
3. Build staff notification preferences page.
4. Build staff own activity page where allowed.
5. Add safe profile update form.
Rule
This area is for the currently logged-in staff user only.
Customer care reps may manage their own profile/security where allowed, but must not broadly mutate other users.
Developer Checkpoint
- My Profile only edits current staff user.
- Security changes are safe.
- Notification preferences work.
- Customer care cannot mutate other staff or public users broadly.
---
32. Implementation Block 27 — System Status, Error, Empty, Loading, and Accessibility Hardening
Goal
Make the admin app safe, clear, and operationally usable.
Routes
/system/status
Required Error States
401 Unauthorized 403 Forbidden 404 Not Found Session Expired Account Locked Insufficient Permission Record Not Available Action Blocked System Error
Safe Messages
You do not have permission to access this admin area.
This record is not available or you do not have permission to view it.
Your session has expired. Please sign in again.
This action cannot be completed from your current staff role.
Something went wrong. Please try again or contact a super admin.
Empty State Examples
No users found. Try adjusting your filters or search terms.
No documents are pending review. New submissions will appear here when users upload documents.
No messages assigned to you. New assigned conversations will appear here.
Developer Checkpoint
- Every major table/list has an empty state.
- Every high-impact action has confirmation.
- Loading states exist.
- Keyboard navigation works.
- Focus states are visible.
- Table actions are accessible.
- Status badges are not colour-only.
---
33. Implementation Block 28 — Testing and QA
Goal
Add practical tests and checks before deployment.
Test Areas
admin auth screens dashboard resolver super admin dashboard visibility admin dashboard visibility customer care dashboard visibility admin top bar messages shortcut notifications shortcut sidebar role visibility mobile drawer review queues users list and detail tabs staff creation restrictions profiles list/detail companies list/detail properties list/detail listings list/detail documents review/status views verification review/status views deal reservations deal activities payments review/status views bookings management/support views messages list/detail notifications inbox/templates/send API access screens AI screens audit logs access/redaction settings access restrictions my staff account error and empty states
Required Commands
npm run lint npm run typecheck npm run build
If test framework is added:
npm run test npm run test:e2e
Developer Checkpoint
- npm run lint passes.
- npm run typecheck passes.
- npm run build passes.
- Customer care cannot access restricted routes.
- Admin cannot create admin or super_admin.
- No route can create super_admin.
- Detail pages are not sidebar items.
- No public/user routes exist.
- No ObjectIds are displayed.
- Secrets are redacted.
---
34. Implementation Block 29 — Vercel Deployment Preparation
Goal
Prepare asancha-admin for deployment to Vercel.
Tasks
1. Confirm production environment variables.
2. Confirm NEXT_PUBLIC_API_BASE_URL.
3. Confirm public app URL.
4. Confirm build command.
5. Confirm output is Vercel-compatible.
6. Confirm domain admin.asancha.co.uk.
7. Confirm no secrets are exposed.
8. Confirm robots and metadata are admin-safe.
9. Confirm unauthenticated admin routes redirect safely.
10. Confirm public users cannot access admin screens.
Vercel Project
Vercel project: asancha-admin Production domain: https://admin.asancha.co.uk Framework: Next.js
Build Commands
npm install npm run build
---
35. Developer “Do Not Do” List
You must not:
1. Create public signup in asancha-admin.
2. Create public onboarding in asancha-admin.
3. Create marketplace pages in asancha-admin.
4. Create public user dashboards in asancha-admin.
5. Create admin/staff routes inside asancha-web.
6. Create a super_admin from frontend.
7. Show super_admin records to non-super-admin staff.
8. Allow admin to create admin.
9. Allow admin to create super_admin.
10. Allow customer_care_rep to create staff.
11. Allow customer_care_rep to broadly mutate users.
12. Put detail pages in sidebar menus.
13. Use User Activity as a vague sidebar item.
14. Mix deal activities with audit logs.
15. Label the admin menu Conversations instead of Messages.
16. Remove deal/reservation message types.
17. Expose MongoDB ObjectIds.
18. Expose secrets, full API keys, API key hashes, webhook secrets, or private KYC notes.
19. Expose internal admin notes to public users.
20. Expose audit logs to customer care.
21. Expose settings to customer care.
22. Treat hidden frontend buttons as security.
23. Build against inactive content/marketing scope.
---
36. Developer Completion Checklist
Before the admin/staff frontend is considered implementation-ready:
- asancha-admin repository exists.
- Next.js App Router is configured.
- Tailwind CSS is configured.
- CSS Modules are supported.
- Zod + React Hook Form are installed.
- API client is implemented.
- Staff auth screens are implemented.
- Admin shell is implemented.
- Desktop top bar is implemented.
- Mobile top bar is implemented.
- Messages appears in top bar and mobile drawer.
- Help/Support does not appear in admin top bar.
- Sidebar navigation is role-aware.
- Detail pages are not sidebar menu items.
- Dashboard resolver is implemented.
- Super admin dashboard exists.
- Admin dashboard exists.
- Customer care dashboard exists.
- Review queues exist.
- Users module exists.
- Staff module exists with correct creation restrictions.
- Profiles module exists.
- Companies module exists.
- Properties module exists.
- Listings module exists.
- Documents module exists.
- Verification reviews module exists.
- Deal reservations module exists.
- Deal activities module exists.
- Payments module exists.
- Bookings module exists.
- Messages module exists.
- Notifications module exists.
- API access module exists.
- AI/admin insights module exists.
- Audit logs module exists for authorised staff.
- Settings module exists for authorised staff.
- My staff account exists.
- System status exists where allowed.
- Customer care only sees safe support views.
- No public/user route exists.
- No frontend super_admin creation path exists.
- Public IDs are used in routes.
- No MongoDB ObjectIds are displayed.
- npm run lint passes.
- npm run typecheck passes.
- npm run build passes.
---
37. Final Implementation Sequence Summary
0. Repository preparation and implementation documentation 1. Frontend foundation and configuration 2. Shared UI primitives and admin styling foundation 3. API client, staff auth session, route guards, and permission helpers 4. Admin auth screens 5. Admin shell, top bar, sidebar, mobile drawer, and navigation 6. Dashboard resolver and role dashboards 7. Review queues 8. Users module 9. Staff module 10. Profiles module 11. Companies module 12. Properties module 13. Listings module 14. Documents module 15. Verification reviews module 16. Deal reservations module 17. Deal activities module 18. Payments module 19. Bookings module 20. Messages module 21. Notifications module 22. API access module 23. AI/admin insights module 24. Audit logs module 25. Settings module 26. My staff account module 27. System status, safe error states, empty states, loading states, accessibility 28. Testing and QA 29. Vercel deployment preparation
This is the approved working direction for Asancha Admin/Staff Frontend Implementation Roadmap for Self-Implementation v1.0.