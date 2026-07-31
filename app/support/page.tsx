/*
 * app/support/page.tsx
 *
 * File purpose:
 * Provides the Admin Support workspace route before Support Case APIs are
 * connected.
 *
 * Role in the project:
 * Support owns case classification, priority, assignment, escalation, SLA,
 * resolution, closure, and reopening. Messaging owns the linked conversation.
 *
 * Business relevance:
 * Support is a structured case-management workspace and is separate from the
 * consolidated Messages inbox.
 *
 * Security note:
 * No customer cases, internal notes, sensitive attachments, or support counts
 * are shown until backend permissions and response structures are confirmed.
 */

import { BackendPendingPage } from '../../src/components/layout/page-shell/backend-pending-page';

export default function SupportPage() {
  return (
    <BackendPendingPage
      backendScope="Support Cases and Support Conversations"
      description="Manage customer assistance, operational enquiries, escalations, and resolutions."
      plannedWork={[
        'Case reference, category, priority, status, assignment, and SLA filters',
        'Support Case detail with linked Conversation and safe context records',
        'Assignment, escalation, internal-note, resolution, and reopening workflows',
        'Attention counts for unassigned, overdue, escalated, or unattended cases',
      ]}
      title="Support"
    />
  );
}
