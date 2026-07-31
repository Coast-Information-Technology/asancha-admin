/*
 * app/verification/page.tsx
 *
 * File purpose:
 * Provides the Verification workspace overview route for authorised staff.
 *
 * Role in the project:
 * This route is the frontend entry point for manual verification workload,
 * attention counts, review queues, and verification queries.
 *
 * Business relevance:
 * Verification owns manual review decisions while Messaging owns related
 * conversations and Notifications owns standard notification delivery.
 *
 * Security note:
 * The backend API must confirm staff permissions, redaction, counts, and
 * verification records before live data or review actions are displayed.
 */

import { BackendPendingPage } from '../../src/components/layout/page-shell/backend-pending-page';

export default function VerificationPage() {
  return (
    <BackendPendingPage
      backendScope="Verification Records and Verification Queries"
      description="Review manual verification workload, status, and customer-action queues."
      plannedWork={[
        'Verification workload and attention-required summary',
        'Onboarding, property, payment, API partner, and transaction verification queues',
        'Verification Query filtering and review history',
        'Permission-aware document, correction, approval, and audit actions',
      ]}
      title="Verification"
    />
  );
}
