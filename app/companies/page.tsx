// app/companies/page.tsx

import { CompaniesTable } from '../../src/components/companies/companies-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../../src/components/layout/page-shell/management-list-page';
import { DEMO_COMPANIES } from '../../src/lib/demo/management-demo-data';

const metrics: readonly ManagementListMetric[] = [
  { label: 'All companies', value: '4', detail: 'Registered demo companies', tone: 'info' },
  {
    label: 'Under review',
    value: '2',
    detail: 'Company or verification review active',
    tone: 'warning',
  },
  { label: 'Approved', value: '1', detail: 'Ready for permitted workflows', tone: 'success' },
  { label: 'Needs attention', value: '2', detail: 'Pending, on hold, or flagged', tone: 'danger' },
];

export default function CompaniesPage() {
  return (
    <ManagementListPage
      description="All registered companies with onboarding, membership, document, property, and verification context."
      filters={[
        { label: 'Pending or review', href: '/companies?status=under_review' },
        { label: 'Approved', href: '/companies?status=approved' },
        { label: 'On hold', href: '/companies?status=on_hold' },
      ]}
      metrics={metrics}
      title="Companies"
      totalLabel="4 companies"
    >
      <CompaniesTable companies={DEMO_COMPANIES} />
    </ManagementListPage>
  );
}
