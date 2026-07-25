// app/profiles/property-agents/page.tsx

import { ProfilesListView } from '../../../src/components/profiles/profiles-list-view';
import type { ProfileType } from '../../../src/features/profiles/types/profiles.types';

const profileType: ProfileType = 'property_agent';

export default function PropertyAgentProfilesPage() {
  return <ProfilesListView profileType={profileType} />;
}
