// app/profiles/property-owners/page.tsx

import { ProfilesTable } from '../../../src/components/profiles/profiles-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROFILES } from '../../../src/lib/demo/management-demo-data';

export default function PropertyOwnerProfilesPage() {
  const profiles = DEMO_PROFILES.filter((profile) => profile.profileType === 'property_owner');

  return (
    <ManagementListPage
      description="Property owner profiles with property ownership, company, document, and verification context."
      filters={[
        { label: 'All profiles', href: '/profiles' },
        { label: 'Under review', href: '/profiles/property-owners?status=under_review' },
        { label: 'Approved', href: '/profiles/property-owners?status=approved' },
      ]}
      metrics={[
        {
          label: 'Owner profiles',
          value: String(profiles.length),
          detail: 'Demo property owner records',
          tone: 'info',
        },
        { label: 'Approved', value: '0', detail: 'Ready for property workflows', tone: 'success' },
        {
          label: 'In review',
          value: '1',
          detail: 'Verification currently active',
          tone: 'warning',
        },
        {
          label: 'Document attention',
          value: '1',
          detail: 'Related records need review',
          tone: 'danger',
        },
      ]}
      title="Property owner profiles"
      totalLabel={`${profiles.length} property owner profile${profiles.length === 1 ? '' : 's'}`}
    >
      <ProfilesTable profiles={profiles} />
    </ManagementListPage>
  );
}
