// app/review-queues/profiles/page.tsx

import { ProfilesTable } from '../../../src/components/profiles/profiles-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROFILES } from '../../../src/lib/demo/management-demo-data';

export default function ProfileReviewQueuePage() {
  const profiles = DEMO_PROFILES.filter((profile) => profile.status !== 'approved');

  return (
    <ManagementListPage
      description="Business profile onboarding, verification, and correction review queue."
      filters={[{ label: 'All profiles', href: '/profiles' }, { label: 'Pending', href: '/profiles?status=pending' }, { label: 'Correction required', href: '/profiles?status=correction_requested' }]}
      metrics={[{ label: 'Queue records', value: String(profiles.length), detail: 'Demo profiles requiring review', tone: 'warning' }, { label: 'Verification review', value: '2', detail: 'Profile checks active', tone: 'info' }, { label: 'Correction required', value: '1', detail: 'User action needed', tone: 'danger' }, { label: 'Approved outside queue', value: '2', detail: 'Completed profiles', tone: 'success' }]}
      title="Profile review queue"
      totalLabel={`${profiles.length} queued profiles`}
    >
      <ProfilesTable profiles={profiles} />
    </ManagementListPage>
  );
}
