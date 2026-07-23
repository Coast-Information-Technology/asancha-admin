// app/documents/page.tsx

import { DocumentsTable } from '../../src/components/documents/documents-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../../src/components/layout/page-shell/management-list-page';
import { DEMO_DOCUMENTS } from '../../src/lib/demo/management-demo-data';

const metrics: readonly ManagementListMetric[] = [
  {
    label: 'All documents',
    value: '5',
    detail: 'Safe metadata records in this view',
    tone: 'info',
  },
  {
    label: 'Pending or in review',
    value: '2',
    detail: 'Awaiting authorised assessment',
    tone: 'warning',
  },
  { label: 'Approved', value: '1', detail: 'Accepted for the related workflow', tone: 'success' },
  {
    label: 'Action required',
    value: '2',
    detail: 'Replacement, hold, or risk follow-up',
    tone: 'danger',
  },
];

export default function DocumentsPage() {
  return (
    <ManagementListPage
      description="All document records with owner context, review status, risk, and replacement workflow."
      filters={[
        { label: 'Pending review', href: '/documents?status=pending' },
        { label: 'Replacement required', href: '/documents?status=replacement_required' },
        { label: 'Approved', href: '/documents?status=approved' },
        { label: 'Status support view', href: '/documents/status' },
      ]}
      metrics={metrics}
      title="Documents"
      totalLabel="5 documents"
    >
      <DocumentsTable documents={DEMO_DOCUMENTS} />
    </ManagementListPage>
  );
}
