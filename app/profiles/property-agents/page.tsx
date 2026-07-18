// app/profiles/property-agents/page.tsx

import { ProfilesTable } from '../../../src/components/profiles/profiles-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROFILES } from '../../../src/lib/demo/management-demo-data';

export default function PropertyAgentProfilesPage() {
  const profiles = DEMO_PROFILES.filter((profile) => profile.profileType === 'property_agent');

  return (
    <ManagementListPage
      description="Property agent profiles with agency relationship, listing, and verification context."
      filters={[{ label: 'All profiles', href: '/profiles' }, { label: 'Approved', href: '/profiles/property-agents?status=approved' }, { label: 'Company linked', href: '/profiles/property-agents?companyLinked=true' }]}
      metrics={[
        { label: 'Agent profiles', value: String(profiles.length), detail: 'Demo property agent records', tone: 'info' },
        { label: 'Approved', value: '1', detail: 'Ready for listing workflows', tone: 'success' },
        { label: 'In review', value: '0', detail: 'Awaiting staff assessment', tone: 'warning' },
        { label: 'Company linked', value: '1', detail: 'Connected to an agency', tone: 'neutral' },
      ]}
      title="Property agent profiles"
      totalLabel={`${profiles.length} property agent profile${profiles.length === 1 ? '' : 's'}`}
    >
      <ProfilesTable profiles={profiles} />
    </ManagementListPage>
  );
}
