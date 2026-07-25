// app/profiles/property-owners/page.tsx

import { ProfilesListView } from '../../../src/components/profiles/profiles-list-view';
import type { ProfileType } from '../../../src/features/profiles/types/profiles.types';

const profileType: ProfileType = 'property_owner';

export default function PropertyOwnerProfilesPage() {
  return <ProfilesListView profileType={profileType} />;
}
