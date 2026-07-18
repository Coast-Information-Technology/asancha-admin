// app/users/suspended/page.tsx

import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { UsersTable } from '../../../src/components/users/users-table';
import { DEMO_USERS } from '../../../src/lib/demo/management-demo-data';

export default function SuspendedUsersPage() {
  const users = DEMO_USERS.filter((user) => ['suspended', 'restricted'].includes(user.status));

  return (
    <ManagementListPage
      description="Suspended and restricted public user accounts for support and escalation workflows."
      filters={[{ label: 'All users', href: '/users' }, { label: 'Suspended', href: '/users/suspended?status=suspended' }, { label: 'Restricted', href: '/users/suspended?status=restricted' }]}
      metrics={[
        { label: 'Restricted accounts', value: String(users.length), detail: 'Demo accounts in this view', tone: 'danger' },
        { label: 'Suspended', value: '1', detail: 'Account activity blocked', tone: 'warning' },
        { label: 'Restricted', value: '1', detail: 'Partial access limitation', tone: 'info' },
        { label: 'Needs review', value: '2', detail: 'Support or escalation context', tone: 'neutral' },
      ]}
      title="Suspended users"
      totalLabel={`${users.length} restricted users`}
    >
      <UsersTable users={users} />
    </ManagementListPage>
  );
}
