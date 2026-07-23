// app/review-queues/documents/page.tsx

import { DocumentsTable } from '../../../src/components/documents/documents-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_DOCUMENTS } from '../../../src/lib/demo/management-demo-data';

export default function DocumentReviewQueuePage() {
  const documents = DEMO_DOCUMENTS.filter((document) => document.status !== 'approved');

  return (
    <ManagementListPage
      description="Document review, replacement, status, and history queue."
      filters={[
        { label: 'All documents', href: '/documents' },
        { label: 'Pending', href: '/documents?status=pending' },
        { label: 'Replacement required', href: '/documents?status=replacement_required' },
      ]}
      metrics={[
        {
          label: 'Queue records',
          value: String(documents.length),
          detail: 'Demo documents requiring review',
          tone: 'warning',
        },
        { label: 'In review', value: '1', detail: 'Currently assessed by staff', tone: 'info' },
        {
          label: 'Replacement required',
          value: '1',
          detail: 'User correction needed',
          tone: 'danger',
        },
        {
          label: 'Approved outside queue',
          value: '1',
          detail: 'Accepted document record',
          tone: 'success',
        },
      ]}
      title="Document review queue"
      totalLabel={`${documents.length} queued documents`}
    >
      <DocumentsTable documents={documents} />
    </ManagementListPage>
  );
}
