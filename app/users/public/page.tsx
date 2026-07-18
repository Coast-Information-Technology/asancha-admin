// app/users/public/page.tsx

import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { UsersTable } from '../../../src/components/users/users-table';
import { DEMO_USERS } from '../../../src/lib/demo/management-demo-data';

export default function PublicUsersPage() {
  return (
    <ManagementListPage
      description="All public platform users with role, account, verification, and support-safe context."
      filters={[
        { label: 'Investors', href: '/users/public?role=investor' },
        { label: 'Property operators', href: '/users/public?role=property_owner' },
        { label: 'Service providers', href: '/users/public?role=service_provider' },
        { label: 'Back to all users', href: '/users' },
      ]}
      metrics={[
        { label: 'Public users', value: '6', detail: 'All demo public user records', tone: 'info' },
        { label: 'Verified', value: '2', detail: 'Verification approved', tone: 'success' },
        { label: 'Onboarding review', value: '2', detail: 'Pending or in review', tone: 'warning' },
        { label: 'Restricted', value: '2', detail: 'Suspended or restricted accounts', tone: 'danger' },
      ]}
      title="Public users"
      totalLabel="6 public users"
    >
      <UsersTable users={DEMO_USERS} />
    </ManagementListPage>
  );
}
