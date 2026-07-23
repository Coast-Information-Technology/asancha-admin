// app/profiles/investors/page.tsx

import { ProfilesTable } from '../../../src/components/profiles/profiles-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROFILES } from '../../../src/lib/demo/management-demo-data';

export default function InvestorProfilesPage() {
  const profiles = DEMO_PROFILES.filter((profile) => profile.profileType === 'investor');

  return (
    <ManagementListPage
      description="Investor profiles with onboarding, verification, and investment-readiness context."
      filters={[
        { label: 'All profiles', href: '/profiles' },
        { label: 'Pending', href: '/profiles/investors?status=pending' },
        { label: 'Approved', href: '/profiles/investors?status=approved' },
      ]}
      metrics={[
        {
          label: 'Investor profiles',
          value: String(profiles.length),
          detail: 'Demo investor records',
          tone: 'info',
        },
        { label: 'Approved', value: '1', detail: 'Ready for deal matching', tone: 'success' },
        {
          label: 'Pending review',
          value: '0',
          detail: 'Awaiting staff assessment',
          tone: 'warning',
        },
        { label: 'Correction required', value: '0', detail: 'User action needed', tone: 'danger' },
      ]}
      title="Investor profiles"
      totalLabel={`${profiles.length} investor profile${profiles.length === 1 ? '' : 's'}`}
    >
      <ProfilesTable profiles={profiles} />
    </ManagementListPage>
  );
}
