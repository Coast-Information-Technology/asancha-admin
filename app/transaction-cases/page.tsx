/*
 * app/transaction-cases/page.tsx
 *
 * File purpose:
 * Provides the Admin Transaction Cases workspace route before its backend
 * workflow endpoints are connected.
 *
 * Role in the project:
 * Transaction Cases coordinate progression from confirmed reservation or
 * accepted offer through due diligence, funding, legal progress, exchange,
 * completion, failure, cancellation, expiry, or closure.
 *
 * Business relevance:
 * A Transaction Case is an operational workflow record. It is not a Listing,
 * Deal, Reservation, Offer, Payment, legal conveyancing record, or Commercial
 * Agreement.
 *
 * Security note:
 * No transaction records, financial evidence, legal milestones, or completion
 * decisions are shown until the backend contract and staff permissions are
 * confirmed.
 */

import { BackendPendingPage } from '../../src/components/layout/page-shell/backend-pending-page';

export default function TransactionCasesPage() {
  return (
    <BackendPendingPage
      backendScope="Transaction Cases"
      description="Coordinate property transaction progression and operational next actions."
      plannedWork={[
        'Case status, transaction stage, mode, priority, and risk filters',
        'Participants, tasks, blockers, risks, milestones, and timeline views',
        'Reservation, offer, Listing, Payment, and Conversation relationships',
        'Permission-aware milestone confirmation and case closure workflows',
      ]}
      title="Transaction Cases"
    />
  );
}
