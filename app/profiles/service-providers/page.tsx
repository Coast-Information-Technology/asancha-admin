// app/profiles/service-providers/page.tsx

import { ProfilesListView } from '../../../src/components/profiles/profiles-list-view';
import type { ProfileType } from '../../../src/features/profiles/types/profiles.types';

const profileType: ProfileType = 'service_provider';

export default function ServiceProviderProfilesPage() {
  return <ProfilesListView profileType={profileType} />;
}
