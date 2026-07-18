// app/profiles/service-providers/page.tsx

import { ProfilesTable } from '../../../src/components/profiles/profiles-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROFILES } from '../../../src/lib/demo/management-demo-data';

export default function ServiceProviderProfilesPage() {
  const profiles = DEMO_PROFILES.filter((profile) => profile.profileType === 'service_provider');

  return (
    <ManagementListPage
      description="Service provider profiles with company, insurance, service readiness, and verification context."
      filters={[{ label: 'All profiles', href: '/profiles' }, { label: 'Pending', href: '/profiles/service-providers?status=pending' }, { label: 'Correction required', href: '/profiles/service-providers?status=correction_requested' }]}
      metrics={[
        { label: 'Provider profiles', value: String(profiles.length), detail: 'Demo service provider records', tone: 'info' },
        { label: 'Approved', value: '0', detail: 'Ready for service workflows', tone: 'success' },
        { label: 'Pending', value: '0', detail: 'Awaiting onboarding review', tone: 'warning' },
        { label: 'Correction required', value: '1', detail: 'Insurance or profile action needed', tone: 'danger' },
      ]}
      title="Service provider profiles"
      totalLabel={`${profiles.length} service provider profile${profiles.length === 1 ? '' : 's'}`}
    >
      <ProfilesTable profiles={profiles} />
    </ManagementListPage>
  );
}
