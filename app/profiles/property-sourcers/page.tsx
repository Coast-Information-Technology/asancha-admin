// app/profiles/property-sourcers/page.tsx

import { ProfilesListView } from '../../../src/components/profiles/profiles-list-view';
import type { ProfileType } from '../../../src/features/profiles/types/profiles.types';

const profileType: ProfileType = 'property_sourcer';

export default function PropertySourcerProfilesPage() {
  return <ProfilesListView profileType={profileType} />;
}
