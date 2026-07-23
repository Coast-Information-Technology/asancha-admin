// app/profiles/page.tsx

import { ProfilesTable } from '../../src/components/profiles/profiles-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROFILES } from '../../src/lib/demo/management-demo-data';

const metrics: readonly ManagementListMetric[] = [
  { label: 'All profiles', value: '5', detail: 'One demo business profile per role', tone: 'info' },
  { label: 'Approved', value: '2', detail: 'Ready for permitted user workflows', tone: 'success' },
  {
    label: 'Pending or review',
    value: '2',
    detail: 'Onboarding or verification active',
    tone: 'warning',
  },
  { label: 'Flagged', value: '1', detail: 'Requires authorised attention', tone: 'danger' },
];

export default function ProfilesPage() {
  return (
    <ManagementListPage
      description="All business profiles across investor, owner, agent, sourcer, and service provider roles."
      filters={[
        { label: 'Investors', href: '/profiles/investors' },
        { label: 'Property owners', href: '/profiles/property-owners' },
        { label: 'Agents', href: '/profiles/property-agents' },
        { label: 'Sourcers', href: '/profiles/property-sourcers' },
        { label: 'Service providers', href: '/profiles/service-providers' },
      ]}
      metrics={metrics}
      title="Profiles"
      totalLabel="5 profiles"
    >
      <ProfilesTable profiles={DEMO_PROFILES} />
    </ManagementListPage>
  );
}
