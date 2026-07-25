// app/users/[userPublicId]/page.tsx

import { UserDetailView } from '../../../src/components/users/user-detail-view';

export interface UserDetailPageProps {
  params: Promise<{ userPublicId: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { userPublicId } = await params;

  return <UserDetailView userPublicId={userPublicId} />;
}
