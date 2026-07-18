// app/users/page.tsx

import { UsersTable } from '../../src/components/users/users-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../../src/components/layout/page-shell/management-list-page';
import { DEMO_USERS } from '../../src/lib/demo/management-demo-data';

const metrics: readonly ManagementListMetric[] = [
  { label: 'All users', value: '6', detail: 'Registered demo public users', tone: 'info' },
  { label: 'Active', value: '2', detail: 'Accounts available for normal activity', tone: 'success' },
  { label: 'Pending review', value: '2', detail: 'Onboarding or verification incomplete', tone: 'warning' },
  { label: 'Restricted', value: '2', detail: 'Suspended or limited accounts', tone: 'danger' },
];

export default function UsersPage() {
  return (
    <ManagementListPage
      description="All public users with role, account, verification, and related-resource entry points."
      filters={[
        { label: 'All public users', href: '/users/public' },
        { label: 'Suspended or restricted', href: '/users/suspended' },
        { label: 'Investors', href: '/users/public?role=investor' },
        { label: 'Property operators', href: '/users/public?role=property_owner' },
      ]}
      metrics={metrics}
      title="Users"
      totalLabel="6 users"
    >
      <UsersTable users={DEMO_USERS} />
    </ManagementListPage>
  );
}
