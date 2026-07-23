// app/staff/page.tsx

import { ManagementListPage } from '../../src/components/layout/page-shell/management-list-page';
import { StaffTable } from '../../src/components/staff/staff-table';
import { Button } from '../../src/components/ui/button/button';
import type { StaffRole } from '../../src/features/staff/types/staff.types';
import { DEMO_STAFF } from '../../src/lib/demo/management-demo-data';

interface StaffPageProps {
  searchParams?: Promise<{
    role?: string | string[];
  }>;
}

function getRoleFilter(value: string | string[] | undefined): StaffRole | undefined {
  const role = Array.isArray(value) ? value[0] : value;

  return role === 'super_admin' || role === 'admin' || role === 'customer_care_rep'
    ? role
    : undefined;
}

export default async function StaffPage({ searchParams }: StaffPageProps) {
  const params = await searchParams;
  const roleFilter = getRoleFilter(params?.role);
  const staff = roleFilter ? DEMO_STAFF.filter((member) => member.role === roleFilter) : DEMO_STAFF;

  return (
    <ManagementListPage
      actions={<Button href="/staff/new">Create staff</Button>}
      description="All authorised staff accounts with role, status, access, and activity context."
      filters={[
        { label: 'All staff', href: '/staff' },
        { label: 'Admins', href: '/staff?role=admin' },
        { label: 'Customer care', href: '/staff?role=customer_care_rep' },
      ]}
      metrics={[
        {
          label: 'All staff',
          value: String(DEMO_STAFF.length),
          detail: 'Demo internal staff records',
          tone: 'info',
        },
        {
          label: 'Active',
          value: String(DEMO_STAFF.filter((member) => member.status === 'active').length),
          detail: 'Operational accounts available',
          tone: 'success',
        },
        {
          label: 'Invited',
          value: String(DEMO_STAFF.filter((member) => member.status === 'invited').length),
          detail: 'Awaiting account setup',
          tone: 'warning',
        },
        {
          label: 'Super admins',
          value: String(DEMO_STAFF.filter((member) => member.role === 'super_admin').length),
          detail: 'Seed/bootstrap account only',
          tone: 'danger',
        },
      ]}
      title="Staff management"
      totalLabel={`${staff.length} staff account${staff.length === 1 ? '' : 's'}`}
    >
      <StaffTable staff={staff} />
    </ManagementListPage>
  );
}
