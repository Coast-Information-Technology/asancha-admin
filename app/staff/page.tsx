// app/staff/page.tsx

import { ManagementListPage } from '../../src/components/layout/page-shell/management-list-page';
import { StaffTable } from '../../src/components/staff/staff-table';
import { DEMO_STAFF } from '../../src/lib/demo/management-demo-data';

export default function StaffPage() {
  return (
    <ManagementListPage
      description="All authorised staff accounts with role, status, access, and activity context."
      filters={[{ label: 'Admins', href: '/staff?role=admin' }, { label: 'Customer care', href: '/staff?role=customer_care_rep' }, { label: 'Create permitted staff', href: '/staff/new' }]}
      metrics={[
        { label: 'All staff', value: '4', detail: 'Demo internal staff records', tone: 'info' },
        { label: 'Active', value: '3', detail: 'Operational accounts available', tone: 'success' },
        { label: 'Invited', value: '1', detail: 'Awaiting account setup', tone: 'warning' },
        { label: 'Super admins', value: '1', detail: 'Seed/bootstrap account only', tone: 'danger' },
      ]}
      title="Staff management"
      totalLabel="4 staff accounts"
    >
      <StaffTable staff={DEMO_STAFF} />
    </ManagementListPage>
  );
}
