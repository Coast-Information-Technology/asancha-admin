// app/review-queues/companies/page.tsx

import { CompaniesTable } from '../../../src/components/companies/companies-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_COMPANIES } from '../../../src/lib/demo/management-demo-data';

export default function CompanyReviewQueuePage() {
  const companies = DEMO_COMPANIES.filter((company) => company.status !== 'approved');

  return (
    <ManagementListPage
      description="Company onboarding, verification, document, and member review queue."
      filters={[
        { label: 'All companies', href: '/companies' },
        { label: 'On hold', href: '/companies?status=on_hold' },
        { label: 'Verification review', href: '/companies?verificationStatus=in_review' },
      ]}
      metrics={[
        {
          label: 'Queue records',
          value: String(companies.length),
          detail: 'Demo companies requiring review',
          tone: 'warning',
        },
        {
          label: 'Verification review',
          value: '2',
          detail: 'Company verification active',
          tone: 'info',
        },
        {
          label: 'Documents',
          value: '2',
          detail: 'Company documents need attention',
          tone: 'danger',
        },
        {
          label: 'Ready after review',
          value: '1',
          detail: 'Demo approved company outside queue',
          tone: 'success',
        },
      ]}
      title="Company review queue"
      totalLabel={`${companies.length} queued companies`}
    >
      <CompaniesTable companies={companies} />
    </ManagementListPage>
  );
}
