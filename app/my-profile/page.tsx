import { PageShell } from '../../src/components/layout/page-shell/page-shell';
import {
  StaffProfileActions,
  StaffProfileView,
} from '../../src/components/staff/staff-profile-view';

export default function MyProfilePage() {
  return (
    <PageShell
      actions={<StaffProfileActions />}
      description="View your contact details, staff role, account status, and verification history."
      title="My profile"
    >
      <StaffProfileView />
    </PageShell>
  );
}
