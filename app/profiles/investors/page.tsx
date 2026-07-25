// app/profiles/investors/page.tsx

import { ProfilesListView } from '../../../src/components/profiles/profiles-list-view';
import type { ProfileType } from '../../../src/features/profiles/types/profiles.types';

const profileType: ProfileType = 'investor';

export default function InvestorProfilesPage() {
  return <ProfilesListView profileType={profileType} />;
}
