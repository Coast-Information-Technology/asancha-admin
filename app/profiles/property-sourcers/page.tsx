// app/profiles/property-sourcers/page.tsx

import { ProfilesTable } from '../../../src/components/profiles/profiles-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROFILES } from '../../../src/lib/demo/management-demo-data';

export default function PropertySourcerProfilesPage() {
  const profiles = DEMO_PROFILES.filter((profile) => profile.profileType === 'property_sourcer');

  return (
    <ManagementListPage
      description="Property sourcer profiles with sourcing readiness, submission, and verification context."
      filters={[
        { label: 'All profiles', href: '/profiles' },
        { label: 'Pending', href: '/profiles/property-sourcers?status=pending' },
        { label: 'Approved', href: '/profiles/property-sourcers?status=approved' },
      ]}
      metrics={[
        {
          label: 'Sourcer profiles',
          value: String(profiles.length),
          detail: 'Demo property sourcer records',
          tone: 'info',
        },
        { label: 'Approved', value: '0', detail: 'Ready for sourcing workflows', tone: 'success' },
        { label: 'Pending', value: '1', detail: 'Onboarding review active', tone: 'warning' },
        {
          label: 'Submitted deals',
          value: '1',
          detail: 'Related property context exists',
          tone: 'neutral',
        },
      ]}
      title="Property sourcer profiles"
      totalLabel={`${profiles.length} property sourcer profile${profiles.length === 1 ? '' : 's'}`}
    >
      <ProfilesTable profiles={profiles} />
    </ManagementListPage>
  );
}
