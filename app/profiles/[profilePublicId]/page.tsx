// app/profiles/[profilePublicId]/page.tsx

import { ProfileDetailView } from '../../../src/components/profiles/profile-detail-view';

export interface ProfileDetailPageProps {
  params: Promise<{ profilePublicId: string }>;
}

export default async function ProfileDetailPage({ params }: ProfileDetailPageProps) {
  const { profilePublicId } = await params;
  return <ProfileDetailView profilePublicId={profilePublicId} />;
}
